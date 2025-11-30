import { Link } from "react-router-dom";
import useTechnologies from "../../hooks/useTechnologies";
import "./Home.css";

function Home() {
  const isUserLoggedIn = !!localStorage.getItem("isLoggedIn");
  const { technologies, progress } = useTechnologies(isUserLoggedIn);

  const featuredTechnologies = technologies.slice(0, 3);

  return (
    <div className="home-container">
      <section className="hero">
        <h1 className="hero__title">
          Добро пожаловать на трекер технологий! 🚀
        </h1>
        <p className="hero__subtitle">
          Отслеживайте свой прогресс, добавляйте и изучайте новые технологии.
        </p>
        <Link to="/technologies" className="hero__btn">
          Смотреть все технологии
        </Link>
      </section>

      <main className="content">
        <section className="about">
          <h2 className="about__title">О проекте</h2>
          <p className="about__text">
            Трекер технологий — это удобный инструмент для отслеживания вашего
            прогресса в изучении различных технологий. Добавляйте технологии,
            отмечайте статус изучения, ведите заметки и следите за своим
            развитием.
          </p>
        </section>

        <section className="stats">
          <h2 className="stats__title">Статистика</h2>
          <div className="stats__grid">
            <div className="stat-card">
              <div className="stat-card__number">{progress.total}</div>
              <div className="stat-card__label">Всего технологий</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__number">{progress.completed}</div>
              <div className="stat-card__label">Завершено</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__number">{progress.inProgress}</div>
              <div className="stat-card__label">В процессе</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__number">{progress.percent}%</div>
              <div className="stat-card__label">Прогресс</div>
            </div>
          </div>

          <div
            className="progress-bar-container"
            style={{
              marginTop: "20px",
              padding: "20px",
              background: "var(--color-bg-light)",
              borderRadius: "var(--radius-3)",
            }}
          >
            <h3 style={{ marginBottom: "10px", color: "var(--color-primary)" }}>
              Общий прогресс изучения
            </h3>
            <div
              style={{
                width: "100%",
                height: "30px",
                backgroundColor: "var(--color-bg)",
                borderRadius: "15px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${progress.percent}%`,
                  height: "100%",
                  background:
                    "linear-gradient(135deg, #90caf9 0%, #64b5f6 100%)",
                  transition: "width 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {progress.percent}%
              </div>
            </div>
          </div>
        </section>

        <section className="features">
          <h2 className="features__title">Возможности</h2>
          <div className="features__grid">
            <div className="feature-card">
              <div className="feature-card__icon">📚</div>
              <h3 className="feature-card__title">Управление технологиями</h3>
              <p className="feature-card__text">
                Добавляйте новые технологии и управляйте своим списком изучения
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon">📊</div>
              <h3 className="feature-card__title">Отслеживание прогресса</h3>
              <p className="feature-card__text">
                Отмечайте статус изучения: не начато, в процессе, завершено
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon">📝</div>
              <h3 className="feature-card__title">Заметки</h3>
              <p className="feature-card__text">
                Ведите персональные заметки по каждой технологии
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon">📈</div>
              <h3 className="feature-card__title">Статистика</h3>
              <p className="feature-card__text">
                Просматривайте детальную статистику вашего прогресса
              </p>
            </div>
          </div>
        </section>

        {featuredTechnologies.length > 0 && (
          <section className="projects">
            <h2 className="projects__title">Примеры технологий</h2>
            <div className="projects__grid">
              {featuredTechnologies.map((tech) => (
                <Link
                  key={tech.id}
                  to={`/technology/${tech.id}`}
                  className="project-card__container"
                >
                  <h3 className="project-card__label">{tech.title}</h3>
                  <p className="project-card__description">
                    {tech.description?.substring(0, 100)}...
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default Home;
