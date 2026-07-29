import { Monogram } from "@/components/ui/logo";

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <Monogram className="animate-pulse text-4xl text-espresso/40" />
        <span className="eyebrow text-muted">Loading</span>
      </div>
    </div>
  );
}
