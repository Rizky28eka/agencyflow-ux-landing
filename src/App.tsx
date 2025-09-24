import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Pricing from "./pages/Pricing";
import OwnerDashboard from "./pages/dashboards/OwnerDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import ProjectManagerDashboard from "./pages/dashboards/ProjectManagerDashboard";
import TeamLeadDashboard from "./pages/dashboards/TeamLeadDashboard";
import MemberDashboard from "./pages/dashboards/MemberDashboard";
import FinanceDashboard from "./pages/dashboards/FinanceDashboard";
import ClientDashboard from "./pages/dashboards/ClientDashboard";

// Owner Dashboard Pages
import OwnerAnalytics from "./pages/dashboards/owner/Analytics";
import OwnerTeam from "./pages/dashboards/owner/Team";
import OwnerFinance from "./pages/dashboards/owner/Finance";
import OwnerSettings from "./pages/dashboards/owner/Settings";

// Admin Dashboard Pages
import AdminUsers from "./pages/dashboards/admin/Users";
import AdminRoles from "./pages/dashboards/admin/Roles";
import AdminReports from "./pages/dashboards/admin/Reports";
import AdminSystemSettings from "./pages/dashboards/admin/SystemSettings";

// Project Manager Dashboard Pages
import ProjectManagerProjects from "./pages/dashboards/project-manager/Projects";
import ProjectManagerTeamCoordination from "./pages/dashboards/project-manager/TeamCoordination";

// Member Dashboard Pages
import MemberTasks from "./pages/dashboards/member/Tasks";
import MemberTimeTracking from "./pages/dashboards/member/TimeTracking";

// Client Dashboard Pages
import ClientProjects from "./pages/dashboards/client/Projects";
import ClientBilling from "./pages/dashboards/client/Billing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/dashboard/owner" element={<OwnerDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/project-manager" element={<ProjectManagerDashboard />} />
          <Route path="/dashboard/team-lead" element={<TeamLeadDashboard />} />
          <Route path="/dashboard/member" element={<MemberDashboard />} />
          <Route path="/dashboard/finance" element={<FinanceDashboard />} />
          <Route path="/dashboard/client" element={<ClientDashboard />} />
          
          {/* Owner Dashboard Routes */}
          <Route path="/dashboard/owner/analytics" element={<OwnerAnalytics />} />
          <Route path="/dashboard/owner/team" element={<OwnerTeam />} />
          <Route path="/dashboard/owner/finance" element={<OwnerFinance />} />
          <Route path="/dashboard/owner/settings" element={<OwnerSettings />} />
          
          {/* Admin Dashboard Routes */}
          <Route path="/dashboard/admin/users" element={<AdminUsers />} />
          <Route path="/dashboard/admin/roles" element={<AdminRoles />} />
          <Route path="/dashboard/admin/reports" element={<AdminReports />} />
          <Route path="/dashboard/admin/settings" element={<AdminSystemSettings />} />
          
          {/* Project Manager Dashboard Routes */}
          <Route path="/dashboard/project-manager/projects" element={<ProjectManagerProjects />} />
          <Route path="/dashboard/project-manager/team" element={<ProjectManagerTeamCoordination />} />
          
          {/* Member Dashboard Routes */}
          <Route path="/dashboard/member/tasks" element={<MemberTasks />} />
          <Route path="/dashboard/member/time" element={<MemberTimeTracking />} />
          
          {/* Client Dashboard Routes */}
          <Route path="/dashboard/client/projects" element={<ClientProjects />} />
          <Route path="/dashboard/client/billing" element={<ClientBilling />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
