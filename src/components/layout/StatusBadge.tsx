import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'project' | 'task' | 'payment' | 'user';
  className?: string;
}

export const StatusBadge = ({ status, variant = 'default', className }: StatusBadgeProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'project':
        switch (status.toLowerCase()) {
          case 'completed': return 'bg-green-100 text-green-800 border-green-200';
          case 'in progress': return 'bg-blue-100 text-blue-800 border-blue-200';
          case 'on track': return 'bg-blue-100 text-blue-800 border-blue-200';
          case 'at risk': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
          case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
          case 'planning': return 'bg-gray-100 text-gray-800 border-gray-200';
          case 'review': return 'bg-orange-100 text-orange-800 border-orange-200';
          default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
      case 'task':
        switch (status.toLowerCase()) {
          case 'completed': return 'bg-green-100 text-green-800 border-green-200';
          case 'done': return 'bg-green-100 text-green-800 border-green-200';
          case 'in progress': return 'bg-blue-100 text-blue-800 border-blue-200';
          case 'to do': return 'bg-gray-100 text-gray-800 border-gray-200';
          case 'blocked': return 'bg-red-100 text-red-800 border-red-200';
          default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
      case 'payment':
        switch (status.toLowerCase()) {
          case 'paid': return 'bg-green-100 text-green-800 border-green-200';
          case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
          case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
          case 'failed': return 'bg-red-100 text-red-800 border-red-200';
          default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
      case 'user':
        switch (status.toLowerCase()) {
          case 'active': return 'bg-green-100 text-green-800 border-green-200';
          case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
          case 'suspended': return 'bg-red-100 text-red-800 border-red-200';
          default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(getVariantStyles(), className)}
    >
      {status}
    </Badge>
  );
};