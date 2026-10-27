import { heroSignals } from "../content";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-brandline">LINGYUE · 灵跃智能体戒指</p>

          <h1 className="hero-title">
            <span className="hero-title-line">
              关注<span className="hero-accent">心血管</span>风险，
            </span>
            <span className="hero-title-line">主动管理每一天</span>
          </h1>

          <p className="hero-sub">
            AI 智能体驱动的心血管风险筛查与主动健康守护服务
          </p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#product">
              探索产品
            </a>
            <a className="btn btn-ghost" href="#health">
              了解健康管理
              <span className="btn-arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>

          <ul className="hero-signals" aria-label="产品能力摘要">
            {heroSignals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </div>

        <div className="hero-visual">
          <img
            src="/images/ring-duo.jpg"
            alt="灵跃智能体戒指银色与金色两款实物，可见磨砂外圈与透明内侧传感器结构"
            width={896}
            height={1033}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <p className="hero-visual-caption">
            <span className="caption-dot" aria-hidden="true" />
            银色 / 金色两款 · 磨砂外圈与透明内侧结构
          </p>
        </div>
      </div>
    </section>
  );
}
