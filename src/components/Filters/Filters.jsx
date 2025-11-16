import "./Filters.css";

export default function Filters({ filter, setFilter }) {
  return (
    <div className="filter-buttons">
      <button
        className={filter === "all" ? "active" : ""}
        onClick={() => setFilter("all")}
      >
        Все
      </button>
      <button
        className={filter === "not-started" ? "active" : ""}
        onClick={() => setFilter("not-started")}
      >
        Не начато
      </button>
      <button
        className={filter === "in-progress" ? "active" : ""}
        onClick={() => setFilter("in-progress")}
      >
        В процессе
      </button>
      <button
        className={filter === "completed" ? "active" : ""}
        onClick={() => setFilter("completed")}
      >
        Выполнено
      </button>
    </div>
  );
}
