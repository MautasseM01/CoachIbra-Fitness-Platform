import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "../lib/supabase";
import { useTranslation } from "react-i18next";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

interface LoginPageProps {
  onLoginSuccess?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // For development without Supabase configured
      if (!supabase || !supabase.auth) {
        console.log("Supabase not configured, using mock login");
        // Mock successful login for development
        if (
          values.email === "admin@example.com" &&
          values.password === "password123"
        ) {
          if (onLoginSuccess) {
            onLoginSuccess();
          } else {
            navigate("/admin");
          }
        } else {
          throw new Error(
            "Invalid credentials. For testing, use admin@example.com / password123",
          );
        }
      } else {
        // Real Supabase authentication
        const { data, error: authError } =
          await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password,
          });

        if (authError) throw authError;

        // Check user role from metadata
        const role = data.user?.user_metadata?.role || "ROLE_USER";

        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          // Redirect based on role
          if (role === "ROLE_ADMIN") {
            navigate("/admin");
          } else {
            navigate("/"); // Redirect to home for regular users
          }
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {t("login.title") || "Login to Coach Ibra"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {errorMessage && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("login.email") || "Email"}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder={
                            t("login.emailPlaceholder") ||
                            "your.email@example.com"
                          }
                          className="pl-10"
                          {...field}
                          disabled={isLoading}
                          required
                          type="email"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("login.password") || "Password"}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder={
                            t("login.passwordPlaceholder") || "••••••••"
                          }
                          className="pl-10"
                          {...field}
                          disabled={isLoading}
                          required
                        />
                        <button
                          type="button"
                          onClick={toggleShowPassword}
                          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
                >
                  {t("login.forgotPassword") || "Forgot password?"}
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 transition-colors shadow-sm hover:shadow"
                disabled={isLoading}
              >
                {isLoading
                  ? t("login.loggingIn") || "Logging in..."
                  : t("login.login") || "Login"}
              </Button>

              <div className="text-center text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  {t("login.noAccount") || "Don't have an account?"}{" "}
                </span>
                <Link
                  to="/register"
                  className="font-medium text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
                >
                  {t("login.signUp") || "Sign up"}
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
