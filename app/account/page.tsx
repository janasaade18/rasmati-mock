"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/ui/page-intro";

export default function AccountPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated, isLoading, signIn, signOut, signUp } = useAuth();
  const [mode, setMode] = useState<"sign-in" | "create">(
    searchParams.get("mode") === "create" ? "create" : "sign-in"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const next = searchParams.get("next");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      if (mode === "create") {
        await signUp({ name, email, phone, password, company: company || undefined });
      } else {
        await signIn({ email, password, phone: phone || undefined });
      }
      router.push(next?.startsWith("/") ? next : "/shop");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to access your account.");
    } finally {
      setSubmitting(false);
    }
  }

  if (isLoading) {
    return <div className="container-luxe py-32 text-center text-muted">Loading your account…</div>;
  }

  if (isAuthenticated) {
    return (
      <>
        <PageIntro
          eyebrow="Collector Account"
          title={user?.name ? `Welcome, ${user.name.split(" ")[0]}.` : "Your Rasmati Account"}
          intro="Your selections are saved to Your Wall while you choose the pieces that belong in your space."
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Account", href: "/account" },
          ]}
        />
        <section className="container-narrow pb-24 lg:pb-32">
          <div className="rounded-2xl border border-line bg-porcelain p-8 sm:p-10">
            <dl className="grid gap-7 text-sm sm:grid-cols-2">
              {user?.email && (
                <div>
                  <dt className="eyebrow mb-2 text-muted">Email</dt>
                  <dd>{user.email}</dd>
                </div>
              )}
              {user?.phone && (
                <div>
                  <dt className="eyebrow mb-2 text-muted">Phone</dt>
                  <dd>{user.phone}</dd>
                </div>
              )}
            </dl>
            <Button
              variant="outline"
              onClick={() => {
                signOut();
                router.push("/");
              }}
              className="mt-10"
            >
              <LogOut className="size-4" />
              Sign Out
            </Button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageIntro
        eyebrow="Collector Account"
        title={mode === "create" ? "Create your account" : "Welcome back"}
        intro="Sign in to save original works to Your Wall and continue to checkout."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Account", href: "/account" },
        ]}
      />
      <section className="container-narrow pb-24 lg:pb-32">
        <div className="mx-auto max-w-xl rounded-2xl border border-line bg-porcelain p-6 sm:p-10">
          <div className="mb-8 flex gap-6 border-b border-line-soft">
            <button
              type="button"
              onClick={() => setMode("sign-in")}
              className={`pb-3 text-sm transition-colors ${mode === "sign-in" ? "text-ink" : "text-muted"}`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode("create")}
              className={`pb-3 text-sm transition-colors ${mode === "create" ? "text-ink" : "text-muted"}`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={submit} className="flex flex-col gap-5">
            {mode === "create" && (
              <label className="text-sm">
                <span className="mb-2 block">Full name</span>
                <input
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full border border-line bg-ivory px-4 py-3.5 outline-none transition-colors focus:border-ink"
                />
              </label>
            )}
            <label className="text-sm">
              <span className="mb-2 block">Email</span>
              <input
                required
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full border border-line bg-ivory px-4 py-3.5 outline-none transition-colors focus:border-ink"
              />
            </label>
            {mode === "create" && (
              <>
                <label className="text-sm">
                  <span className="mb-2 block">Phone</span>
                  <input
                    required
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className="w-full border border-line bg-ivory px-4 py-3.5 outline-none transition-colors focus:border-ink"
                  />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block">Company <span className="text-muted">(optional)</span></span>
                  <input
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                    className="w-full border border-line bg-ivory px-4 py-3.5 outline-none transition-colors focus:border-ink"
                  />
                </label>
              </>
            )}
            <label className="text-sm">
              <span className="mb-2 block">Password</span>
              <input
                required
                type="password"
                minLength={8}
                autoComplete={mode === "create" ? "new-password" : "current-password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full border border-line bg-ivory px-4 py-3.5 outline-none transition-colors focus:border-ink"
              />
            </label>
            {error && <p className="text-sm text-wine">{error}</p>}
            <Button type="submit" disabled={submitting} className="mt-3 w-full">
              {submitting
                ? "Please wait…"
                : mode === "create"
                  ? "Create Account"
                  : "Sign In"}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
