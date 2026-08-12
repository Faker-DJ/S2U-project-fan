import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import MemberCard from "./MemberCard.jsx";

export default function MemberGrid({ members, mode = "link" }) {
  const [previewIndex, setPreviewIndex] = useState(null);

  const closePreview = () => setPreviewIndex(null);
  const showPrev = () => setPreviewIndex((i) => (i - 1 + members.length) % members.length);
  const showNext = () => setPreviewIndex((i) => (i + 1) % members.length);

  useEffect(() => {
    if (previewIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") closePreview();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [previewIndex, members.length]);

  const activeMember = previewIndex !== null ? members[previewIndex] : null;

  return (
    <div>
      <div className="member-grid">
        {members.map((member, i) => (
          <MemberCard
            key={member.id}
            member={member}
            index={i}
            mode={mode}
            onPreview={mode === "preview" ? setPreviewIndex : undefined}
          />
        ))}
      </div>

      {mode === "preview" && (
        <AnimatePresence>
          {activeMember && (
            <motion.div
              className="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePreview}
            >
              <button className="lightbox-close" aria-label="Close" onClick={closePreview} data-cursor="link">
                <X size={20} />
              </button>
              <button
                className="lightbox-prev"
                aria-label="Previous member"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                data-cursor="link"
              >
                <ChevronLeft size={22} />
              </button>
              <motion.img
                key={activeMember.id}
                src={activeMember.image}
                alt={activeMember.name}
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onError={(e) => {
                  e.currentTarget.src = "/assets/placeholder.jpg";
                }}
              />
              <button
                className="lightbox-next"
                aria-label="Next member"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                data-cursor="link"
              >
                <ChevronRight size={22} />
              </button>
              <span className="lightbox-caption">
                {activeMember.number} · {activeMember.name}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
