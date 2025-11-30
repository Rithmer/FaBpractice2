import React from "react";
import {
  ToggleButtonGroup,
  ToggleButton,
  Paper,
  Typography,
} from "@mui/material";
import { CheckCircle, Refresh, Casino } from "@mui/icons-material";
import "./QuickActions.css";

function QuickActions({
  technologies,
  onMarkAllCompleted,
  onResetAll,
  onRandomize,
  isUserLoggedIn,
}) {
  const [selectedAction, setSelectedAction] = React.useState(null);

  const handleActionClick = (action) => {
    if (!isUserLoggedIn || technologies.length === 0) return;

    setSelectedAction(action);

    switch (action) {
      case "complete":
        onMarkAllCompleted();
        break;
      case "reset":
        onResetAll();
        break;
      case "random":
        if (technologies.length === 0) {
          alert("Нет технологий для случайного выбора!");
        } else {
          const totalTechs = technologies.length;
          const randomCount = Math.floor(Math.random() * totalTechs) + 1;

          if (
            window.confirm(
              `Случайный выбор изменит ${randomCount} из ${totalTechs} технологий.\nПродолжить?`
            )
          ) {
            onRandomize();
            alert(`✨ Случайно обновлены статусы ${randomCount} технологий!`);
          }
        }
        break;
      default:
        break;
    }

    setTimeout(() => setSelectedAction(null), 500);
  };

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
        Быстрые действия
      </Typography>

      <ToggleButtonGroup
        value={selectedAction}
        exclusive
        onChange={(e, action) => {
          if (action !== null) {
            handleActionClick(action);
          }
        }}
        aria-label="quick actions"
        sx={{
          flexWrap: "wrap",
          gap: 1,
          "& .MuiToggleButton-root": {
            margin: "4px",
          },
        }}
      >
        <ToggleButton
          value="complete"
          aria-label="mark all completed"
          disabled={!isUserLoggedIn || technologies.length === 0}
        >
          <CheckCircle sx={{ mr: 1 }} />
          Отметить все
        </ToggleButton>

        <ToggleButton
          value="reset"
          aria-label="reset all"
          disabled={!isUserLoggedIn || technologies.length === 0}
        >
          <Refresh sx={{ mr: 1 }} />
          Сбросить
        </ToggleButton>

        <ToggleButton
          value="random"
          aria-label="random pick"
          disabled={!isUserLoggedIn || technologies.length === 0}
        >
          <Casino sx={{ mr: 1 }} />
          Случайный выбор
        </ToggleButton>
      </ToggleButtonGroup>

      {!isUserLoggedIn && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 2 }}
        >
          Авторизуйтесь, чтобы использовать быстрые действия
        </Typography>
      )}
    </Paper>
  );
}

export default QuickActions;
