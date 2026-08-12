import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import MiniPlayer from "./components/MiniPlayer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { PlayerProvider } from "./context/PlayerContext.jsx";

import Home from "./pages/Home.jsx";
import Members from "./pages/Members.jsx";
import MemberDetail from "./pages/MemberDetail.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import MusicPage from "./pages/MusicPage.jsx";
import About from "./pages/About.jsx";

export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  return (
    <PlayerProvider>
      <ScrollToTop />
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}

      {!loading && (
        <>
          <CustomCursor />
          <Navbar />

          <main>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/members" element={<Members />} />
                <Route path="/members/:memberId" element={<MemberDetail />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/music" element={<MusicPage />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </AnimatePresence>
          </main>

          <Footer />
          {location.pathname !== "/music" && <MiniPlayer />}
        </>
      )}
    </PlayerProvider>
  );
}
