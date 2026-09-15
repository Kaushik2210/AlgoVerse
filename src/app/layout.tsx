import type { Metadata } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/providers/ThemeProvider";
import ParticleField from "@/components/ui/ParticleField";
import TopBar from "@/components/navigation/TopBar";
import ToastHost from "@/components/ui/ToastHost";
import BadgeUnlockOverlay from "@/components/badges/BadgeUnlockOverlay";
import ProgressWatcher from "@/components/providers/ProgressWatcher";
import AuthProvider from "@/components/providers/AuthProvider";
import SupabaseSyncProvider from "@/components/providers/SupabaseSyncProvider";
import { getSiteUrl } from "@/lib/site";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = getSiteUrl();
const title = "AlgoVerse — Learn Algorithms Visually";
const description =
  "A sci-fi HUD styled data structures & algorithms visualizer and learning companion — real step-through visualizers, 38 topics, and 635+ solved LeetCode problems.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "AlgoVerse",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sora.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground relative overflow-x-hidden">
        <ThemeProvider>
          <ParticleField />
          <div
            aria-hidden="true"
            className="hud-grid pointer-events-none fixed inset-0 -z-10 opacity-40"
          />
          <AuthProvider />
          <SupabaseSyncProvider />
          <ProgressWatcher />
          <ToastHost />
          <BadgeUnlockOverlay />
          <TopBar />
          <div className="flex-1 flex flex-col">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
