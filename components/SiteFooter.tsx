export default function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-orbit" aria-hidden="true">
        <i />
        <i />
      </div>
      <div className="footer-main">
        <p className="site-kicker site-kicker--light">START WITH ONE REAL PROBLEM</p>
        <h2>带着一个真实业务问题，<br />来做一次 AI 落地诊断。</h2>
        <p className="footer-lead">
          不需要先懂模型、平台或智能体。告诉我们哪里最费人、最容易出错，
          我们会一起判断：值不值得做、应该怎么做、第一步做到什么程度。
        </p>
        <a className="footer-cta" href="/diagnosis">
          开始免费诊断
          <span>↗</span>
        </a>
      </div>
      <div className="footer-bottom">
        <a className="site-brand site-brand--light" href="/">
          <img src="/brand/jianglin-mark.png" alt="" />
          <span>降临科技</span>
        </a>
        <p>AI 是手段，生产力才是目的。</p>
        <span>© 2026 JIANGLIN TECHNOLOGY</span>
      </div>
    </footer>
  );
}
