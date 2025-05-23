import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";
import { supabase } from "../lib/supabaseClient";

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
import { Eye, EyeOff } from "lucide-react";

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
  const [user, setUser] = useState(null);

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
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        console.error("Login error:", error);
        setErrorMessage(
          error.message || "Invalid login credentials. Please try again."
        );
        throw error;
      }

      setUser(data.user);
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
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
                        <Input
                          placeholder={
                            t("login.emailPlaceholder") ||
                            "your.email@example.com"
                          }
                          className="pl-10"
                          {...field}
                          disabled={isLoading}
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
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder={
                            t("login.passwordPlaceholder") || "••••••••"
                          }
                          className="pl-10"
                          {...field}
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-2 text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800"
                disabled={isLoading}
              >
                {isLoading
                  ? t("login.loggingIn") || "Logging in..."
                  : t("login.login") || "Login"}
              </Button>

              <div className="mt-4 flex justify-between">
                <Button
                  variant="link"
                  onClick={() => navigate("/signup")}
                  className="text-sm font-medium text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {t("login.signUp") || "Sign up"}
                </Button>
                <Button
                  variant="link"
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm font-medium text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {t("login.forgotPassword") || "Forgot password?"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
