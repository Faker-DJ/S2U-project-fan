import SectionTitle from "../components/SectionTitle.jsx";
import Gallery from "../components/Gallery.jsx";
import PageTransition from "../components/PageTransition.jsx";

export default function GalleryPage() {
  return (
    <PageTransition>
      <section className="gallery-page container">
        <SectionTitle eyebrow="Archive" title="Gallery" />
        <Gallery />
      </section>
    </PageTransition>
  );
}
