import { Toaster } from "@/components/ui/toaster";
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
import OwnerBilling from "./pages/dashboards/owner/Billing";
import OwnerGoals from "./pages/dashboards/owner/Goals";
import TeamMemberDetails from "./pages/dashboards/owner/TeamMemberDetails";
import OwnerAdvancedReports from "./pages/dashboards/owner/AdvancedReports";
import OwnerReportDetails from "./pages/dashboards/owner/ReportDetails";
import OwnerGoalDetails from "./pages/dashboards/owner/GoalDetails";
import AIInsights from "./pages/dashboards/owner/AIInsights";
import Clients from "./pages/dashboards/owner/Clients";
import ClientDetails from "./pages/dashboards/owner/ClientDetails";
import CRM from "./pages/dashboards/owner/CRM";

// Admin Dashboard Pages
import AdminUsers from "./pages/dashboards/admin/Users";
import AdminRoles from "./pages/dashboards/admin/Roles";
import AdminReports from "./pages/dashboards/admin/Reports";
import AdminSystemSettings from "./pages/dashboards/admin/SystemSettings";
import AdminAuditLog from "./pages/dashboards/admin/AuditLog";
import AdminIntegrations from "./pages/dashboards/admin/Integrations";
import AdminSecurity from "./pages/dashboards/admin/Security";
import UserDetails from "./pages/dashboards/admin/UserDetails";

// Project Manager Dashboard Pages
import ProjectManagerProjects from "./pages/dashboards/project-manager/Projects";
import ProjectManagerTeamCoordination from "./pages/dashboards/project-manager/TeamCoordination";
import ResourceManagement from "./pages/dashboards/project-manager/ResourceManagement";
import RiskManagement from "./pages/dashboards/project-manager/RiskManagement";
import ProjectDetails from "./pages/dashboards/project-manager/ProjectDetails";
import AllTasks from "./pages/dashboards/project-manager/AllTasks";
import TimeTrackingReport from "./pages/dashboards/project-manager/TimeTrackingReport";
import TaskDetails from "./pages/dashboards/project-manager/TaskDetails";

// Team Lead Dashboard Pages
import TeamLeadApprovals from "./pages/dashboards/team-lead/Approvals";
import TeamDevelopment from "./pages/dashboards/team-lead/TeamDevelopment";
import TeamLeadOneOnOne from "./pages/dashboards/team-lead/OneOnOne";
import TeamLeadFeedback from "./pages/dashboards/team-lead/Feedback";
import TeamLeadTasks from "./pages/dashboards/team-lead/Tasks";
import TeamLeadTimeManagement from "./pages/dashboards/team-lead/TimeManagement";
import TeamLeadPerformance from "./pages/dashboards/team-lead/Performance";
import TeamLeadMembers from "./pages/dashboards/team-lead/Members";
import IndividualPerformance from "./pages/dashboards/team-lead/IndividualPerformance";
import MemberDetails from "./pages/dashboards/team-lead/MemberDetails";

// Member Dashboard Pages
import MemberTasks from "./pages/dashboards/member/Tasks";
import MemberTimeTracking from "./pages/dashboards/member/TimeTracking";
import MemberSubmitReport from "./pages/dashboards/member/SubmitReport";
import MemberTeamChat from "./pages/dashboards/member/TeamChat";
import MemberSchedule from "./pages/dashboards/member/Schedule";
import MemberSettings from "./pages/dashboards/member/Settings";
import KnowledgeBase from "./pages/dashboards/member/KnowledgeBase";
import Article from "./pages/dashboards/member/Article";
import EditArticle from "./pages/dashboards/member/EditArticle";
import TaskDetailsPage from "./pages/dashboards/member/TaskDetails";

