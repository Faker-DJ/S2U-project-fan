import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { usePlayer } from "../context/PlayerContext.jsx";

export default function MiniPlayer() {
  const { currentTrack, isPlaying, progress, duration, toggle, seek } = usePlayer();

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    seek(ratio * (duration || 0));
  };

  return (
    <div className="mini-player-wrap">
      <motion.div
        className="mini-player"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mini-player-cover">
          <img
            src={currentTrack.cover}
            alt=""
            onError={(e) => {
              e.currentTarget.src = "/assets/placeholder.jpg";
            }}
          />
        </div>
        <span className="mini-player-title">{currentTrack.title}</span>
        <div className="mini-player-track" onClick={handleSeek}>
          <div className="mini-player-fill" style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }} />
        </div>
        <button className="mini-player-btn" onClick={toggle} aria-label={isPlaying ? "Pause" : "Play"} data-cursor="link">
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
      </motion.div>
    </div>
  );
}
