const links = [
  { href: "/knowledge-assets", label: "创始人AI第二大脑" },
  { href: "/services", label: "企业AI解决方案" },
  { href: "/cases", label: "AI案例中心" },
  { href: "https://agent.aiarrival.cn", label: "AI平台Demo", external: true },
];

export default function SiteHeader({ theme = "light" }: { theme?: "light" | "dark" }) {
  return (
    <header className={`site-header site-header--${theme}`}>
      <a className="site-brand" href="/" aria-label="降临科技首页">
        <img src="/brand/jianglin-mark.png" alt="" />
        <span>降临科技</span>
        <small>JIANG LIN AI</small>
      </a>
      <nav className="site-nav" aria-label="主导航">
        {links.map((link) => (
          <a href={link.href} key={link.href} {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}>{link.label}</a>
        ))}
      </nav>
      <a className="site-contact" href="/#contact">
        <span>开始一次 AI 落地诊断</span>
        <b>↗</b>
      </a>
    </header>
  );
}