// Finance Dashboard Pages
import FinancePayroll from "./pages/dashboards/finance/Payroll";
import FinanceForecasting from "./pages/dashboards/finance/Forecasting";
import FinanceExpenseManagement from "./pages/dashboards/finance/ExpenseManagement";
import FinanceRevenue from "./pages/dashboards/finance/Revenue";
import FinanceInvoicing from "./pages/dashboards/finance/Invoicing";
import FinanceReports from "./pages/dashboards/finance/Reports";
import FinanceBudget from "./pages/dashboards/finance/Budget";
import FinanceTax from "./pages/dashboards/finance/Tax";
import TransactionDetails from "./pages/dashboards/finance/TransactionDetails";
import FinanceExpenseClaims from "./pages/dashboards/finance/ExpenseClaims";
import CreateInvoice from "./pages/dashboards/finance/CreateInvoice";
import ProfitAndLoss from "./pages/dashboards/finance/ProfitAndLoss";
import CashFlow from "./pages/dashboards/finance/CashFlow";
import ExpenseDetails from "./pages/dashboards/finance/ExpenseDetails";
import PayrollDetails from "./pages/dashboards/finance/PayrollDetails";

// Client Dashboard Pages
import ClientProjects from "./pages/dashboards/client/Projects";
import ClientBilling from "./pages/dashboards/client/Billing";
import ClientAccountSettings from "./pages/dashboards/client/AccountSettings";
import ClientCustomReports from "./pages/dashboards/client/CustomReports";
import ClientProjectDetails from "./pages/dashboards/client/ProjectDetails";
import ClientMessages from "./pages/dashboards/client/Messages";

