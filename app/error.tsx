"use client";

import { useEffect } from "react";
import { Monogram } from "@/components/ui/logo";
import { Button, ButtonLink } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-luxe flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <Monogram className="mb-8 text-4xl text-espresso/30" />
      <span className="eyebrow mb-4">Something interrupted us</span>
      <h1 className="max-w-lg font-display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-tight text-balance">
        A moment of stillness
      </h1>
      <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
        We hit an unexpected pause. Please try again — or return home and pick up
        where you left off.
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
        <Button onClick={reset}>Try Again</Button>
        <ButtonLink href="/" variant="outline">
          Return Home
        </ButtonLink>
      </div>
    </div>
  );
}
