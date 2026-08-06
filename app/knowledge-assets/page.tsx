import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "创始人AI第二大脑启动计划｜降临科技",
  description: "15天完成一次创始人知识资产采集和AI化启动，把多年经验、判断方法和行业认知沉淀成可被AI调用的第二大脑。",
};

const stages = [
  {
    index: "01",
    tone: "green",
    name: "创始人AI第二大脑启动计划",
    price: "¥4,999",
    promise: "15天完成经验资产采集与AI化启动",
    description:
      "我们通过深度访谈和资料梳理，把你的创业经历、行业判断、方法论与经典案例变成可持续调用的第一版知识资产。",
    items: [
      "个人知识资产地图",
      "第一版AI知识库",
      "适合你的持续记录方式",
      "创始人AI助手初始配置",
      "15天采集、整理与陪跑",
      "企业化升级路线建议",
    ],
    footnote: "价格对应知识资产采集与AI化启动服务；第三方工具费用按实际需要另计",
  },
  {
    index: "02",
    tone: "blue",
    name: "企业知识资产升级",
    price: "¥9,999",
    promise: "让创始人的经验开始为团队服务",
    description:
      "在个人第二大脑的基础上，继续整理团队资料、业务规则与岗位经验，形成组织可以共同使用的知识资产系统。",
    items: [
      "企业知识资产地图",
      "团队资料与业务规则接入",
      "岗位知识范围与权限设计",
      "企业知识助手入口",
      "团队使用方法与常用场景",
      "持续更新机制建议",
    ],
    footnote: "根据团队人数、资料规模和使用范围确认最终方案",
  },
  {
    index: "03",
    tone: "orange",
    name: "企业智能体系统",
    price: "¥30,000 起",
    promise: "让AI从会回答，升级为能参与业务",
    description:
      "把已经整理好的企业知识资产接入销售、客服、培训、决策复盘等真实场景，建设可执行、可追溯、可持续优化的业务智能体。",
    items: [
      "高价值业务场景诊断",
      "销售、客服或知识智能体",
      "业务流程与数据接入",
      "权限、安全与依据追溯",
      "试点验证与团队培训",
      "年度AI顾问升级建议",
    ],
    footnote: "根据企业规模、资料数量、使用人数和具体用途确定方案",
  },
];

const pains = [
  ["关键判断都在脑子里", "离开本人就很难被团队调用"],
  ["资料散落很多地方", "微信、电脑和笔记各存一份"],
  ["同样的问题反复回答", "时间花了，经验却没留下"],
  ["买了AI工具", "却发现AI并不真正理解业务"],
];

const process = [
  ["经验采集", "深度访谈创业经历、行业判断、方法论、案例与决策原则"],
  ["知识整理", "形成个人知识地图、行业认知库、案例库与方法论库"],
  ["AI调用", "配置第一版AI助手、专属入口与可分享的体验页面"],
  ["企业升级", "规划企业知识库、AI员工、智能体系统与后续落地路径"],
];

