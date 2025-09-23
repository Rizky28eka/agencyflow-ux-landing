import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
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

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    { href: '#pricing', label: 'Pricing' },
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

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigationLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-premium px-3 py-2 text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Login Dropdown */}
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-background hover:bg-muted">
                  Login
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-2" align="end">
                <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
                  Select your role
                </div>
                <DropdownMenuSeparator />
                {roles.map((role) => (
                  <DropdownMenuItem key={role.id} className="flex items-center space-x-3 p-3 hover:bg-muted cursor-pointer">
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
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t">
              {navigationLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 pb-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      Login
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full p-2">
                    <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
                      Select your role
                    </div>
                    <DropdownMenuSeparator />
                    {roles.map((role) => (
                      <DropdownMenuItem key={role.id} className="flex items-center space-x-3 p-3">
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
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;