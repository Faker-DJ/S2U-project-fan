import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, Instagram, Youtube, X, ChevronLeft, ChevronRight } from "lucide-react";
import PageTransition from "../components/PageTransition.jsx";
import { XIcon, TikTokIcon } from "../components/BrandIcons.jsx";
import { getMemberById, getAdjacentMembers } from "../data/members.js";

const FAVORITES_KEY = "h2h-favorites";

function readFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeFavorites(list) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
  } catch {
    // localStorage unavailable — favorites simply won't persist
  }
}

export default function MemberDetail() {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const member = getMemberById(memberId);
  const [isFavorite, setIsFavorite] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    if (!member) return;
    setIsFavorite(readFavorites().includes(member.id));
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [member]);

  useEffect(() => {
    if (!member) navigate("/members", { replace: true });
  }, [member, navigate]);

  if (!member) return null;

  const { prev, next } = getAdjacentMembers(member.id);

  const toggleFavorite = () => {
    const current = readFavorites();
    const updated = isFavorite ? current.filter((id) => id !== member.id) : [...current, member.id];
    writeFavorites(updated);
    setIsFavorite(!isFavorite);
  };

  return (
    <PageTransition>
      <AnimatePresence mode="wait">
        <motion.section
          key={member.id}
          className="member-detail container"
          initial={{ opacity: 0, filter: "blur(6px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link to="/members" className="member-detail-back" data-cursor="link">
            <ArrowLeft size={14} /> Back to Members
          </Link>

          <div className="member-detail-grid">
            <motion.div
              className="member-detail-portrait"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <img
                src={member.profileImage}
                alt={member.name}
                style={{ objectPosition: member.focalPoint || "50% 22%" }}
                onError={(e) => {
                  e.currentTarget.src = "/assets/placeholder.jpg";
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="eyebrow">{member.number} · {member.birthName}</span>
              <h1 className="member-detail-name serif">{member.name}</h1>

              <div className="member-facts">
                <div>
                  <div className="member-fact-label">Position</div>
                  <div className="member-fact-value">{member.position}</div>
                </div>
                <div>
                  <div className="member-fact-label">Birthday</div>
                  <div className="member-fact-value">{member.birthday || "—"}</div>
                </div>
                <div>
                  <div className="member-fact-label">Nationality</div>
                  <div className="member-fact-value">{member.nationality || "—"}</div>
                </div>
                <div>
                  <div className="member-fact-label">Height</div>
                  <div className="member-fact-value">{member.height || "—"}</div>
                </div>
                <div>
                  <div className="member-fact-label">MBTI</div>
                  <div className="member-fact-value">{member.mbti || "—"}</div>
                </div>
                <div>
                  <div className="member-fact-label">Role Model</div>
                  <div className="member-fact-value">{member.roleModel || "—"}</div>
                </div>
              </div>

              <p className="member-quote">{member.funFact}</p>
              <p className="member-description">{member.description}</p>

              {member.story && (
                <div className="member-story">
                  <span className="eyebrow">Her Story</span>
                  <p>{member.story}</p>
                </div>
              )}

              <div className="member-actions">
                <button
                  className={`member-favorite-btn ${isFavorite ? "active" : ""}`}
                  onClick={toggleFavorite}
                  data-cursor="link"
                >
                  <Heart size={14} fill={isFavorite ? "currentColor" : "none"} />
                  {isFavorite ? "Added to Favorites" : "Add to Favorites"}
                </button>
              </div>

              <div className="member-social">
                <span className="member-social-label">Follow HEARTS2HEARTS</span>
                <a href="https://www.instagram.com/hearts2hearts" aria-label="Instagram" data-cursor="link" target="_blank" rel="noreferrer">
                  <Instagram size={16} />
                </a>
                <a href="https://www.youtube.com/@hearts2hearts.official" aria-label="YouTube" data-cursor="link" target="_blank" rel="noreferrer">
                  <Youtube size={16} />
                </a>
                <a href="https://x.com/Hearts2Hearts" aria-label="X" data-cursor="link" target="_blank" rel="noreferrer">
                  <XIcon size={16} />
                </a>
                <a href="https://www.tiktok.com/@hearts2hearts" aria-label="TikTok" data-cursor="link" target="_blank" rel="noreferrer">
                  <TikTokIcon size={16} />
                </a>
              </div>

              <div className="member-secondary-grid">
                {member.gallery.map((img, i) => (
                  <img
                    key={img}
                    src={img}
                    alt={`${member.name} ${i + 1}`}
                    loading="lazy"
                    onClick={() => setLightboxIndex(i)}
                    onError={(e) => {
                      e.currentTarget.src = "/assets/placeholder.jpg";
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          <div className="member-nav">
            <Link to={`/members/${prev.id}`} className="member-nav-link" data-cursor="link">
              <span className="member-nav-label">← Previous</span>
              <span className="member-nav-name serif">{prev.name}</span>
            </Link>
            <Link to={`/members/${next.id}`} className="member-nav-link next" data-cursor="link">
              <span className="member-nav-label">Next →</span>
              <span className="member-nav-name serif">{next.name}</span>
            </Link>
          </div>
        </motion.section>
      </AnimatePresence>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <button className="lightbox-close" onClick={() => setLightboxIndex(null)} data-cursor="link">
              <X size={20} />
            </button>
            <button
              className="lightbox-prev"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) => (i - 1 + member.gallery.length) % member.gallery.length);
              }}
              data-cursor="link"
            >
              <ChevronLeft size={22} />
            </button>
            <img
              src={member.gallery[lightboxIndex]}
              alt={member.name}
              onClick={(e) => e.stopPropagation()}
              onError={(e) => {
                e.currentTarget.src = "/assets/placeholder.jpg";
              }}
            />
            <button
              className="lightbox-next"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) => (i + 1) % member.gallery.length);
              }}
              data-cursor="link"
            >
              <ChevronRight size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
