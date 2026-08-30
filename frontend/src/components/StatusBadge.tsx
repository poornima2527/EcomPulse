interface StatusBadgeProps {
  status: string;
}

const statusClassMap: Record<string, string> = {
  Paid: 'status-success',
  Processing: 'status-warning',
  Shipped: 'status-info',
  Refunded: 'status-danger',
  Active: 'status-success',
  'Low Stock': 'status-warning',
  'Out of Stock': 'status-danger',
  Draft: 'status-neutral',
  Archived: 'status-neutral',
  VIP: 'status-info',
  Inactive: 'status-neutral',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`status-badge ${statusClassMap[status] ?? 'status-neutral'}`}>{status}</span>;
}
