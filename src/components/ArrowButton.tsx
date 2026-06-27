import { cn } from '@/lib/utils';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface ArrowButtonProps {
  direction?: 'left' | 'right';
  variant?: 'outline' | 'filled';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function ArrowButton({
  direction = 'right',
  variant = 'outline',
  onClick,
  className,
  disabled = false,
}: ArrowButtonProps) {
  const Icon = direction === 'left' ? ArrowLeft : ArrowRight;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ease-out',
        variant === 'outline'
          ? 'border border-ivory-border text-ivory-text hover:bg-ivory-dark hover:text-white hover:border-ivory-dark'
          : 'bg-ivory-dark text-white hover:scale-105',
        disabled && 'opacity-40 pointer-events-none',
        className
      )}
    >
      <Icon size={18} />
    </button>
  );
}
