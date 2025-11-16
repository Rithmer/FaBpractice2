import Filters from "../Filters/Filters";
import "./SearchBar.css";

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  filter,
  setFilter,
}) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Поиск технологий..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Filters filter={filter} setFilter={setFilter} />
    </div>
  );
}
