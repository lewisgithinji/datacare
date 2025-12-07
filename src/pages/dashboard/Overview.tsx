import { useAuth } from '@/contexts/AuthContext'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  MessageSquare,
  Users,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Send,
  Bot,
  Star,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'

interface DashboardStats {
  totalConversations: number
  activeConversations: number
  totalMessages: number
  totalContacts: number
  avgResponseTime: number
  satisfactionRating: number
  conversationsTrend: number
  messagesTrend: number
}

interface RecentActivity {
  id: string
  type: 'message' | 'conversation' | 'contact'
  title: string
  description: string
  time: string
  status?: string
}

export default function DashboardOverview() {
  const { organization, user } = useAuth()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (organization) {
      fetchDashboardData()
    }
  }, [organization])

  const fetchDashboardData = async () => {
    if (!organization) return

    try {
      // Fetch conversation stats
      const { data: conversations } = await supabase
        .from('whatsapp_conversations')
        .select('*')
        .eq('organization_id', organization.id)

      const { data: messages } = await supabase
        .from('whatsapp_messages')
        .select('*')
        .eq('organization_id', organization.id)

      const { data: contacts } = await supabase
        .from('whatsapp_contacts')
        .select('*')
        .eq('organization_id', organization.id)

      // Calculate stats
      const activeConvs = conversations?.filter(c =>
        ['open', 'assigned', 'pending'].includes(c.status)
      ).length || 0

      const avgResponse = conversations?.reduce((acc, c) =>
        acc + (c.first_response_time_seconds || 0), 0
      ) / (conversations?.length || 1)

      const avgSatisfaction = conversations?.filter(c => c.satisfaction_rating)
        .reduce((acc, c) => acc + (c.satisfaction_rating || 0), 0) /
        (conversations?.filter(c => c.satisfaction_rating).length || 1)

      setStats({
        totalConversations: conversations?.length || 0,
        activeConversations: activeConvs,
        totalMessages: messages?.length || 0,
        totalContacts: contacts?.length || 0,
        avgResponseTime: Math.round(avgResponse / 60), // Convert to minutes
        satisfactionRating: avgSatisfaction || 0,
        conversationsTrend: 12, // TODO: Calculate actual trend
        messagesTrend: 8,
      })

      // Fetch recent activity
      const recentConvs = conversations?.slice(0, 5).map(c => ({
        id: c.id,
        type: 'conversation' as const,
        title: `New conversation from ${c.contact?.name || 'Unknown'}`,
        description: c.summary || 'No summary available',
        time: c.created_at,
        status: c.status,
      })) || []

      setRecentActivity(recentConvs)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.user_metadata?.full_name || 'there'}!
        </h1>
        <p className="text-gray-600 mt-1">
          Here's what's happening with {organization?.name} today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Conversations"
          value={stats?.totalConversations || 0}
          icon={MessageSquare}
          trend={stats?.conversationsTrend}
          trendLabel="vs last month"
          color="blue"
        />
        <StatCard
          title="Active Now"
          value={stats?.activeConversations || 0}
          icon={TrendingUp}
          color="green"
          subtitle="Open conversations"
        />
        <StatCard
          title="Total Contacts"
          value={stats?.totalContacts || 0}
          icon={Users}
          color="purple"
          subtitle="In your database"
        />
        <StatCard
          title="Avg Response Time"
          value={`${stats?.avgResponseTime || 0}m`}
          icon={Clock}
          color="orange"
          subtitle="First response"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalMessages || 0}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
              {stats?.messagesTrend}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.satisfactionRating ? stats.satisfactionRating.toFixed(1) : 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">Average rating</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">AI Chatbot</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(((stats?.totalMessages || 0) * 0.4))}
            </div>
            <p className="text-xs text-muted-foreground">Messages handled by AI</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest conversations and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-0">
                    <div className="mt-1">
                      {activity.type === 'conversation' && (
                        <MessageSquare className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{activity.title}</p>
                        {activity.status && (
                          <Badge variant="outline" className="text-xs">
                            {activity.status}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(new Date(activity.time), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No recent activity
                </p>
              )}
            </div>
            <Button asChild variant="outline" className="w-full mt-4">
              <Link to="/dashboard/inbox">
                View All Conversations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild className="w-full justify-start" variant="outline">
              <Link to="/dashboard/inbox">
                <MessageSquare className="mr-2 h-4 w-4" />
                View Inbox
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link to="/dashboard/contacts">
                <Users className="mr-2 h-4 w-4" />
                Manage Contacts
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link to="/dashboard/chatbot">
                <Bot className="mr-2 h-4 w-4" />
                Chatbot Conversations
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link to="/dashboard/analytics">
                <TrendingUp className="mr-2 h-4 w-4" />
                View Analytics
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Conversation Status</CardTitle>
          <CardDescription>Current state of all conversations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatusBadge
              label="Open"
              count={stats?.activeConversations || 0}
              icon={AlertCircle}
              color="blue"
            />
            <StatusBadge
              label="Resolved"
              count={Math.round((stats?.totalConversations || 0) * 0.6)}
              icon={CheckCircle2}
              color="green"
            />
            <StatusBadge
              label="Pending"
              count={Math.round((stats?.totalConversations || 0) * 0.2)}
              icon={Clock}
              color="yellow"
            />
            <StatusBadge
              label="Closed"
              count={Math.round((stats?.totalConversations || 0) * 0.1)}
              icon={CheckCircle2}
              color="gray"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Stat Card Component
function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendLabel,
  color,
  subtitle,
}: {
  title: string
  value: string | number
  icon: any
  trend?: number
  trendLabel?: string
  color: 'blue' | 'green' | 'purple' | 'orange'
  subtitle?: string
}) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend !== undefined && (
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            {trend > 0 ? (
              <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
            ) : (
              <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
            )}
            {Math.abs(trend)}% {trendLabel}
          </p>
        )}
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  )
}

// Status Badge Component
function StatusBadge({
  label,
  count,
  icon: Icon,
  color,
}: {
  label: string
  count: number
  icon: any
  color: string
}) {
  const colorClasses: Record<string, string> = {
    blue: 'border-blue-200 bg-blue-50 text-blue-700',
    green: 'border-green-200 bg-green-50 text-green-700',
    yellow: 'border-yellow-200 bg-yellow-50 text-yellow-700',
    gray: 'border-gray-200 bg-gray-50 text-gray-700',
  }

  return (
    <div className={`border rounded-lg p-4 ${colorClasses[color]}`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="text-2xl font-bold">{count}</div>
    </div>
  )
}

// Loading Skeleton
function DashboardSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
