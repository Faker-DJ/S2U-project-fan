import { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Youtube } from "lucide-react";
import { XIcon, TikTokIcon } from "./BrandIcons.jsx";

const links = [
  { to: "/", label: "Home" },
  { to: "/members", label: "Members" },
  { to: "/gallery", label: "Gallery" },
  { to: "/music", label: "Music" },
  { to: "/about", label: "About" }
];

export default function Footer() {
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            {!logoError ? (
              <img
                className="footer-logo"
                // Replace with your own logo at /public/assets/branding/hearts2hearts-logo-black.png
                src="/assets/branding/hearts2hearts-logo-black.png"
                alt="Hearts2Hearts"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="footer-logo-fallback">HEARTS2HEARTS</div>
            )}
            <span className="eyebrow" style={{ color: "var(--color-charcoal-soft)" }}>
              S2U Fan Project
            </span>
          </div>

          <nav className="footer-nav">
            {links.map((l) => (
              <Link key={l.to} to={l.to}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="footer-social">
            <a href="https://www.instagram.com/hearts2hearts" aria-label="Instagram" data-cursor="link" target="_blank" rel="noreferrer">
              <Instagram size={16} />
            </a>
            <a href="https://www.youtube.com/channel/UC7Q3HUnJA3nvjZR2JeMn2Cw" aria-label="YouTube" data-cursor="link" target="_blank" rel="noreferrer">
              <Youtube size={16} />
            </a>
            <a href="https://x.com/Hearts2Hearts" aria-label="X" data-cursor="link" target="_blank" rel="noreferrer">
              <XIcon size={16} />
            </a>
            <a href="https://www.tiktok.com/@hearts2hearts" aria-label="TikTok" data-cursor="link" target="_blank" rel="noreferrer">
              <TikTokIcon size={16} />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-disclaimer">
            This is a fan-made, unofficial tribute website. It is not affiliated with,
            endorsed by, or connected to SM Entertainment or HEARTS2HEARTS.
          </p>
          <span>© Fakerdj 2026 S2U · Hearts2Hearts Fan Project</span>
        </div>
      </div>
    </footer>
  );
}
