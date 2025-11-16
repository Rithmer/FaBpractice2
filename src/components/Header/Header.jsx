import UserCard from "../UserCard/UserCard";
import ProgressHeader from "../ProgressHeader/ProgressHeader";
import "./Header.css";

export default function Header({
  technologies,
  user,
  isUserLoggedIn,
  onOpenRegister,
}) {
  return (
    <header className="header">
      <h1>Прогресс изучения</h1>

      {user ? (
        <UserCard
          name={user.name}
          avatarUrl={user.avatarUrl}
          isOnline={user.isOnline}
        />
      ) : (
        <button className="register-btn" onClick={onOpenRegister}>
          Регистрация
        </button>
      )}

      <ProgressHeader
        technologies={technologies}
        isUserLoggedIn={isUserLoggedIn}
      />
    </header>
  );
}
