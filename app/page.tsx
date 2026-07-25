const stages = [
  {
    index: "01",
    tone: "green",
    name: "AI知识资产启动",
    price: "¥3,999 起",
    promise: "先让经验沉淀下来",
    description:
      "用一套适合你的记录与知识管理流程，把散落在脑海、聊天和文件里的经验，变成随时可找、可复用的个人知识库。",
    items: [
      "AI知识资产诊断报告",
      "知识采集与分类体系",
      "硬件设备与AI工具配置",
      "首批知识资产整理",
      "15天轻度陪跑",
      "AI知识资产成长报告",
    ],
    footnote: "可包含录音卡、工具年费；按配置确定最终价格",
  },
  {
    index: "02",
    tone: "blue",
    name: "AI知识资产升级",
    price: "¥9,999",
    promise: "再让知识开始帮你工作",
    description:
      "把个人知识库接入专属AI工作台。你将获得创建AI助手的方法、模板与持续训练，让AI基于你的知识协助思考与表达。",
    items: [
      "个人AI工作台账号",
      "知识库接入",
      "智能体设计集中培训",
      "提示词与行业模板库",
      "持续成长支持",
      "模型用量自主充值",
    ],
    footnote: "提供方法、模板和培训，不包含定制智能体开发",
  },
  {
    index: "03",
    tone: "orange",
    name: "企业知识资产系统",
    price: "¥30,000 起",
    promise: "最终把个人经验变成组织能力",
    description:
      "把个人知识沉淀方式扩展到团队，形成企业知识空间、多账号协作与权限体系，为企业AI应用打下可靠基础。",
    items: [
      "企业知识库建设",
      "多账号与权限体系",
      "企业资料结构化沉淀",
      "基础AI应用场景设计",
      "数据安全与访问边界",
      "后续智能体升级路线",
    ],
    footnote: "按企业规模、数据量、人数与应用场景定制",
  },
];

const pains = [
  ["经验在脑子里", "想用时找不到"],
  ["信息散落各处", "整理总是拖延"],
  ["反复回答问题", "时间被持续消耗"],
  ["知道AI有用", "却不知道怎么连接自己的知识"],
];

const process = [
  ["诊断", "看清你的知识资产现状与真正需求"],
  ["配置", "选择合适工具，完成账号、设备与流程搭建"],
  ["沉淀", "整理首批资料，让第一次成果肉眼可见"],
  ["陪跑", "用15天调整习惯、分类和实际使用方式"],
  ["成长", "从个人知识库，逐步走向AI助手与团队能力"],
];

export default function Home() {
  return (
    <main>
      <nav className="nav shell">
        <a className="brand" href="#top" aria-label="AI知识资产服务体系首页">
          <span className="brand-mark">AI</span>
          <span>知识资产服务体系</span>
        </a>
        <div className="nav-links">
          <a href="#path">成长路径</a>
          <a href="#services">服务方案</a>
          <a href="#process">如何开始</a>
        </div>
        <a className="nav-cta" href="#contact">获取方案</a>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow">
            <span />
            AI KNOWLEDGE ASSETS
          </p>
          <h1>
            让你的经验
            <br />
            <em>持续产生价值</em>
          </h1>
          <p className="hero-lead">
            我们帮你完成从记录、整理、沉淀到AI调用的完整链路。
            <br className="desktop-only" />
            复杂交给我们，简单留给你。
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#services">
              查看服务方案 <span>↗</span>
            </a>
            <a className="text-link" href="#process">
              了解交付流程 <span>↓</span>
            </a>
          </div>
          <div className="hero-proof">
            <div>
              <strong>7–15天</strong>
              <span>看见首批成果</span>
            </div>
            <i />
            <div>
              <strong>3阶段</strong>
              <span>从个人到企业</span>
            </div>
            <i />
            <div>
              <strong>1个开关</strong>
              <span>开始记录经验</span>
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
            <span>调用</span>
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
          不是再买一个工具，
          <br />
          而是建立一套<em>真正运转的系统</em>
        </h2>
        <p className="manifesto-copy">
          工具会变化，但知识资产的成长路径不会。我们从你的工作习惯出发，
          选择适合的设备和平台，把复杂配置藏在后台，把可见结果留在前台。
        </p>
        <div className="flow">
          {["记录", "整理", "沉淀", "调用", "创造"].map((item, index) => (
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
              <h2>从今天的经验，到明天的生产力</h2>
            </div>
            <p>
              每一阶段都独立创造价值，
              <br />
              也为下一阶段保留自然升级空间。
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
            得到、Notion、飞书或企业已有系统，
            <br />
            都只是底座。我们交付的是：
            <em>让知识资产真正运转起来。</em>
          </blockquote>
        </div>
        <div className="principle-aside">
          <span>OUR PRINCIPLE</span>
          <p>不让客户学习一堆技术名词，而是让结果自然发生。</p>
        </div>
      </section>

      <section className="process" id="process">
        <div className="shell">
          <div className="section-head light">
            <div>
              <p className="section-kicker">HOW IT WORKS</p>
              <h2>你只需要开始记录，剩下的交给我们</h2>
            </div>
            <p>标准化交付，过程清晰，成果可见。</p>
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
            <strong>你将拥有一套已开始运行的个人知识资产系统</strong>
            <p>以及一份清晰的《AI知识资产成长报告》与下一阶段路线图</p>
          </div>
        </div>
      </section>

      <section className="fit shell">
        <div className="fit-copy">
          <p className="section-kicker">WHO IT’S FOR</p>
          <h2>尤其适合以经验为核心竞争力的人</h2>
          <p>
            你的专业判断、客户案例、课程方法、管理经验越多，
            越值得尽早变成可以被检索、调用和复制的知识资产。
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
              可以。问卷和诊断就是为了判断你的习惯与需求。没有明确偏好时，我们会提供最快启动的推荐配置，并协助完成注册、设置和使用说明。
            </p>
          </details>
          <details>
            <summary>为什么不直接买一个知识库软件？</summary>
            <p>
              软件提供功能，我们提供诊断、选型、流程设计、首批整理和陪跑，确保工具真正变成你的工作习惯与可复用资产。
            </p>
          </details>
          <details>
            <summary>升级服务会帮我定制开发智能体吗？</summary>
            <p>
              不包含定制开发。升级服务提供AI工作台、知识库接入、培训与模板，帮助你自己创建助手；复杂业务场景可另行进入专业开发。
            </p>
          </details>
          <details>
            <summary>企业版和个人版的核心区别是什么？</summary>
            <p>
              企业版增加多账号、权限边界、团队知识空间与企业级资料结构，为后续销售、培训、客服等AI应用奠定基础。
            </p>
          </details>
        </div>
      </section>

      <section className="cta" id="contact">
        <div className="shell cta-inner">
          <div>
            <p className="section-kicker">START NOW</p>
            <h2>
              开启你的
              <br />
              AI知识资产之旅
            </h2>
          </div>
          <div className="cta-action">
            <p>从一份诊断问卷开始，获得适合你的配置建议。</p>
            <a href="mailto:hello@example.com">
              获取专属方案 <span>↗</span>
            </a>
            <small>此处可替换为企业微信、二维码或正式联系方式</small>
          </div>
        </div>
      </section>

      <footer className="shell footer">
        <div className="brand">
          <span className="brand-mark">AI</span>
          <span>知识资产服务体系</span>
        </div>
        <p>让经验沉淀，让知识流动，让AI创造价值。</p>
        <span>© 2026</span>
      </footer>
    </main>
  );
}
