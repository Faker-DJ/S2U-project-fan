import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [variant, setVariant] = useState(null); // null | "view" | "link"
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const touchCapable = window.matchMedia("(pointer: coarse)").matches;
    setIsTouch(touchCapable);
    if (touchCapable) return;

    document.body.classList.add("cursor-active");

    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
      const target = e.target.closest("[data-cursor]");
      setVariant(target ? target.getAttribute("data-cursor") : null);
    };

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.classList.remove("cursor-active");
    };
  }, []);

  if (isTouch) return null;

  return (
    <div ref={cursorRef} className={`custom-cursor ${variant ? `hover-${variant}` : ""}`}>
      {variant === "view" && "View"}
      {variant === "link" && "→"}
    </div>
  );
}
