import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const mainLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: '◫' },
  { to: '/products', label: 'Products', icon: '▣' },
  { to: '/orders', label: 'Orders', icon: '◫' },
  { to: '/customers', label: 'Customers', icon: '◎' },
];

const analyticsLinks = [
  { to: '/analytics', label: 'Analytics', icon: '◔' },
  { to: '/ai-insights', label: 'AI Insights', icon: '✦' },
];

const managementLinks = [
  { to: '/inventory', label: 'Inventory', icon: '▤' },
  { to: '/settings', label: 'Settings', icon: '⚙' },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user, logout } = useAuth();

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="logo">
        <div className="logo-mark">E</div>
        <h2>EcomPulse</h2>
      </div>

      <div className="nav-section">
        <p className="nav-label">Main</p>
        <nav className="nav-list">
          {mainLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={onClose}>
              <span className="icon">{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="nav-section">
        <p className="nav-label">Analytics</p>
        <nav className="nav-list">
          {analyticsLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={onClose}>
              <span className="icon">{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="nav-section">
        <p className="nav-label">Management</p>
        <nav className="nav-list">
          {managementLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={onClose}>
              <span className="icon">{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">{user?.name?.charAt(0) ?? 'A'}</div>
          <div>
            <p className="user-name">{user?.name ?? 'Admin User'}</p>
            <p className="user-role">{user?.role ?? 'Admin'}</p>
          </div>
        </div>
        <button type="button" className="btn btn-ghost" onClick={logout} style={{ width: '100%' }}>
          Logout
        </button>
      </div>
    </aside>
  );
}
