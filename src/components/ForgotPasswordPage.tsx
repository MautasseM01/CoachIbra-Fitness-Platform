import React, { useState } from "react";
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { Mail } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

interface ForgotPasswordPageProps {
  onResetEmailSent?: () => void;
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({
  onResetEmailSent,
}) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage(null);
    setIsSuccess(false);

    try {
      // For development without Supabase configured
      if (!supabase || !supabase.auth) {
        console.log("Supabase not configured, using mock password reset");
        // Mock successful password reset for development
        setTimeout(() => {
          setIsSuccess(true);
          if (onResetEmailSent) {
            onResetEmailSent();
          }
        }, 1500);
      } else {
        // Real Supabase authentication
        const { error } = await supabase.auth.resetPasswordForEmail(
          values.email,
          {
            redirectTo: window.location.origin + "/reset-password",
          },
        );

        if (error) throw error;

        setIsSuccess(true);
        if (onResetEmailSent) {
          onResetEmailSent();
        }
      }
    } catch (err: any) {
      setErrorMessage(
        err.message || "Failed to send reset email. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4"
      data-testid="forgot-password-page"
    >
      <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {t("forgotPassword.title") || "Forgot Password"}
          </CardTitle>
          <CardDescription>
            {t("forgotPassword.description") ||
              "Enter your email to receive a password reset link"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {errorMessage && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          {isSuccess ? (
            <Alert className="mb-6 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
              <AlertDescription className="text-green-800 dark:text-green-300">
                {t("forgotPassword.successMessage") ||
                  "Password reset email sent! Check your inbox for further instructions."}
              </AlertDescription>
            </Alert>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                data-testid="forgot-password-form"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("forgotPassword.email") || "Email"}
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder={
                              t("forgotPassword.emailPlaceholder") ||
                              "your.email@example.com"
                            }
                            className="pl-10"
                            {...field}
                            disabled={isLoading}
                            data-testid="email-input"
                          />
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
                  data-testid="reset-password-button"
                >
                  {isLoading
                    ? t("forgotPassword.sending") || "Sending..."
                    : t("forgotPassword.sendResetLink") || "Send Reset Link"}
                </Button>

                <div className="text-center text-sm">
                  <a
                    href="/login"
                    className="font-medium text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    data-testid="back-to-login-link"
                  >
                    {t("forgotPassword.backToLogin") || "Back to Login"}
                  </a>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
