import { useAuth } from '@/contexts/AuthContext'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {
  TrendingUp,
  Download,
  Calendar,
  MessageSquare,
  Users,
  Clock,
  Star,
  Activity,
  BarChart3,
} from 'lucide-react'
import {
  format,
  subDays,
  startOfDay,
  endOfDay,
  eachDayOfInterval,
  parseISO,
} from 'date-fns'

interface AnalyticsData {
  conversationsByDate: { date: string; count: number }[]
  messagesByDate: { date: string; sent: number; received: number }[]
  responseTimesByDate: { date: string; avgTime: number }[]
  statusDistribution: { name: string; value: number }[]
  agentPerformance: {
    agent: string
    conversations: number
    avgResponseTime: number
    satisfaction: number
  }[]
  hourlyActivity: { hour: string; messages: number }[]
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4']

export default function Analytics() {
  const { organization } = useAuth()
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState('7') // days
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    conversationsByDate: [],
    messagesByDate: [],
    responseTimesByDate: [],
    statusDistribution: [],
    agentPerformance: [],
    hourlyActivity: [],
  })

  useEffect(() => {
    if (organization) {
      fetchAnalytics()
    }
  }, [organization, dateRange])

  const fetchAnalytics = async () => {
    if (!organization) return
    setLoading(true)

    try {
      const days = parseInt(dateRange)
      const startDate = startOfDay(subDays(new Date(), days))
      const endDate = endOfDay(new Date())

      // Fetch conversations
      const { data: conversations } = await supabase
        .from('whatsapp_conversations')
        .select('*')
        .eq('organization_id', organization.id)
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString())

      // Fetch messages
      const { data: messages } = await supabase
        .from('whatsapp_messages')
        .select('*')
        .eq('organization_id', organization.id)
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString())

      // Fetch team members for agent performance
      const { data: teamMembers } = await supabase
        .from('whatsapp_team_members')
        .select('id, display_name')
        .eq('organization_id', organization.id)
        .eq('is_active', true)

      if (conversations && messages && teamMembers) {
        processAnalytics(conversations, messages, teamMembers, startDate, endDate)
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const processAnalytics = (
    conversations: any[],
    messages: any[],
    teamMembers: any[],
    startDate: Date,
    endDate: Date
  ) => {
    // Conversations by date
    const dateInterval = eachDayOfInterval({ start: startDate, end: endDate })
    const conversationsByDate = dateInterval.map((date) => ({
      date: format(date, 'MMM dd'),
      count: conversations.filter(
        (c) => format(parseISO(c.created_at), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      ).length,
    }))

    // Messages by date
    const messagesByDate = dateInterval.map((date) => {
      const dateStr = format(date, 'yyyy-MM-dd')
      const dayMessages = messages.filter(
        (m) => format(parseISO(m.created_at), 'yyyy-MM-dd') === dateStr
      )
      return {
        date: format(date, 'MMM dd'),
        sent: dayMessages.filter((m) => m.direction === 'outbound').length,
        received: dayMessages.filter((m) => m.direction === 'inbound').length,
      }
    })

    // Response times by date
    const responseTimesByDate = dateInterval.map((date) => {
      const dateStr = format(date, 'yyyy-MM-dd')
      const dayConvs = conversations.filter(
        (c) => format(parseISO(c.created_at), 'yyyy-MM-dd') === dateStr
      )
      const avgTime =
        dayConvs.reduce((acc, c) => acc + (c.first_response_time_seconds || 0), 0) /
        (dayConvs.length || 1)
      return {
        date: format(date, 'MMM dd'),
        avgTime: Math.round(avgTime / 60), // Convert to minutes
      }
    })

    // Status distribution
    const statusCounts = conversations.reduce((acc, c) => {
      acc[c.status] = (acc[c.status] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    const statusDistribution = Object.entries(statusCounts).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
    }))

    // Agent performance
    const agentPerformance = teamMembers.map((member) => {
      const agentConvs = conversations.filter((c) => c.assigned_to === member.id)
      const avgResponseTime =
        agentConvs.reduce((acc, c) => acc + (c.first_response_time_seconds || 0), 0) /
        (agentConvs.length || 1)
      const avgSatisfaction =
        agentConvs
          .filter((c) => c.satisfaction_rating)
          .reduce((acc, c) => acc + (c.satisfaction_rating || 0), 0) /
        (agentConvs.filter((c) => c.satisfaction_rating).length || 1)

      return {
        agent: member.display_name || 'Unknown',
        conversations: agentConvs.length,
        avgResponseTime: Math.round(avgResponseTime / 60),
        satisfaction: parseFloat(avgSatisfaction.toFixed(1)),
      }
    })

    // Hourly activity
    const hourlyActivity = Array.from({ length: 24 }, (_, hour) => {
      const hourMessages = messages.filter(
        (m) => new Date(m.created_at).getHours() === hour
      )
      return {
        hour: `${hour.toString().padStart(2, '0')}:00`,
        messages: hourMessages.length,
      }
    })

    setAnalytics({
      conversationsByDate,
      messagesByDate,
      responseTimesByDate,
      statusDistribution,
      agentPerformance,
      hourlyActivity,
    })
  }

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Exporting analytics...')
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Activity className="h-12 w-12 text-primary animate-pulse mx-auto mb-4" />
            <p className="text-muted-foreground">Loading analytics...</p>
          </div>
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
            <BarChart3 className="h-8 w-8 text-primary" />
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Performance insights and trends for {organization?.name}
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="14">Last 14 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExport} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.conversationsByDate.reduce((acc, d) => acc + d.count, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              In the last {dateRange} days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.messagesByDate.reduce((acc, d) => acc + d.sent + d.received, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Sent and received</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.responseTimesByDate.length > 0
                ? Math.round(
                    analytics.responseTimesByDate.reduce((acc, d) => acc + d.avgTime, 0) /
                      analytics.responseTimesByDate.length
                  )
                : 0}
              m
            </div>
            <p className="text-xs text-muted-foreground">Average across period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.agentPerformance.filter((a) => a.conversations > 0).length}
            </div>
            <p className="text-xs text-muted-foreground">Handling conversations</p>
          </CardContent>
        </Card>
      </div>

      {/* Conversations Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>Conversations Over Time</CardTitle>
          <CardDescription>Daily conversation volume trend</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analytics.conversationsByDate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="count"
                name="Conversations"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages Sent vs Received */}
        <Card>
          <CardHeader>
            <CardTitle>Messages Sent vs Received</CardTitle>
            <CardDescription>Message flow analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.messagesByDate}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sent" name="Sent" fill="#10b981" />
                <Bar dataKey="received" name="Received" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Conversation Status</CardTitle>
            <CardDescription>Distribution by status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.statusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analytics.statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Response Time Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Response Time Trend</CardTitle>
          <CardDescription>Average first response time over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.responseTimesByDate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="avgTime"
                name="Avg Response Time (min)"
                stroke="#f59e0b"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Hourly Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Message Activity by Hour</CardTitle>
          <CardDescription>24-hour message distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.hourlyActivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="messages" name="Messages" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Agent Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Agent Performance</CardTitle>
          <CardDescription>Individual agent metrics and statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.agentPerformance.length > 0 ? (
              analytics.agentPerformance
                .filter((agent) => agent.conversations > 0)
                .map((agent) => (
                  <div
                    key={agent.agent}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{agent.agent}</p>
                        <p className="text-sm text-muted-foreground">
                          {agent.conversations} conversations handled
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-6 text-sm">
                      <div className="text-center">
                        <p className="text-muted-foreground">Avg Response</p>
                        <p className="font-semibold">{agent.avgResponseTime}m</p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">Satisfaction</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <p className="font-semibold">
                            {agent.satisfaction > 0 ? agent.satisfaction : 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No agent performance data available
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
