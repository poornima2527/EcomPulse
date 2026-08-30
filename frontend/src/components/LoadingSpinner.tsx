interface LoadingSpinnerProps {
  text?: string;
}

export default function LoadingSpinner({ text = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <div className="empty-state" style={{ padding: '40px 20px' }}>
      <div className="spinner" style={{ margin: '0 auto 12px' }} />
      <div>{text}</div>
    </div>
  );
}
