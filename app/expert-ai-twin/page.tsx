import type { Metadata } from "next";
import IcpRecord from "../../components/IcpRecord";

export const metadata: Metadata = {
  title: "让你的专业经验服务更多人｜专家AI助手计划",
  description: "把课程、案例、方法和多年经验沉淀为一个懂你的AI专家助手，持续服务客户、学员和团队。",
  openGraph: {
    title: "让你的专业经验，服务更多人",
    description: "不用重复讲解，我们帮你建立一个懂你的AI专家助手。",
    images: [{ url: "/og-expert.png", width: 1731, height: 909, alt: "让你的专业经验服务更多人" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "让你的专业经验，服务更多人",
    description: "不用重复讲解，我们帮你建立一个懂你的AI专家助手。",
    images: ["/og-expert.png"],
  },
};

const expertPains = [
  ["重复答疑消耗时间", "客户和学员的问题很多，但其中大量问题高度重复。"],
  ["经验无法规模复制", "你的方法和判断，只能依靠你本人一次次传递。"],
  ["内容没有持续积累", "课程、文章和案例做了很多，却没有形成长期资产。"],
];

const assistantRoles = [
  { index: "01", title: "AI学员助教", text: "帮助回答课程问题、辅助学习，并用你的案例解释复杂概念。", tags: ["课程答疑", "辅助学习", "案例解释"] },
  { index: "02", title: "AI咨询助手", text: "提前收集客户问题、提供初步建议，把你的时间留给真正重要的判断。", tags: ["问题收集", "初步建议", "减少重复沟通"] },
  { index: "03", title: "AI内容助手", text: "从你的课程和案例中整理观点、辅助输出内容，并延续你的表达方式。", tags: ["整理观点", "内容输出", "延续表达方式"] },
];

const delivery = [
  ["采集你的专业经验", "通过访谈、课程、案例和历史内容，找到真正有价值的方法、判断和经验。"],
  ["建立你的AI专家助手", "整理知识体系、服务方法、表达方式和案例，让AI理解你如何解决问题。"],
  ["部署你的服务入口", "完成测试与配置，支持分享给客户、接入官网，并持续服务学员和团队。"],
];

const caseExamples = [
  {
    slug: "he-yun",
    type: "培训老师",
    name: "何韵",
    role: "知识型IP与课程顾问",
    image: "/experts/he-yun.jpg",
    before: "每天重复回答学员问题",
    after: "AI助教帮助学员随时学习",
  },
  {
    slug: "lin-zhiyuan",
    type: "企业顾问",
    name: "林知远",
    role: "制造业转型顾问",
    image: "/experts/lin-zhiyuan.jpg",
    before: "咨询服务依赖个人时间",
    after: "AI助手承接基础咨询与案例解释",
  },
  {
    slug: "lu-xiaobei",
    type: "内容创作者",
    name: "陆小北",
    role: "企业AI落地顾问",
    image: "/experts/lu-xiaobei.jpg",
    before: "内容输出依赖临时灵感",
    after: "AI助手持续整理观点与素材",
  },
];

const growthStages = [
  ["个人知识分身", "让客户和学员随时了解你的专业经验。"],
  ["AI服务助手", "承接答疑、预沟通和学习辅助，帮助你服务更多人。"],
  ["商业增长工具", "成为课程助手、咨询入口和客户服务入口。"],
];

export default function ExpertAiTwinPage() {
  return (
    <main className="expert-landing expert-conversion-page">
      <nav className="nav shell">
        <a className="brand" href="#top" aria-label="专家AI助手计划首页">
          <img className="brand-mark" src="/brand/jianglin-mark.png" alt="" />
          <span>专家AI助手计划</span>
        </a>
        <div className="nav-links">
          <a href="/">降临科技</a>
          <a href="/knowledge-assets">创始人版入口</a>
          <a href="#why">为什么需要</a>
          <a href="#roles">能帮你做什么</a>
          <a href="#delivery">我们如何完成</a>
          <a href="#cases">使用场景</a>
        </div>
        <a className="nav-cta" href="/diagnosis?audience=expert">免费评估AI专家潜力</a>
      </nav>

      <section className="expert-hero shell" id="top">
        <div className="expert-hero-copy">
          <h1><span>让你的专业经验，</span><em><span>服务更多人</span></em></h1>
          <p>课程、案例、方法和多年经验，不需要一次次重复讲解。我们帮你沉淀为一个懂你的AI专家助手，持续服务客户、学员和团队。</p>
          <p className="hero-rite"><span>¥3,999 起</span> 15天启动你的第二个专业服务入口</p>
          <div className="hero-actions expert-primary-actions">
            <div className="hero-primary-action">
              <a className="primary-button" href="/diagnosis?audience=expert">免费评估我的AI专家潜力 <span>↗</span></a>
              <small>2分钟诊断，看看你的经验是否适合AI化</small>
            </div>
            <a className="text-link" href="https://agent.aiarrival.cn/" target="_blank" rel="noreferrer">体验一个知识分身 <span>↗</span></a>
          </div>
          <div className="hero-proof expert-proof">
            <div><strong>不必重复讲</strong><span>高频问题交给AI</span></div><i />
            <div><strong>不必研究工具</strong><span>采集、整理和配置由我们完成</span></div><i />
            <div><strong>服务更多人</strong><span>专业能力不再受时间限制</span></div>
          </div>
        </div>

        <div className="expert-presence expert-service-flow" aria-label="过去的客户咨询、课程答疑、重复讲解和内容输出，经过AI专家助手，变成随时答疑、自主学习、持续内容和更大服务范围">
          <div className="service-flow-column service-flow-before">
            <small>过去 · 被时间限制</small>
            <div><b>客</b><span><strong>客户咨询</strong><em>只能本人沟通</em></span></div>
            <div><b>答</b><span><strong>课程答疑</strong><em>相似问题反复回答</em></span></div>
            <div><b>讲</b><span><strong>重复讲解</strong><em>经验依赖口头传递</em></span></div>
            <div><b>写</b><span><strong>内容输出</strong><em>依赖时间与灵感</em></span></div>
          </div>
          <div className="expert-service-lines service-lines-in" aria-hidden="true"><i /><i /><i /><i /></div>
          <div className="expert-assistant-core">
            <div className="expert-assistant-photo"><img src="/experts/he-yun.jpg" alt="专家形象示例" /></div>
            <small>理解你的方法与表达</small><strong>AI专家助手</strong><span>持续学习 · 随时服务</span>
          </div>
          <div className="expert-service-lines service-lines-out" aria-hidden="true"><i /><i /><i /><i /></div>
          <div className="service-flow-column service-flow-after">
            <small>现在 · 新的服务方式</small>
            <div><b>问</b><span><strong>客户随时提问</strong><em>先获得基础建议</em></span></div>
            <div><b>学</b><span><strong>学员自主学习</strong><em>课程之外也能答疑</em></span></div>
            <div><b>创</b><span><strong>持续输出内容</strong><em>调用观点和案例</em></span></div>
            <div><b>增</b><span><strong>扩大服务范围</strong><em>不再只出售时间</em></span></div>
          </div>
          <div className="expert-service-caption"><i />AI不是替代专家，而是帮助专家服务更多人</div>
        </div>
      </section>

      <section className="expert-time-value" id="why">
        <div className="shell expert-time-grid">
          <div className="expert-time-copy">
            <p className="section-kicker">真正的限制不是能力</p>
            <h2>你的专业价值，不应该只存在于你的时间里</h2>
            <p>一个优秀专家最大的资产，不只是知识，而是多年积累的方法、判断和经验。但一天只有24小时，你的课程、咨询和服务，都受限于个人时间。</p>
          </div>
          <div className="expert-pain-cards">
            {expertPains.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><strong>{title}</strong><p>{text}</p></article>)}
          </div>
          <div className="expert-time-conclusion"><span>新的可能</span><strong>让经过验证的专业经验，拥有一个不受时间限制的服务入口。</strong></div>
        </div>
      </section>

      <section className="expert-outcomes shell" id="roles">
        <div className="section-head">
          <div><p className="section-kicker">不只是功能</p><h2>一个AI助手，可以成为你的第二个服务入口</h2></div>
          <p>它不替代你的专业判断，而是先承接那些可以被标准化、重复调用的服务。</p>
        </div>
        <div className="expert-role-grid">
          {assistantRoles.map((role) => (
            <article key={role.title}><span>{role.index}</span><strong>{role.title}</strong><p>{role.text}</p><div>{role.tags.map((tag) => <small key={tag}>{tag}</small>)}</div></article>
          ))}
        </div>
      </section>

      <section className="process expert-build-process" id="delivery">
        <div className="shell">
          <div className="section-head light">
            <div><p className="section-kicker">全流程协助完成</p><h2>不需要研究AI，我们帮你完成专家经验资产化</h2></div>
            <p>不把“整理并上传一堆资料”留给你。我们从你的真实课程、咨询、案例和表达开始。</p>
          </div>
          <div className="expert-build-grid">
            {delivery.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><strong>{title}</strong><p>{text}</p></article>)}
          </div>
          <div className="expert-build-note"><span>15天启动 · ¥3,999 起</span><strong>你继续授课、咨询和创作，我们负责把经验接住并配置成可使用的AI助手。</strong><a href="/diagnosis?audience=expert">免费评估我的AI专家潜力 ↗</a></div>
        </div>
      </section>

      <section className="expert-cases" id="cases">
        <div className="shell">
          <div className="section-head">
            <div><p className="section-kicker">典型使用场景</p><h2>看看不同专家如何拥有自己的AI助手</h2></div>
            <p>先看AI可以改变哪一段工作，再判断哪一种方式最适合你的业务。</p>
          </div>
          <div className="expert-case-grid">
            {caseExamples.map((item) => (
              <a href={`https://agent.aiarrival.cn/agents/${item.slug}`} target="_blank" rel="noreferrer" key={item.slug}>
                <img src={item.image} alt={`${item.type}AI助手使用场景`} />
                <div className="case-person"><small>{item.type} · 场景示例</small><strong>{item.name}</strong><span>{item.role}</span></div>
                <div className="case-change"><p><small>过去</small>{item.before}</p><i>→</i><p><small>现在</small>{item.after}</p></div>
                <b>体验知识分身 ↗</b>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="expert-growth shell" id="growth">
        <div className="section-head">
          <div><p className="section-kicker">从经验沉淀到商业增长</p><h2>你的AI专家助手最终可以成为</h2></div>
          <p>先让别人随时了解你，再承接服务，最后成为业务中持续工作的增长入口。</p>
        </div>
        <div className="expert-growth-path">
          {growthStages.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><strong>{title}</strong><p>{text}</p>{index < growthStages.length - 1 && <i>→</i>}</article>)}
        </div>
        <div className="expert-growth-foot"><span>第一阶段</span><strong>¥3,999 起完成AI知识分身启动</strong><i /> <span>第二阶段</span><strong>完整套餐升级至 ¥9,999</strong><p>第一阶段费用计入完整套餐，不重复收取。</p></div>
      </section>

      <section className="cta">
        <div className="shell cta-inner">
          <div><p className="section-kicker">先判断是否适合</p><h2>让你的专业经验，<br />开始服务更多人</h2></div>
          <div className="cta-action"><p>花2分钟告诉我们你的专业类型、服务方式和内容现状，获得适合你的AI化方向。</p><a href="/diagnosis?audience=expert">免费评估我的AI专家潜力 <span>↗</span></a><small>提交后立即获得初步方向，再自愿继续完整评估</small></div>
        </div>
      </section>

      <footer className="shell footer">
        <div className="brand"><img className="brand-mark" src="/brand/jianglin-mark.png" alt="" /><span>专家AI助手计划</span></div>
        <p>让专业经验持续积累，并服务更多人。</p>
        <div className="footer-legal"><span>© 2026</span><IcpRecord /></div>
      </footer>
    </main>
  );
}
