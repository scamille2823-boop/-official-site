import { whyItems } from "../content";

export default function WhyItMatters() {
  return (
    <section className="why" id="health">
      <div className="container why-grid">
        <div className="why-intro">
          <p className="kicker">WHY IT MATTERS</p>
          <h2 className="section-title">
            健康的变化，
            <br />
            往往藏在日常里
          </h2>
        </div>
        <ol className="why-list">
          {whyItems.map((item) => (
            <li className="why-item" key={item.index}>
              <span className="why-index">{item.index}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
