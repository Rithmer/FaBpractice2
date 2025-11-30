import { useState, useRef } from "react";
import useTechnologiesApi from "../../hooks/useTechnologiesApi";

function SearchTechnologies() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { technologies } = useTechnologiesApi();
  const timer = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (timer.current) clearTimeout(timer.current);
    setLoading(true);
    timer.current = setTimeout(() => {
      const filtered = technologies.filter(
        (tech) =>
          tech.title.toLowerCase().includes(value.toLowerCase()) ||
          tech.description.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
    }, 400);
  };

  return (
    <div className="page">
      <h1>Поиск технологий</h1>
      <input
        value={search}
        onChange={handleChange}
        className="search-input"
        placeholder="Введите название или описание..."
      />
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="technologies-grid">
          {results.map((tech) => (
            <div key={tech.id} className="technology-item">
              <h3>{tech.title}</h3>
              <p>{tech.description}</p>
            </div>
          ))}
          {results.length === 0 && search && !loading && (
            <div className="empty-state">Технологий не найдено</div>
          )}
        </div>
      )}
    </div>
  );
}
export default SearchTechnologies;
