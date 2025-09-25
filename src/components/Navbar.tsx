import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Crown,
  Shield,
  Users,
  UserCheck,
  User,
  DollarSign,
  Handshake,
  ChevronDown,
  Menu,
} from 'lucide-react';
import { Role } from '@/lib/rolePermissions';

const Navbar = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRoleSelect = async (roleId: string) => {
    const role = roleId as Role;

    const demoUsers: Record<Role, {email: string, password: string}> = {
      OWNER: { email: 'john@agency.com', password: 'password123' },
      ADMIN: { email: 'admin@agency.com', password: 'password123' },
      PROJECT_MANAGER: { email: 'sarah@agency.com', password: 'password123' },
      TEAM_LEAD: { email: 'jessica@agency.com', password: 'password123' },
      MEMBER: { email: 'mike@agency.com', password: 'password123' },
      FINANCE: { email: 'nancy@agency.com', password: 'password123' },
      CLIENT: { email: 'client1@example.com', password: 'password123' },
    };

    const demoUser = demoUsers[role];

    if (demoUser) {
      try {
        await login(demoUser);
        // The login function in useAuth already handles navigation
      } catch (error) {
        console.error("Demo login failed", error);
        // TODO: Consider adding a toast notification here for user feedback
      }
    }
  };

  const roles = [
    { id: 'OWNER', label: 'Owner', icon: Crown, description: 'Full platform access' },
    { id: 'ADMIN', label: 'Admin', icon: Shield, description: 'Administrative control' },
    { id: 'PROJECT_MANAGER', label: 'Project Manager', icon: Users, description: 'Project oversight' },
    { id: 'TEAM_LEAD', label: 'Team Lead', icon: UserCheck, description: 'Team management' },
    { id: 'MEMBER', label: 'Member', icon: User, description: 'Team collaboration' },
    { id: 'FINANCE', label: 'Finance', icon: DollarSign, description: 'Financial management' },
    { id: 'CLIENT', label: 'Client', icon: Handshake, description: 'Project visibility' },
  ];

  const navigationLinks = [
    { href: '#features', label: 'Features' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '/pricing', label: 'Pricing', isRoute: true },
    { href: '#faq', label: 'FAQ' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-gradient-to-br from-primary to-accent"></div>
              <button 
                onClick={() => navigate('/')}
                className="text-lg sm:text-xl font-bold truncate max-w-[120px] hover:text-primary transition-colors"
              >
                AgencyFlow
              </button>
            </div>
          </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <div className="flex items-baseline space-x-4 xl:space-x-8">
                {navigationLinks.map((link) =>
                  link.isRoute ? (
                    <button
                      key={link.href}
                      onClick={() => navigate(link.href)}
                      className="text-muted-foreground hover:text-foreground transition-premium px-3 py-2 text-sm font-medium"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-premium px-3 py-2 text-sm font-medium"
                    >
                      {link.label}
                    </a>
                  )
                )}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-background hover:bg-muted min-w-[140px] xl:min-w-[160px]"
                  >
                    Get Started
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 p-2" align="end">
                  <DropdownMenuItem
                    className="flex items-center space-x-3 p-3 hover:bg-muted cursor-pointer"
                    onClick={() => navigate('/auth')}
                  >
                    <User className="h-4 w-4 text-primary" />
                    <div>
                      <div className="font-medium">Login / Register</div>
                      <div className="text-xs text-muted-foreground">
                        Access your account
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
                    Quick Demo Access
                  </div>
                  {roles.map((role) => (
                    <DropdownMenuItem
                      key={role.id}
                      className="flex items-center space-x-3 p-3 hover:bg-muted cursor-pointer"
                      onClick={() => handleRoleSelect(role.id)}
                    >
                      <role.icon className="h-4 w-4 text-primary" />
                      <div>
                        <div className="font-medium">{role.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {role.description}
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile menu */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label="Open menu"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[85%] max-w-sm overflow-y-auto px-4 pt-6 pb-8"
                >
                  <div className="space-y-4">
                    {navigationLinks.map((link) =>
                      link.isRoute ? (
                        <button
                          key={link.href}
                          onClick={() => navigate(link.href)}
                          className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        >
                          {link.label}
                        </button>
                      ) : (
                        <a
                          key={link.href}
                          href={link.href}
                          className="block px-3 py-3 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        >
                          {link.label}
                        </a>
                      )
                    )}
                    <div className="pt-4 pb-2 border-t">
                      <Button
                        onClick={() => navigate('/auth')}
                        className="w-full justify-start mb-3"
                        variant="outline"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Login / Register
                      </Button>
                      
                      <div className="text-sm font-medium text-muted-foreground mb-3 px-3">
                        Demo Access
                      </div>
                      <div className="space-y-2">
                        {roles.map((role) => (
                          <Button
                            key={role.id}
                            variant="ghost"
                            className="w-full justify-start h-auto p-3"
                            onClick={() => handleRoleSelect(role.id)}
                          >
                            <role.icon className="h-4 w-4 mr-3" />
                            <div className="text-left">
                              <div className="font-medium">{role.label}</div>
                              <div className="text-xs text-muted-foreground">
                                {role.description}
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;