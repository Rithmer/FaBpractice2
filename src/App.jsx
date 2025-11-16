import "./App.css";
import { useState, useMemo} from "react";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import QuickActions from "./components/QuickActions/QuickActions";
import TechnologyList from "./components/Technology/TechnologyList";
import UserRegisterModal from "./components/UserRegisterModal/UserRegisterModal";
import useTechnologies from "./hooks/useTechnologies";

function App() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  const isUserLoggedIn = !!user;

  const {
    technologies,
    updateStatus,
    notes,
    updateNotes,
    markAllCompleted,
    resetAllStatuses,
    exportData,
    handleImport,
    progress,
  } = useTechnologies(isUserLoggedIn);

  const filteredTechnologies = useMemo(() => {
    return technologies.filter((t) => {
      const matchesFilter = filter === "all" ? true : t.status === filter;
      const matchesSearch =
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [technologies, filter, searchTerm]);

  return (
    <div className="App">
      <Header
        technologies={technologies}
        user={user}
        progress={progress}
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
        toggleStatus={updateStatus}
        notes={notes}
        updateNote={updateNotes}
        isUserLoggedIn={isUserLoggedIn}
      />
    </div>
  );
}

export default App;
