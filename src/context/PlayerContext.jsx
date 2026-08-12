import { createContext, useContext, useEffect, useRef, useState } from "react";
import { tracks } from "../data/music.js";

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const audioRef = useRef(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);

  const currentTrack = tracks[trackIndex];

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;
    audio.src = currentTrack.src;
    audio.volume = volume;

    const onTime = () => setProgress(audio.currentTime);
    const onMeta = () => setDuration(audio.duration || 0);
    const onEnd = () => next();

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnd);

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIndex]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const play = () => {
    audioRef.current?.play().catch(() => {});
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const toggle = () => (isPlaying ? pause() : play());

  const next = () => setTrackIndex((i) => (i + 1) % tracks.length);
  const prev = () => setTrackIndex((i) => (i - 1 + tracks.length) % tracks.length);

  const seek = (time) => {
    if (audioRef.current) audioRef.current.currentTime = time;
    setProgress(time);
  };

  const value = {
    currentTrack,
    trackIndex,
    isPlaying,
    progress,
    duration,
    volume,
    setVolume,
    play,
    pause,
    toggle,
    next,
    prev,
    seek,
    setTrackIndex
  };

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export const usePlayer = () => useContext(PlayerContext);
