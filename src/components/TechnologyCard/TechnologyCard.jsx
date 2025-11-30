import React, { useState, useEffect, useRef } from "react";
import "./TechnologyCard.css";
import Modal from "../Modal/Modal";
import { createPortal } from "react-dom";

const statusLabels = {
  completed: "Завершено",
  "in-progress": "В процессе",
  "not-started": "Не начато",
};

export default function TechnologyCard({
  id,
  title,
  description,
  status,
  onToggle,
  note = "",
  onNoteChange = () => {},
  links = [],
  isUserLoggedIn = false,
}) {
  const label = statusLabels[status] || "Неизвестно";
  const [isModalOpen, setModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleToggleModal = (e) => {
    e.stopPropagation();
    setModalOpen((prev) => {
      const newState = !prev;
      document.body.classList.toggle("no-scroll", newState);
      return newState;
    });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    document.body.classList.remove("no-scroll");
  };

  return (
    <article
      ref={cardRef}
      className={`technology-card ${status} status-animation ${
        isVisible ? "visible" : ""
      } ${!isUserLoggedIn ? "disabled" : ""}`}
      onClick={() => isUserLoggedIn && onToggle?.(id)}
      title={!isUserLoggedIn ? "Авторизуйтесь, чтобы менять статус" : ""}
    >
      <h4 data-status={status}>{title}</h4>
      <small>Статус: {label}</small>
      <div className="field" onClick={(e) => e.stopPropagation()}>
        <label>Мои заметки:</label>
        <textarea
          value={note}
          onChange={(e) => isUserLoggedIn && onNoteChange(e.target.value)}
          placeholder={
            isUserLoggedIn
              ? "Записывайте сюда важные моменты..."
              : "Авторизуйтесь, чтобы добавлять заметки"
          }
          disabled={!isUserLoggedIn}
        />
      </div>
      <div className="card-bottom">
        <p className="muted">{note ? "Заметка сохранена" : "\u00A0"}</p>
        <button className="more-btn" onClick={handleToggleModal}>
          Подробнее
        </button>
      </div>
      {isModalOpen &&
        createPortal(
          <Modal
            title={title}
            content={description}
            links={links}
            onOutsideClick={handleCloseModal}
            onClose={handleCloseModal}
          />,
          document.body
        )}
    </article>
  );
}
