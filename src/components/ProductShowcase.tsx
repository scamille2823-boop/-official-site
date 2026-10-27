const colorways = [
  {
    id: "silver",
    name: "银色款",
    english: "SILVER",
    image: "/images/ring-silver.jpg",
    alt: "灵跃智能体戒指银色款实物，可见磨砂外圈与透明内侧传感器结构",
    swatch: "swatch-silver",
  },
  {
    id: "gold",
    name: "金色款",
    english: "GOLD",
    image: "/images/ring-gold.jpg",
    alt: "灵跃智能体戒指金色款实物，可见磨砂外圈与透明内侧传感器结构",
    swatch: "swatch-gold",
  },
] as const;

export default function ProductShowcase() {
  return (
    <section className="product" id="product">
      <div className="container">
        <div className="product-head">
          <div>
            <p className="kicker">TWO FINISHES</p>
            <h2 className="product-title">
              两种配色，
              <br />
              一枚适合每天佩戴的戒指
            </h2>
          </div>
          <p className="product-note">
            磨砂外圈与透明内侧结构。材质、重量、尺寸规格待确认。
          </p>
        </div>

        <div className="color-grid">
          {colorways.map((color) => (
            <figure className="color-card" key={color.id}>
              <div className="color-media">
                <img
                  src={color.image}
                  alt={color.alt}
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className="color-meta">
                <div>
                  <h3>{color.name}</h3>
                  <p>{color.english} FINISH</p>
                </div>
                <span className={`swatch ${color.swatch}`} aria-hidden="true" />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
