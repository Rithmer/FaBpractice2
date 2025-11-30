import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
} from "@mui/material";

function SimpleTechCard({ technology, onStatusChange }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "success";
      case "in-progress":
        return "warning";
      default:
        return "default";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Завершено";
      case "in-progress":
        return "В процессе";
      default:
        return "Не начато";
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        minHeight: 280,
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {technology.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {technology.description}
        </Typography>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Chip
            label={technology.category || "frontend"}
            variant="outlined"
            size="small"
          />
          <Chip
            label={getStatusText(technology.status)}
            color={getStatusColor(technology.status)}
            size="small"
          />
        </Box>
      </CardContent>

      <CardActions>
        {technology.status === "not-started" && (
          <Button
            size="small"
            variant="contained"
            onClick={() => onStatusChange(technology.id, "in-progress")}
          >
            Начать
          </Button>
        )}

        {technology.status === "in-progress" && (
          <>
            <Button
              size="small"
              variant="contained"
              color="success"
              onClick={() => onStatusChange(technology.id, "completed")}
            >
              Завершить
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={() => onStatusChange(technology.id, "not-started")}
            >
              Приостановить
            </Button>
          </>
        )}

        {technology.status === "completed" && (
          <Button
            size="small"
            variant="outlined"
            onClick={() => onStatusChange(technology.id, "not-started")}
          >
            Сбросить
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default SimpleTechCard;
