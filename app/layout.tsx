import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "降临科技｜将AI化为生产力",
  description:
    "降临科技是一家面向企业的AI场景咨询与落地服务商，从真实业务问题出发，提供企业AI咨询、培训、智能体、企业大脑与线下触点设计。",
  icons: {
    icon: "/brand/jianglin-mark.png",
    shortcut: "/brand/jianglin-mark.png",
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
