import { useEffect, useState } from 'react';
import { analyticsService } from '../services/analyticsService';
import type { AnalyticsData } from '../types/analytics';

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    void loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    const data = await analyticsService.getAnalytics();
    setAnalytics(data);
  };

  if (!analytics) {
    return <div className="empty-state">Loading analytics...</div>;
  }

  return (
    <div className="page-panel">
      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-label">Revenue</span>
          <p className="stat-value">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(analytics.revenue)}</p>
          <div className="stat-meta positive"><span>+18.2%</span></div>
        </div>
        <div className="stat-card">
          <span className="stat-label">Orders</span>
          <p className="stat-value">{analytics.orders}</p>
        </div>
        <div className="stat-card">
          <span className="stat-label">Customers</span>
          <p className="stat-value">{analytics.customers.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <span className="stat-label">Conversion Rate</span>
          <p className="stat-value">{analytics.conversionRate}%</p>
        </div>
      </div>

      <div className="card-grid">
        <div className="card">
          <div className="card-header">
            <h3>Revenue Overview</h3>
          </div>
          <div className="chart-bars">
            {analytics.salesOverview.map((value, index) => (
              <div key={`${value}-${index}`} className="bar-item">
                <div className="bar" style={{ height: `${value * 4}px` }} />
                <span>{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][index]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Sales by Category</h3>
          </div>
          <div className="list-block">
            {analytics.salesByCategory.map((entry) => (
              <div key={entry.category} className="list-row">
                <span>{entry.category}</span>
                <strong>{entry.value}%</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card-grid">
        <div className="card">
          <div className="card-header">
            <h3>Revenue Summary</h3>
          </div>
          <div className="list-block">
            {analytics.revenueSummary.map((entry) => (
              <div key={entry.label} className="list-row">
                <span>{entry.label}</span>
                <strong>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(entry.revenue)}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Customer Growth</h3>
          </div>
          <div className="list-block">
            {analytics.customerGrowth.map((entry) => (
              <div key={entry.month} className="list-row">
                <span>{entry.month}</span>
                <strong>{entry.customers}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
