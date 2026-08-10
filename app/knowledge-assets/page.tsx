import type { Metadata } from "next";
import Link from "next/link";
import FounderNavCta from "./FounderNavCta";

export const metadata: Metadata = {
  title: "AI不用从头学，到手即用｜创始人AI第二大脑启动计划",
  description: "不用从头整理资料，我们帮你建立一个会自动积累的AI助手，让每一次沟通、会议和决策沉淀为组织可以调用的经验资产。",
  openGraph: {
    title: "AI不用从头学，到手即用",
    description: "让AI自动记住你的每一句话，15天启动创始人AI第二大脑。",
    images: [{ url: "/og-founder.png", width: 1732, height: 908, alt: "AI不用从头学，到手即用" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI不用从头学，到手即用",
    description: "让AI自动记住你的每一句话，15天启动创始人AI第二大脑。",
    images: ["/og-founder.png"],
  },
};

const wasteQuestions = [
  "哪些客户值得合作？",
  "哪些项目应该放弃？",
  "如何培养团队？",
  "如何解决复杂问题？",
];

const outcomes = [
  {
    index: "01",
    title: "一个懂你的AI助手",
    text: "理解你的经验、方法和判断方式，帮助你回答问题、辅助思考和生成内容。",
    tags: ["懂你的经验", "辅助思考", "生成内容"],
  },
  {
    index: "02",
    title: "一个自动积累系统",
    text: "不改变工作习惯，每次开会、接客户，只按一个按键，之后的积累、分析、回答，都交给AI。",
    tags: ["自动转写", "自动同步", "持续积累"],
  },
  {
    index: "03",
    title: "一套企业AI基础",
    text: "从个人经验开始，未来可以继续升级成工作助手、团队知识助手和企业AI员工。",
    tags: ["个人先用", "帮助工作", "复制给团队"],
  },
];

const serviceProcess = [
  ["设计采集方式", "先了解你的工作习惯，再设计最省事的记录方式。会议、沟通、文字和临时想法都可以被接住。"],
  ["完成系统配置", "设备、软件、账号、知识库和AI助手全部协助选购、注册、连接和配置，你不用研究工具。"],
  ["持续积累优化", "15天轻陪跑帮助你真正用起来。此后工作照常，新的经验会继续丰富AI对你的理解。"],
];

const upgradeStages = [
  {
    index: "01",
    tone: "green",
    name: "AI第二大脑搭建",
    price: "¥3,999 起",
    promise: "让AI开始学习你的经验",
    fit: "希望建立自己的AI知识体系，让经验持续积累的创始人。",
    items: ["AI知识库体系搭建方案 ×1", "自动记录设备 ×1", "AI笔记系统 ×1", "自动同步脚本配置 ×1", "知识采集方式设计", "创始人深度访谈 ×1", "15天轻陪跑 ×1", "知识分身开放权限 ×1"],
    result: "建立个人AI知识资产基础，让你的经验可以持续记录、沉淀和调用。",
    footnote: "包含确认方案内的软硬件费用；特殊设备或额外账号会提前确认。",
  },
  {
    index: "02",
    tone: "blue",
    name: "AI工作助手搭建",
    price: "¥9,999 起",
    promise: "让AI基于你的经验开始帮你工作",
    fit: "已经拥有个人AI知识资产，希望进一步让AI参与具体工作的用户。",
    items: ["AI第二大脑搭建全套服务 ×1", "AI工作助手开发权限 ×1", "专属AI工作台 ×1", "AI助手培训 ×1", "工作场景智能体配置", "提示词模板设计", "社群持续支持"],
    result: "基于你的知识资产，打造属于你的AI生产力工具。",
    footnote: "¥9,999包含第一阶段全套服务，不重复收取第一阶段费用。",
  },
  {
    index: "03",
    tone: "orange",
    name: "升级到企业知识资产系统",
    price: "¥30,000 起",
    promise: "让个人经验变成企业可复制能力",
    fit: "希望将个人经验、团队经验沉淀为企业资产的企业。",
    items: ["企业知识库系统建设服务", "多账号协同体系搭建", "企业级智能体建设", "企业私有化部署（可选）"],
    result: "将个人AI经验体系扩展到企业，让团队共享组织知识。",
    footnote: "根据企业规模、资料数量、使用人数和具体用途确定方案。",
  },
];

const fitReasons = [
  ["创业多年", "有大量经验，却一直没有系统沉淀"],
  ["依赖老板", "企业的重要判断仍然离不开你本人"],
  ["反复回答", "员工经常就相似问题向你请示"],
  ["想做企业AI", "希望AI真正进入业务，但不知道从哪里开始"],
];

const twinExamples = [
  { slug: "lin-zhiyuan", name: "林知远", role: "制造业转型顾问", image: "/experts/lin-zhiyuan.jpg", tags: ["组织转型", "经营复盘"] },
  { slug: "he-yun", name: "何韵", role: "知识型IP与课程顾问", image: "/experts/he-yun.jpg", tags: ["课程设计", "内容体系"] },
  { slug: "lu-xiaobei", name: "陆小北", role: "企业AI落地顾问", image: "/experts/lu-xiaobei.jpg", tags: ["企业AI", "经营经验"] },
];

export default function FounderAiPage() {
  return (
    <main className="founder-landing">
      <header className="founder-sticky-header">
        <nav className="nav shell">
          <a className="brand" href="#top" aria-label="创始人AI经验资产化服务首页">
            <img className="brand-mark" src="/brand/jianglin-mark.png" alt="" />
            <span>创始人AI第二大脑启动计划</span>
          </a>
          <div className="nav-links">
            <Link href="/">降临科技</Link>
            <a href="#why">为什么需要</a>
            <a href="#results">15天后得到什么</a>
            <a href="#service">我们如何完成</a>
            <a href="#upgrade">未来升级</a>
          </div>
          <FounderNavCta />
        </nav>
      </header>

      <section className="hero shell founder-hero-v2" id="top">
        <div className="founder-hero-headline">
          <h1>
            <span className="founder-title-row"><span>AI不用从头学，</span><em>到手即用</em></span>
            <em className="hero-title-line">让AI自动记住你的每一句话</em>
          </h1>
          <p className="hero-lead founder-hero-lead">
            <span>不用从头整理资料，我们帮你建立一个会自动积累的AI助手</span>
            <span>你的每一次沟通、会议和决策，都沉淀为组织可以调用的经验资产。</span>
          </p>
          <div className="hero-actions founder-hero-actions">
            <div className="hero-primary-action">
              <a className="primary-button" href="/diagnosis?audience=founder">点此立即加入【AI第二大脑启动计划】 <span>↗</span></a>
              <small>2分钟完成，了解你的经验是否适合AI资产化</small>
            </div>
          </div>
          <div className="hero-proof founder-proof">
            <div><strong>不用整理资料</strong><span>从正在发生的工作开始</span></div><i />
            <div><strong>15天启动</strong><span>软硬件全套，到手即用</span></div><i />
            <div><strong>后续自动积累</strong><span>AI会越来越理解你</span></div>
          </div>
        </div>

        <div className="hero-visual boss-day-flow founder-experience-flow" aria-label="老板日常的经营会议、客户沟通、经营方法和项目复盘自动积累到AI第二大脑，再用于回答问题、新员工培训、客户挖掘和辅助决策">
          <div className="boss-visual-title"><strong>AI第二大脑</strong><span>经验自动积累与调用示意</span></div>
          <div className="boss-day-inputs">
            <small>老板日常的经验与知识</small>
            <div><b>会</b><span><strong>经营会议</strong><em>讨论与判断</em></span></div>
            <div><b>客</b><span><strong>客户沟通</strong><em>需求与经验</em></span></div>
            <div><b>法</b><span><strong>经营方法</strong><em>取舍与方法</em></span></div>
            <div><b>复</b><span><strong>项目复盘</strong><em>教训与总结</em></span></div>
          </div>
          <div className="boss-flow-lines boss-lines-in" aria-hidden="true"><i /><i /><i /><i /></div>
          <div className="boss-auto-label">自动积累</div>
          <div className="boss-auto-core">
            <strong>提取重点</strong><i />
            <strong>整理经验</strong><i />
            <strong>持续沉淀</strong>
            <span>无需改变工作方式</span>
          </div>
          <div className="boss-flow-lines boss-lines-out" aria-hidden="true"><i /><i /><i /><i /></div>
          <div className="boss-use-cases">
            <small>经验可以用在这里</small>
            <div><b>答</b><span><strong>回答问题</strong><em>调用真实经营经验</em></span></div>
            <div><b>带</b><span><strong>带新员工</strong><em>讲清标准与方法</em></span></div>
            <div><b>客</b><span><strong>客户挖掘</strong><em>辅助判断与跟进</em></span></div>
            <div><b>决</b><span><strong>辅助决策</strong><em>提供经验参考</em></span></div>
          </div>
          <div className="boss-flow-caption"><i />老板继续经营，AI负责积累</div>
        </div>
      </section>

      <section className="experience-waste" id="why">
        <div className="shell experience-waste-grid">
          <div>
            <p className="section-kicker">正在消失的企业资产</p>
            <h2>AI时代，老板最大的资产正在被浪费</h2>
            <p>每个创业者都有多年积累的判断、经验和方法。它们很有价值，却常常只存在于脑子里、聊天记录里、会议里和文件里，无法被团队持续调用。</p>
          </div>
          <div className="waste-questions">
            {wasteQuestions.map((question, index) => <div key={question}><span>0{index + 1}</span><strong>{question}</strong></div>)}
          </div>
          <div className="waste-conclusion"><span>我们帮助你</span><strong>把个人经验，变成企业可以持续使用的AI资产。</strong></div>
        </div>
      </section>

      <section className="founder-results shell" id="results" aria-labelledby="results-title">
        <div className="section-head">
          <div><p className="section-kicker">先看结果</p><h2 id="results-title">15天后，你将拥有</h2></div>
        </div>
        <div className="founder-result-grid">
          {outcomes.map((outcome) => (
            <article key={outcome.title}>
              <span>{outcome.index}</span><strong>{outcome.title}</strong><p>{outcome.text}</p>
              <div>{outcome.tags.map((tag) => <small key={tag}>{tag}</small>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="twins-preview shell" aria-labelledby="twins-title">
        <div className="twins-copy">
          <p className="section-kicker">看得见的结果</p>
          <h2 id="twins-title">你的经验，还可以成为随时在线的知识分身</h2>
          <p>当AI开始理解你，它不仅能服务自己，也可以回答团队、客户和学员的问题。</p>
          <a href="https://agent.aiarrival.cn/" target="_blank" rel="noreferrer">进入知识分身展厅 <span>↗</span></a>
        </div>
        <div className="twin-fan">
          {twinExamples.map((expert, index) => (
            <a className={`twin-card twin-card-${index + 1}`} href={`https://agent.aiarrival.cn/agents/${expert.slug}`} target="_blank" rel="noreferrer" key={expert.slug}>
              <img src={expert.image} alt={`${expert.name}的知识分身`} />
              <div><small>知识分身 · 可直接对话</small><h3>{expert.name}</h3><p>{expert.role}</p><span>{expert.tags.join(" · ")}</span></div>
            </a>
          ))}
        </div>
      </section>

      <section className="process founder-service" id="service">
        <div className="shell">
          <div className="section-head light">
            <div><p className="section-kicker">全流程代办</p><h2>我们帮你完成第一次AI经验资产化</h2></div>
            <p>你只需要告诉我们习惯，并开放必要权限；选择、购买、注册、配置和连接由我们协助完成。</p>
          </div>
          <div className="founder-process-grid">
            {serviceProcess.map(([title, text], index) => (
              <article key={title}><span>0{index + 1}</span><strong>{title}</strong><p>{text}</p></article>
            ))}
          </div>
          <div className="founder-service-note"><span>15天轻陪跑</span><strong>不要求你停下来整理过去，从今天正在发生的工作开始。</strong><p>结束时交付已配置的采集方式、自动同步链路、可使用的AI助手、知识分身上架权限和结项报告。</p></div>
        </div>
      </section>

      <section className="fit founder-fit shell">
        <div className="fit-copy">
          <p className="section-kicker">适合人群</p>
          <h2>如果你符合这些情况，这个服务适合你</h2>
          <p>你不需要先懂AI。经验越多、企业越依赖你的判断，越值得先从老板自己的AI助手开始。</p>
        </div>
        <div className="fit-situation-grid">
          {fitReasons.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><strong>{title}</strong><p>{text}</p></article>)}
        </div>
      </section>

      <section className="services founder-upgrade" id="upgrade">
        <div className="shell">
          <div className="section-head">
            <div><p className="section-kicker">让AI学习你的经验，并逐渐成为你的生产力助手</p><h2>从个人经验沉淀，到企业知识资产体系</h2></div>
            <p>先让AI学会你的经验，再让AI帮助你的工作，最终让企业拥有可复制的知识资产。</p>
          </div>
          <div className="stage-list">
            {upgradeStages.map((stage) => (
              <article className={`stage stage-${stage.tone}`} key={stage.name}>
                <div className="stage-index">{stage.index}</div>
                <div className="stage-main">
                  <p>{stage.promise}</p><h3>{stage.name}</h3>
                  <p className="stage-fit"><strong>适合：</strong>{stage.fit}</p>
                  <div className="stage-includes"><span>包含：</span><ul>{stage.items.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul></div>
                  <p className="stage-delivery-result"><strong>交付结果：</strong>{stage.result}</p>
                </div>
                <div className="stage-price"><span>服务价格</span><strong>{stage.price}</strong><small>{stage.footnote}</small></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="faq shell">
        <div className="faq-title"><p className="section-kicker">常见问题</p><h2>你可能关心的问题</h2></div>
        <div className="faq-list">
          <details><summary>我完全不懂AI，也没有常用工具，可以做吗？</summary><p>可以。你只需告诉我们平时怎样工作、资料大概在哪里、希望AI以后帮助什么。我们会推荐最省事的方案，并协助完成选择、注册、设置和使用。</p></details>
          <details><summary>我是不是需要先整理大量资料？</summary><p>不需要。我们会从你正在发生的会议、沟通、复盘和思考开始设计采集方式。过去的资料可以以后按需要逐步加入。</p></details>
          <details><summary>¥3,999具体包含哪些费用？</summary><p>包含诊断后确认的采集硬件、收费软件第一年订阅、账号注册与配置、录音转写和自动同步脚本、知识库连接、15天轻陪跑、结项报告及知识分身上架权限。特殊设备、额外账号或超出确认方案的增购会提前说明。</p></details>
          <details><summary>¥9,999是在¥3,999之外再加收吗？</summary><p>不是。¥9,999是包含启动服务全部内容的完整套餐，并增加常用工作任务设计、个人AI工作台、使用培训和持续优化支持。</p></details>
          <details><summary>个人AI助手以后怎么升级成企业AI？</summary><p>先让AI理解老板的经验，再选择一个真实工作场景做AI工作助手。验证有效后，才把知识、权限和工作方式复制到销售、客服或培训等团队岗位。</p></details>
        </div>
      </section>

      <section className="cta" id="contact">
        <div className="shell cta-inner">
          <div><p className="section-kicker">先判断是否适合</p><h2>看看你的经验，<br />能否成为AI资产</h2></div>
          <div className="cta-action"><p>花2分钟完成评估，了解你的经验目前处在哪个阶段，以及最适合从哪里开始。</p><a href="/diagnosis?audience=founder">免费评估我的AI资产价值 <span>↗</span></a><small>提交后立即获得初步方向，再自愿继续完整评估</small></div>
        </div>
      </section>

      <footer className="shell footer">
        <div className="brand"><img className="brand-mark" src="/brand/jianglin-mark.png" alt="" /><span>创始人AI第二大脑启动计划</span></div>
        <p>AI不用从头学，到手即用，让AI自动记住你的每一句话。</p><span>© 2026</span>
      </footer>
    </main>
  );
}
