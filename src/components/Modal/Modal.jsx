import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./Modal.css";

export default function Modal({
  title,
  content,
  links = [],
  onOutsideClick,
  onClose,
}) {
  const handleOverlayClick = (e) => {
    e.stopPropagation();
    onOutsideClick();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h4>{title}</h4>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        {links.length > 0 && (
          <ul className="links-list">
            {links.map((link, idx) => (
              <li key={idx}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
