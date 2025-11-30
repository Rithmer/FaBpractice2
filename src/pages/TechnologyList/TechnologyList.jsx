import { Link } from "react-router-dom";
import { useState } from "react";
import useTechnologies from "../../hooks/useTechnologies";
import TechnologyCard from "../../components/TechnologyCard/TechnologyCard";
import QuickActions from "../../components/QuickActions/QuickActions";
import StatusFilter from "../../components/StatusFilter/StatusFilter";
import "./TechnologyList.css";

function TechnologyList() {
  const isUserLoggedIn = !!localStorage.getItem("isLoggedIn");
  const {
    technologies,
    updateStatus,
    notes,
    updateNotes,
    markAllCompleted,
    resetAllStatuses,
    randomizeStatuses,
    progress,
  } = useTechnologies(isUserLoggedIn);

  const [currentFilter, setCurrentFilter] = useState("all");

  const filteredTechnologies = technologies.filter((tech) => {
    if (currentFilter === "all") return true;
    return tech.status === currentFilter;
  });

  return (
    <div className="page">
      <div className="page-header">
        <h1>Все технологии</h1>
      </div>

      <QuickActions
        technologies={technologies}
        onMarkAllCompleted={markAllCompleted}
        onResetAll={resetAllStatuses}
        onRandomize={randomizeStatuses}
        isUserLoggedIn={isUserLoggedIn}
      />

      <StatusFilter
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
        stats={progress}
      />

      <div className="technology-list">
        {filteredTechnologies.map((tech) => (
          <TechnologyCard
            key={tech.id}
            id={tech.id}
            title={tech.title}
            description={tech.description}
            status={tech.status}
            onToggle={updateStatus}
            note={notes[tech.id] || ""}
            onNoteChange={(text) => updateNotes(tech.id, text)}
            links={tech.resources || tech.links || []}
            isUserLoggedIn={isUserLoggedIn}
          />
        ))}
      </div>

      {filteredTechnologies.length === 0 && technologies.length > 0 && (
        <div className="empty-state">
          <p>Нет технологий с выбранным статусом.</p>
          <button
            className="btn btn-primary"
            onClick={() => setCurrentFilter("all")}
          >
            Показать все
          </button>
        </div>
      )}

      {technologies.length === 0 && (
        <div className="empty-state">
          <p>Технологий пока нет.</p>
          <Link to="/add-technology" className="btn btn-primary">
            Добавить первую технологию
          </Link>
        </div>
      )}
    </div>
  );
}
export default TechnologyList;
