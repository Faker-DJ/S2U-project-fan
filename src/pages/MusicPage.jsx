import MusicPlayer from "../components/MusicPlayer.jsx";
import PageTransition from "../components/PageTransition.jsx";

export default function MusicPage() {
  return (
    <PageTransition>
      <section className="music-page container">
        <MusicPlayer />
      </section>
    </PageTransition>
  );
}
