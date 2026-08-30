import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

export default function AppLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="app-shell">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="content-shell">
        <Header onMenuToggle={() => setSidebarOpen((open) => !open)} userName={user?.name ?? 'Admin'} />
        <main className="main-content">
          <div className="page-panel">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
