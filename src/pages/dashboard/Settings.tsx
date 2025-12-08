import { useAuth } from '@/contexts/AuthContext'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Settings as SettingsIcon,
  Building,
  Users,
  User,
  Bell,
  Key,
  Webhook,
  Save,
  Plus,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  CheckCircle,
} from 'lucide-react'
import { toast } from 'sonner'

interface UserPreferences {
  email_notifications: boolean
  push_notifications: boolean
  notify_new_message: boolean
  notify_new_conversation: boolean
  notify_assignment: boolean
  daily_digest: boolean
  weekly_digest: boolean
  theme: string
  language: string
  timezone: string
  sound_enabled: boolean
}

interface OrganizationSettings {
  business_name: string
  business_description: string
  business_email: string
  business_phone: string
  business_website: string
  auto_reply_enabled: boolean
  auto_reply_message: string
  away_message: string
  auto_assign_conversations: boolean
  max_conversations_per_agent: number
}

interface TeamMember {
  id: string
  user_id: string
  display_name: string
  role: string
  is_active: boolean
  status: string
  email: string
  created_at: string
}

interface APIKey {
  id: string
  name: string
  key_prefix: string
  is_active: boolean
  last_used_at: string | null
  created_at: string
}

export default function Settings() {
  const { organization, user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  // User preferences state
  const [userPrefs, setUserPrefs] = useState<UserPreferences>({
    email_notifications: true,
    push_notifications: true,
    notify_new_message: true,
    notify_new_conversation: true,
    notify_assignment: true,
    daily_digest: false,
    weekly_digest: true,
    theme: 'system',
    language: 'en',
    timezone: 'UTC',
    sound_enabled: true,
  })

  // Organization settings state
  const [orgSettings, setOrgSettings] = useState<OrganizationSettings>({
    business_name: '',
    business_description: '',
    business_email: '',
    business_phone: '',
    business_website: '',
    auto_reply_enabled: false,
    auto_reply_message: '',
    away_message: '',
    auto_assign_conversations: true,
    max_conversations_per_agent: 10,
  })

  // Team members state
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])

  // API keys state
  const [apiKeys, setAPIKeys] = useState<APIKey[]>([])

  useEffect(() => {
    if (organization && user) {
      fetchData()
    }
  }, [organization, user])

  const fetchData = async () => {
    if (!organization || !user) return
    setLoading(true)

    try {
      // Fetch user preferences
      const { data: prefsData } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle()

      if (prefsData) {
        setUserPrefs(prefsData)
      }

      // Fetch organization settings
      const { data: orgData } = await supabase
        .from('organization_settings')
        .select('*')
        .eq('organization_id', organization.id)
        .maybeSingle()

      if (orgData) {
        setOrgSettings(orgData)
      }

      // Fetch team members
      const { data: teamData } = await supabase
        .from('whatsapp_team_members')
        .select('*, user:user_id(email)')
        .eq('organization_id', organization.id)

      if (teamData) {
        setTeamMembers(
          teamData.map((member: any) => ({
            ...member,
            email: member.user?.email || 'No email',
          }))
        )
      }

      // Fetch API keys
      const { data: keysData } = await supabase
        .from('api_keys')
        .select('*')
        .eq('organization_id', organization.id)
        .order('created_at', { ascending: false })

      if (keysData) {
        setAPIKeys(keysData)
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
      toast.error('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }

  const saveUserPreferences = async () => {
    if (!user) return
    setSaving(true)

    try {
      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          ...userPrefs,
        })

      if (error) throw error

      toast.success('Preferences saved successfully')
    } catch (error) {
      console.error('Error saving preferences:', error)
      toast.error('Failed to save preferences')
    } finally {
      setSaving(false)
    }
  }

  const saveOrganizationSettings = async () => {
    if (!organization) return
    setSaving(true)

    try {
      const { error } = await supabase
        .from('organization_settings')
        .upsert({
          organization_id: organization.id,
          ...orgSettings,
        })

      if (error) throw error

      toast.success('Organization settings saved')
    } catch (error) {
      console.error('Error saving organization settings:', error)
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const updateTeamMemberStatus = async (memberId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('whatsapp_team_members')
        .update({ is_active: isActive })
        .eq('id', memberId)

      if (error) throw error

      toast.success(`Team member ${isActive ? 'activated' : 'deactivated'}`)
      fetchData()
    } catch (error) {
      console.error('Error updating team member:', error)
      toast.error('Failed to update team member')
    }
  }

  const generateAPIKey = async () => {
    if (!organization || !user) return

    const keyName = prompt('Enter a name for this API key:')
    if (!keyName) return

    try {
      // Generate a random API key (in production, this should be done server-side)
      const randomKey = `sk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
      const keyPrefix = randomKey.substring(0, 12)

      const { error } = await supabase.from('api_keys').insert({
        organization_id: organization.id,
        created_by: user.id,
        name: keyName,
        key_hash: randomKey, // In production, hash this!
        key_prefix: keyPrefix,
        is_active: true,
      })

      if (error) throw error

      // Show the key once (in production, display in a modal)
      alert(`Your API key (save this, you won't see it again):\n\n${randomKey}`)

      toast.success('API key created')
      fetchData()
    } catch (error) {
      console.error('Error creating API key:', error)
      toast.error('Failed to create API key')
    }
  }

  const revokeAPIKey = async (keyId: string) => {
    if (!confirm('Are you sure you want to revoke this API key? This cannot be undone.'))
      return

    try {
      const { error } = await supabase
        .from('api_keys')
        .update({ is_active: false, revoked_at: new Date().toISOString() })
        .eq('id', keyId)

      if (error) throw error

      toast.success('API key revoked')
      fetchData()
    } catch (error) {
      console.error('Error revoking API key:', error)
      toast.error('Failed to revoke API key')
    }
  }

  const getRoleBadge = (role: string) => {
    const colors: Record<string, string> = {
      admin: 'bg-red-100 text-red-700',
      supervisor: 'bg-blue-100 text-blue-700',
      agent: 'bg-green-100 text-green-700',
      viewer: 'bg-gray-100 text-gray-700',
    }

    return (
      <Badge className={colors[role] || colors.viewer}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    )
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <div className="text-center">
          <SettingsIcon className="h-12 w-12 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <SettingsIcon className="h-8 w-8 text-primary" />
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your account, organization, and preferences
        </p>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="organization">
            <Building className="h-4 w-4 mr-2" />
            Organization
          </TabsTrigger>
          <TabsTrigger value="team">
            <Users className="h-4 w-4 mr-2" />
            Team
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="api">
            <Key className="h-4 w-4 mr-2" />
            API Keys
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>Manage your personal information and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user?.email || ''} disabled />
                <p className="text-xs text-muted-foreground">
                  Contact support to change your email
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select value={userPrefs.theme} onValueChange={(value) => setUserPrefs({ ...userPrefs, theme: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={userPrefs.language} onValueChange={(value) => setUserPrefs({ ...userPrefs, language: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={userPrefs.timezone} onValueChange={(value) => setUserPrefs({ ...userPrefs, timezone: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="America/New_York">Eastern Time</SelectItem>
                    <SelectItem value="America/Chicago">Central Time</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Sound Enabled</Label>
                  <p className="text-sm text-muted-foreground">
                    Play sounds for notifications
                  </p>
                </div>
                <Switch
                  checked={userPrefs.sound_enabled}
                  onCheckedChange={(checked) =>
                    setUserPrefs({ ...userPrefs, sound_enabled: checked })
                  }
                />
              </div>

              <Button onClick={saveUserPreferences} disabled={saving}>
                <Save className="mr-2 h-4 w-4" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Organization Tab */}
        <TabsContent value="organization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Organization Profile</CardTitle>
              <CardDescription>Update your organization's information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="business_name">Business Name</Label>
                <Input
                  id="business_name"
                  value={orgSettings.business_name}
                  onChange={(e) =>
                    setOrgSettings({ ...orgSettings, business_name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="business_description">Description</Label>
                <Textarea
                  id="business_description"
                  value={orgSettings.business_description}
                  onChange={(e) =>
                    setOrgSettings({ ...orgSettings, business_description: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="business_email">Business Email</Label>
                  <Input
                    id="business_email"
                    type="email"
                    value={orgSettings.business_email}
                    onChange={(e) =>
                      setOrgSettings({ ...orgSettings, business_email: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business_phone">Business Phone</Label>
                  <Input
                    id="business_phone"
                    type="tel"
                    value={orgSettings.business_phone}
                    onChange={(e) =>
                      setOrgSettings({ ...orgSettings, business_phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="business_website">Website</Label>
                <Input
                  id="business_website"
                  type="url"
                  value={orgSettings.business_website}
                  onChange={(e) =>
                    setOrgSettings({ ...orgSettings, business_website: e.target.value })
                  }
                />
              </div>

              <Button onClick={saveOrganizationSettings} disabled={saving}>
                <Save className="mr-2 h-4 w-4" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Auto-Response Settings</CardTitle>
              <CardDescription>Configure automatic replies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-Reply Enabled</Label>
                  <p className="text-sm text-muted-foreground">
                    Send automatic replies to new messages
                  </p>
                </div>
                <Switch
                  checked={orgSettings.auto_reply_enabled}
                  onCheckedChange={(checked) =>
                    setOrgSettings({ ...orgSettings, auto_reply_enabled: checked })
                  }
                />
              </div>

              {orgSettings.auto_reply_enabled && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="auto_reply_message">Auto-Reply Message</Label>
                    <Textarea
                      id="auto_reply_message"
                      value={orgSettings.auto_reply_message}
                      onChange={(e) =>
                        setOrgSettings({ ...orgSettings, auto_reply_message: e.target.value })
                      }
                      placeholder="Thanks for your message! We'll get back to you shortly."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="away_message">Away Message</Label>
                    <Textarea
                      id="away_message"
                      value={orgSettings.away_message}
                      onChange={(e) =>
                        setOrgSettings({ ...orgSettings, away_message: e.target.value })
                      }
                      placeholder="We're currently away. Our business hours are..."
                    />
                  </div>
                </>
              )}

              <Button onClick={saveOrganizationSettings} disabled={saving}>
                <Save className="mr-2 h-4 w-4" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage your team and their permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.display_name}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{getRoleBadge(member.role)}</TableCell>
                      <TableCell>
                        {member.is_active ? (
                          <Badge className="bg-green-100 text-green-700">Active</Badge>
                        ) : (
                          <Badge variant="secondary">Inactive</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Switch
                          checked={member.is_active}
                          onCheckedChange={(checked) =>
                            updateTeamMemberStatus(member.id, checked)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Channels</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch
                      checked={userPrefs.email_notifications}
                      onCheckedChange={(checked) =>
                        setUserPrefs({ ...userPrefs, email_notifications: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications in your browser
                      </p>
                    </div>
                    <Switch
                      checked={userPrefs.push_notifications}
                      onCheckedChange={(checked) =>
                        setUserPrefs({ ...userPrefs, push_notifications: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Events</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>New Messages</Label>
                    <Switch
                      checked={userPrefs.notify_new_message}
                      onCheckedChange={(checked) =>
                        setUserPrefs({ ...userPrefs, notify_new_message: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>New Conversations</Label>
                    <Switch
                      checked={userPrefs.notify_new_conversation}
                      onCheckedChange={(checked) =>
                        setUserPrefs({ ...userPrefs, notify_new_conversation: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Conversation Assignments</Label>
                    <Switch
                      checked={userPrefs.notify_assignment}
                      onCheckedChange={(checked) =>
                        setUserPrefs({ ...userPrefs, notify_assignment: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Digest</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Daily Digest</Label>
                    <Switch
                      checked={userPrefs.daily_digest}
                      onCheckedChange={(checked) =>
                        setUserPrefs({ ...userPrefs, daily_digest: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Weekly Digest</Label>
                    <Switch
                      checked={userPrefs.weekly_digest}
                      onCheckedChange={(checked) =>
                        setUserPrefs({ ...userPrefs, weekly_digest: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <Button onClick={saveUserPreferences} disabled={saving}>
                <Save className="mr-2 h-4 w-4" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys Tab */}
        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>Manage API keys for integrations</CardDescription>
                </div>
                <Button onClick={generateAPIKey}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create API Key
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {apiKeys.length === 0 ? (
                <div className="text-center py-12">
                  <Key className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No API keys yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Create an API key to integrate with external services
                  </p>
                  <Button onClick={generateAPIKey}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First API Key
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Key</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Used</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {apiKeys.map((key) => (
                      <TableRow key={key.id}>
                        <TableCell className="font-medium">{key.name}</TableCell>
                        <TableCell>
                          <code className="text-sm">{key.key_prefix}...</code>
                        </TableCell>
                        <TableCell>
                          {key.is_active ? (
                            <Badge className="bg-green-100 text-green-700">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="secondary">Revoked</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {key.last_used_at
                            ? new Date(key.last_used_at).toLocaleDateString()
                            : 'Never'}
                        </TableCell>
                        <TableCell className="text-right">
                          {key.is_active && (
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => revokeAPIKey(key.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
