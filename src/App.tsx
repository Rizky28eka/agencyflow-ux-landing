import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthGuard } from "@/components/AuthGuard";
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
import OwnerBilling from "./pages/dashboards/owner/Billing";
import OwnerGoals from "./pages/dashboards/owner/Goals";
import TeamMemberDetails from "./pages/dashboards/owner/TeamMemberDetails";

// Admin Dashboard Pages
import AdminUsers from "./pages/dashboards/admin/Users";
import AdminRoles from "./pages/dashboards/admin/Roles";
import AdminReports from "./pages/dashboards/admin/Reports";
import AdminSystemSettings from "./pages/dashboards/admin/SystemSettings";
import AdminAuditLog from "./pages/dashboards/admin/AuditLog";
import AdminIntegrations from "./pages/dashboards/admin/Integrations";

// Project Manager Dashboard Pages
import ProjectManagerProjects from "./pages/dashboards/project-manager/Projects";
import ProjectManagerTeamCoordination from "./pages/dashboards/project-manager/TeamCoordination";
import ResourceManagement from "./pages/dashboards/project-manager/ResourceManagement";
import RiskManagement from "./pages/dashboards/project-manager/RiskManagement";
import ProjectDetails from "./pages/dashboards/project-manager/ProjectDetails";
import AllTasks from "./pages/dashboards/project-manager/AllTasks";
import TimeTrackingReport from "./pages/dashboards/project-manager/TimeTrackingReport";
import TeamLeadApprovals from "./pages/dashboards/team-lead/Approvals";
import TeamDevelopment from "./pages/dashboards/team-lead/TeamDevelopment";
import FinancePayroll from "./pages/dashboards/finance/Payroll";
import FinanceForecasting from "./pages/dashboards/finance/Forecasting";
import FinanceExpenseManagement from "./pages/dashboards/finance/ExpenseManagement";
import FinanceRevenue from "./pages/dashboards/finance/Revenue";
import FinanceInvoicing from "./pages/dashboards/finance/Invoicing";
import FinanceReports from "./pages/dashboards/finance/Reports";
import FinanceBudget from "./pages/dashboards/finance/Budget";
import FinanceTax from "./pages/dashboards/finance/Tax";
import TransactionDetails from "./pages/dashboards/finance/TransactionDetails";
import TeamLeadOneOnOne from "./pages/dashboards/team-lead/OneOnOne";
import TeamLeadFeedback from "./pages/dashboards/team-lead/Feedback";
import TeamLeadTasks from "./pages/dashboards/team-lead/Tasks";
import TeamLeadTimeManagement from "./pages/dashboards/team-lead/TimeManagement";
import TeamLeadPerformance from "./pages/dashboards/team-lead/Performance";
import TeamLeadMembers from "./pages/dashboards/team-lead/Members";
import MemberSubmitReport from "./pages/dashboards/member/SubmitReport";
import MemberTeamChat from "./pages/dashboards/member/TeamChat";
import MemberSchedule from "./pages/dashboards/member/Schedule";
import MemberSettings from "./pages/dashboards/member/Settings";

// Member Dashboard Pages
import MemberTasks from "./pages/dashboards/member/Tasks";
import MemberTimeTracking from "./pages/dashboards/member/TimeTracking";

