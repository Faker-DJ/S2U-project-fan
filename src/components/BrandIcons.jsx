// ---------------------------------------------------------------------------
// BRAND ICONS
// lucide-react (0.383.0) has no X (formerly Twitter) or TikTok glyph, so these
// are small inline SVGs sized to match lucide's `size` prop convention.
// ---------------------------------------------------------------------------

export function XIcon({ size = 16, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function TikTokIcon({ size = 16, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M16.6 5.82c-.94-.83-1.53-2-1.6-3.32V2h-3.4v13.4a2.59 2.59 0 1 1-2.15-2.55V9.4a5.99 5.99 0 1 0 5.55 5.98V8.87a8.35 8.35 0 0 0 4.6 1.38V6.79a4.85 4.85 0 0 1-3-0.97z" />
    </svg>
  );
}
