import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Button({ to, href, onClick, children, variant = "dark", showArrow = true, type = "button" }) {
  const className = `btn btn-${variant}`;
  const content = (
    <>
      {children}
      {showArrow && <ArrowRight size={14} />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={className} data-cursor="link">
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={className} data-cursor="link" target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={className} onClick={onClick} data-cursor="link">
      {content}
    </button>
  );
}
