"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const results = [
  ["懂", "一个懂你的AI助手", "理解你的经验、方法和判断方式，帮助回答问题、辅助思考和生成内容。"],
  ["积", "一个自动积累系统", "不改变工作习惯，会议、沟通和决策持续沉淀，AI越来越理解你。"],
  ["企", "一套企业AI基础", "从个人经验开始，未来继续扩展为工作助手、团队知识助手和企业AI员工。"],
];

const flows = [
  ["经营会议", "讨论与判断", "回答问题", "调用真实经营经验"],
  ["客户沟通", "需求与经验", "客户挖掘", "辅助判断与跟进"],
  ["经营方法", "取舍与方法", "带新员工", "讲清标准与方法"],
  ["项目复盘", "教训与总结", "辅助决策", "提供经验参考"],
];

const sources = ["脑子里", "聊天记录里", "会议里", "文件里"];
const questions = ["哪些客户值得合作？", "哪些项目应该放弃？", "如何培养团队？", "如何解决复杂问题？"];

const services = [
  ["01", "设计采集方式", "先了解你的工作习惯，再设计最省事的记录方式。"],
  ["02", "完成系统配置", "设备、软件、账号、知识库和AI助手全部协助完成。"],
  ["03", "持续积累优化", "15天轻陪跑帮助你真正用起来，此后工作照常，经验持续沉淀。"],
];

function clamp(value: number, minimum = 0, maximum = 1) {
  return Math.min(maximum, Math.max(minimum, value));
}

function smoothstep(from: number, to: number, value: number) {
  const progress = clamp((value - from) / Math.max(.0001, to - from));
  return progress * progress * (3 - 2 * progress);
}

function sceneOpacity(progress: number, start: number, end: number, first = false, last = false) {
  const enter = first ? 1 : smoothstep(start - .01, start + .012, progress);
  const exit = last ? 1 : 1 - smoothstep(end - .012, end + .01, progress);
  return enter * exit;
}

function MobileBrain({ mode = "name" }: { mode?: "name" | "process" }) {
  return (
    <div className="mobile-story-brain" aria-label="AI第二大脑">
      <div className="mobile-story-orbit orbit-one"><i /><i /><i /></div>
      <div className="mobile-story-orbit orbit-two"><i /><i /></div>
      <div className="mobile-story-sphere" />
      {mode === "name" ? <div className="mobile-story-brain-name"><b>AI</b><span>第二大脑</span></div> : <div className="mobile-story-brain-process"><b>提取重点</b><i /><b>整理经验</b><i /><b>持续沉淀</b></div>}
    </div>
  );
}

