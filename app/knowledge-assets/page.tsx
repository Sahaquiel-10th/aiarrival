import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI知识资产服务体系｜降临科技",
  description: "把散落的个人与企业经验整理成随时能找到、还能让AI协助使用的知识资产。",
};

const stages = [
  {
    index: "01",
    tone: "green",
    name: "AI知识资产启动",
    price: "¥3,999 起",
    promise: "先把散落的经验整理到一起",
    description:
      "我们帮你选好记录方式和保存工具，并整理第一批资料。以后你照常说、照常工作，重要内容就能持续保存，需要时很快找到。",
    items: [
      "个人知识现状诊断",
      "日常记录方法设计",
      "录音设备与软件设置",
      "第一批文章和资料整理",
      "15天使用陪伴与调整",
      "最终使用报告与建议",
    ],
    footnote: "可包含录音卡和软件年费，最终价格根据所选方案确定",
  },
  {
    index: "02",
    tone: "blue",
    name: "AI知识资产升级",
    price: "¥9,999",
    promise: "再让AI学会使用你的资料",
    description:
      "你可以在专属网页里向AI提问，让它先阅读你的文章、课程和案例，再帮你写内容、找资料、整理思路和分析问题。",
    items: [
      "专属AI网页账号",
      "个人资料接入",
      "AI助手使用课程",
      "现成的提问与写作模板",
      "每月集中答疑与更新",
      "使用费用按需自行充值",
    ],
    footnote: "教你自己设置常用AI助手；如需我们代做，可单独定制",
  },
  {
    index: "03",
    tone: "orange",
    name: "企业知识资产系统",
    price: "¥30,000 起",
    promise: "让团队也能找到并使用公司的经验",
    description:
      "把公司制度、产品资料、客户案例和优秀员工经验整理到一起。不同岗位可以查看自己需要的内容，也能用AI快速查找和提问。",
    items: [
      "公司资料统一整理",
      "员工账号与查看范围设置",
      "制度、案例和经验分类",
      "团队最常用的AI用途规划",
      "重要资料安全保护",
      "后续企业AI应用建议",
    ],
    footnote: "根据企业规模、资料数量、使用人数和具体用途确定方案",
  },
];

const pains = [
  ["经验都在脑子里", "需要时想不全、找不到"],
  ["资料散落很多地方", "微信、电脑和笔记各存一份"],
  ["同样的问题反复回答", "时间花了，经验却没留下"],
  ["想让AI帮忙", "却不知道第一步该做什么"],
];

const process = [
  ["了解", "先弄清你的资料在哪里、平时怎样工作"],
  ["搭建", "帮你选好工具，设置账号、设备和记录方式"],
  ["整理", "整理第一批文章、课程、案例和工作资料"],
  ["试用", "陪你使用15天，根据实际情况不断调整"],
  ["交付", "给你最终报告，告诉你怎样继续使用和升级"],
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
          <a href="/">降临科技</a>
          <a href="#path">三步方案</a>
          <a href="#services">服务方案</a>
          <a href="#process">如何开始</a>
        </div>
        <a className="nav-cta" href="/diagnosis">先做免费诊断</a>
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
            把你说过的话、做过的项目和多年经验，整理成随时能找到、还能让AI帮你使用的个人资料库。
            <br className="desktop-only" />
            工具怎么选、账号怎么设、资料怎么整理，都交给我们。
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="/diagnosis">
              先测测我的情况 <span>↗</span>
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
              <span>说话时打开录音</span>
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
          而是把你的经验<em>真正整理好、用起来</em>
        </h2>
        <p className="manifesto-copy">
          你不用先学会Notion、飞书或各种AI工具。我们会根据你的工作习惯选好方案，
          帮你完成设置和第一批整理。以后你只需照常记录，需要时打开网页搜索或提问。
        </p>
        <div className="flow">
          {["说下来", "转成文字", "分类保存", "随时找到", "继续使用"].map((item, index) => (
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
              <h2>先整理个人经验，再让AI和团队用起来</h2>
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
            你不用研究到底该买哪款软件。
            <br />
            告诉我们你平时怎样工作，
            <em>我们负责选好、设好，并陪你真正用起来。</em>
          </blockquote>
        </div>
        <div className="principle-aside">
          <span>你会得到什么</span>
          <p>你照常记录和工作。需要过去的内容时，可以很快找到，也可以请AI根据这些资料继续写作和思考。</p>
        </div>
      </section>

      <section className="process" id="process">
        <div className="shell">
          <div className="section-head light">
            <div>
              <p className="section-kicker">HOW IT WORKS</p>
              <h2>你只需要开始记录，剩下的交给我们</h2>
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
            <strong>你的第一批经验和资料已经整理完成，可以随时查找</strong>
            <p>你还会收到一份使用报告，知道以后怎样继续记录和使用</p>
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
              升级服务会给你专属AI网页、接入你的资料，并提供课程和现成模板，教你设置日常使用的助手。如果你的需求更复杂，需要我们代为制作，可以单独定制。
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
            <h2>
              开始整理
              <br />
              你的宝贵经验
            </h2>
          </div>
          <div className="cta-action">
            <p>花几分钟回答一些关于工作和资料的问题，马上看到适合你的起步建议。</p>
            <a href="/diagnosis">
              开始免费诊断 <span>↗</span>
            </a>
            <small>填写完成后立即查看结果，无需提前了解AI工具</small>
          </div>
        </div>
      </section>

      <footer className="shell footer">
        <div className="brand">
          <span className="brand-mark">AI</span>
          <span>知识资产服务体系</span>
        </div>
        <p>把过去的经验整理好，让今天的工作更轻松。</p>
        <span>© 2026</span>
      </footer>
    </main>
  );
}
