const links = [
  { href: "/services", label: "服务" },
  { href: "/cases", label: "案例" },
  { href: "/knowledge-assets", label: "知识资产" },
  { href: "/about", label: "关于我们" },
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
          <a href={link.href} key={link.href}>{link.label}</a>
        ))}
      </nav>
      <a className="site-contact" href="/#contact">
        <span>开始一次 AI 落地诊断</span>
        <b>↗</b>
      </a>
    </header>
  );
}
