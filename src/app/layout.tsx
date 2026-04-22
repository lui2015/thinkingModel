import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
