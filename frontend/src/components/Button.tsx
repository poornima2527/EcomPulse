import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: ReactNode;
}

export default function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const variantClass = {
    primary: 'btn',
    secondary: 'btn btn-secondary',
    ghost: 'btn btn-ghost',
  }[variant];

  return (
    <button className={`${variantClass} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
