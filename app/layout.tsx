import { ConfettiProvider } from "@/components/ConfettiProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import QueryClientProvider from "./QueryClientProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <ConfettiProvider />
              <Toaster />
              <main>{children}</main>
            </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
