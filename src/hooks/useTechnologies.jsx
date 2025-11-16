import useLocalStorage  from "./useLocalStorage";
import {technologiesData }from "../util/technologiesData";

function useTechnologies(isUserLoggedIn) {
  const [technologies, setTechnologies] = useLocalStorage(
    "technologies",
    technologiesData
  );
  const [notes, setNotes] = useLocalStorage("tech-notes", {});


  const updateStatus = (id) => {
    if (!isUserLoggedIn) return;
    setTechnologies((prev) =>
      prev.map((tech) =>
        tech.id === id
          ? {
              ...tech,
              status:
                tech.status === "not-started"
                  ? "in-progress"
                  : tech.status === "in-progress"
                  ? "completed"
                  : "not-started",
            }
          : tech
      )
    );
  };

  
  const updateNotes = (id, text) => {
    if (!isUserLoggedIn) return;
    setNotes((prev) => ({ ...prev, [id]: text }));
  };


  const calculateProgress = () => {
    const total = technologies.length;
    const completed = technologies.filter(
      (t) => t.status === "completed"
    ).length;
    const inProgress = technologies.filter(
      (t) => t.status === "in-progress"
    ).length;
    const notStarted = technologies.filter(
      (t) => t.status === "not-started"
    ).length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, inProgress, notStarted, percent };
  };

  const markAllCompleted = () => {
    if (!isUserLoggedIn) return;
    setTechnologies((prev) =>
      prev.map((tech) => ({ ...tech, status: "completed" }))
    );
  };

  const resetAllStatuses = () => {
    if (!isUserLoggedIn) return;
    setTechnologies((prev) =>
      prev.map((tech) => ({ ...tech, status: "not-started" }))
    );
  };

  const exportData = () => {
    try {
      const dataStr = JSON.stringify(technologies, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "technologies.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Ошибка экспорта данных", e);
    }
  };

  const handleImport = (data) => {
    const imported = Object.keys(data).map((key, idx) => ({
      id: idx + 1,
      title: data[key].title,
      description: data[key].description,
      status: "not-started",
      links: data[key].links || [],
    }));
    setTechnologies(imported);
  };

  return {
    technologies,
    updateStatus,
    notes,
    updateNotes,
    markAllCompleted,
    resetAllStatuses,
    exportData,
    handleImport,
    progress: calculateProgress(),
  };
}

export default useTechnologies;
