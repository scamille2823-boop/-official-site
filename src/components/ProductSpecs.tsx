import { specLeft, specRight, type SpecRow } from "../content";

function SpecColumn({ rows }: { rows: SpecRow[] }) {
  return (
    <div className="spec-column">
      {rows.map((row) => (
        <div className="spec-row" key={row.label}>
          <span className="spec-label">{row.label}</span>
          {row.pending ? (
            <span className="pending-chip">待确认</span>
          ) : (
            <span className="spec-value">{row.value}</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default function ProductSpecs() {
  return (
    <section className="specs" id="specs">
      <div className="container">
        <div className="specs-head">
          <div>
            <p className="kicker">PRODUCT INFO</p>
            <h2>产品信息</h2>
          </div>
          <p className="specs-note">
            规格参数以最终发布版本为准，标注「待确认」的信息将在核实后更新。
          </p>
        </div>
        <div className="spec-grid">
          <SpecColumn rows={specLeft} />
          <SpecColumn rows={specRight} />
        </div>
      </div>
    </section>
  );
}
