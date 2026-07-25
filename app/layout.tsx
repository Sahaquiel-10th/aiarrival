import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI知识资产服务体系｜把经验整理好，让AI帮你用起来",
  description:
    "帮你把散落在脑海、微信和文件里的经验整理到一起，需要时随时查找，还能让AI根据这些资料协助工作。",
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
