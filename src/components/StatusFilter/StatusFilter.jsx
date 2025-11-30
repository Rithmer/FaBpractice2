import React from "react";
import {
  ToggleButtonGroup,
  ToggleButton,
  Paper,
  Typography,
} from "@mui/material";
import {
  ViewList,
  RadioButtonUnchecked,
  Schedule,
  CheckCircle,
} from "@mui/icons-material";
import "./StatusFilter.css";

function StatusFilter({ currentFilter, onFilterChange, stats }) {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        mb: 3,
        backgroundColor: "background.paper",
        borderRadius: 2,
      }}
    >
      <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
        Фильтр по статусу
      </Typography>

      <ToggleButtonGroup
        value={currentFilter}
        exclusive
        onChange={(e, newFilter) => {
          if (newFilter !== null) {
            onFilterChange(newFilter);
          }
        }}
        aria-label="filter by status"
        sx={{
          flexWrap: "wrap",
          gap: 1,
          "& .MuiToggleButton-root": {
            margin: "4px",
          },
        }}
      >
        <ToggleButton value="all" aria-label="all technologies">
          <ViewList sx={{ mr: 1 }} />
          Все ({stats.total})
        </ToggleButton>

        <ToggleButton value="not-started" aria-label="not started">
          <RadioButtonUnchecked sx={{ mr: 1 }} />
          Не начато ({stats.notStarted})
        </ToggleButton>

        <ToggleButton value="in-progress" aria-label="in progress">
          <Schedule sx={{ mr: 1 }} />В процессе ({stats.inProgress})
        </ToggleButton>

        <ToggleButton value="completed" aria-label="completed">
          <CheckCircle sx={{ mr: 1 }} />
          Завершено ({stats.completed})
        </ToggleButton>
      </ToggleButtonGroup>
    </Paper>
  );
}

export default StatusFilter;
