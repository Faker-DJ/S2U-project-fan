import { motion } from "framer-motion";

export default function SectionTitle({ eyebrow, title }) {
  return (
    <div className="section-title">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </motion.h2>
    </div>
  );
}
