import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
  Send,
  Plus,
  Calendar,
  Users,
  TrendingUp,
  Eye,
  Play,
  Pause,
  Trash2,
  FileText,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react'
import { format, formatDistanceToNow } from 'date-fns'
import { toast } from 'sonner'

interface Campaign {
  id: string
  name: string
  description: string
  status: 'draft' | 'scheduled' | 'running' | 'paused' | 'completed' | 'cancelled'
  target_segment: string
  schedule_type: string
  scheduled_at: string | null
  total_recipients: number
  messages_sent: number
  messages_delivered: number
  messages_read: number
  messages_replied: number
  messages_failed: number
  created_at: string
  started_at: string | null
  completed_at: string | null
}

interface Template {
  id: string
  name: string
  description: string
  category: string
  content: string
  variables: string[]
  status: string
}

interface CampaignStats {
  total: number
  draft: number
  scheduled: number
  running: number
  completed: number
}

export default function Campaigns() {
  const { organization, user } = useAuth()
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)

  // New campaign form state
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    description: '',
    template_id: '',
    target_segment: 'all',
    schedule_type: 'immediate',
    scheduled_at: '',
  })

  useEffect(() => {
    if (organization) {
      fetchData()
    }
  }, [organization])

  const fetchData = async () => {
    if (!organization) return
    setLoading(true)

    try {
      // Fetch campaigns
      const { data: campaignsData, error: campaignsError } = await supabase
        .from('whatsapp_campaigns')
        .select('*')
        .eq('organization_id', organization.id)
        .order('created_at', { ascending: false })

      if (campaignsError) throw campaignsError

      // Fetch templates
      const { data: templatesData, error: templatesError } = await supabase
        .from('whatsapp_campaign_templates')
        .select('*')
        .eq('organization_id', organization.id)
        .eq('status', 'active')

      if (templatesError) throw templatesError

      setCampaigns(campaignsData || [])
      setTemplates(templatesData || [])
    } catch (error) {
      console.error('Error fetching campaigns:', error)
      toast.error('Failed to load campaigns')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateCampaign = async () => {
    if (!organization || !user) return

    if (!newCampaign.name || !newCampaign.template_id) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      const { data, error } = await supabase
        .from('whatsapp_campaigns')
        .insert({
          organization_id: organization.id,
          created_by: user.id,
          ...newCampaign,
          scheduled_at: newCampaign.scheduled_at || null,
        })
        .select()
        .single()

      if (error) throw error

      toast.success('Campaign created successfully!')
      setCreateDialogOpen(false)
      setNewCampaign({
        name: '',
        description: '',
        template_id: '',
        target_segment: 'all',
        schedule_type: 'immediate',
        scheduled_at: '',
      })
      fetchData()
    } catch (error) {
      console.error('Error creating campaign:', error)
      toast.error('Failed to create campaign')
    }
  }

  const handleUpdateCampaignStatus = async (campaignId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('whatsapp_campaigns')
        .update({ status: newStatus })
        .eq('id', campaignId)

      if (error) throw error

      toast.success(`Campaign ${newStatus}`)
      fetchData()
    } catch (error) {
      console.error('Error updating campaign:', error)
      toast.error('Failed to update campaign')
    }
  }

  const handleDeleteCampaign = async (campaignId: string) => {
    if (!confirm('Are you sure you want to delete this campaign?')) return

    try {
      const { error } = await supabase
        .from('whatsapp_campaigns')
        .delete()
        .eq('id', campaignId)

      if (error) throw error

      toast.success('Campaign deleted')
      fetchData()
    } catch (error) {
      console.error('Error deleting campaign:', error)
      toast.error('Failed to delete campaign')
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; icon: any }> = {
      draft: { variant: 'secondary', icon: FileText },
      scheduled: { variant: 'default', icon: Calendar },
      running: { variant: 'default', icon: Play },
      paused: { variant: 'secondary', icon: Pause },
      completed: { variant: 'default', icon: CheckCircle },
      cancelled: { variant: 'destructive', icon: XCircle },
    }

    const config = variants[status] || variants.draft
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getStats = (): CampaignStats => ({
    total: campaigns.length,
    draft: campaigns.filter((c) => c.status === 'draft').length,
    scheduled: campaigns.filter((c) => c.status === 'scheduled').length,
    running: campaigns.filter((c) => c.status === 'running').length,
    completed: campaigns.filter((c) => c.status === 'completed').length,
  })

  const filteredCampaigns =
    activeTab === 'all'
      ? campaigns
      : campaigns.filter((c) => c.status === activeTab)

  const stats = getStats()

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <div className="text-center">
          <Send className="h-12 w-12 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Loading campaigns...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Send className="h-8 w-8 text-primary" />
            Campaigns
          </h1>
          <p className="text-muted-foreground mt-1">
            Create and manage WhatsApp campaigns
          </p>
        </div>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
              <DialogDescription>
                Set up a new WhatsApp messaging campaign
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Campaign Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Summer Sale 2025"
                  value={newCampaign.name}
                  onChange={(e) =>
                    setNewCampaign({ ...newCampaign, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your campaign..."
                  value={newCampaign.description}
                  onChange={(e) =>
                    setNewCampaign({ ...newCampaign, description: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="template">Message Template *</Label>
                <Select
                  value={newCampaign.template_id}
                  onValueChange={(value) =>
                    setNewCampaign({ ...newCampaign, template_id: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        <div>
                          <div className="font-medium">{template.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {template.category}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="segment">Target Audience</Label>
                <Select
                  value={newCampaign.target_segment}
                  onValueChange={(value) =>
                    setNewCampaign({ ...newCampaign, target_segment: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Contacts</SelectItem>
                    <SelectItem value="vip">VIP Customers</SelectItem>
                    <SelectItem value="leads">Leads</SelectItem>
                    <SelectItem value="customers">Customers</SelectItem>
                    <SelectItem value="custom">Custom Segment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="schedule">Schedule</Label>
                <Select
                  value={newCampaign.schedule_type}
                  onValueChange={(value) =>
                    setNewCampaign({ ...newCampaign, schedule_type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Send Immediately</SelectItem>
                    <SelectItem value="scheduled">Schedule for Later</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {newCampaign.schedule_type === 'scheduled' && (
                <div className="space-y-2">
                  <Label htmlFor="scheduled_at">Schedule Date & Time</Label>
                  <Input
                    id="scheduled_at"
                    type="datetime-local"
                    value={newCampaign.scheduled_at}
                    onChange={(e) =>
                      setNewCampaign({ ...newCampaign, scheduled_at: e.target.value })
                    }
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateCampaign}>Create Campaign</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Draft</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.draft}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.scheduled}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Running</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.running}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns List */}
      <Card>
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="running">Running</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          {filteredCampaigns.length === 0 ? (
            <div className="text-center py-12">
              <Send className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No campaigns found</h3>
              <p className="text-muted-foreground mb-4">
                {activeTab === 'all'
                  ? 'Create your first campaign to get started'
                  : `No ${activeTab} campaigns`}
              </p>
              <Button onClick={() => setCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Campaign
              </Button>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCampaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{campaign.name}</div>
                          {campaign.description && (
                            <div className="text-sm text-muted-foreground">
                              {campaign.description}
                            </div>
                          )}
                          <div className="text-xs text-muted-foreground mt-1">
                            Target: {campaign.target_segment}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{campaign.total_recipients}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {campaign.messages_sent > 0 ? (
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <MessageSquare className="h-3 w-3" />
                              <span>{campaign.messages_sent} sent</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-green-600">
                              <CheckCircle className="h-3 w-3" />
                              <span>{campaign.messages_delivered} delivered</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-blue-600">
                              <Eye className="h-3 w-3" />
                              <span>{campaign.messages_read} read</span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Not sent</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {formatDistanceToNow(new Date(campaign.created_at), {
                            addSuffix: true,
                          })}
                        </div>
                        {campaign.scheduled_at && (
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {format(new Date(campaign.scheduled_at), 'MMM dd, HH:mm')}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {campaign.status === 'draft' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleUpdateCampaignStatus(campaign.id, 'scheduled')
                              }
                            >
                              <Play className="h-4 w-4" />
                            </Button>
                          )}
                          {campaign.status === 'running' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleUpdateCampaignStatus(campaign.id, 'paused')
                              }
                            >
                              <Pause className="h-4 w-4" />
                            </Button>
                          )}
                          {campaign.status === 'paused' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleUpdateCampaignStatus(campaign.id, 'running')
                              }
                            >
                              <Play className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedCampaign(campaign)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteCampaign(campaign.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
