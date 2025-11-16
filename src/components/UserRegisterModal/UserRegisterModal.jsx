import { useState } from "react";
import { createPortal } from "react-dom";
import "./UserRegisterModal.css";

export default function UserRegisterModal({ onRegister, isOpen, onClose }) {
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onRegister({
      name: name.trim(),
      avatarUrl: avatarUrl.trim() || "https://via.placeholder.com/50",
      isOnline: true,
    });
    onClose();
  };

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="register-close" onClick={onClose}>×</button>
        <h4>Регистрация</h4>
        <form className="register-form" onSubmit={handleSubmit}>
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt="Preview"
              className="avatar-preview"
              onError={(e) => e.target.style.display = 'none'}
            />
          )}
          <input
            type="text"
            placeholder="Никнейм"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="url"
            placeholder="URL аватарки (необязательно)"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
          <button type="submit">Начать</button>
        </form>
      </div>
    </div>,
    document.body
  );
}
