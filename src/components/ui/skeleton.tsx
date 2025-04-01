import { cn } from '@/lib/utils';

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactNode => {
  return <div className={cn('bg-muted animate-pulse rounded-md', className)} {...props} />;
};

export { Skeleton };
