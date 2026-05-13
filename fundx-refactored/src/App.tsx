import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/store/authStore";
import ProtectedRoute from "@/components/feedback/ProtectedRoute";
import ErrorBoundary from "@/components/feedback/ErrorBoundary";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BecomePartner from "./pages/BecomePartner";
import Eligibility from "./pages/Eligibility";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import CustomerApplications from "./pages/customer/Applications";
import Apply from "./pages/customer/Apply";
import CustomerDocuments from "./pages/customer/Documents";
import CustomerProfile from "./pages/customer/Profile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import LenderDashboard from "./pages/lender/LenderDashboard";
import DSADashboard from "./pages/dsa/DSADashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        const axiosError = error as { status?: number };
        if (axiosError?.status === 404) return false;
        return failureCount < 2;
      },
      staleTime: 30_000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster richColors position="top-right" />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/eligibility" element={<Eligibility />} />
              <Route path="/become-a-partner" element={<BecomePartner />} />

              {/* Protected: Customer */}
              <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
                <Route path="/customer" element={<CustomerDashboard />} />
                <Route path="/customer/applications" element={<CustomerApplications />} />
                <Route path="/customer/apply" element={<Apply />} />
                <Route path="/customer/documents" element={<CustomerDocuments />} />
                <Route path="/customer/profile" element={<CustomerProfile />} />
              </Route>

              {/* Protected: Admin */}
              <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route path="/admin/*" element={<AdminDashboard />} />
              </Route>

              {/* Protected: Lender */}
              <Route element={<ProtectedRoute allowedRoles={["lender"]} />}>
                <Route path="/lender/*" element={<LenderDashboard />} />
              </Route>

              {/* Protected: DSA */}
              <Route element={<ProtectedRoute allowedRoles={["dsa"]} />}>
                <Route path="/dsa/*" element={<DSADashboard />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
