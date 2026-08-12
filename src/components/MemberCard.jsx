import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Expand } from "lucide-react";

export default function MemberCard({ member, index, mode = "link", onPreview }) {
  const cardRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
    setOffset({ x, y });
  };

  const handleLeave = () => setOffset({ x: 0, y: 0 });

  const imageEl = (
    <>
      <motion.img
        className="member-card-img"
        src={member.image}
        alt={member.name}
        animate={{ x: offset.x, y: offset.y }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        onError={(e) => {
          e.currentTarget.src = "/assets/placeholder.jpg";
        }}
        loading="lazy"
      />
      <div className="member-card-overlay" />
      <span className="member-card-number">{member.number}</span>
      <div className="member-card-info">
        <div className="member-card-name serif">{member.name}</div>
        {mode === "preview" ? (
          <span className="member-card-link">
            <Expand size={12} /> View Photo
          </span>
        ) : (
          <span className="member-card-link">View Profile →</span>
        )}
      </div>
    </>
  );

  if (mode === "preview") {
    return (
      <motion.div
        ref={cardRef}
        className="member-card"
        data-cursor="view"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          type="button"
          className="member-card-trigger"
          aria-label={`Enlarge ${member.name}'s photo`}
          onClick={() => onPreview?.(index)}
        >
          {imageEl}
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      className="member-card"
      data-cursor="view"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/members/${member.id}`} aria-label={`View ${member.name}'s profile`}>
        {imageEl}
      </Link>
    </motion.div>
  );
}
