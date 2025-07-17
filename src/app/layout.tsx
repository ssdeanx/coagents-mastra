import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CopilotKit } from "@copilotkit/react-core";
import { TopNavbar } from "@/app/components/layout/top-navbar";
import { ThemeProvider } from "@/app/components/layout/theme-provider";
import "./globals.css";
import "@copilotkit/react-ui/styles.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Deanmachines - AI-Powered Workspace",
  description: "Professional AI agent platform with multi-agent orchestration, research tools, and intelligent automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <CopilotKit runtimeUrl="/api/copilotkit" agent="masterAgent">
            <TopNavbar />
            {children}
          </CopilotKit>
        </ThemeProvider>
      </body>
    </html>
  );
}
