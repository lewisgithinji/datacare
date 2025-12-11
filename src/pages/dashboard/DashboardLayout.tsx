import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import {
  MessageSquare,
  LayoutGrid,
  Users,
  Megaphone,
  Bot,
  Settings,
  LogOut,
  Menu,
  ChevronLeft
} from 'lucide-react';
import { DemoModeBanner } from '@/components/DemoModeBanner';
import { useState } from 'react';

export default function DashboardLayout() {
  const { signOut, user, organization } = useAuth();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navItems = [
    { title: "Overview", url: "/dashboard", icon: LayoutGrid },
    { title: "Inbox", url: "/dashboard/inbox", icon: MessageSquare },
    { title: "Contacts", url: "/dashboard/contacts", icon: Users },
    { title: "Campaigns", url: "/dashboard/campaigns", icon: Megaphone },
    { title: "Chatbot", url: "/dashboard/chatbot", icon: Bot },
    { title: "Settings", url: "/dashboard/settings", icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getInitials = () => {
    const email = user?.email || '';
    return email.substring(0, 2).toUpperCase();
  };

  // Sidebar content - shared between desktop and mobile
  const SidebarNav = ({ onLinkClick }: { onLinkClick?: () => void }) => (
    <nav className="flex flex-col gap-1 px-2">
      {navItems.map((item) => (
        <Link
          key={item.title}
          to={item.url}
          onClick={onLinkClick}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
            "hover:bg-accent hover:text-accent-foreground",
            isActive(item.url)
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground"
          )}
        >
          <item.icon className="h-5 w-5 shrink-0" />
          {!sidebarCollapsed && <span>{item.title}</span>}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Desktop Sidebar - Always visible on md+ */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r bg-card transition-all duration-300",
          sidebarCollapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo Header */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              D
            </div>
            {!sidebarCollapsed && (
              <span className="font-semibold text-lg">Datacare</span>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", sidebarCollapsed && "rotate-180")} />
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex-1 py-4 overflow-y-auto">
          <SidebarNav />
        </div>

        {/* User Footer */}
        <div className="border-t p-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className={cn("w-full justify-start gap-2", sidebarCollapsed && "justify-center px-2")}>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback>{getInitials()}</AvatarFallback>
                </Avatar>
                {!sidebarCollapsed && (
                  <div className="flex flex-col items-start text-xs">
                    <span className="font-medium">{user?.user_metadata?.full_name || 'User'}</span>
                    <span className="text-muted-foreground truncate max-w-[140px]">{user?.email}</span>
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/dashboard/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <DemoModeBanner />

        {/* Header */}
        <header className="flex h-16 items-center gap-4 border-b bg-background px-4 shrink-0">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex h-16 items-center border-b px-4">
                <Link to="/dashboard" className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                    D
                  </div>
                  <span className="font-semibold text-lg">Datacare</span>
                </Link>
              </div>
              <div className="py-4">
                <SidebarNav onLinkClick={() => { }} />
              </div>
            </SheetContent>
          </Sheet>

          {/* Page Title / Breadcrumb area */}
          <div className="flex-1">
            <h1 className="text-lg font-semibold md:text-xl">
              {navItems.find(item => isActive(item.url))?.title || 'Dashboard'}
            </h1>
          </div>

          {/* Organization name on desktop */}
          <span className="hidden sm:block text-sm text-muted-foreground">
            {organization?.name}
          </span>

          {/* Mobile user menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback>{getInitials()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/dashboard/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-muted/30 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}