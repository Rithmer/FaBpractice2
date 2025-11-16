import "./ProgressHeader.css";

export default function ProgressHeader({ isUserLoggedIn, progress }) {
  const { total, completed, inProgress, notStarted, percent } = progress;

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
