import { useState } from "react";
import { navLinks } from "../content";

type HeaderProps = {
  onConsult: () => void;
};

export default function Header({ onConsult }: HeaderProps) {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#top" onClick={closeMenu}>
          <span className="brand-mark">
            <img src="/images/logo.jpg" alt="" width={44} height={44} />
          </span>
          <span className="brand-text">
            <span className="brand-name">灵跃</span>
            <span className="brand-sub">LINGYUE</span>
          </span>
        </a>

        <nav className="nav-desktop" aria-label="主导航">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button className="btn btn-consult header-cta" type="button" onClick={onConsult}>
            产品咨询
          </button>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "关闭菜单" : "打开菜单"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="menu-toggle-bars" aria-hidden="true">
              {open ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </div>

      <nav
        className="nav-mobile"
        id="mobile-nav"
        aria-label="移动导航"
        hidden={!open}
      >
        <div className="nav-mobile-inner">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              closeMenu();
              onConsult();
            }}
          >
            产品咨询
          </button>
        </div>
      </nav>
    </header>
  );
}
