type SupportSectionProps = {
  onConsult: () => void;
};

export default function SupportSection({ onConsult }: SupportSectionProps) {
  return (
    <section className="support" id="support">
      <div className="container support-grid">
        <div className="support-copy">
          <p className="kicker">SUPPORT</p>
          <h2 className="section-title">支持与服务</h2>
          <p>
            如需了解产品、试用或商务合作，可通过产品咨询留下联系方式。客服热线、售后网点与购买渠道待确认后更新。
          </p>
          <p className="support-note">
            本产品用于日常健康监测与风险筛查参考，不能替代专业医疗诊断或治疗。
          </p>
        </div>
        <div className="support-action">
          <button className="btn btn-consult btn-consult-lg" type="button" onClick={onConsult}>
            产品咨询
          </button>
          <span>留下联系方式，等待人工跟进</span>
        </div>
      </div>
    </section>
  );
}
