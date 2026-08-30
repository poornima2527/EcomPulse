interface StatCardProps {
  label: string;
  value: string;
  delta: string;
  tone?: 'teal' | 'orange' | 'green' | 'blue';
}

export default function StatCard({ label, value, delta, tone = 'teal' }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <span className="stat-label">{label}</span>
        <div className={`stat-icon ${tone}`}>↗</div>
      </div>
      <p className="stat-value">{value}</p>
      <div className="stat-meta positive">
        <span>{delta}</span>
        <span>vs last month</span>
      </div>
    </div>
  );
}
