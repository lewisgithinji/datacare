import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import { User, Session } from '@supabase/supabase-js'

// Types for WhatsApp platform
interface Organization {
  id: string
  name: string
  slug: string
  plan: string
  features: Record<string, boolean | string | number>
  branding: Record<string, string | null>
  settings: Record<string, unknown>
  is_active: boolean
}

interface TeamMember {
  id: string
  organization_id: string
  user_id: string
  role: 'admin' | 'supervisor' | 'agent' | 'viewer'
  permissions: string[]
  is_active: boolean
  status: 'online' | 'offline' | 'busy' | 'away'
  display_name: string | null
  avatar_url: string | null
  organization?: Organization
}

interface AuthContextType {
  user: User | null
  session: Session | null
  organization: Organization | null
  teamMember: TeamMember | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updatePassword: (newPassword: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [teamMember, setTeamMember] = useState<TeamMember | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        loadOrganizationData(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event)
      setSession(session)
      setUser(session?.user ?? null)

      if (session?.user) {
        await loadOrganizationData(session.user.id)
      } else {
        setOrganization(null)
        setTeamMember(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadOrganizationData = async (userId: string) => {
    try {
      // Get team member record with organization
      const { data: teamMemberData, error } = await supabase
        .from('whatsapp_team_members')
        .select(`
          *,
          organization:whatsapp_organizations(*)
        `)
        .eq('user_id', userId)
        .eq('is_active', true)
        .maybeSingle() // Use maybeSingle() instead of single() to handle no results gracefully

      if (error) {
        console.error('Error loading team member:', error)
        setTeamMember(null)
        setOrganization(null)
      } else if (teamMemberData) {
        setTeamMember(teamMemberData)
        setOrganization(teamMemberData.organization as Organization)
      } else {
        // No team member found - user not linked to organization yet
        console.warn('User not linked to any organization')
        setTeamMember(null)
        setOrganization(null)
      }
    } catch (error) {
      console.error('Error loading organization data:', error)
      setTeamMember(null)
      setOrganization(null)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })
    if (error) throw error
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error

    // Clear state
    setUser(null)
    setSession(null)
    setOrganization(null)
    setTeamMember(null)
  }

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (error) throw error
  }

  const updatePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })
    if (error) throw error
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        organization,
        teamMember,
        loading,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
