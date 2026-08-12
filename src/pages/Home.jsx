import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Hero from "../components/Hero.jsx";
import MemberGrid from "../components/MemberGrid.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import Button from "../components/Button.jsx";
import PageTransition from "../components/PageTransition.jsx";
import { members } from "../data/members.js";
import { galleryItems } from "../data/gallery.js";

export default function Home() {
  return (
    <PageTransition>
      <Hero />

      <section id="introduction" className="intro-section container">
        <span className="eyebrow">Welcome</span>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          HEARTS2HEARTS is an eight-member group built around warmth, individuality, and
          quiet confidence. This space is a fan-made digital journey through their world —
          members, music, and moments, gathered into one interactive archive.
        </motion.p>
      </section>

      <section className="members-section container">
        <SectionTitle eyebrow="The Group" title="Meet the Members" />
        <p className="members-section-hint">Tap a photo to view it up close, or scroll down to discover each member's story.</p>
        <MemberGrid members={members} mode="preview" />
      </section>

      <FeaturedMemberShowcase />

      <section className="preview-section container">
        <div className="preview-header">
          <SectionTitle eyebrow="Archive" title="Gallery" />
          <Link to="/gallery" className="preview-link" data-cursor="link">
            View All →
          </Link>
        </div>
        <div className="preview-grid">
          {galleryItems.slice(0, 4).map((item) => (
            <img
              key={item.id}
              src={item.image}
              alt={item.caption}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "/assets/placeholder.jpg";
              }}
            />
          ))}
        </div>
      </section>

      <section className="preview-section container">
        <div className="preview-header">
          <SectionTitle eyebrow="Listen" title="Music" />
          <Link to="/music" className="preview-link" data-cursor="link">
            Open Player →
          </Link>
        </div>
        <Button to="/music">Play Now</Button>
      </section>

      <section className="intro-section container">
        <span className="eyebrow">The Story</span>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          From debut to every release since, HEARTS2HEARTS keeps growing one chapter at a
          time. Read more about the group's story and concept.
        </motion.p>
        <div style={{ marginTop: "1.6rem", display: "flex", justifyContent: "center" }}>
          <Button to="/about">About the Group</Button>
        </div>
      </section>
    </PageTransition>
  );
}

function FeaturedMemberShowcase() {
  return (
    <div>
      {members.map((member, i) => (
        <FeaturedMember key={member.id} member={member} index={i} />
      ))}
    </div>
  );
}

function FeaturedMember({ member, index }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Cinematic scroll parallax: the image drifts and settles as the section
  // passes through view, layered on top of its own slow, continuous
  // "living photo" motion (defined in CSS) so it never sits perfectly
  // still — like a cinemagraph / live wallpaper — even when the page
  // itself isn't scrolling.
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.55, 0.32, 0.55]);

  // Each member gets a slightly different drift path and timing so the
  // sections don't all breathe in perfect unison — 3 organic variants,
  // cycled by index, with a duration/delay offset per member.
  const kbVariant = (index % 3) + 1;
  const kbDuration = 12 + (index % 5) * 1.6;
  const kbDelay = -(index * 3.1);

  return (
    <section ref={sectionRef} className="featured-member">
      <div className="featured-member-bg-frame">
        <motion.div className="featured-member-bg-wrap" style={{ y: parallaxY }}>
          <div
            className={`featured-member-bg-kenburns kb-variant-${kbVariant}`}
            style={{ animationDuration: `${kbDuration}s`, animationDelay: `${kbDelay}s` }}
          >
            <img
              className="featured-member-bg"
              src={member.profileImage}
              alt=""
              style={{ objectPosition: member.focalPoint || "50% 22%" }}
              onError={(e) => {
                e.currentTarget.src = "/assets/placeholder.jpg";
              }}
            />
          </div>
          <div
            className="featured-member-sweep"
            style={{ animationDuration: `${kbDuration + 6}s`, animationDelay: `${kbDelay - 2}s` }}
          />
          <div
            className="featured-member-gradient-wash"
            style={{ animationDelay: `${kbDelay - 4}s` }}
          />
        </motion.div>
      </div>
      <motion.div className="featured-member-overlay" style={{ opacity: overlayOpacity }} />

      <motion.div
        className="featured-member-content"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="eyebrow" style={{ color: "var(--color-text-on-dark-muted)" }}>
          {member.number} — {member.position}
        </span>
        <h3 className="featured-member-name">{member.name}</h3>
        {member.funFact && <p className="featured-member-teaser">{member.funFact}</p>}
        <Button to={`/members/${member.id}`} variant="outline-light">
          Discover
        </Button>
      </motion.div>
    </section>
  );
}
