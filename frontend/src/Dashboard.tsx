import './Dashboard.css';

import { useMemo } from 'react';
import { StatusBadge } from './components/StatusBadge';

const formatCurrencyCompact = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 1 }).format(value);

const metricCards = [
  { label: 'Total Revenue', value: formatCurrencyCompact(184250), delta: '+12.4%', tone: 'teal' },
  { label: 'Total Orders', value: '643', delta: '+8.1%', tone: 'orange' },
  { label: 'Customers', value: '2,841', delta: '+14.7%', tone: 'green' },
  { label: 'Conversion Rate', value: '4.8%', delta: '+0.6%', tone: 'blue' },
];

const recentOrders = [
  { id: 'ORD-1042', customer: 'Nina Patel', total: '$249.00', status: 'Paid' },
  { id: 'ORD-1043', customer: 'Marcus Lee', total: '$179.00', status: 'Processing' },
  { id: 'ORD-1044', customer: 'Jasmine Wu', total: '$299.00', status: 'Shipped' },
  { id: 'ORD-1045', customer: 'Olivia Brooks', total: '$89.00', status: 'Refunded' },
];

const salesOverview = [42, 58, 48, 68, 76, 60, 82];

const summaryStats = [
  { label: 'Returning Customers', value: '68%' },
  { label: 'Avg. Order Value', value: '$286' },
  { label: 'Repeat Purchase Rate', value: '42%' },
  { label: 'Customer Satisfaction', value: '4.9/5' },
];

const insightList = [
  { title: 'Revenue trend', value: '+18.4%' },
  { title: 'Product recommendation', value: 'Aero Smartwatch' },
  { title: 'Low stock alerts', value: '3 items' },
];

export default function Dashboard() {
  const monthLabels = useMemo(() => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], []);

  return (
    <div className="dashboard-shell" id="home">
      <div className="quick-metrics">
        {metricCards.map((card) => (
          <div key={card.label} className="stat-card">
            <div className="stat-card-header">
              <span className="stat-label">{card.label}</span>
              <div className={`stat-icon ${card.tone}`}>↗</div>
            </div>
            <p className="stat-value">{card.value}</p>
            <div className="stat-meta positive"><span>{card.delta}</span><span>vs last month</span></div>
          </div>
        ))}
      </div>

      <div className="summary-row">
        <div className="card">
          <div className="card-header"><h3>Sales Overview</h3><span className="muted">Last 7 days</span></div>
          <div className="chart-bars">
            {salesOverview.map((value, index) => <div key={`${value}-${index}`} className="bar-item"><div className="bar" style={{ height: `${value}%` }} /><span>{monthLabels[index]}</span></div>)}
          </div>
        </div>
        <div className="card">
          <div className="card-header"><h3>Revenue Summary</h3></div>
          <div className="summary-list">{summaryStats.map((stat) => <div key={stat.label} className="summary-item"><h4>{stat.label}</h4><p className="summary-value">{stat.value}</p></div>)}</div>
        </div>
      </div>

      <div className="summary-row">
        <div className="card">
          <div className="card-header"><h3>AI Insights</h3><span className="insight-pill">Live</span></div>
          <div className="insight-panel"><div className="insights-list">{insightList.map((insight) => <div key={insight.title} className="insight-item"><span className="muted">{insight.title}</span><strong>{insight.value}</strong></div>)}</div></div>
        </div>
        <div className="card">
          <div className="card-header"><h3>Recent Orders</h3><button className="btn btn-ghost">View all</button></div>
          <div>{recentOrders.map((order) => <div key={order.id} className="recent-order-row"><div><strong>{order.id}</strong><div className="muted">{order.customer}</div></div><div className="muted">{order.total}</div><div><StatusBadge status={order.status} /></div><div className="table-actions"><button className="action-btn">View</button></div></div>)}</div>
        </div>
      </div>
    </div>
  );
}
