import { useMemo, useState } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const [videoError, setVideoError] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const particles = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        id: i,
        size: 2 + Math.random() * 4,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 6
      })),
    []
  );

  return (
    <section className="hero">
      {!videoError ? (
        <video
          className="hero-media"
          // Replace with your own file at /public/assets/videos/hero.mp4
          src="/assets/videos/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoError(true)}
        />
      ) : (
        <img
          className="hero-media"
          // Falls back to /public/assets/backgrounds/hero.jpg if no video is present
          src="/assets/backgrounds/hero.jpg"
          alt=""
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      )}

      <div className="hero-overlay" />

      <div className="hero-particles" aria-hidden="true">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="hero-particle"
            style={{ width: p.size, height: p.size, top: `${p.top}%`, left: `${p.left}%` }}
            animate={{ y: [0, -18, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 6 + p.delay, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          />
        ))}
      </div>

      <div className="hero-content">
        {!logoError && (
          <motion.img
            className="hero-logo"
            // Replace with your own logo at /public/assets/branding/hearts2hearts-logo.png (transparent PNG preferred)
            src="/assets/branding/hearts2hearts-logo.png"
            alt="Hearts2Hearts logo"
            onError={() => setLogoError(true)}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        )}

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          HEARTS2HEARTS
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          S2U · A Digital Journey
        </motion.p>
      </div>

      <motion.a
        href="#introduction"
        className="hero-scroll"
        data-cursor="link"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        Explore
        <span className="hero-scroll-line" />
      </motion.a>
    </section>
  );
}
