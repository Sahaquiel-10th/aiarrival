import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "创始人AI第二大脑启动计划｜降临科技",
  description: "不需要学习复杂AI，不需要自己整理资料。15天建立一个会自动积累的创始人AI第二大脑。",
};

const stages = [
  {
    index: "01",
    tone: "green",
    name: "创始人AI第二大脑启动服务",
    price: "¥3,999 起",
    promise: "把软硬件选型、配置和第一次启动全部交给我们",
    description:
      "我们根据问卷和你的使用习惯选择合适的采集设备与知识库工具，完成购买、注册、连接、自动同步和15天轻陪跑。你只需授权和开始记录。",
    items: [
      "个性化软硬件方案与代办选购",
      "方案内硬件及首年软件订阅费",
      "账号注册、知识库连接与配置",
      "录音转写及自动同步脚本",
      "15天提醒、使用指导与轻陪跑",
      "结项报告与知识分身上架权限",
    ],
    footnote: "包含确认方案内的软硬件费用；特殊设备、额外账号或超出方案的订阅另行确认",
  },
  {
    index: "02",
    tone: "blue",
    name: "个人AI知识分身升级服务",
    price: "¥9,999",
    promise: "包含启动服务，并把第二大脑升级为真正能工作的AI分身",
    description:
      "完成第一阶段全部交付后，进一步为你设计AI知识分身、工作方式和常用提示词，让它可以帮你思考、创作、答疑并对外分享。",
    items: [
      "包含¥3,999启动服务全部内容",
      "个人AI知识分身设计与构建",
      "常用工作场景与提示词模板",
      "专属AI工作台与平台账号",
      "知识分身使用方法培训",
      "持续优化与成长支持",
    ],
    footnote: "¥9,999为包含第一阶段的完整套餐价，不是在¥3,999基础上重复加收",
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
  ["诊断与选型", "根据你的记录习惯、设备偏好和使用场景确定软硬件方案"],
  ["全部代办与打通", "完成购买、账号注册、转写脚本、知识库连接和自动同步"],
  ["15天轻陪跑", "不要求你先整理资料，从每天正在发生的讲话、会议和思考开始积累"],
  ["交付与上架", "交付结项报告、第一版第二大脑，并开通知识分身上架权限"],
];

const acceptance = [
  ["采集链路跑通", "日常讲话、会议或文字内容可以按方案自动进入知识库"],
  ["第二大脑可用", "拥有自己的AI助手入口，并能调用已经沉淀的真实经验"],
  ["典型问题验证", "用至少10个与你工作有关的问题检查回答与引用效果"],
  ["知识资产地图", "拿到第一版结构、使用建议和后续持续积累方向"],
];

const twinExamples = [
  {
    slug: "lin-zhiyuan",
    name: "林知远",
    role: "制造业转型顾问",
    image: "/experts/lin-zhiyuan.jpg",
    tags: ["组织转型", "经营复盘"],
    prompt: "老员工经验如何变成组织能力？",
  },
  {
    slug: "he-yun",
    name: "何韵",
    role: "知识型IP与课程顾问",
    image: "/experts/he-yun.jpg",
    tags: ["课程设计", "内容体系"],
    prompt: "有经验但讲不成课程，怎么梳理？",
  },
  {
    slug: "lu-xiaobei",
    name: "陆小北",
    role: "企业AI落地顾问",
    image: "/experts/lu-xiaobei.jpg",
    tags: ["企业AI", "智能体"],
    prompt: "企业做AI为什么要先做知识库？",
  },
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
          <a href="/expert-ai-twin">专家版入口</a>
          <a href="#process">如何开始</a>
        </div>
        <a className="nav-cta" href="/diagnosis?audience=founder">先做快速诊断</a>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow">
            <span />
            YOUR ENTRY INTO THE AI ERA
          </p>
          <h1>
            <span className="hero-title-line">不用学复杂AI</span>
            <em className="hero-title-line">经验也能自动积累</em>
          </h1>
          <p className="hero-lead">
            不需要你先整理资料，也不需要研究该买什么、怎样连接。
            <br className="desktop-only" />
            你继续讲话、开会和做决策，我们把它们持续沉淀成真正理解你的AI第二大脑。
          </p>
          <p className="hero-rite"><span>¥3,999 起</span> 完成你的AI时代第一步</p>
          <div className="hero-actions">
            <a className="primary-button" href="/diagnosis?audience=founder">
              2分钟快速诊断 <span>↗</span>
            </a>
            <a className="text-link" href="#process">
              了解交付流程 <span>↓</span>
            </a>
          </div>
          <div className="hero-proof">
            <div>
              <strong>不用学</strong>
              <span>软硬件全部代办</span>
            </div>
            <i />
            <div>
              <strong>15天</strong>
              <span>轻陪跑启动</span>
            </div>
            <i />
            <div>
              <strong>会积累</strong>
              <span>日常经验自动沉淀</span>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-label="内容经过采集和自动同步进入AI第二大脑，再生成内容、回答问题和对外分享">
          <div className="brain-stage">
            <div className="capture-stack">
              <p>CAPTURE / 采集</p>
              <div className="capture-card capture-voice"><span className="capture-icon">●</span><strong>说出来</strong><small>录音与访谈</small></div>
              <div className="capture-card capture-write"><span className="capture-icon">Aa</span><strong>写下来</strong><small>灵感与文章</small></div>
              <div className="capture-card capture-file"><span className="capture-icon">↥</span><strong>传进来</strong><small>文件与资料</small></div>
            </div>
            <div className="sync-rail rail-in"><i /><span>自动转写 · 同步</span></div>
            <div className="brain-core">
              <span className="brain-kicker">YOUR AI FOUNDATION</span>
              <strong>第二大脑</strong>
              <p>持续理解你的经验</p>
              <i className="brain-pulse pulse-one" />
              <i className="brain-pulse pulse-two" />
            </div>
            <div className="sync-rail rail-out"><i /><span>随时调用</span></div>
            <div className="output-stack">
              <p>CREATE / 创造价值</p>
              <div className="output-grid">
                <span>发言稿</span>
                <span>问题回答</span>
                <span>教学内容</span>
                <span>方案与复盘</span>
              </div>
              <div className="share-output"><b>↗</b><span><strong>知识分身</strong><small>分享给团队与客户</small></span></div>
            </div>
          </div>
          <div className="brain-caption"><span>采集</span><i>→</i><span>自动同步</span><i>→</i><span>成为第二大脑</span><i>→</i><span>持续创造</span></div>
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

      <section className="auto-accumulation shell" aria-labelledby="automatic-title">
        <div className="auto-accumulation-copy">
          <p className="section-kicker">AUTOMATIC ACCUMULATION</p>
          <h2 id="automatic-title">你不必停下来整理，<br />系统从今天开始替你积累</h2>
        </div>
        <div className="before-after">
          <article>
            <span>以前</span>
            <strong>经验发生，然后消失</strong>
            <p>会议里的判断、电话里的经验、临时想到的方法，散落在微信、文件和记忆里。</p>
          </article>
          <i>→</i>
          <article className="after-card">
            <span>现在</span>
            <strong>工作照常，知识自动生长</strong>
            <p>按照你的习惯设计采集方式，转写、同步和分类自动完成，AI每天都更理解你。</p>
          </article>
        </div>
      </section>

      <section className="twins-preview shell" aria-labelledby="twins-title">
        <div className="twins-copy">
          <p className="section-kicker">FROM KNOWLEDGE TO PRESENCE</p>
          <h2 id="twins-title">看看知识最终<br />可以变成什么</h2>
          <p>第二大脑不只服务自己。它还可以成为一个随时在线的知识分身，让团队、客户和学员直接与你的经验对话。</p>
          <a href="https://agent.aiarrival.cn/" target="_blank" rel="noreferrer">进入知识分身展厅 <span>↗</span></a>
        </div>
        <div className="twin-fan">
          {twinExamples.map((expert, index) => (
            <a
              className={`twin-card twin-card-${index + 1}`}
              href={`https://agent.aiarrival.cn/agents/${expert.slug}`}
              target="_blank"
              rel="noreferrer"
              key={expert.slug}
            >
              <img src={expert.image} alt={`${expert.name}的知识分身`} />
              <div>
                <small>知识分身 · 可直接对话</small>
                <h3>{expert.name}</h3>
                <p>{expert.role}</p>
                <span>{expert.tags.join(" · ")}</span>
                <blockquote>“{expert.prompt}”</blockquote>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="manifesto shell" id="path">
        <p className="section-kicker">A COMPLETE PATH</p>
        <h2>
          不是再添一个AI工具，
          <br />
          而是完成一次<em>进入AI时代的系统升级</em>
        </h2>
        <p className="manifesto-copy">
          第二大脑是你在AI时代的个人基础设施。它持续接住你说过、写过和积累过的内容，
          让AI真正理解你，再帮助你创作、回答、教学、复盘，并把经验分享给更多人。
        </p>
        <div className="flow">
          {["多种采集", "自动同步", "第二大脑", "知识分身", "持续进化"].map((item, index) => (
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
          <p>配置完成的软硬件、自动同步脚本、第一版AI知识库、适合你的持续记录方式、知识分身上架权限，以及一份结项报告。</p>
        </div>
      </section>

      <section className="acceptance shell" aria-labelledby="acceptance-title">
        <div className="section-head">
          <div>
            <p className="section-kicker">A CLEAR FINISH LINE</p>
            <h2 id="acceptance-title">不是买几个工具，而是完成一次AI升级</h2>
          </div>
          <p>15天结束时，用明确结果验收，而不是只看账号有没有开通。</p>
        </div>
        <div className="acceptance-grid">
          {acceptance.map(([title, text], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <strong>{title}</strong>
              <p>{text}</p>
            </article>
          ))}
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
            <p>软硬件和自动同步已经配置完成，你也会拿到结项报告与知识分身上架权限</p>
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
            <summary>¥3,999具体包含哪些费用？</summary>
            <p>
              包含诊断后确认的采集硬件、收费软件第一年订阅、账号注册与配置、录音转写和自动同步脚本、知识库打通、15天轻陪跑、结项报告及知识分身上架权限。特殊设备、额外账号或超出确认方案的增购会提前说明。
            </p>
          </details>
          <details>
            <summary>¥9,999是在¥3,999之外再加收吗？</summary>
            <p>
              不是。¥9,999是包含启动服务全部内容的完整套餐，并增加个人AI知识分身设计、常用工作场景与提示词、专属工作台、使用培训和持续优化支持。
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
            <a href="/diagnosis?audience=founder">
              开始2分钟快速诊断 <span>↗</span>
            </a>
            <small>先留下基本需求并获得初步建议，再自愿继续完整评估</small>
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
