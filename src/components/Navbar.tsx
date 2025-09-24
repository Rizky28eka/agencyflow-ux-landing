import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
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
  X
} from 'lucide-react';
import { Role } from '@/lib/rolePermissions';

const Navbar = () => {
  const navigate = useNavigate();
  const { setUserRole } = useAuth();

  const handleRoleSelect = (roleId: string) => {
    const role = roleId as Role;
    setUserRole(role);
    
    const roleRoutes = {
      'OWNER': '/dashboard/owner',
      'ADMIN': '/dashboard/admin',
      'PROJECT_MANAGER': '/dashboard/project-manager',
      'TEAM_LEAD': '/dashboard/team-lead',
      'MEMBER': '/dashboard/member',
      'FINANCE': '/dashboard/finance',
      'CLIENT': '/dashboard/client',
    };
    navigate(roleRoutes[role]);
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
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent"></div>
              <span className="text-xl font-bold text-foreground">AgencyFlow</span>
            </div>
          </div>

          {/* Desktop Navigation & Login */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-baseline space-x-8">
              {navigationLinks.map((link) => (
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
              ))}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-background hover:bg-muted">
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
                    <div className="text-xs text-muted-foreground">Access your account</div>
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
                      <div className="text-xs text-muted-foreground">{role.description}</div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navigationLinks.map((link) => (
                    link.isRoute ? (
                      <button
                        key={link.href}
                        onClick={() => {
                          navigate(link.href);
                        }}
                        className="block w-full text-left px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        key={link.href}
                        href={link.href}
                        className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    )
                  ))}
                  <div className="pt-4 pb-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                          Get Started
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full p-2">
                        <DropdownMenuItem 
                          className="flex items-center space-x-3 p-3 hover:bg-muted cursor-pointer"
                          onClick={() => {
                            navigate('/auth');
                          }}
                        >
                          <User className="h-4 w-4 text-primary" />
                          <div>
                            <div className="font-medium">Login / Register</div>
                            <div className="text-xs text-muted-foreground">Access your account</div>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
                          Quick Demo Access
                        </div>
                        {roles.map((role) => (
                          <DropdownMenuItem 
                            key={role.id} 
                            className="flex items-center space-x-3 p-3"
                            onClick={() => handleRoleSelect(role.id)}
                          >
                            <role.icon className="h-4 w-4 text-primary" />
                            <div>
                              <div className="font-medium">{role.label}</div>
                              <div className="text-xs text-muted-foreground">{role.description}</div>
                            </div>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
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