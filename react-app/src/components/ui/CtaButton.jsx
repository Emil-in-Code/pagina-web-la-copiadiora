import { Link } from "react-router-dom";

export default function CtaButton({ to, href, text,id, className }) {
  if (to) {
    return (
      <Link
        to= {to}
        id={id}
        className={className}
        aria-label={text}
      >
        {text}
      </Link>
    );
  }

  return  (
    <a 
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={text}
    >
      {text}
    </a>
  )
}
