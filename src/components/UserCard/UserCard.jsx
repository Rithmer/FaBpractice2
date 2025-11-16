import "./UserCard.css";

export default function UserCard({ name, avatarUrl, isOnline }) {
  return (
    <div className={`user-card ${isOnline ? "online" : "offline"}`}>
      <img className="avatar" src={avatarUrl} alt={`${name} avatar`} />
      <div className="info">
        <span className="name">{name}</span>
        <span className="status">{isOnline ? "В сети" : "Не в сети"}</span>
      </div>
    </div>
  );
}
