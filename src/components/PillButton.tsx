import { cn } from '@/lib/utils';

interface PillButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'dark' | 'light';
}

export function PillButton({ children, onClick, className, variant = 'dark' }: PillButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center px-8 py-3.5 rounded-3xl text-sm font-medium transition-all duration-300 ease-out hover:scale-[1.03]',
        variant === 'dark'
          ? 'bg-ivory-dark text-white hover:bg-[#333]'
          : 'bg-white text-ivory-text shadow-card hover:shadow-card-hover',
        className
      )}
    >
      {children}
    </button>
  );
}
