import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/members", label: "Members" },
  { to: "/gallery", label: "Gallery" },
  { to: "/music", label: "Music" },
  { to: "/about", label: "About" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <>
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <NavLink to="/" className="navbar-logo" data-cursor="link">
          {!logoError ? (
            <img
              // Replace with your own logo at /public/assets/branding/hearts2hearts-logo-black.png
              src="/assets/branding/hearts2hearts-logo-black.png"
              alt="Hearts2Hearts"
              onError={() => setLogoError(true)}
            />
          ) : (
            "H2H"
          )}
        </NavLink>

        <nav className="navbar-links">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-cursor="link"
              className={({ isActive }) => (isActive ? "active" : "")}
              end={l.to === "/"}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="navbar-burger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <X color="var(--color-text-on-dark)" size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {links.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i, duration: 0.4 }}
              >
                <NavLink to={l.to} onClick={() => setMenuOpen(false)} end={l.to === "/"}>
                  {l.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
