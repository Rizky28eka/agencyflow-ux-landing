import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Github, Mail, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const SocialAuth = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSocialAuth = async (provider: 'google' | 'github') => {
    setLoading(provider);
    
    try {
      // Mock social authentication - in production this would use real OAuth
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate OAuth flow
      
      toast({
        title: "Authentication successful",
        description: `Signed in with ${provider}`,
      });
      
      navigate('/dashboard/owner');
    } catch (error: any) {
      toast({
        title: "Authentication failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          onClick={() => handleSocialAuth('google')}
          disabled={loading !== null}
          className="w-full"
        >
          {loading === 'google' ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Mail className="mr-2 h-4 w-4" />
          )}
          Google
        </Button>
        
        <Button
          variant="outline"
          onClick={() => handleSocialAuth('github')}
          disabled={loading !== null}
          className="w-full"
        >
          {loading === 'github' ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Github className="mr-2 h-4 w-4" />
          )}
          GitHub
        </Button>
      </div>
    </div>
  );
};