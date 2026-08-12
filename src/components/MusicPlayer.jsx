import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { usePlayer } from "../context/PlayerContext.jsx";
import { tracks } from "../data/music.js";

function formatTime(sec) {
  if (!sec || Number.isNaN(sec)) return "00:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function MusicPlayer() {
  const { currentTrack, isPlaying, progress, duration, volume, setVolume, toggle, next, prev, seek, setTrackIndex, trackIndex } =
    usePlayer();

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    seek(ratio * (duration || 0));
  };

  return (
    <div className="music-player-card">
      <div className="music-cover">
        <img
          src={currentTrack.cover}
          alt={currentTrack.title}
          onError={(e) => {
            e.currentTarget.src = "/assets/placeholder.jpg";
          }}
        />
      </div>

      {isPlaying && (
        <div className="music-equalizer" aria-hidden="true">
          <span /><span /><span /><span />
        </div>
      )}

      <div className="music-track-title serif">{currentTrack.title}</div>
      {currentTrack.subtitle && <div className="music-track-subtitle">{currentTrack.subtitle}</div>}

      <div className="music-progress">
        <span>{formatTime(progress)}</span>
        <div className="music-progress-track" onClick={handleSeek}>
          <div
            className="music-progress-fill"
            style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }}
          />
        </div>
        <span>{formatTime(duration)}</span>
      </div>

      <div className="music-controls">
        <button className="music-control-btn" onClick={prev} aria-label="Previous track" data-cursor="link">
          <SkipBack size={20} />
        </button>
        <button className="music-control-btn play-pause" onClick={toggle} aria-label={isPlaying ? "Pause" : "Play"} data-cursor="link">
          {isPlaying ? <Pause size={22} /> : <Play size={22} />}
        </button>
        <button className="music-control-btn" onClick={next} aria-label="Next track" data-cursor="link">
          <SkipForward size={20} />
        </button>
      </div>

      <div className="music-volume">
        <Volume2 size={16} />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          aria-label="Volume"
        />
      </div>

      <div className="music-playlist">
        {tracks.map((t, i) => (
          <div
            key={t.id}
            className={`music-playlist-item ${i === trackIndex ? "active" : ""}`}
            onClick={() => setTrackIndex(i)}
            role="button"
            tabIndex={0}
          >
            <span>{t.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
