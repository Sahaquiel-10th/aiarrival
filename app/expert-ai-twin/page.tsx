import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "专家AI分身启动计划｜降临科技",
  description: "让课程、咨询、内容和客户答疑自动沉淀，15天建立一个能够持续服务客户的专家AI知识分身。",
};

const expertPains = [
  ["课讲完了", "学员的问题还在不断出现"],
  ["经验很多", "却很难持续整理成内容"],
  ["重复答疑", "时间被低价值沟通占满"],
  ["想做AI助教", "但没有时间研究工具"],
];

const outcomes = [
  ["课程AI助教", "让学员先向AI提问，常见问题不再反复亲自回答"],
  ["咨询知识顾问", "把案例、方法和判断变成客户可以持续调用的服务"],
  ["内容创作助手", "调用你过去的表达和观点，辅助生成文章、课程与发言稿"],
];

const delivery = [
  ["理解你的服务", "确认课程、咨询、内容和客户答疑中最值得沉淀的部分"],
  ["搭好采集系统", "代办设备、软件和账号，让授课、交流和文字自动进入知识库"],
  ["建立知识分身", "配置身份、边界、常见问题和对外展示入口"],
  ["陪跑并验收", "用真实客户问题测试，交付知识资产地图和持续更新方法"],
];

const expertExamples = [
  {
    slug: "he-yun",
    name: "何韵",
    role: "知识型IP与课程顾问",
    image: "/experts/he-yun.jpg",
    prompt: "有经验但讲不成课程，应该怎么梳理？",
  },
  {
    slug: "lin-zhiyuan",
    name: "林知远",
    role: "制造业转型顾问",
    image: "/experts/lin-zhiyuan.jpg",
    prompt: "老员工经验如何变成组织能力？",
  },
  {
    slug: "lu-xiaobei",
    name: "陆小北",
    role: "企业AI落地顾问",
    image: "/experts/lu-xiaobei.jpg",
    prompt: "企业做AI为什么要先做知识库？",
  },
];

