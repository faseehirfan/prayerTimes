import type { Metadata } from "next";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prayer Times",
  description: "Never miss a prayer again.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </NextThemesProvider>
      </body>
    </html>
  );
}
