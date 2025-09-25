import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface DataCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    label: string;
    direction: 'up' | 'down' | 'neutral';
  };
  className?: string;
  onClick?: () => void;
}

export const DataCard = ({ title, value, icon, trend, className, onClick }: DataCardProps) => {
  const getTrendIcon = () => {
    switch (trend?.direction) {
      case 'up': return <TrendingUp className="h-3 w-3 text-green-600" />;
      case 'down': return <TrendingDown className="h-3 w-3 text-red-600" />;
      case 'neutral': return <Minus className="h-3 w-3 text-gray-600" />;
      default: return null;
    }
  };

  const getTrendColor = () => {
    switch (trend?.direction) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'neutral': return 'text-gray-600';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card 
      className={`${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''} ${className}`}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {trend && (
          <div className={`flex items-center space-x-1 text-xs ${getTrendColor()}`}>
            {getTrendIcon()}
            <span>{trend.value > 0 ? '+' : ''}{trend.value}% {trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};