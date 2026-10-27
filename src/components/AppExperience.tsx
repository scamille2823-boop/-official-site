import { useState, type KeyboardEvent } from "react";
import { appSlides } from "../content";

export default function AppExperience() {
  const [index, setIndex] = useState(2);
  const slide = appSlides[index];

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, tabIndex: number) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;

    event.preventDefault();
    const offset = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (tabIndex + offset + appSlides.length) % appSlides.length;
    setIndex(nextIndex);
    document.getElementById(`app-tab-${appSlides[nextIndex].id}`)?.focus();
  }

  return (
    <section className="app" id="app">
      <div className="container">
        <div className="app-header">
          <p className="kicker">APP EXPERIENCE</p>
          <h2 className="section-title">
            检测与监测，
            <br />
            都在一个页面里
          </h2>
          <p className="app-sub">以下为灵跃 App 实际界面示意，功能以正式发布版本为准。</p>
        </div>

        <div className="app-layout">
          <div className="phone-frame">
            <div className="phone-shell">
              <img
                src={slide.image}
                alt={slide.alt}
                width={390}
                height={844}
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="phone-caption">灵跃 App · {slide.title}</p>
          </div>

          <div className="app-content">
            <div
              className="app-panel"
              id="app-panel"
              role="tabpanel"
              aria-labelledby={`app-tab-${slide.id}`}
            >
              <p className="kicker">{slide.kicker}</p>
              <h3>{slide.title}</h3>
              <p>{slide.body}</p>
            </div>

            <div className="app-tabs" role="tablist" aria-label="App 界面切换">
              {appSlides.map((item, itemIndex) => (
                <button
                  key={item.id}
                  id={`app-tab-${item.id}`}
                  type="button"
                  role="tab"
                  aria-selected={itemIndex === index}
                  aria-controls="app-panel"
                  tabIndex={itemIndex === index ? 0 : -1}
                  onClick={() => setIndex(itemIndex)}
                  onKeyDown={(event) => handleTabKeyDown(event, itemIndex)}
                >
                  <span className="app-tab-index">{item.kicker.slice(0, 2)}</span>
                  <span className="app-tab-name">{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
