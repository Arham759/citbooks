import { X } from "lucide-react";
import { useState } from "react";

interface AdBannerProps {
  variant?: "inline" | "sidebar" | "bottom";
  className?: string;
}

const adContent = [
  { label: "Sponsored", text: "Learn coding faster with interactive courses", cta: "Try Free", icon: "🎓" },
  { label: "Ad", text: "Cloud hosting for students — 50% off", cta: "Get Deal", icon: "☁️" },
  { label: "Sponsored", text: "Build your portfolio with real projects", cta: "Start Now", icon: "🚀" },
  { label: "Ad", text: "Premium study tools for IT students", cta: "Explore", icon: "📚" },
];

const AdBanner = ({ variant = "inline", className = "" }: AdBannerProps) => {
  const [dismissed, setDismissed] = useState(false);
  const [ad] = useState(() => adContent[Math.floor(Math.random() * adContent.length)]);

  if (dismissed) return null;

  if (variant === "bottom") {
    return (
      <div className={`fixed bottom-0 left-0 right-0 z-30 bg-card/95 backdrop-blur-sm border-t border-border px-4 py-2.5 ${className}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wider shrink-0">{ad.label}</span>
            <span className="text-sm text-muted-foreground truncate">{ad.icon} {ad.text}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="text-xs font-medium text-accent hover:underline">{ad.cta}</button>
            <button
              onClick={() => setDismissed(true)}
              className="p-1 text-muted-foreground/50 hover:text-foreground transition-colors"
              aria-label="Dismiss ad"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "sidebar") {
    return (
      <div className={`bg-card/50 border border-border rounded-lg p-4 text-center ${className}`}>
        <span className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-widest">{ad.label}</span>
        <div className="text-2xl my-2">{ad.icon}</div>
        <p className="text-sm text-muted-foreground mb-2">{ad.text}</p>
        <button className="text-xs font-medium text-accent hover:underline">{ad.cta} →</button>
      </div>
    );
  }

  // inline — blends between book cards
  return (
    <div className={`bg-card/30 border border-dashed border-border rounded-lg p-5 flex items-center justify-between gap-4 ${className}`}>
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-2xl">{ad.icon}</span>
        <div className="min-w-0">
          <span className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-widest">{ad.label}</span>
          <p className="text-sm text-muted-foreground truncate">{ad.text}</p>
        </div>
      </div>
      <button className="text-xs font-medium text-accent hover:underline whitespace-nowrap">{ad.cta} →</button>
    </div>
  );
};

export default AdBanner;
