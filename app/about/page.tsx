import type { Metadata } from "next";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";

export const metadata: Metadata = {
  title: "关于降临科技｜连接企业业务与AI技术",
  description: "降临科技是一家面向企业的AI场景咨询与落地服务商。",
};

export default function AboutPage() {
  return (
    <main className="corporate-site">
      <section className="page-hero page-hero--paper">
        <SiteHeader />
        <div className="page-hero__index">04 / ABOUT</div>
        <div className="page-hero__copy">
          <p className="site-kicker">ABOUT JIANGLIN</p>
          <h1>站在业务与技术的<br /><em>交叠处。</em></h1>
          <p>降临科技是一家面向企业的 AI 场景咨询与落地服务商。我们既能和管理层讲清楚，也能把系统真正做出来。</p>
        </div>
        <div className="about-mark"><img src="/brand/jianglin-mark.png" alt="降临科技双圆标志" /></div>
      </section>

      <section className="about-story site-shell">
        <p className="site-kicker">OUR ROLE</p>
        <div>
          <h2>连接企业业务与 AI 技术。</h2>
          <div className="about-columns">
            <p>我们先理解企业的业务、流程、知识和数据，再判断哪些问题适合用 AI 解决、哪些能力可以采购、哪些场景需要定制、哪些项目现在不值得投入。</p>
            <p>随后，我们把经过验证的场景做成真正可用的智能体、业务工具、企业大脑或软硬件产品，让一次项目成为企业持续生长的能力。</p>
          </div>
        </div>
      </section>

      <section className="about-principles">
        <div className="site-shell">
          <p className="site-kicker site-kicker--light">HOW WE MAKE DECISIONS</p>
          <h2>我们的四条工作原则</h2>
          <div className="principle-grid">
            <article><span>01</span><h3>业务先于技术</h3><p>先问经营问题，再谈模型、平台和产品。</p></article>
            <article><span>02</span><h3>验证先于规模</h3><p>先用最小成本跑通，再决定是否继续投入。</p></article>
            <article><span>03</span><h3>可用先于炫技</h3><p>模型效果不是终点，业务敢不敢用才是。</p></article>
            <article><span>04</span><h3>生长先于孤岛</h3><p>让每个小场景都能回到企业的知识与能力。</p></article>
          </div>
        </div>
      </section>

      <section className="capability-proof site-shell">
        <div>
          <p className="site-kicker">EXPERIENCE & REACH</p>
          <h2>既能给团队讲明白，<br />也能把系统真正做出来。</h2>
        </div>
        <div className="proof-lines">
          <div><span>课程</span><strong>得到 App《企业 AI 落地课》</strong><small>19,053 人学过</small></div>
          <div><span>服务</span><strong>同济大学相关 AI 应用服务</strong><small>教育场景</small></div>
          <div><span>分享</span><strong>中国移动客服中心</strong><small>企业培训</small></div>
          <div><span>行业</span><strong>电商、制造、文旅、零售</strong><small>多场景储备</small></div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
