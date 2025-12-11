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

export interface AuthContextType {
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

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [teamMember, setTeamMember] = useState<TeamMember | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null) // Track which user is being loaded

  useEffect(() => {
    console.log('[AuthContext] Initializing auth context')

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('[AuthContext] Initial session check:', session ? 'Has session' : 'No session')
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        loadOrganizationData(session.user.id)
      } else {
        console.log('[AuthContext] No session, setting loading to false')
        setLoading(false)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('[AuthContext] Auth state changed:', event)
      setSession(session)
      setUser(session?.user ?? null)

      if (session?.user) {
        await loadOrganizationData(session.user.id)
      } else {
        console.log('[AuthContext] No user in session, clearing org data')
        setOrganization(null)
        setTeamMember(null)
        setLoading(false)
      }
    })

    return () => {
      console.log('[AuthContext] Cleaning up auth subscription')
      subscription.unsubscribe()
    }
  }, [])

  const loadOrganizationData = async (userId: string) => {
    console.log('[AuthContext] Loading organization data for user:', userId)

    // Prevent duplicate calls for the same user
    if (loadingUserId === userId) {
      console.log('[AuthContext] Already loading data for this user, skipping')
      return
    }

    setLoadingUserId(userId)

    // Add timeout to prevent infinite hanging
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Organization data loading timeout')), 10000) // 10 second timeout
    })

    try {
      // Get team member record with organization with timeout
      const queryPromise = supabase
        .from('whatsapp_team_members')
        .select(`
          *,
          organization:whatsapp_organizations(*)
        `)
        .eq('user_id', userId)
        .eq('is_active', true)
        .maybeSingle()

      const { data: teamMemberData, error } = await Promise.race([
        queryPromise,
        timeoutPromise
      ]) as { data: any, error: any }

      console.log('[AuthContext] Query completed:', { hasData: !!teamMemberData, hasError: !!error })

      if (error) {
        console.error('[AuthContext] Error loading team member:', error)
        setTeamMember(null)
        setOrganization(null)
      } else if (teamMemberData) {
        console.log('[AuthContext] Team member loaded:', teamMemberData.display_name)
        console.log('[AuthContext] Organization loaded:', teamMemberData.organization?.name)
        setTeamMember(teamMemberData)
        setOrganization(teamMemberData.organization as Organization)
      } else {
        // No team member found - user not linked to organization yet
        console.warn('[AuthContext] User not linked to any organization')
        setTeamMember(null)
        setOrganization(null)
      }
    } catch (error) {
      console.error('[AuthContext] Error loading organization data:', error)
      setTeamMember(null)
      setOrganization(null)
    } finally {
      console.log('[AuthContext] Setting loading to false')
      setLoadingUserId(null) // Reset loading flag
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
