import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

const services = [
  {
    no: "01",
    en: "STRATEGY",
    title: "企业 AI 咨询与场景诊断",
    line: "先帮老板算清 AI 这笔账",
    copy: "和管理层、业务负责人一起梳理：哪里最费人、最容易出错、最可能增加收入。形成场景清单、优先级、首个试点和实施路径。",
  },
  {
    no: "02",
    en: "ENABLEMENT",
    title: "企业 AI 培训",
    line: "让团队当场学会怎么用",
    copy: "不只讲工具。结合公司的真实岗位和问题，边学边找机会，让员工知道 AI 可以怎样进入自己的日常工作。",
  },
  {
    no: "03",
    en: "BUILD",
    title: "智能体与企业大脑",
    line: "让 AI 直接帮员工干活",
    copy: "连接公司资料、业务规则和数据，建设知识库、岗位智能体与工作台，让 AI 完成任务、记录结果，并持续积累经验。",
  },
  {
    no: "04",
    en: "PHYGITAL",
    title: "AI 与线下触点设计",
    line: "把线下客户持续连接起来",
    copy: "把 AI 服务、内容与 NFC 等实体载体结合，让展会、门店、园区和产品成为可互动、可追踪、可持续运营的数字入口。",
  },
];

const cases = [
  {
    client: "小象优选",
    category: "电商运营智能体",
    title: "把日常重复工作交给 AI，少做一遍，就多一分增长。",
    result: "9 类",
    resultLabel: "业务智能体已搭建",
    image: "/cases/xiaoxiang-agents.png",
    tone: "blue",
  },
  {
    client: "阳采集团",
    category: "高精度业务场景",
    title: "把采购订单核查做准，让输出真正进入业务。",
    result: "70% → 99.99%",
    resultLabel: "试点准确率",
    image: "",
    tone: "red",
  },
  {
    client: "铁狗咖啡",
    category: "线下互动营销",
    title: "10 多个小时上线一场可追踪的线下互动。",
    result: "200 份",
    resultLabel: "实体互动载体",
    image: "/cases/tiegou-data.png",
    tone: "ink",
  },
];

const logos = [
  ["小象优选", "/clients/xiaoxiang.png"],
  ["中国移动", "/clients/china-mobile.png"],
  ["同济大学", "/clients/tongji.png"],
  ["杭州城投", "/clients/hangzhou-chengtou.png"],
  ["营养工厂", "/clients/nutrition-factory.png"],
];

