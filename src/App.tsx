import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import OwnerDashboard from "./pages/dashboards/OwnerDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import ProjectManagerDashboard from "./pages/dashboards/ProjectManagerDashboard";
import TeamLeadDashboard from "./pages/dashboards/TeamLeadDashboard";
import MemberDashboard from "./pages/dashboards/MemberDashboard";
import FinanceDashboard from "./pages/dashboards/FinanceDashboard";
import ClientDashboard from "./pages/dashboards/ClientDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard/owner" element={<OwnerDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/project-manager" element={<ProjectManagerDashboard />} />
          <Route path="/dashboard/team-lead" element={<TeamLeadDashboard />} />
          <Route path="/dashboard/member" element={<MemberDashboard />} />
          <Route path="/dashboard/finance" element={<FinanceDashboard />} />
          <Route path="/dashboard/client" element={<ClientDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
