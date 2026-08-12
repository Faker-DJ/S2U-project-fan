import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

// Resets the scroll position to the top of the page every time the route
// changes (new pathname, or navigating to a different member/search query).
// useLayoutEffect runs synchronously before the browser paints, so there's
// no visible flash of the old scroll position on the incoming page.
export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
}
