import { useState } from "react";
import useTechnologiesApi from "../../hooks/useTechnologiesApi";
import MuiDashboard from "../../components/MuiDashboard/MuiDashboard";
import SimpleTechCard from "../../components/SimpleTechCard/SimpleTechCard";
import TechnologyForm from "../../components/TechnologyForm/TechnologyForm";
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Add as AddIcon, Close as CloseIcon } from "@mui/icons-material";

function Dashboard() {
  const { technologies, updateTechnologyStatus, addTechnology } =
    useTechnologiesApi();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStatusChange = (techId, newStatus) => {
    updateTechnologyStatus(techId, newStatus);
  };

  const handleAddTechnology = (techData) => {
    addTechnology(techData);
    setIsModalOpen(false);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" component="h1">
          🚀 Панель управления технологиями
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsModalOpen(true)}
        >
          Добавить технологию
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <MuiDashboard technologies={technologies} />
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Все технологии ({technologies.length})
        </Typography>
        <Grid container spacing={3}>
          {technologies.map((tech) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={tech.id}>
              <SimpleTechCard
                technology={tech}
                onStatusChange={handleStatusChange}
              />
            </Grid>
          ))}
        </Grid>

        {technologies.length === 0 && (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              backgroundColor: "background.paper",
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Нет технологий
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Добавьте первую технологию для отслеживания
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setIsModalOpen(true)}
            >
              Добавить технологию
            </Button>
          </Box>
        )}
      </Box>

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Добавить новую технологию
          <IconButton
            aria-label="close"
            onClick={() => setIsModalOpen(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TechnologyForm
            onSave={handleAddTechnology}
            onCancel={() => setIsModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default Dashboard;
