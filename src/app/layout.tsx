import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: {
    default: "思维模型库 — Mental Models Hub",
    template: "%s | 思维模型库",
  },
  description:
    "整合人类优秀的思维模型与认知框架，通过通俗介绍、有趣案例和使用指引，帮助你快速学以致用。",
  keywords: [
    "思维模型",
    "认知框架",
    "决策思维",
    "第一性原理",
    "查理芒格",
    "多元思维",
    "心智模型",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('mm-theme');
                if (t) document.documentElement.setAttribute('data-theme', t);
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