// Client Dashboard Pages
import ClientProjects from "./pages/dashboards/client/Projects";
import ClientBilling from "./pages/dashboards/client/Billing";
import ClientAccountSettings from "./pages/dashboards/client/AccountSettings";
import ClientCustomReports from "./pages/dashboards/client/CustomReports";
import ClientProjectDetails from "./pages/dashboards/client/ProjectDetails";
import ClientMessages from "./pages/dashboards/client/Messages";
import OwnerAdvancedReports from "./pages/dashboards/owner/AdvancedReports";
import FinanceExpenseClaims from "./pages/dashboards/finance/ExpenseClaims";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthGuard requireAuth={false}><Index /></AuthGuard>} />
          <Route path="/auth" element={<AuthGuard requireAuth={false}><Auth /></AuthGuard>} />
          <Route path="/pricing" element={<AuthGuard requireAuth={false}><Pricing /></AuthGuard>} />
          <Route path="/dashboard/owner" element={<AuthGuard><OwnerDashboard /></AuthGuard>} />
          <Route path="/dashboard/admin" element={<AuthGuard><AdminDashboard /></AuthGuard>} />
          <Route path="/dashboard/project-manager" element={<AuthGuard><ProjectManagerDashboard /></AuthGuard>} />
          <Route path="/dashboard/team-lead" element={<AuthGuard><TeamLeadDashboard /></AuthGuard>} />
          <Route path="/dashboard/team-lead/approvals" element={<TeamLeadApprovals />} />
          <Route path="/dashboard/team-lead/development" element={<TeamDevelopment />} />
          <Route path="/dashboard/team-lead/one-on-ones" element={<TeamLeadOneOnOne />} />
          <Route path="/dashboard/team-lead/feedback" element={<TeamLeadFeedback />} />
          <Route path="/dashboard/team-lead/tasks" element={<TeamLeadTasks />} />
          <Route path="/dashboard/team-lead/time-management" element={<TeamLeadTimeManagement />} />
          <Route path="/dashboard/team-lead/performance" element={<TeamLeadPerformance />} />
          <Route path="/dashboard/team-lead/members" element={<TeamLeadMembers />} />
          <Route path="/dashboard/member" element={<AuthGuard><MemberDashboard /></AuthGuard>} />
          <Route path="/dashboard/finance" element={<AuthGuard><FinanceDashboard /></AuthGuard>} />
          <Route path="/dashboard/finance/payroll" element={<FinancePayroll />} />
          <Route path="/dashboard/finance/forecasting" element={<FinanceForecasting />} />
          <Route path="/dashboard/finance/expenses" element={<FinanceExpenseManagement />} />
          <Route path="/dashboard/finance/revenue" element={<FinanceRevenue />} />
          <Route path="/dashboard/finance/invoicing" element={<FinanceInvoicing />} />
          <Route path="/dashboard/finance/reports" element={<FinanceReports />} />
          <Route path="/dashboard/finance/budget" element={<FinanceBudget />} />
          <Route path="/dashboard/finance/tax" element={<FinanceTax />} />
          <Route path="/dashboard/finance/transactions/:transactionId" element={<TransactionDetails />} />
          <Route path="/dashboard/client" element={<AuthGuard><ClientDashboard /></AuthGuard>} />
          
          {/* Owner Dashboard Routes */}
          <Route path="/dashboard/owner/analytics" element={<AuthGuard><OwnerAnalytics /></AuthGuard>} />
          <Route path="/dashboard/owner/team" element={<AuthGuard><OwnerTeam /></AuthGuard>} />
          <Route path="/dashboard/owner/team/:memberId" element={<AuthGuard><TeamMemberDetails /></AuthGuard>} />
          <Route path="/dashboard/owner/finance" element={<AuthGuard><OwnerFinance /></AuthGuard>} />
          <Route path="/dashboard/owner/settings" element={<AuthGuard><OwnerSettings /></AuthGuard>} />
          <Route path="/dashboard/owner/billing" element={<AuthGuard><OwnerBilling /></AuthGuard>} />
          <Route path="/dashboard/owner/goals" element={<AuthGuard><OwnerGoals /></AuthGuard>} />
          <Route path="/dashboard/owner/reports" element={<AuthGuard><OwnerAdvancedReports /></AuthGuard>} />
          <Route path="/dashboard/finance/claims" element={<AuthGuard><FinanceExpenseClaims /></AuthGuard>} />
          
          {/* Admin Dashboard Routes */}
          <Route path="/dashboard/admin/users" element={<AuthGuard><AdminUsers /></AuthGuard>} />
          <Route path="/dashboard/admin/roles" element={<AuthGuard><AdminRoles /></AuthGuard>} />
          <Route path="/dashboard/admin/reports" element={<AuthGuard><AdminReports /></AuthGuard>} />
          <Route path="/dashboard/admin/settings" element={<AuthGuard><AdminSystemSettings /></AuthGuard>} />
          <Route path="/dashboard/admin/audit-log" element={<AuthGuard><AdminAuditLog /></AuthGuard>} />
          <Route path="/dashboard/admin/integrations" element={<AuthGuard><AdminIntegrations /></AuthGuard>} />
          
          {/* Project Manager Dashboard Routes */}
          <Route path="/dashboard/project-manager/projects" element={<AuthGuard><ProjectManagerProjects /></AuthGuard>} />
          <Route path="/dashboard/project-manager/projects/:projectId" element={<AuthGuard><ProjectDetails /></AuthGuard>} />
          <Route path="/dashboard/project-manager/team" element={<AuthGuard><ProjectManagerTeamCoordination /></AuthGuard>} />
          <Route path="/dashboard/project-manager/resource-management" element={<AuthGuard><ResourceManagement /></AuthGuard>} />
          <Route path="/dashboard/project-manager/risk-management" element={<AuthGuard><RiskManagement /></AuthGuard>} />
          <Route path="/dashboard/project-manager/tasks" element={<AuthGuard><AllTasks /></AuthGuard>} />
          <Route path="/dashboard/project-manager/time-report" element={<AuthGuard><TimeTrackingReport /></AuthGuard>} />
          
          {/* Member Dashboard Routes */}
          <Route path="/dashboard/member/tasks" element={<AuthGuard><MemberTasks /></AuthGuard>} />
          <Route path="/dashboard/member/time" element={<AuthGuard><MemberTimeTracking /></AuthGuard>} />
          <Route path="/dashboard/member/submit-report" element={<AuthGuard><MemberSubmitReport /></AuthGuard>} />
          <Route path="/dashboard/member/chat" element={<AuthGuard><MemberTeamChat /></AuthGuard>} />
          <Route path="/dashboard/member/schedule" element={<AuthGuard><MemberSchedule /></AuthGuard>} />
          <Route path="/dashboard/member/settings" element={<AuthGuard><MemberSettings /></AuthGuard>} />
          
          {/* Client Dashboard Routes */}
          <Route path="/dashboard/client/projects" element={<AuthGuard><ClientProjects /></AuthGuard>} />
          <Route path="/dashboard/client/projects/:projectId" element={<AuthGuard><ClientProjectDetails /></AuthGuard>} />
          <Route path="/dashboard/client/billing" element={<AuthGuard><ClientBilling /></AuthGuard>} />
          <Route path="/dashboard/client/settings" element={<AuthGuard><ClientAccountSettings /></AuthGuard>} />
          <Route path="/dashboard/client/reports" element={<AuthGuard><ClientCustomReports /></AuthGuard>} />
          <Route path="/dashboard/client/messages" element={<AuthGuard><ClientMessages /></AuthGuard>} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
