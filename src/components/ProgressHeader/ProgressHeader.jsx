import "./ProgressHeader.css";

export default function ProgressHeader({ technologies, isUserLoggedIn }) {
  const total = technologies.length;
  const completed = technologies.filter((t) => t.status === "completed").length;
  const inProgress = technologies.filter(
    (t) => t.status === "in-progress"
  ).length;
  const notStarted = technologies.filter(
    (t) => t.status === "not-started"
  ).length;

  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="progress-header">
      <div className="progress-info">
        <div className="progress-stats">
          <span>
            Всего: <strong>{total}</strong>
          </span>
          <span>
            Изучено: <strong>{completed}</strong>
          </span>
          <span>
            Не начато: <strong>{notStarted}</strong>
          </span>
          <span>
            В процессе: <strong>{inProgress}</strong>
          </span>
        </div>
        <div className="progress-percent">{percent}% завершено</div>
        {!isUserLoggedIn && (
          <p className="warning">
            Авторизуйтесь, чтобы менять прогресс и заметки
          </p>
        )}
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
