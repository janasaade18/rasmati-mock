import type { Metadata } from "next";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="container-luxe">
      <EmptyState
        eyebrow="404"
        title="This page has wandered off"
        body="The page you're looking for isn't here. Let's find your way back."
        cta={{ label: "Return Home", href: "/" }}
      />
    </div>
  );
}