export default function Home() {
  return (
    <main className="corporate-site">
      <div className="home-hero">
        <SiteHeader />
        <div className="hero-ring hero-ring--ink" aria-hidden="true" />
        <div className="hero-ring hero-ring--line" aria-hidden="true" />
        <div className="home-hero__copy">
          <p className="site-kicker">ENTERPRISE AI, MADE USEFUL</p>
          <h1>将 AI<br /><em>化为生产力</em></h1>
          <p className="home-hero__lead">
            降临科技，连接企业业务与 AI 技术。<br />
            从第一个真实场景，到持续生长的企业 AI 能力。
          </p>
          <div className="home-hero__actions">
            <a className="button button--dark" href="/services">了解我们如何落地 <span>↗</span></a>
            <a className="arrow-link" href="/cases">查看真实案例 <span>→</span></a>
          </div>
        </div>
        <div className="hero-index">
          <span>业务</span><b>×</b><span>技术</span>
          <small>THE VALUABLE INTERSECTION</small>
        </div>
        <div className="scroll-note">SCROLL TO EXPLORE <span>↓</span></div>
      </div>

      <section className="opening-statement site-shell">
        <div className="statement-index">01 / 我们的判断</div>
        <div>
          <h2>企业真正缺少的，<br />不是 AI 工具，<br />而是<em>正确的起点。</em></h2>
          <p>
            今天可以买到越来越多的模型、平台和智能体。但如果业务问题没有找准，
            工具越多，试错成本越高。我们先进入业务现场，再决定该购买、定制，还是暂缓。
          </p>
        </div>
        <aside>
          <span>OUR BELIEF</span>
          <strong>先跑通一个场景，<br />再建设一套能力。</strong>
        </aside>
      </section>

      <section className="method-band">
        <div className="site-shell">
          <p className="site-kicker site-kicker--light">THE JIANGLIN METHOD</p>
          <div className="method-intro">
            <h2>先咨询，后产品；<br />先验证，再规模化。</h2>
            <p>我们不是从固定产品出发，而是从真实业务问题出发。</p>
          </div>
          <div className="method-flow">
            <article>
              <span>01</span>
              <small>DISCOVER</small>
              <h3>咨询探矿</h3>
              <p>梳理流程、知识、数据和组织问题，找到值得优先投入的 AI 场景。</p>
            </article>
            <i>→</i>
            <article>
              <span>02</span>
              <small>VALIDATE</small>
              <h3>项目炼金</h3>
              <p>用试点、智能体或轻量工具，让场景在真实业务里跑起来。</p>
            </article>
            <i>→</i>
            <article>
              <span>03</span>
              <small>SCALE</small>
              <h3>产品复制</h3>
              <p>把有效能力沉淀为可复用模块，逐步形成企业平台或行业产品。</p>
            </article>
          </div>
        </div>
      </section>

      <section className="home-services site-shell">
        <div className="site-section-head">
          <div>
            <p className="site-kicker">WHAT WE DO</p>
            <h2>从看清问题，<br />到真正做出结果。</h2>
          </div>
          <a className="arrow-link" href="/services">查看完整服务 <span>↗</span></a>
        </div>
        <div className="service-lines">
          {services.map((service) => (
            <a href="/services" className="service-line" key={service.no}>
              <span className="service-no">{service.no}</span>
              <small>{service.en}</small>
              <div>
                <h3>{service.title}</h3>
                <strong>{service.line}</strong>
              </div>
              <p>{service.copy}</p>
              <b>↗</b>
            </a>
          ))}
        </div>
      </section>

      <section className="case-stage">
        <div className="site-shell">
          <div className="site-section-head site-section-head--light">
            <div>
              <p className="site-kicker site-kicker--light">SELECTED WORK</p>
              <h2>结果，必须看得见。</h2>
            </div>
            <p>真实业务、真实系统、真实口径。<br />不把演示效果当成交付结果。</p>
          </div>
          <div className="case-grid">
            {cases.map((item, index) => (
              <article className={`case-card case-card--${item.tone}`} key={item.client}>
                <div className="case-card__meta">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item.client}<small>{item.category}</small></p>
                </div>
                <h3>{item.title}</h3>
                <div className="case-card__result">
                  <strong>{item.result}</strong>
                  <span>{item.resultLabel}</span>
                </div>
                {item.image && <img src={item.image} alt={`${item.client}项目真实界面`} />}
              </article>
            ))}
          </div>
          <a className="case-more" href="/cases">阅读全部案例 <span>→</span></a>
        </div>
      </section>

      <section className="growth-model site-shell">
        <div className="site-section-head">
          <div>
            <p className="site-kicker">CAPABILITY THAT GROWS</p>
            <h2>AI 能力，应该像一棵树一样持续生长。</h2>
          </div>
          <p>没有根，场景无法稳定；<br />没有业务结果，技术就没有意义。</p>
        </div>
        <div className="growth-graphic">
          <div className="growth-row growth-row--result"><span>叶 / 业务结果</span><p>效率提升 · 成本降低 · 经验复制 · 收入增长 · 新产品</p></div>
          <div className="growth-row growth-row--scene"><span>枝 / 场景落地</span><p>业务智能体 · 流程自动化 · 数据分析 · 企业大脑 · 软硬件产品</p></div>
          <div className="growth-row growth-row--org"><span>干 / 组织能力</span><p>企业培训 · 岗位应用 · 场景共创 · 工作流重构</p></div>
          <div className="growth-row growth-row--root"><span>根 / 基础设施</span><p>模型入口 · 企业知识库 · 数据资产 · 权限体系 · 智能体底座</p></div>
        </div>
      </section>

      <section className="knowledge-spotlight">
        <div className="site-shell knowledge-spotlight__inner">
          <div>
            <p className="site-kicker">AI KNOWLEDGE ASSETS</p>
            <h2>让个人与企业的经验，<br />成为可以持续调用的资产。</h2>
            <p>
              把散落在脑海、微信和文件里的经验整理到一起，让人能快速找到，
              也让 AI 能基于这些资料协助写作、分析和工作。
            </p>
            <a className="button button--red" href="/knowledge-assets">查看知识资产服务 <span>↗</span></a>
          </div>
          <div className="knowledge-orbit" aria-hidden="true">
            <i />
            <i />
            <span>KNOW</span>
            <strong>经验</strong>
            <span>ACT</span>
          </div>
        </div>
      </section>

      <section className="trusted site-shell">
        <p className="site-kicker">TRUSTED IN REAL WORK</p>
        <h2>客户选择，胜过自我介绍。</h2>
        <div className="logo-row">
          {logos.map(([name, logo]) => (
            <div key={name}><img src={logo} alt={name} /></div>
          ))}
        </div>
        <p className="trust-note">服务与合作覆盖电商、制造、教育、通信、文旅园区、线下零售等场景。</p>
      </section>

      <SiteFooter />
    </main>
  );
}