export default function FounderStoryMobile() {
  const storyRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [act, setAct] = useState(0);
  const [result, setResult] = useState(0);
  const [flow, setFlow] = useState(0);
  const [sourceCount, setSourceCount] = useState(0);
  const [question, setQuestion] = useState(0);
  const [service, setService] = useState(0);

  useEffect(() => {
    const story = storyRef.current;
    const stage = stageRef.current;
    if (!story || !stage) return;

    const update = () => {
      frameRef.current = null;
      const rect = story.getBoundingClientRect();
      const distance = Math.max(1, story.offsetHeight - window.innerHeight);
      const progress = clamp(-rect.top / distance);
      const limits = [0, .14, .31, .45, .64, .84, 1];
      const nextAct = Math.min(5, limits.findIndex((limit, index) => index > 0 && progress < limit) - 1);
      const resolvedAct = nextAct < 0 ? 5 : nextAct;
      const start = limits[resolvedAct];
      const end = limits[resolvedAct + 1];
      const local = clamp((progress - start) / (end - start));

      for (let index = 0; index < 6; index += 1) {
        stage.style.setProperty(`--mobile-scene-${index}`, String(sceneOpacity(progress, limits[index], limits[index + 1], index === 0, index === 5)));
      }
      stage.style.setProperty("--mobile-spin", `${progress * 820}deg`);
      stage.style.setProperty("--mobile-local", String(local));
      stage.style.setProperty("--mobile-hero-exit", `${-70 * smoothstep(.72, 1, local)}px`);
      stage.dataset.act = String(resolvedAct);

      const nextResult = Math.min(2, Math.floor(clamp((local - .12) / .72) * 3));
      const nextFlow = Math.min(3, Math.floor(clamp((local - .08) / .8) * 4));
      const nextSourceCount = Math.min(4, Math.floor(clamp((local - .08) / .36) * 5));
      const nextQuestion = Math.min(3, Math.floor(clamp((local - .55) / .32) * 4));
      const nextService = Math.min(2, Math.floor(clamp((local - .12) / .72) * 3));
      setAct(value => value === resolvedAct ? value : resolvedAct);
      setResult(value => value === nextResult ? value : nextResult);
      setFlow(value => value === nextFlow ? value : nextFlow);
      setSourceCount(value => value === nextSourceCount ? value : nextSourceCount);
      setQuestion(value => value === nextQuestion ? value : nextQuestion);
      setService(value => value === nextService ? value : nextService);
    };

    const schedule = () => {
      if (frameRef.current === null) frameRef.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <section className="founder-mobile-story" id="top" ref={storyRef} aria-label="创始人AI第二大脑手机端六幕介绍">
      <span className="mobile-story-anchor mobile-results-anchor" id="results" />
      <span className="mobile-story-anchor mobile-why-anchor" id="why" />
      <span className="mobile-story-anchor mobile-service-anchor" id="service" />
      <div className="founder-mobile-stage" data-act={act} ref={stageRef}>
        <div className="mobile-story-stars" aria-hidden="true"><i /><i /><i /></div>

        <article className="mobile-story-scene mobile-scene-hero" aria-hidden={act !== 0}>
          <MobileBrain />
          <div className="mobile-hero-copy">
            <h1>全程代办，到手即用</h1>
            <p>让AI自动记住你的每一句话</p>
          </div>
          <div className="mobile-hero-proof"><span>不用整理资料</span><span>15天启动</span><span>持续自动积累</span></div>
          <a className="mobile-primary-cta" href="/diagnosis?audience=founder">点此立即加入AI第二大脑启动计划 <b>→</b></a>
          <span className="mobile-scroll-cue">下滑查看更多内容 <i>↓</i></span>
        </article>

        <article className="mobile-story-scene mobile-scene-results" aria-hidden={act !== 1}>
          <header><small>15天后，你将拥有</small><h2>不是多买工具<br />而是拥有一个AI入口</h2></header>
          <MobileBrain />
          <div className="mobile-result-card" key={results[result][1]}><b>{results[result][0]}</b><span><strong>{results[result][1]}</strong><small>{results[result][2]}</small></span></div>
          <div className="mobile-story-dots">{results.map((item, index) => <i className={result === index ? "active" : ""} key={item[1]} />)}</div>
        </article>

        <article className="mobile-story-scene mobile-scene-principle" aria-hidden={act !== 2}>
          <header><small>它如何工作</small><h2>AI第二大脑</h2></header>
          <MobileBrain mode="process" />
          <p className="mobile-principle-copy">把正在发生的会议、沟通与判断接住，整理成以后随时可以调用的经验。</p>
        </article>

        <article className="mobile-story-scene mobile-scene-flow" aria-hidden={act !== 3}>
          <header><small>老板继续经营，AI负责积累</small><h2>从经验，到应用</h2></header>
          <div className="mobile-flow-card input" key={`input-${flow}`}><small>正在发生</small><strong>{flows[flow][0]}</strong><span>{flows[flow][1]}</span></div>
          <MobileBrain />
          <div className="mobile-flow-line"><i /><i /><i /></div>
          <div className="mobile-flow-card output" key={`output-${flow}`}><small>随时调用</small><strong>{flows[flow][2]}</strong><span>{flows[flow][3]}</span></div>
          <div className="mobile-story-dots">{flows.map((item, index) => <i className={flow === index ? "active" : ""} key={item[0]} />)}</div>
        </article>

        <article className="mobile-story-scene mobile-scene-waste" aria-hidden={act !== 4}>
          <header><small>正在消失的企业资产</small><h2>老板最大的资产<br />正在被浪费</h2></header>
          <MobileBrain />
          <div className="mobile-source-pills">{sources.map((item, index) => <span className={sourceCount > index ? "visible" : ""} style={{ "--pill-index": index } as CSSProperties} key={item}>{item}</span>)}</div>
          <div className="mobile-question-card" key={questions[question]}><small>经验被AI接住以后</small><strong>{questions[question]}</strong></div>
          <p className="mobile-waste-conclusion">把个人经验，变成企业可以持续使用的AI资产。</p>
        </article>

        <article className="mobile-story-scene mobile-scene-service" aria-hidden={act !== 5}>
          <header><small>15天全程代办，到手即用</small><h2>第一次AI经验<br />资产化，我们帮你完成</h2></header>
          <MobileBrain />
          <div className="mobile-service-card" key={services[service][1]}><i>{services[service][0]}</i><strong>{services[service][1]}</strong><p>{services[service][2]}</p></div>
          <div className="mobile-story-dots">{services.map((item, index) => <i className={service === index ? "active" : ""} key={item[1]} />)}</div>
          <a className="mobile-final-cta" href="/diagnosis?audience=founder">开始我的AI经验诊断 <b>→</b></a>
        </article>

        <nav className="mobile-act-progress" aria-label="章节进度"><span style={{ "--mobile-act": act } as CSSProperties} /><b>0{act + 1}</b><i>06</i></nav>
      </div>
    </section>
  );
}
