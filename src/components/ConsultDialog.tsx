import { useEffect, useId, useState, type FormEvent } from "react";

type ConsultDialogProps = {
  onClose: () => void;
};

export default function ConsultDialog({ onClose }: ConsultDialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="dialog-backdrop" role="presentation" onClick={onClose}>
      <div
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onClick={(event) => event.stopPropagation()}
      >
        <button className="dialog-close" type="button" aria-label="关闭咨询窗口" onClick={onClose}>
          ✕
        </button>
        <p className="kicker">CONTACT</p>
        <h2 id={titleId}>产品咨询</h2>
        <p id={descriptionId}>
          咨询通道待接入。你可以先留下信息，后续由人工跟进，当前不会生成购买或提交成功状态。
        </p>
        <form onSubmit={handleSubmit}>
          <label className="field">
            姓名
            <input name="name" required autoComplete="name" autoFocus />
          </label>
          <label className="field">
            手机号
            <input name="phone" required inputMode="tel" autoComplete="tel" />
          </label>
          <label className="field">
            咨询内容
            <textarea name="message" rows={4} />
          </label>
          <div className="dialog-actions">
            <button className="btn btn-ghost" type="button" onClick={onClose}>
              关闭
            </button>
            <button className="btn btn-primary" type="submit">
              提交咨询
            </button>
          </div>
        </form>
        <p className="notice" aria-live="polite">
          {submitted ? "咨询通道待接入，信息尚未发送到服务器。" : "\u00a0"}
        </p>
      </div>
    </div>
  );
}
