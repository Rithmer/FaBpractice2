import "./App.css";
import { useState, useMemo } from "react";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import QuickActions from "./components/QuickActions/QuickActions";
import TechnologyList from "./components/Technology/TechnologyList";
import UserRegisterModal from "./components/UserRegisterModal/UserRegisterModal";
import { technologiesData } from "./util/technologiesData";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [technologies, setTechnologies] = useState(technologiesData);
  const [notes, setNotes] = useLocalStorage("tech-notes", {});
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  const isUserLoggedIn = !!user;

  const toggleStatus = (id) => {
    if (!isUserLoggedIn) return;
    setTechnologies((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status:
                t.status === "not-started"
                  ? "in-progress"
                  : t.status === "in-progress"
                  ? "completed"
                  : "not-started",
            }
          : t
      )
    );
  };

  const updateNote = (id, text) => {
    if (!isUserLoggedIn) return;
    setNotes((prev) => ({ ...prev, [id]: text }));
  };

  const filteredTechnologies = useMemo(() => {
    return technologies.filter((t) => {
      const matchesFilter = filter === "all" ? true : t.status === filter;
      const matchesSearch = t.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [technologies, filter, searchTerm]);

  const markAllCompleted = () => {
    if (!isUserLoggedIn) return;
    setTechnologies((prev) => prev.map((t) => ({ ...t, status: "completed" })));
  };

  const resetAllStatuses = () => {
    if (!isUserLoggedIn) return;
    setTechnologies((prev) =>
      prev.map((t) => ({ ...t, status: "not-started" }))
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

  return (
    <div className="App">
      <Header
        technologies={technologies}
        user={user}
        setUser={setUser}
        isUserLoggedIn={isUserLoggedIn}
        onOpenRegister={() => setRegisterOpen(true)}
      />

      <UserRegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setRegisterOpen(false)}
        onRegister={setUser}
      />

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filter={filter}
        setFilter={setFilter}
      />

      <QuickActions
        onMarkAll={markAllCompleted}
        onResetAll={resetAllStatuses}
        onExport={exportData}
        onImport={handleImport}
      />

      <TechnologyList
        data={filteredTechnologies}
        toggleStatus={toggleStatus}
        notes={notes}
        updateNote={updateNote}
        isUserLoggedIn={isUserLoggedIn}
      />
    </div>
  );
}

export default App;
