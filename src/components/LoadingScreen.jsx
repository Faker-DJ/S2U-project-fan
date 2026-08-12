import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const duration = 1400; // keep loading short

    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setVisible(false);
          setTimeout(onDone, 500);
        }, 250);
      }
    };
    requestAnimationFrame(tick);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
        >
          {!logoError ? (
            <motion.img
              className="loading-logo"
              // Replace with your own logo file at /public/assets/branding/hearts2hearts-logo-black.png
              src="/assets/branding/hearts2hearts-logo-black.png"
              alt="Hearts2Hearts"
              onError={() => setLogoError(true)}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          ) : (
            <motion.div
              className="loading-logo-fallback"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              H2H
            </motion.div>
          )}
          <span className="loading-label">Faker~dj Fan Project</span>
          <div className="loading-bar-track">
            <div className="loading-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="loading-percent">{String(progress).padStart(2, "0")}%</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
