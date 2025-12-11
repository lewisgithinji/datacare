import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Search, Bot, TrendingUp, Star, MessageCircle, Filter } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface ChatbotConversation {
  id: string
  session_id: string
  contact_name: string | null
  contact_email: string | null
  contact_phone: string | null
  intent: string | null
  lead_score: number | null
  primary_need: string | null
  status: string | null
  created_at: string
  updated_at: string
}

export default function ChatbotConversations() {
  const [conversations, setConversations] = useState<ChatbotConversation[]>([])
  const [filteredConversations, setFilteredConversations] = useState<ChatbotConversation[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    fetchChatbotConversations()
  }, [])

  useEffect(() => {
    filterConversations()
  }, [searchQuery, activeTab, conversations])

  const fetchChatbotConversations = async () => {
    try {
      // Note: This is for marketing chatbot conversations, not WhatsApp conversations
      // The table 'conversations' for the marketing chatbot doesn't exist yet
      // For now, we'll just set empty data to prevent errors
      setConversations([])
      setFilteredConversations([])

      // TODO: Create 'conversations' table for marketing chatbot
      // OR use 'whatsapp_conversations' if this should show WhatsApp data

      // Commented out to prevent 404 errors:
      // const { data, error } = await supabase
      //   .from('conversations')
      //   .select('*')
      //   .order('created_at', { ascending: false })
      // if (error) throw error
      // setConversations(data || [])
      // setFilteredConversations(data || [])
    } catch (error) {
      console.error('Error fetching chatbot conversations:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterConversations = () => {
    let filtered = conversations

    // Tab filter
    if (activeTab !== 'all') {
      filtered = filtered.filter((c) => {
        if (activeTab === 'high-score') return (c.lead_score || 0) >= 70
        if (activeTab === 'needs-followup') return c.status === 'pending'
        return true
      })
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (c) =>
          c.contact_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.contact_email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.contact_phone?.includes(searchQuery) ||
          c.intent?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredConversations(filtered)
  }

  const getLeadScoreBadge = (score: number | null) => {
    if (!score) return <Badge variant="secondary">No Score</Badge>
    if (score >= 80)
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Hot {score}</Badge>
      )
    if (score >= 60)
      return (
        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
          Warm {score}
        </Badge>
      )
    return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">Cold {score}</Badge>
  }

  const stats = {
    total: conversations.length,
    highScore: conversations.filter((c) => (c.lead_score || 0) >= 70).length,
    needsFollowup: conversations.filter((c) => c.status === 'pending').length,
    avgScore:
      conversations.reduce((acc, c) => acc + (c.lead_score || 0), 0) /
      (conversations.length || 1),
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Bot className="h-8 w-8 text-primary" />
          AI Chatbot Conversations
        </h1>
        <p className="text-muted-foreground mt-1">
          Website chatbot interactions and lead capture
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">High-Quality Leads</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.highScore}</div>
            <p className="text-xs text-muted-foreground">Score ≥ 70</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Needs Follow-up</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.needsFollowup}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Lead Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgScore.toFixed(0)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs & Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="high-score">High Score</TabsTrigger>
                <TabsTrigger value="needs-followup">Needs Follow-up</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading conversations...
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchQuery || activeTab !== 'all'
                ? 'No conversations match your filters'
                : 'No chatbot conversations yet'}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contact</TableHead>
                    <TableHead>Intent</TableHead>
                    <TableHead>Primary Need</TableHead>
                    <TableHead>Lead Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Started</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredConversations.map((conversation) => (
                    <TableRow key={conversation.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {conversation.contact_name || 'Anonymous'}
                          </div>
                          {conversation.contact_email && (
                            <div className="text-xs text-muted-foreground">
                              {conversation.contact_email}
                            </div>
                          )}
                          {conversation.contact_phone && (
                            <div className="text-xs text-muted-foreground">
                              {conversation.contact_phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {conversation.intent ? (
                          <Badge variant="outline">{conversation.intent}</Badge>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {conversation.primary_need || (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>{getLeadScoreBadge(conversation.lead_score)}</TableCell>
                      <TableCell>
                        {conversation.status ? (
                          <Badge
                            variant={
                              conversation.status === 'completed' ? 'default' : 'secondary'
                            }
                          >
                            {conversation.status}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(conversation.created_at), {
                            addSuffix: true,
                          })}
                        </span>
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
