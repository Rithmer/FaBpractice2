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
        {links && links.length > 0 && (
          <ul className="links-list">
            {links.map((link, idx) => {
              const url = typeof link === "string" ? link : link.url;
              const title =
                typeof link === "string" ? link : link.title || link.url;
              return (
                <li key={idx}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {title}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
