import { useState, useRef } from "react";
import useTechnologies from "../../hooks/useTechnologies";
import TechnologyCard from "../../components/TechnologyCard/TechnologyCard";
import { TextField, InputAdornment, CircularProgress, Box, Typography } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

function SearchTechnologies() {
  const isUserLoggedIn = !!localStorage.getItem("isLoggedIn");
  const {
    technologies,
    updateStatus,
    notes,
    updateNotes,
  } = useTechnologies(isUserLoggedIn);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const timer = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (timer.current) clearTimeout(timer.current);
    setLoading(true);
    timer.current = setTimeout(() => {
      setLoading(false);
    }, 400);
  };

  const filteredResults = search.trim()
    ? technologies.filter(
        (tech) =>
          tech.title.toLowerCase().includes(search.toLowerCase()) ||
          tech.description.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="page">
      <div className="page-header">
        <h1>Поиск технологий</h1>
        <p>Найдите нужную технологию по названию или описанию</p>
      </div>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Введите название или описание технологии..."
          value={search}
          onChange={handleChange}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: loading && (
                <InputAdornment position="end">
                  <CircularProgress size={24} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "background.paper",
            },
          }}
        />
      </Box>

      {search && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" color="text.secondary">
            {loading
              ? "Поиск..."
              : `Найдено результатов: ${filteredResults.length}`}
          </Typography>
        </Box>
      )}

      <div className="technology-list">
        {search && filteredResults.map((tech) => (
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

      {filteredResults.length === 0 && search && !loading && (
        <div className="empty-state">
          <p>🔍 Ничего не найдено</p>
          <p className="muted">Попробуйте изменить поисковый запрос</p>
        </div>
      )}

      {!search && (
        <div className="empty-state">
          <SearchIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
          <p>Начните поиск</p>
          <p className="muted">Введите название или описание технологии в поле поиска</p>
        </div>
      )}
    </div>
  );
}
export default SearchTechnologies;