export default function Home() {
  return (
    <main>
      <nav className="nav shell">
        <a className="brand" href="#top" aria-label="创始人AI第二大脑启动计划首页">
          <img className="brand-mark" src="/brand/jianglin-mark.png" alt="" />
          <span>创始人AI第二大脑</span>
        </a>
        <div className="nav-links">
          <a href="/">降临科技</a>
          <a href="#path">为什么需要</a>
          <a href="#services">服务方案</a>
          <a href="#process">如何开始</a>
        </div>
        <a className="nav-cta" href="/diagnosis">先做免费诊断</a>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow">
            <span />
            FOUNDER AI SECOND BRAIN
          </p>
          <h1>
            <span className="hero-title-line">让多年经验</span>
            <em className="hero-title-line">成为AI第二大脑</em>
          </h1>
          <p className="hero-lead">
            把你的经验、判断方法和行业认知，沉淀成一个可以被AI与团队持续调用的第二大脑。
            <br className="desktop-only" />
            不是再买一个工具，而是让宝贵经验不随时间消失，并持续产生价值。
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="/diagnosis">
              获取AI第二大脑评估 <span>↗</span>
            </a>
            <a className="text-link" href="#process">
              了解交付流程 <span>↓</span>
            </a>
          </div>
          <div className="hero-proof">
            <div>
              <strong>15天</strong>
              <span>完成首版启动</span>
            </div>
            <i />
            <div>
              <strong>4项</strong>
              <span>明确交付成果</span>
            </div>
            <i />
            <div>
              <strong>1条路</strong>
              <span>从个人到企业</span>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="core">
            <span>YOUR</span>
            <strong>AI</strong>
            <span>KNOWLEDGE</span>
          </div>
          <div className="float-note note-a">
            <small>01</small>
            <span>记录</span>
          </div>
          <div className="float-note note-b">
            <small>02</small>
            <span>沉淀</span>
          </div>
          <div className="float-note note-c">
            <small>03</small>
            <span>使用</span>
          </div>
          <div className="glow glow-green" />
          <div className="glow glow-blue" />
          <div className="glow glow-orange" />
        </div>
      </section>

      <section className="pain-strip">
        <div className="shell pain-grid">
          <div className="pain-title">
            <span>THE PROBLEM</span>
            <strong>你是否也有这些困扰？</strong>
          </div>
          {pains.map(([title, text], index) => (
            <div className="pain-item" key={title}>
              <span>0{index + 1}</span>
              <div>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="manifesto shell" id="path">
        <p className="section-kicker">A COMPLETE PATH</p>
        <h2>
          不只是再买一个软件，
          <br />
          而是把你的经验<em>变成可调用的资产</em>
        </h2>
        <p className="manifesto-copy">
          AI只是出口，知识资产化才是产品本体。我们先理解你的经验结构与判断方式，
          再完成采集、整理和AI调用配置，让这套资产能够持续更新，并逐步进入团队与业务。
        </p>
        <div className="flow">
          {["老板经验", "知识资产", "AI助手", "企业智能体", "持续进化"].map((item, index) => (
            <div className={`flow-node flow-${index + 1}`} key={item}>
              <span>0{index + 1}</span>
              <strong>{item}</strong>
              {index < 4 && <i>→</i>}
            </div>
          ))}
        </div>
      </section>

      <section className="services" id="services">
        <div className="shell">
          <div className="section-head">
            <div>
              <p className="section-kicker">THREE-STAGE SERVICE</p>
              <h2>从创始人第二大脑，逐步升级到企业智能体</h2>
            </div>
            <p>
              你可以只做当前需要的一步，
              <br />
              以后有新需求时再继续升级。
            </p>
          </div>

          <div className="stage-list">
            {stages.map((stage) => (
              <article className={`stage stage-${stage.tone}`} key={stage.name}>
                <div className="stage-index">{stage.index}</div>
                <div className="stage-main">
                  <p>{stage.promise}</p>
                  <h3>{stage.name}</h3>
                  <p className="stage-description">{stage.description}</p>
                  <ul>
                    {stage.items.map((item) => (
                      <li key={item}>
                        <span>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="stage-price">
                  <span>服务价格</span>
                  <strong>{stage.price}</strong>
                  <small>{stage.footnote}</small>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="principle shell">
        <div className="principle-quote">
          <span>“</span>
          <blockquote>
            你真正要保留下来的，不是哪一款软件。
            <br />
            而是多年形成的经验、判断与方法，
            <em>让AI和团队都能持续调用。</em>
          </blockquote>
        </div>
        <div className="principle-aside">
          <span>15天后你会得到</span>
          <p>个人知识资产地图、第一版AI知识库、可持续的记录方式，以及从个人第二大脑走向企业智能体的升级路线。</p>
        </div>
      </section>

      <section className="process" id="process">
        <div className="shell">
          <div className="section-head light">
            <div>
              <p className="section-kicker">HOW IT WORKS</p>
              <h2>四步完成第一次知识资产采集与AI化启动</h2>
            </div>
            <p>每一步做什么、什么时候完成，都会提前说明。</p>
          </div>
          <div className="process-grid">
            {process.map(([title, text], index) => (
              <div className="process-step" key={title}>
                <span>0{index + 1}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <div className="process-result">
            <span>15天后</span>
            <strong>你的经验已经形成结构，并拥有第一版可调用的AI第二大脑</strong>
            <p>你也会清楚知道如何持续沉淀，以及何时升级为企业知识系统与智能体</p>
          </div>
        </div>
      </section>

      <section className="fit shell">
        <div className="fit-copy">
          <p className="section-kicker">WHO IT’S FOR</p>
          <h2>尤其适合以经验为核心竞争力的人</h2>
          <p>
            你的专业判断、客户案例、课程方法、管理经验越多，
            越值得尽早整理成找得到、用得上、还能交给团队的资料。
          </p>
        </div>
        <div className="fit-roles">
          {[
            "创业者 / 企业管理者",
            "咨询师 / 教练",
            "培训师 / 讲师",
            "律师 / 财税专家",
            "保险 / 销售顾问",
            "专业服务团队",
          ].map((role, index) => (
            <div key={role}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{role}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="faq shell">
        <div className="faq-title">
          <p className="section-kicker">FAQ</p>
          <h2>你可能关心的问题</h2>
        </div>
        <div className="faq-list">
          <details>
            <summary>我完全不懂AI，也没有常用工具，可以做吗？</summary>
            <p>
              可以。你只需告诉我们平时怎样记录、资料放在哪里、以后想解决什么问题。我们会推荐最容易开始的方案，并帮你完成注册、设置和使用说明。
            </p>
          </details>
          <details>
            <summary>为什么不直接买一个笔记或知识库软件？</summary>
            <p>
              软件只提供功能，但不会替你决定该记录什么、怎样分类，也不会整理你过去的资料。我们的服务会把这些事情一起完成，并陪你形成适合自己的使用方法。
            </p>
          </details>
          <details>
            <summary>升级服务会直接替我制作AI助手吗？</summary>
            <p>
              启动计划会完成第一版AI助手配置，让你看到知识资产如何被调用。进入企业升级阶段后，我们会根据真实业务场景进一步建设知识助手、销售智能体或其他岗位智能体。
            </p>
          </details>
          <details>
            <summary>企业版和个人版的核心区别是什么？</summary>
            <p>
              个人版主要服务一个人；企业版让不同员工使用同一套公司资料，并按照岗位设置可以查看的内容，适合销售、培训、客服和内部问答等团队工作。
            </p>
          </details>
        </div>
      </section>

      <section className="cta" id="contact">
        <div className="shell cta-inner">
          <div>
            <p className="section-kicker">START NOW</p>
            <h2>创建你的<br />AI第二大脑</h2>
          </div>
          <div className="cta-action">
            <p>花几分钟完成评估，看看你的经验目前处在哪个阶段，以及最适合从哪里开始。</p>
            <a href="/diagnosis">
              获取AI第二大脑评估 <span>↗</span>
            </a>
            <small>填写完成后立即查看建议，无需提前了解AI工具</small>
          </div>
        </div>
      </section>

      <footer className="shell footer">
        <div className="brand">
          <img className="brand-mark" src="/brand/jianglin-mark.png" alt="" />
          <span>创始人AI第二大脑</span>
        </div>
        <p>沉淀你的经验，让AI成为你的知识助手。</p>
        <span>© 2026</span>
      </footer>
    </main>
  );
}
