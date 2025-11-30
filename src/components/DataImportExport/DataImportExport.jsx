import { useState, useEffect } from "react";
import "./DataImportExport.css";

function DataImportExport() {
  const [technologies, setTechnologies] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const savedData = localStorage.getItem("technologies");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setTechnologies(parsedData);
        setStatus(`Загружено ${parsedData.length} технологий из памяти`);
      } catch (error) {
        setStatus("Ошибка загрузки данных из памяти");
      }
    }
  }, []);

  useEffect(() => {
    if (technologies.length > 0) {
      localStorage.setItem("technologies", JSON.stringify(technologies));
    }
  }, [technologies]);

  const handleExport = () => {
    const exportData = {
      version: "1.0",
      exportedAt: new Date().toISOString(),
      technologies: technologies,
      stats: {
        total: technologies.length,
        completed: technologies.filter((t) => t.status === "completed").length,
        inProgress: technologies.filter((t) => t.status === "in-progress")
          .length,
      },
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `tech-tracker-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setStatus(`Экспортировано ${technologies.length} технологий`);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const fileContent = e.target.result;
        const importedData = JSON.parse(fileContent);

        let validTechnologies = [];

        if (
          importedData.technologies &&
          Array.isArray(importedData.technologies)
        ) {
          validTechnologies = importedData.technologies.filter((tech) => {
            return tech.title && tech.description;
          });
        } else if (
          typeof importedData === "object" &&
          !Array.isArray(importedData)
        ) {
          validTechnologies = Object.entries(importedData)
            .map(([id, tech]) => {
              if (tech && tech.title && tech.description) {
                return {
                  id: id,
                  title: tech.title,
                  description: tech.description,
                  status: tech.status || "not-started",
                  category: tech.category || "general",
                  links: tech.links || [],
                  createdAt: tech.createdAt || new Date().toISOString(),
                };
              }
              return null;
            })
            .filter((tech) => tech !== null);
        }

        if (validTechnologies.length === 0) {
          throw new Error(
            "Не найдено валидных технологий для импорта. Проверьте формат файла."
          );
        }

        if (technologies.length > 0) {
          const confirmReplace = window.confirm(
            `Найдено ${validTechnologies.length} технологий.\n\n` +
              `ОК - ЗАМЕНИТЬ существующие технологии (${technologies.length} шт.)\n` +
              `Отмена - ДОБАВИТЬ к существующим технологиям`
          );

          if (confirmReplace) {
            setTechnologies(validTechnologies);
            setStatus(
              `Заменено! Импортировано ${validTechnologies.length} технологий`
            );
          } else {
            const maxId = Math.max(
              ...technologies.map((t) => (typeof t.id === "number" ? t.id : 0)),
              0
            );
            const techsWithNewIds = validTechnologies.map((tech, index) => ({
              ...tech,
              id: maxId + index + 1,
            }));
            setTechnologies((prev) => [...prev, ...techsWithNewIds]);
            setStatus(
              `Добавлено! Импортировано ${validTechnologies.length} технологий к существующим ${technologies.length}`
            );
          }
        } else {
          setTechnologies(validTechnologies);
          setStatus(`Импортировано ${validTechnologies.length} технологий`);
        }
      } catch (error) {
        setStatus(`Ошибка импорта: ${error.message}`);
      }
    };

    reader.onerror = () => {
      setStatus("Ошибка чтения файла");
    };

    reader.readAsText(file);

    event.target.value = "";
  };

  const addSampleTechnology = () => {
    const newTech = {
      id: Date.now(),
      title: `Технология ${technologies.length + 1}`,
      description: "Описание технологии для демонстрации",
      status: "not-started",
      category: "frontend",
      createdAt: new Date().toISOString(),
    };

    setTechnologies((prev) => [...prev, newTech]);
    setStatus("Добавлена тестовая технология");
  };

  const clearAllData = () => {
    const confirmClear = window.confirm(
      "Вы уверены, что хотите удалить все данные?"
    );
    if (confirmClear) {
      setTechnologies([]);
      localStorage.removeItem("technologies");
      setStatus("Все данные очищены");
    }
  };

  const toggleStatus = (techId) => {
    setTechnologies((prev) =>
      prev.map((tech) => {
        if (tech.id === techId) {
          const statuses = ["not-started", "in-progress", "completed"];
          const currentIndex = statuses.indexOf(tech.status || "not-started");
          const nextStatus = statuses[(currentIndex + 1) % statuses.length];
          return { ...tech, status: nextStatus };
        }
        return tech;
      })
    );
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "✅ Завершено";
      case "in-progress":
        return "🔄 В процессе";
      default:
        return "⭕ Не начато";
    }
  };

  return (
    <div className="data-import-export">
      <h1>Импорт/Экспорт данных</h1>

      {status && <div className="status-message">{status}</div>}

      <div className="control-panel">
        <button
          onClick={handleExport}
          disabled={technologies.length === 0}
          className="btn btn-export"
        >
          📥 Экспорт данных
        </button>

        <label className="btn btn-import">
          📤 Импорт данных
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            style={{ display: "none" }}
          />
        </label>

        <button onClick={addSampleTechnology} className="btn btn-add">
          ➕ Добавить тестовую технологию
        </button>

        <button
          onClick={clearAllData}
          disabled={technologies.length === 0}
          className="btn btn-clear"
        >
          🗑️ Очистить все данные
        </button>
      </div>

      <div className="technologies-section">
        <h2>Технологии ({technologies.length})</h2>

        {technologies.length === 0 ? (
          <div className="empty-state">
            <p>📋 Нет технологий для отображения</p>
            <p>Добавьте тестовую технологию или импортируйте данные</p>
          </div>
        ) : (
          <div className="technologies-grid">
            {technologies.map((tech) => (
              <div key={tech.id} className="tech-card">
                <h3>{tech.title}</h3>
                <p>{tech.description}</p>
                <div className="tech-meta">
                  <span className="category">
                    {tech.category || "Без категории"}
                  </span>
                  <button
                    onClick={() => toggleStatus(tech.id)}
                    className={`status-badge status-${
                      tech.status || "not-started"
                    }`}
                  >
                    {getStatusText(tech.status)}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="instructions">
        <h3>📖 Инструкция</h3>
        <ul>
          <li>
            <strong>Экспорт:</strong> Сохраняет все технологии в JSON файл
          </li>
          <li>
            <strong>Импорт:</strong> Загружает технологии из JSON файла
          </li>
          <li>
            <strong>Добавить:</strong> Создает тестовую технологию для
            демонстрации
          </li>
          <li>
            <strong>Очистить:</strong> Удаляет все технологии из хранилища
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DataImportExport;