export default function ExpertAiTwinPage() {
  return (
    <main className="expert-landing">
      <nav className="nav shell">
        <a className="brand" href="#top" aria-label="专家AI分身启动计划首页">
          <img className="brand-mark" src="/brand/jianglin-mark.png" alt="" />
          <span>专家AI分身</span>
        </a>
        <div className="nav-links">
          <a href="/">降临科技</a>
          <a href="/knowledge-assets">创始人版入口</a>
          <a href="#outcomes">能做什么</a>
          <a href="#delivery">如何交付</a>
        </div>
        <a className="nav-cta" href="/diagnosis?audience=expert">先做快速诊断</a>
      </nav>

      <section className="expert-hero shell" id="top">
        <div className="expert-hero-copy">
          <h1><span>让你的专业能力，</span><em><span>拥有一个永不疲惫的</span><span>AI助手</span></em></h1>
          <p>不需要先整理几十篇文章，也不需要自己研究AI。你继续讲课、咨询和服务客户，我们负责把每天正在发生的专业经验自动沉淀成知识分身。</p>
          <p className="hero-rite"><span>¥3,999 起</span> 15天启动专家AI分身</p>
          <div className="hero-actions">
            <a className="primary-button" href="/diagnosis?audience=expert">2分钟快速诊断 <span>↗</span></a>
            <a className="text-link" href="https://agent.aiarrival.cn/" target="_blank" rel="noreferrer">先体验知识分身 <span>↗</span></a>
          </div>
          <div className="hero-proof">
            <div><strong>自动积累</strong><span>授课与咨询内容</span></div><i />
            <div><strong>完全代办</strong><span>设备软件与连接</span></div><i />
            <div><strong>可分享</strong><span>给学员和客户</span></div>
          </div>
        </div>

        <div className="expert-presence expert-flow-visual" aria-label="讲课、咨询和文章自动进入专家知识分身，再形成学员答疑、课程内容和咨询服务">
          <div className="expert-flow-column expert-flow-inputs">
            <small>你的专业工作</small>
            <div><b>讲</b><span><strong>讲课与直播</strong><em>完整记录表达</em></span></div>
            <div><b>询</b><span><strong>咨询与答疑</strong><em>沉淀真实案例</em></span></div>
            <div><b>文</b><span><strong>文章与资料</strong><em>汇入既有知识</em></span></div>
          </div>
          <div className="expert-flow-wires wires-in" aria-hidden="true"><i /><i /><i /></div>
          <div className="expert-flow-core">
            <img src="/experts/he-yun.jpg" alt="专家形象示例" />
            <div><small>自动学习 · 持续更新</small><strong>专家AI知识分身</strong><span>理解你的方法与表达</span></div>
            <i className="expert-core-ring" />
          </div>
          <div className="expert-flow-wires wires-out" aria-hidden="true"><i /><i /><i /></div>
          <div className="expert-flow-column expert-flow-outputs">
            <small>新的服务能力</small>
            <div><b>答</b><span><strong>学员随时答疑</strong><em>减少重复回答</em></span></div>
            <div><b>课</b><span><strong>生成课程内容</strong><em>调用观点与案例</em></span></div>
            <div><b>询</b><span><strong>咨询预沟通</strong><em>先理解客户问题</em></span></div>
          </div>
          <div className="expert-flow-status"><i />授课照常，专业知识自动积累</div>
        </div>
      </section>

      <section className="pain-strip">
        <div className="shell pain-grid">
          <div className="pain-title"><span>现在的困扰</span><strong>专业能力越强，<br />越容易被自己困住</strong></div>
          {expertPains.map(([title, text], index) => (
            <div className="pain-item" key={title}><span>0{index + 1}</span><div><strong>{title}</strong><p>{text}</p></div></div>
          ))}
        </div>
      </section>

      <section className="expert-outcomes shell" id="outcomes">
        <div className="section-head">
          <div><p className="section-kicker">从专业经验到持续服务</p><h2>你的知识分身，首先解决三件真实的事</h2></div>
          <p>它不是复制人格，也不是普通聊天机器人；它让已经验证过的专业经验拥有新的服务入口。</p>
        </div>
        <div className="expert-outcome-grid">
          {outcomes.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><strong>{title}</strong><p>{text}</p></article>)}
        </div>
      </section>

      <section className="expert-showcase">
        <div className="shell">
          <div className="section-head light">
            <div><p className="section-kicker">先看结果</p><h2>先和几个知识分身聊一聊</h2></div>
            <p>点击人物，直接体验一个专家的知识如何被检索、回答和分享。</p>
          </div>
          <div className="expert-showcase-grid">
            {expertExamples.map((expert) => (
              <a href={`https://agent.aiarrival.cn/agents/${expert.slug}`} target="_blank" rel="noreferrer" key={expert.slug}>
                <img src={expert.image} alt={`${expert.name}的知识分身`} />
                <div><small>知识分身 · 可直接对话</small><h3>{expert.name}</h3><p>{expert.role}</p><blockquote>“{expert.prompt}”</blockquote><span>开始提问 ↗</span></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="expert-delivery shell" id="delivery">
        <div className="section-head">
          <div><p className="section-kicker">15天启动</p><h2>你只负责授权和继续工作，其余交给我们</h2></div>
          <p>启动价包含确认方案内硬件、首年软件、账号配置、数据联通、15天轻陪跑和上架权限。</p>
        </div>
        <div className="expert-delivery-grid">
          {delivery.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><strong>{title}</strong><p>{text}</p></article>)}
        </div>
        <div className="expert-price-path">
          <div><small>第一阶段 · 先获得结果</small><strong>专家AI分身启动服务</strong><b>¥3,999 起</b><p>自动积累知识，可以回答问题并分享给学员或客户。</p></div>
          <i>→</i>
          <div><small>第二阶段 · 开始替你干活</small><strong>AI生产力工具升级</strong><b>升级至 ¥9,999</b><p>启动服务费用计入完整套餐，增加任务智能体、提示词和多知识库培训。</p></div>
          <i>→</i>
          <div><small>第三阶段 · 复制到组织</small><strong>企业AI系统部署</strong><b>¥30,000 起</b><p>让团队成员也拥有基于企业知识与岗位权限的AI助手。</p></div>
        </div>
      </section>

      <section className="cta">
        <div className="shell cta-inner">
          <div><p className="section-kicker">现在开始</p><h2>让专业能力<br />持续在线</h2></div>
          <div className="cta-action"><p>先花2分钟告诉我们你的专业类型、资料现状和希望解决的问题。</p><a href="/diagnosis?audience=expert">开始专家版快速诊断 <span>↗</span></a><small>提交后立即获得初步方向，还可以继续完成深度评估</small></div>
        </div>
      </section>

      <footer className="shell footer">
        <div className="brand"><img className="brand-mark" src="/brand/jianglin-mark.png" alt="" /><span>专家AI分身</span></div>
        <p>让专业经验持续积累，并服务更多人。</p><span>© 2026</span>
      </footer>
    </main>
  );
}
