import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input-password";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import type { AuthContextType } from "@/contexts/AuthContext";

import { Alert, AlertDescription } from "@/components/ui/alert";

type FormData = z.infer<typeof signInSchema> | z.infer<typeof signUpSchema>;

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const signUpSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

interface AuthFormProps {
  mode: "signin" | "signup";
  onModeChange: (mode: "signin" | "signup") => void;
}

export const AuthForm = ({ mode, onModeChange }: AuthFormProps) => {
  const { login, register, error, isLoading } = useAuth() as AuthContextType;

  const isSigningIn = mode === "signin";
  const form = useForm<FormData>({
    resolver: zodResolver(isSigningIn ? signInSchema : signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (isSigningIn) {
        await login(data);
      } else {
        if ("name" in data) {
          await register(data);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}

        {!isSigningIn && (
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="john@company.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <InputPassword placeholder="Your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSigningIn ? "Sign In" : "Create Account"}
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          {isSigningIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <Button
            type="button"
            variant="link"
            className="px-0"
            onClick={() => onModeChange(isSigningIn ? "signup" : "signin")}
          >
            {isSigningIn ? "Sign up" : "Sign in"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
