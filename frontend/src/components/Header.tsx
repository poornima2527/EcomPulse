import { useLocation } from 'react-router-dom';

interface HeaderProps {
  onMenuToggle: () => void;
  userName?: string;
}

const routeTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/products': 'Products',
  '/orders': 'Orders',
  '/customers': 'Customers',
  '/analytics': 'Analytics',
  '/ai-insights': 'AI Insights',
  '/inventory': 'Inventory',
  '/settings': 'Settings',
};

export default function Header({ onMenuToggle, userName = 'Admin' }: HeaderProps) {
  const location = useLocation();
  const title = routeTitles[location.pathname] ?? 'Dashboard';

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button type="button" className="mobile-toggle" onClick={onMenuToggle}>☰</button>
        <div>
          <p className="page-kicker">Overview</p>
          <h1 className="page-title">{title}</h1>
        </div>
      </div>

      <div className="topbar-actions">
        <div className="topbar-badge">{userName}</div>
      </div>
    </header>
  );
}
