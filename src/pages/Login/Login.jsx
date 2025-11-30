import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password === "password") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);
      onLogin(username);
      navigate("/");
    } else {
      alert('Неверные данные для входа. Пароль — "password"');
    }
  };

  return (
    <div className="page">
      <h1>Вход</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label>Имя пользователя:</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn primary">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
