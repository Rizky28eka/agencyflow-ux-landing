import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputPassword } from '@/components/ui/input-password';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ArrowLeft } from 'lucide-react';
import { PasswordStrengthIndicator } from '@/components/PasswordStrengthIndicator';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthFormProps {
  mode: 'signin' | 'signup' | 'forgot';
  onModeChange: (mode: 'signin' | 'signup' | 'forgot') => void;
  onSuccess?: () => void;
}

export const AuthForm = ({ mode, onModeChange, onSuccess }: AuthFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    company: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.email) {
      setError('Email is required');
      return false;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }

    if (mode === 'signup') {
      if (!formData.firstName || !formData.lastName) {
        setError('First and last name are required');
        return false;
      }

      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters');
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
    }

    if (mode === 'signin' && !formData.password) {
      setError('Password is required');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        toast({
          title: "Welcome back!",
          description: "You've been successfully logged in.",
        });
        onSuccess?.();

      } else if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              first_name: formData.firstName,
              last_name: formData.lastName,
              company: formData.company,
            }
          }
        });

        if (error) throw error;

        setSuccess('Account created successfully! Please check your email to verify your account.');
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });

      } else if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
          redirectTo: `${window.location.origin}/auth?mode=reset`,
        });

        if (error) throw error;

        setSuccess('Password reset email sent! Please check your inbox.');
        toast({
          title: "Reset email sent",
          description: "Please check your email for password reset instructions.",
        });
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderSignInForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          required
          autoComplete="email"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <InputPassword
          id="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
          required
          autoComplete="current-password"
        />
      </div>

      <div className="flex justify-end">
        <Button
          type="button"
          variant="link"
          className="px-0 text-sm"
          onClick={() => onModeChange('forgot')}
        >
          Forgot your password?
        </Button>
      </div>
      
      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Sign In
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        Don't have an account?{' '}
        <Button
          type="button"
          variant="link"
          className="px-0"
          onClick={() => onModeChange('signup')}
        >
          Sign up
        </Button>
      </div>
    </form>
  );

  const renderSignUpForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="John"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            autoComplete="given-name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Doe"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            autoComplete="family-name"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company (Optional)</Label>
        <Input
          id="company"
          name="company"
          placeholder="Your Company Name"
          value={formData.company}
          onChange={handleInputChange}
          autoComplete="organization"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john@company.com"
          value={formData.email}
          onChange={handleInputChange}
          required
          autoComplete="email"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <InputPassword
          id="password"
          name="password"
          placeholder="Create a strong password"
          value={formData.password}
          onChange={handleInputChange}
          required
          autoComplete="new-password"
        />
        <PasswordStrengthIndicator password={formData.password} />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <InputPassword
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
          autoComplete="new-password"
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Create Account
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Button
          type="button"
          variant="link"
          className="px-0"
          onClick={() => onModeChange('signin')}
        >
          Sign in
        </Button>
      </div>
    </form>
  );

  const renderForgotPasswordForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          required
          autoComplete="email"
        />
        <p className="text-sm text-muted-foreground">
          We'll send you a link to reset your password.
        </p>
      </div>
      
      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Send Reset Link
      </Button>

      <div className="text-center">
        <Button
          type="button"
          variant="link"
          className="px-0 text-sm"
          onClick={() => onModeChange('signin')}
        >
          <ArrowLeft className="mr-1 h-3 w-3" />
          Back to Sign In
        </Button>
      </div>
    </form>
  );

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {mode === 'signin' && renderSignInForm()}
      {mode === 'signup' && renderSignUpForm()}
      {mode === 'forgot' && renderForgotPasswordForm()}
    </div>
  );
};