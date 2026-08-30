import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AppLayout from './layouts/AppLayout';
import Dashboard from './Dashboard';
import AuthPage from './pages/AuthPage';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';
import CustomersPage from './pages/CustomersPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AiInsightsPage from './pages/AiInsightsPage';
import InventoryPage from './pages/InventoryPage';
import SettingsPage from './pages/SettingsPage';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner text="Checking access..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthPage mode="login" />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthPage mode="register" />} />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/ai-insights" element={<AiInsightsPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
    </Routes>
  );
}
