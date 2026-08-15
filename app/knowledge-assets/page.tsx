import type { Metadata } from "next";
import Link from "next/link";
import FounderNavCta from "./FounderNavCta";
import FounderStory from "./FounderStory";
import IcpRecord from "../../components/IcpRecord";

export const metadata: Metadata = {
  title: "全程代办，到手即用｜创始人AI第二大脑启动计划",
  description: "不用从头整理资料，我们帮你建立一个会自动积累的AI助手，让每一次沟通、会议和决策沉淀为组织可以调用的经验资产。",
  openGraph: {
    title: "全程代办，到手即用",
    description: "让AI自动记住你的每一句话，15天启动创始人AI第二大脑。",
    images: [{ url: "/og-founder-v2.png", width: 1536, height: 1024, alt: "全程代办，到手即用" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "全程代办，到手即用",
    description: "让AI自动记住你的每一句话，15天启动创始人AI第二大脑。",
    images: ["/og-founder-v2.png"],
  },
};

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
            <a href="#results">15天后得到什么</a>
            <a href="#why">为什么需要</a>
            <a href="#service">我们如何完成</a>
            <a href="#upgrade">未来升级</a>
          </div>
          <FounderNavCta />
        </nav>
      </header>

      <FounderStory />

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
        <p>AI不用从头学，到手即用，让AI自动记住你的每一句话。</p>
        <div className="footer-legal"><span>© 2026</span><IcpRecord /></div>
      </footer>
    </main>
  );
}
