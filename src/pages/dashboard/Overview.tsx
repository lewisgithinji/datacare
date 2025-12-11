import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { BarChart, Clock, MessageSquare, Users, Megaphone, ArrowUpRight, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

interface BroadcastSummary {
  id: string;
  name: string;
  template_name: string;
  status: string;
  schedule_time: string | null;
  successful_sends: number;
  failed_sends: number;
  created_at: string;
}

const DashboardOverview = () => {
  const { user, organization } = useAuth();
  const [recentBroadcasts, setRecentBroadcasts] = useState<BroadcastSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (organization) {
      fetchRecentActivity();
    }
  }, [organization]);

  const fetchRecentActivity = async () => {
    try {
      setLoading(true);
      const { data } = await supabase
        .from('whatsapp_broadcasts')
        .select('*')
        .eq('organization_id', organization?.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (data) {
        setRecentBroadcasts(data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'sending': return <Badge className="bg-blue-100 text-blue-800 animate-pulse">Sending</Badge>;
      case 'failed': return <Badge variant="destructive">Failed</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // Use user's full name if available, otherwise fallback to email.
  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {displayName}! Here's what's happening today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link to="/dashboard/campaigns">
              <Megaphone className="mr-2 h-4 w-4" />
              New Broadcast
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground flex items-center text-green-600">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Contacts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground flex items-center text-green-600">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campaigns Sent</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentBroadcasts.length}</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32m</div>
            <p className="text-xs text-muted-foreground">-5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Campaigns</CardTitle>
            <CardDescription>
              Your latest broadcast messages sent via WhatsApp API.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentBroadcasts.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Sent / Failed</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentBroadcasts.map((broadcast) => (
                    <TableRow key={broadcast.id}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span>{broadcast.name}</span>
                          <span className="text-xs text-muted-foreground">{broadcast.template_name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(broadcast.status)}</TableCell>
                      <TableCell className="text-right">
                        <span className="text-green-600 font-medium">{broadcast.successful_sends}</span>
                        <span className="text-muted-foreground mx-1">/</span>
                        <span className="text-red-500 font-medium">{broadcast.failed_sends}</span>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {format(new Date(broadcast.created_at), 'MMM d, h:mm a')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Megaphone className="h-10 w-10 text-muted-foreground mb-4 opacity-20" />
                <p className="text-sm text-muted-foreground">No campaigns sent yet.</p>
                <Button variant="link" asChild className="mt-2">
                  <Link to="/dashboard/campaigns">Create your first broadcast &rarr;</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-3 shadow-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Shortcuts to manage your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/dashboard/inbox">
                <MessageSquare className="mr-2 h-4 w-4" />
                View Inbox
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/dashboard/contacts">
                <Users className="mr-2 h-4 w-4" />
                Manage Contacts
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/dashboard/settings">
                <ArrowRight className="mr-2 h-4 w-4" />
                Configure Integration
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;