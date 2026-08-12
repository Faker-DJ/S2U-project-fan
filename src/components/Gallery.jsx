import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryItems, categories } from "../data/gallery.js";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = galleryItems.filter(
    (item) => activeCategory === "ALL" || item.category === activeCategory.toLowerCase()
  );

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = () => setLightboxIndex((i) => (i - 1 + filtered.length) % filtered.length);
  const showNext = () => setLightboxIndex((i) => (i + 1) % filtered.length);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, filtered.length]);

  const activeItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <div>
      <div className="gallery-filters" role="tablist" aria-label="Gallery categories">
        {categories.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={activeCategory === cat}
            className={`gallery-filter-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
            data-cursor="link"
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="gallery-masonry">
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            className="gallery-item"
            data-cursor="view"
            onClick={() => openLightbox(i)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: (i % 8) * 0.05 }}
          >
            <img
              src={item.image}
              alt={item.caption}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "/assets/placeholder.jpg";
              }}
            />
            <div className="gallery-item-overlay-content">
              <span className="gallery-item-caption">{item.caption}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="gallery-empty">No photos in this category yet.</p>
      )}

      <AnimatePresence>
        {activeItem && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button className="lightbox-close" aria-label="Close" onClick={closeLightbox} data-cursor="link">
              <X size={20} />
            </button>
            <button
              className="lightbox-prev"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              data-cursor="link"
            >
              <ChevronLeft size={22} />
            </button>
            <motion.img
              key={activeItem.id}
              src={activeItem.image}
              alt={activeItem.caption}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
            <button
              className="lightbox-next"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              data-cursor="link"
            >
              <ChevronRight size={22} />
            </button>
            <span className="lightbox-caption">{activeItem.caption}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
