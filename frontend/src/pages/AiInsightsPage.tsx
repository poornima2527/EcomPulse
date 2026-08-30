import { useEffect, useState } from 'react';
import { analyticsService } from '../services/analyticsService';
import type { AiInsightData } from '../types/analytics';

export default function AiInsightsPage() {
  const [insights, setInsights] = useState<AiInsightData | null>(null);

  useEffect(() => {
    void loadInsights();
  }, []);

  const loadInsights = async () => {
    const data = await analyticsService.getInsights();
    setInsights(data);
  };

  if (!insights) {
    return <div className="empty-state">Loading AI insights...</div>;
  }

  return (
    <div className="page-panel">
      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-label">Revenue Trend</span>
          <p className="stat-value">+18.4%</p>
        </div>
        <div className="stat-card">
          <span className="stat-label">Low-stock Items</span>
          <p className="stat-value">{insights.lowStockWarnings.length}</p>
        </div>
        <div className="stat-card">
          <span className="stat-label">Best Category</span>
          <p className="stat-value">Electronics</p>
        </div>
        <div className="stat-card">
          <span className="stat-label">Peak Hours</span>
          <p className="stat-value">6:00 PM</p>
        </div>
      </div>

      <div className="card-grid">
        <div className="card">
          <div className="card-header">
            <h3>Product Recommendations</h3>
          </div>
          <div className="list-block">
            {insights.productRecommendations.map((item) => (
              <div key={item.name} className="list-row">
                <span>{item.name}</span>
                <strong>{item.reason}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Sales Forecast</h3>
          </div>
          <div className="list-block">
            {insights.salesPredictions.map((item) => (
              <div key={item.period} className="list-row">
                <span>{item.period}</span>
                <strong>{item.forecast}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card-grid">
        <div className="card">
          <div className="card-header">
            <h3>Low Stock Warnings</h3>
          </div>
          <div className="list-block">
            {insights.lowStockWarnings.map((item) => (
              <div key={item.product} className="list-row">
                <span>{item.product}</span>
                <strong>{item.stock.toLocaleString()} left</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Peak Shopping Hours</h3>
          </div>
          <div className="list-block">
            {insights.peakShoppingHours.map((item) => (
              <div key={item.hour} className="list-row">
                <span>{item.hour}</span>
                <strong>{item.orders.toLocaleString()} orders</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
