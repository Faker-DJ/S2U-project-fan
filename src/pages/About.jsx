import { Instagram, Youtube, Music2, Users, Heart, Sparkles } from "lucide-react";
import PageTransition from "../components/PageTransition.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import { XIcon, TikTokIcon } from "../components/BrandIcons.jsx";

const timelineEvents = [
  { label: "Formed", value: "SM Entertainment, 2024" },
  { label: "Debut", value: "\"The Chase\" — Feb 24, 2025" },
  { label: "Digital Single", value: "\"Style\" — Jun 18, 2025" },
  { label: "1st Mini Album", value: "\"Focus\" — Oct 20, 2025" },
  { label: "Digital Single", value: "\"Rude!\" — Feb 20, 2026" },
  { label: "2nd Mini Album", value: "\"Lemon Tang\" — Jun 22, 2026" },
  { label: "Japan Debut", value: "\"Iconic Heart\" — Aug 10, 2026" },
  { label: "Present", value: "Active, 8 members, S2U fandom" }
];

const officialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/hearts2hearts", icon: Instagram },
  { label: "YouTube", href: "https://www.youtube.com/channel/UC7Q3HUnJA3nvjZR2JeMn2Cw", icon: Youtube },
  { label: "X", href: "https://x.com/Hearts2Hearts", icon: XIcon },
  { label: "TikTok", href: "https://www.tiktok.com/@hearts2hearts", icon: TikTokIcon },
  { label: "Weverse", href: "https://weverse.io/hearts2hearts", icon: Music2 }
];

export default function About() {
  return (
    <PageTransition>
      <section className="about-page container">
        <div className="about-hero-text">
          <span className="eyebrow">About</span>
          <h1 className="serif" style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)", marginTop: "0.6rem" }}>
            HEARTS2HEARTS
          </h1>
          <p>
            HEARTS2HEARTS, stylized as H2H, is a South Korean girl group formed by SM
            Entertainment. The group's name reflects its mission — connecting with fans
            around the world through music built on emotion and heartfelt storytelling,
            with the members and fandom moving forward together as one "us."
          </p>
        </div>

        <div className="about-grid">
          <div className="about-info-item">
            <span className="about-info-icon"><Users size={18} /></span>
            <h3 className="serif">Group Information</h3>
            <p>
              An eight-member group under SM Entertainment, debuting February 24, 2025
              with the single album "The Chase." Their fandom is officially called S2U.
            </p>
          </div>
          <div className="about-info-item">
            <span className="about-info-icon"><Heart size={18} /></span>
            <h3 className="serif">Members</h3>
            <p>Eight members — Carmen, Jiwoo, Yuha, Stella, Juun, A-Na, Ian, and Ye-On.</p>
          </div>
          <div className="about-info-item">
            <span className="about-info-icon"><Sparkles size={18} /></span>
            <h3 className="serif">Concept</h3>
            <p>
              A concept built on connection — soft, dreamy visuals paired with confident,
              precise performances that showcase each member's individuality.
            </p>
          </div>
        </div>

        <SectionTitle eyebrow="Timeline" title="The Journey So Far" />
        <div className="timeline">
          {timelineEvents.map((event, i) => (
            <div className="timeline-item" key={event.label}>
              <div className="timeline-dot-col">
                <div className="timeline-dot" />
                {i < timelineEvents.length - 1 && <div className="timeline-line" />}
              </div>
              <div className="timeline-content">
                <h4>{event.label}</h4>
                <p className="serif">{event.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "5rem" }}>
          <SectionTitle eyebrow="Follow" title="Official Channels" />
          <p style={{ color: "var(--color-text-muted)", maxWidth: 560, marginTop: "-1.6rem", marginBottom: "2rem" }}>
            This fan project doesn't host official photos, video, or music — for the real
            thing, follow HEARTS2HEARTS directly:
          </p>
          <div className="official-links-grid">
            {officialLinks.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="official-link" data-cursor="link">
                <Icon size={16} />
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
