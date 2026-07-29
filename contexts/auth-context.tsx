"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { API_URL } from "@/lib/api";

const TOKEN_KEY = "rasmati_customer_token";
const USER_KEY = "rasmati_customer";
export const AUTH_SIGNED_OUT_EVENT = "rasmati-auth-signed-out";

export interface Customer {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
}

export interface SignUpInput {
  name: string;
  email: string;
  phone: string;
  password: string;
  company?: string;
}

export interface SignInInput {
  email: string;
  password: string;
  phone?: string;
}

interface ApiResponse {
  success?: boolean;
  error?: string;
  message?: string;
  data?: Record<string, unknown>;
  token?: string;
  access_token?: string;
}

interface AuthContextValue {
  user: Customer | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signUp: (input: SignUpInput) => Promise<void>;
  signIn: (input: SignInInput) => Promise<void>;
  signOut: () => void;
  updateProfile: (input: Pick<Customer, "name" | "address" | "city">) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function messageFrom(response: ApiResponse, fallback: string) {
  return response.error || response.message || fallback;
}

function tokenFrom(response: ApiResponse) {
  const data = response.data ?? {};
  const session = data.session as Record<string, unknown> | undefined;
  const token =
    response.token ??
    response.access_token ??
    (data.token as string | undefined) ??
    (data.access_token as string | undefined) ??
    (session?.token as string | undefined) ??
    (session?.access_token as string | undefined);
  return typeof token === "string" && token.length > 0 ? token : null;
}

function customerFrom(response: ApiResponse): Customer | null {
  const data = response.data ?? {};
  const candidate = (data.customer ?? data.user ?? data.profile ?? data) as Customer;
  return candidate && typeof candidate === "object" ? candidate : null;
}

async function api<T extends ApiResponse>(
  path: string,
  options: RequestInit = {},
  token?: string | null
) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const body = (await response.json().catch(() => ({}))) as T;
  if (!response.ok || body.success === false) {
    throw new Error(messageFrom(body, "Something went wrong. Please try again."));
  }
  return body;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Customer | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const persist = useCallback((nextToken: string, nextUser: Customer | null) => {
    window.localStorage.setItem(TOKEN_KEY, nextToken);
    if (nextUser) window.localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
  }, []);

  const signOut = useCallback(() => {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
    window.dispatchEvent(new Event(AUTH_SIGNED_OUT_EVENT));
    setToken(null);
    setUser(null);
  }, []);

  const loadProfile = useCallback(async (currentToken: string) => {
    const response = await api<ApiResponse>("/api/auth/profile", {}, currentToken);
    const profile = customerFrom(response);
    if (!profile) throw new Error("Your account profile could not be loaded.");
    persist(currentToken, profile);
  }, [persist]);

  useEffect(() => {
    void (async () => {
      const savedToken = window.localStorage.getItem(TOKEN_KEY);
      const savedUser = window.localStorage.getItem(USER_KEY);
      if (!savedToken) {
        setIsLoading(false);
        return;
      }

      setToken(savedToken);
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser) as Customer);
        } catch {
          window.localStorage.removeItem(USER_KEY);
        }
      }

      try {
        await loadProfile(savedToken);
      } catch {
        signOut();
      } finally {
        setIsLoading(false);
      }
    })();
  }, [loadProfile, signOut]);

  const establishSession = useCallback(async (response: ApiResponse) => {
    const nextToken = tokenFrom(response);
    if (!nextToken) {
      throw new Error("The account service did not return an authorization token.");
    }
    const nextUser = customerFrom(response);
    persist(nextToken, nextUser);
    try {
      await loadProfile(nextToken);
    } catch {
      // A valid login token is enough to continue; profile data can refresh later.
    }
  }, [loadProfile, persist]);

  const signUp = useCallback(async (input: SignUpInput) => {
    const response = await api<ApiResponse>("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(input),
    });
    if (tokenFrom(response)) {
      await establishSession(response);
      return;
    }

    // Signup creates the customer record, while login establishes the
    // bearer-token session required by the profile and wall endpoints.
    const loginResponse = await api<ApiResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: input.email,
        phone: input.phone,
        password: input.password,
      }),
    });
    await establishSession(loginResponse);
  }, [establishSession]);

  const signIn = useCallback(async (input: SignInInput) => {
    const response = await api<ApiResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(input),
    });
    await establishSession(response);
  }, [establishSession]);

  const updateProfile = useCallback(async (input: Pick<Customer, "name" | "address" | "city">) => {
    if (!token) throw new Error("Please sign in to update your profile.");
    const response = await api<ApiResponse>("/api/auth/profile", {
      method: "PUT",
      body: JSON.stringify(input),
    }, token);
    const nextUser = customerFrom(response) ?? { ...user, ...input };
    persist(token, nextUser);
  }, [persist, token, user]);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    token,
    isAuthenticated: Boolean(token),
    isLoading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  }), [user, token, isLoading, signUp, signIn, signOut, updateProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider.");
  return context;
}
