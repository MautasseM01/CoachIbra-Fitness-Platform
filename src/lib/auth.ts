import { supabase } from "./supabase";

export type UserRole = "ROLE_ADMIN" | "ROLE_USER";

export interface UserSession {
  user: {
    id: string;
    email: string;
    role?: UserRole;
    name?: string;
  } | null;
  isAuthenticated: boolean;
}

// Add event emitter for auth state changes
export const authStateChange = new EventTarget();

export const getCurrentSession = async (): Promise<UserSession> => {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {
      return { user: null, isAuthenticated: false };
    }

    const { user } = data.session;

    // Get user role from metadata if available
    const role = (user.user_metadata?.role as UserRole) || "ROLE_USER";
    const name = (user.user_metadata?.name as string) || "";

    return {
      user: {
        id: user.id,
        email: user.email || "",
        role,
        name,
      },
      isAuthenticated: true,
    };
  } catch (error) {
    console.error("Error getting session:", error);
    return { user: null, isAuthenticated: false };
  }
};

export const signOut = async () => {
  try {
    await supabase.auth.signOut();
    // Dispatch event to notify components about auth state change
    authStateChange.dispatchEvent(new Event("signOut"));
    return { success: true };
  } catch (error) {
    console.error("Error signing out:", error);
    return { success: false, error };
  }
};

// Initialize auth listener
export const initAuthListener = () => {
  supabase.auth.onAuthStateChange((event, session) => {
    // Dispatch event for components to listen to
    authStateChange.dispatchEvent(
      new CustomEvent("authChange", {
        detail: { event, session },
      }),
    );
  });
};
