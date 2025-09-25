import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  showBackButton?: boolean;
  backUrl?: string;
}

export const PageHeader = ({ 
  title, 
  description, 
  icon, 
  actions, 
  showBackButton = false, 
  backUrl 
}: PageHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backUrl) {
      navigate(backUrl);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-4 min-w-0 flex-1">
        {showBackButton && (
          <Button variant="outline" size="sm" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        {icon && <div className="shrink-0">{icon}</div>}
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground truncate">{title}</h1>
          {description && (
            <p className="text-sm md:text-base text-muted-foreground mt-1 line-clamp-2">{description}</p>
          )}
        </div>
      </div>
      {actions && (
        <div className="flex items-center gap-2 shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
};