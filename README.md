# HEARTS2HEARTS — Fan Project (Unofficial)

An interactive, fan-made tribute website for HEARTS2HEARTS, built with React + Vite.

> **This is not an official website.** It is not affiliated with, endorsed by, or
> connected to SM Entertainment or HEARTS2HEARTS. All member photos, videos, logos,
> and music referenced below use **local placeholder assets only** — nothing is
> fetched from the internet automatically. Replace the placeholders with assets you
> legally own before publishing this anywhere.

## Getting started

```bash
npm install
npm run dev
```

Then open **http://localhost:5173**.

To build for production:

```bash
npm run build
npm run preview
```

## What's included

- Cinematic loading screen → hero → scroll-driven experience
- Interactive member grid with cursor-follow hover, member detail pages,
  favorites (saved in `localStorage`), image galleries, and prev/next navigation
- Filterable masonry gallery with a keyboard-accessible lightbox (Esc / ← / →)
- A dedicated Music page plus a persistent mini-player (state shared via
  `PlayerContext`, so playback survives page navigation)
- Custom cursor on desktop (disabled on touch devices)
- Fully responsive layout (1440 / 1200 / 992 / 768 / 480 breakpoints)
- `prefers-reduced-motion` support and lazy-loaded images throughout
- Graceful fallbacks everywhere an asset might be missing (logo → text,
  video → image, image → placeholder)

## Replacing placeholder assets

Everything you need to swap out lives under `public/assets/`. Placeholder
images were auto-generated so the site runs out of the box — replace them
with your own legally-owned files, keeping the same filenames (or update the
paths in the matching `src/data/*.js` file).

```
public/assets/
├── branding/            ← group logo + favicon (see below)
├── members/              ← 5 photos per member, e.g. carmen-01.jpg … carmen-05.jpg
├── gallery/               ← gallery images, referenced in src/data/gallery.js
├── backgrounds/          ← hero.jpg, about.jpg (fallback if no hero video)
├── videos/                    ← hero.mp4 (optional — falls back to hero.jpg)
└── music/                      ← track-01.mp3, track-02.mp3 (your own tracks only)
```

### Branding / logo

Add your own logo files to `public/assets/branding/`:

```
hearts2hearts-logo.png          (hero — transparent PNG preferred)
hearts2hearts-logo-black.png    (navbar, light backgrounds)
hearts2hearts-logo-white.png    (loading screen, footer, dark backgrounds)
favicon.png
```

None of these files are included by default — until you add them, the site
automatically falls back to a clean "HEARTS2HEARTS" / "H2H" text mark, so
nothing breaks.

### Member data

Edit `src/data/members.js` to change names, positions, birthdays,
nationalities, quotes, and bios. Don't hard-code member info anywhere else —
every page reads from this file.

### Gallery data

Edit `src/data/gallery.js` to add, remove, or recategorize gallery photos.
Valid categories: `concept`, `members`, `behind`, `performance`, `event`.

### Music

Edit `src/data/music.js` and drop your own audio files into
`public/assets/music/`. Do not commit copyrighted tracks to a real
repository — use music you own the rights to, or instrumental placeholders.

## Project structure

```
src/
├── components/     Reusable UI: Navbar, Hero, MemberCard, Gallery, MusicPlayer, etc.
├── pages/          Route-level pages (Home, Members, MemberDetail, GalleryPage, MusicPage, About)
├── data/           Editable content: members.js, gallery.js, music.js
├── context/         PlayerContext.jsx — shared audio player state
├── styles/          Plain CSS, one file per concern
├── App.jsx
└── main.jsx
```

## Notes

- Favorites are stored in the browser's `localStorage` under the key
  `h2h-favorites` — clearing site data will reset them.
- The custom cursor is automatically disabled on touch/coarse-pointer devices.
