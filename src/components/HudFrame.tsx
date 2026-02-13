import { ReactNode } from "react";

interface HudFrameProps {
  children: ReactNode;
}

const HudFrame = ({ children }: HudFrameProps) => {
  return (
    <div className="relative min-h-screen w-full bg-background hud-grid overflow-hidden">
      {/* Scanline overlay */}
      <div className="fixed inset-0 scanline z-50 pointer-events-none" />

      {/* Corner decorations */}
      <div className="fixed top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/40 z-40" />
      <div className="fixed top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary/40 z-40" />
      <div className="fixed bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-primary/40 z-40" />
      <div className="fixed bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/40 z-40" />

      {/* Top HUD bar */}
      <div className="fixed top-0 left-16 right-16 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent z-40" />
      <div className="fixed bottom-0 left-16 right-16 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent z-40" />

      {children}
    </div>
  );
};

export default HudFrame;
