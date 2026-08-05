import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aiarrival.cn"),
  title: "降临科技｜企业AI第二大脑与智能体落地",
  description:
    "从创始人经验沉淀开始，建设企业知识资产、AI第二大脑与业务智能体，让AI真正理解企业。",
  icons: {
    icon: "/brand/jianglin-mark.png",
    shortcut: "/brand/jianglin-mark.png",
  },
  openGraph: {
    title: "让企业拥有自己的AI第二大脑与智能员工",
    description: "从创始人经验沉淀开始，让AI真正理解你的业务。",
    type: "website",
    locale: "zh_CN",
    images: [{ url: "/og.png", width: 1732, height: 908, alt: "降临科技企业AI第二大脑与智能员工" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "让企业拥有自己的AI第二大脑与智能员工",
    description: "从创始人经验沉淀开始，让AI真正理解你的业务。",
    images: ["/og.png"],
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
