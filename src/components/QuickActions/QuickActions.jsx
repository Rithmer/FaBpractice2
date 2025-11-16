import "./QuickActions.css";

export default function QuickActions({
  onMarkAll,
  onResetAll,
  onExport,
  onImport,
}) {
  const handleImportClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          onImport(data);
        } catch (err) {
          console.error("Ошибка парсинга JSON", err);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="quick-actions">
      <button className="action-btn" onClick={onMarkAll}>
        Отметить все как выполненные
      </button>
      <button className="action-btn" onClick={onResetAll}>
        Сбросить все статусы
      </button>
      <button className="action-btn" onClick={onExport}>
        Экспорт данных
      </button>
      <button className="action-btn" onClick={handleImportClick}>
        Импорт данных
      </button>
    </div>
  );
}