// Billing Management
import BillingManagement from "./pages/BillingManagement";
import InvoiceDetails from "./pages/InvoiceDetails";
import ProfilePage from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/pricing" element={<Pricing />} />

          {/* Protected Dashboard Routes */}
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
          <Route path="/dashboard/owner/team/:memberId" element={<TeamMemberDetails />} />
          <Route path="/dashboard/owner/finance" element={<OwnerFinance />} />
          <Route path="/dashboard/owner/settings" element={<OwnerSettings />} />
          <Route path="/dashboard/owner/billing" element={<OwnerBilling />} />
          <Route path="/dashboard/owner/goals" element={<OwnerGoals />} />
          <Route path="/dashboard/owner/goals/:goalId" element={<OwnerGoalDetails />} />
          <Route path="/dashboard/owner/reports" element={<OwnerAdvancedReports />} />
          <Route path="/dashboard/owner/reports/:reportId" element={<OwnerReportDetails />} />
          <Route path="/dashboard/owner/ai-insights" element={<AIInsights />} />
          <Route path="/dashboard/owner/clients" element={<Clients />} />
          <Route path="/dashboard/owner/clients/:clientId" element={<ClientDetails />} />
          <Route path="/dashboard/owner/crm" element={<CRM />} />

          {/* Admin Dashboard Routes */}
          <Route path="/dashboard/admin/users" element={<AdminUsers />} />
          <Route path="/dashboard/admin/users/:userId" element={<UserDetails />} />
          <Route path="/dashboard/admin/roles" element={<AdminRoles />} />
          <Route path="/dashboard/admin/reports" element={<AdminReports />} />
          <Route path="/dashboard/admin/settings" element={<AdminSystemSettings />} />
          <Route path="/dashboard/admin/audit-log" element={<AdminAuditLog />} />
          <Route path="/dashboard/admin/integrations" element={<AdminIntegrations />} />
          <Route path="/dashboard/admin/security" element={<AdminSecurity />} />

          {/* Project Manager Dashboard Routes */}
          <Route path="/dashboard/project-manager/projects" element={<ProjectManagerProjects />} />
          <Route path="/dashboard/project-manager/projects/:projectId" element={<ProjectDetails />} />
          <Route path="/dashboard/project-manager/tasks/:taskId" element={<TaskDetails />} />
          <Route path="/dashboard/project-manager/team" element={<ProjectManagerTeamCoordination />} />
          <Route path="/dashboard/project-manager/resource-management" element={<ResourceManagement />} />
          <Route path="/dashboard/project-manager/risk-management" element={<RiskManagement />} />
          <Route path="/dashboard/project-manager/tasks" element={<AllTasks />} />
          <Route path="/dashboard/project-manager/time-report" element={<TimeTrackingReport />} />

          {/* Team Lead Dashboard Routes */}
          <Route path="/dashboard/team-lead/approvals" element={<TeamLeadApprovals />} />
          <Route path="/dashboard/team-lead/development" element={<TeamDevelopment />} />
          <Route path="/dashboard/team-lead/one-on-ones" element={<TeamLeadOneOnOne />} />
          <Route path="/dashboard/team-lead/feedback" element={<TeamLeadFeedback />} />
          <Route path="/dashboard/team-lead/tasks" element={<TeamLeadTasks />} />
          <Route path="/dashboard/team-lead/time-management" element={<TeamLeadTimeManagement />} />
          <Route path="/dashboard/team-lead/performance" element={<TeamLeadPerformance />} />
          <Route path="/dashboard/team-lead/performance/:memberId" element={<IndividualPerformance />} />
          <Route path="/dashboard/team-lead/members" element={<TeamLeadMembers />} />
          <Route path="/dashboard/team-lead/members/:memberId" element={<MemberDetails />} />

          {/* Member Dashboard Routes */}
          <Route path="/dashboard/member/tasks" element={<MemberTasks />} />
          <Route path="/dashboard/member/tasks/:taskId" element={<TaskDetailsPage />} />
          <Route path="/dashboard/member/time" element={<MemberTimeTracking />} />
          <Route path="/dashboard/member/submit-report" element={<MemberSubmitReport />} />
          <Route path="/dashboard/member/chat" element={<MemberTeamChat />} />
          <Route path="/dashboard/member/schedule" element={<MemberSchedule />} />
          <Route path="/dashboard/member/settings" element={<MemberSettings />} />
          <Route path="/dashboard/member/kb" element={<KnowledgeBase />} />
          <Route path="/dashboard/member/kb/new" element={<EditArticle />} />
          <Route path="/dashboard/member/kb/:articleId" element={<Article />} />
          <Route path="/dashboard/member/kb/:articleId/edit" element={<EditArticle />} />

          {/* Finance Dashboard Routes */}
          <Route path="/dashboard/finance/payroll" element={<FinancePayroll />} />
          <Route path="/dashboard/finance/payroll/:employeeId" element={<PayrollDetails />} />
          <Route path="/dashboard/finance/forecasting" element={<FinanceForecasting />} />
          <Route path="/dashboard/finance/expenses" element={<FinanceExpenseManagement />} />
          <Route path="/dashboard/finance/expenses/:expenseId" element={<ExpenseDetails />} />
          <Route path="/dashboard/finance/revenue" element={<FinanceRevenue />} />
          <Route path="/dashboard/finance/invoicing" element={<FinanceInvoicing />} />
          <Route path="/dashboard/finance/invoicing/new" element={<CreateInvoice />} />
          <Route path="/dashboard/finance/reports" element={<FinanceReports />} />
          <Route path="/dashboard/finance/budget" element={<FinanceBudget />} />
          <Route path="/dashboard/finance/tax" element={<FinanceTax />} />
          <Route path="/dashboard/finance/transactions/:transactionId" element={<TransactionDetails />} />
          <Route path="/dashboard/finance/claims" element={<FinanceExpenseClaims />} />
          <Route path="/dashboard/finance/pnl" element={<ProfitAndLoss />} />
          <Route path="/dashboard/finance/cash-flow" element={<CashFlow />} />

          {/* Client Dashboard Routes */}
          <Route path="/dashboard/client/projects" element={<ClientProjects />} />
          <Route path="/dashboard/client/projects/:projectId" element={<ClientProjectDetails />} />
          <Route path="/dashboard/client/billing" element={<ClientBilling />} />
          <Route path="/dashboard/client/settings" element={<ClientAccountSettings />} />
          <Route path="/dashboard/client/reports" element={<ClientCustomReports />} />
          <Route path="/dashboard/client/messages" element={<ClientMessages />} />

          {/* Billing Management */}
          <Route path="/billing" element={<BillingManagement />} />
          <Route path="/invoices/:invoiceId" element={<InvoiceDetails />} />

          {/* Profile */}
          <Route path="/profile" element={<ProfilePage />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;