"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

export default function AccountPage() {
  const { user, isAuthenticated, isLoading, signOut, updateProfile } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/sign-in");
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      setName(user.name ?? "");
      setAddress(user.address ?? "");
      setCity(user.city ?? "");
    }
  }, [user]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      await updateProfile({ name, address, city });
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save your changes.");
    } finally {
      setSaving(false);
    }
  }

  if (isLoading || !isAuthenticated) {
    return <main className="max-w-xl mx-auto px-6 py-16">Loading...</main>;
  }

  return (
    <main className="max-w-xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-2">My Account</h1>
      <p className="text-sm text-neutral-500 mb-8">{user?.email}</p>

      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Address</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border p-3"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">City</label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border p-3"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {saved && <p className="text-green-600 text-sm">Saved.</p>}

        <button
          type="submit"
          disabled={saving}
          className="bg-black text-white px-6 py-3 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>

      <button
        onClick={() => {
          signOut();
          router.push("/");
        }}
        className="mt-10 text-sm underline text-neutral-500"
      >
        Log out
      </button>
    </main>
  );
}