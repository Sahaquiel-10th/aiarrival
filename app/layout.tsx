import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI知识资产服务体系｜让经验持续产生价值",
  description:
    "从个人知识沉淀、个人AI助手到企业知识资产系统，帮助个人和企业建立真正运转的AI知识资产体系。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
