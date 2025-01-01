import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'default',
  ...props
}) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        {
          'bg-purple-600 text-white hover:bg-purple-700': variant === 'default',
          'border border-gray-200 bg-white text-gray-900 hover:bg-gray-50': variant === 'outline',
        },
        className
      )}
      {...props}
    />
  );
};