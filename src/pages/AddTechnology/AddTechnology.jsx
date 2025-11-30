import useTechnologiesApi from "../../hooks/useTechnologiesApi";
import { useNavigate, Link } from "react-router-dom";
import TechnologyForm from "../../components/TechnologyForm/TechnologyForm";
import { Container, Box, Typography, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import "./AddTechnology.css";

function AddTechnology() {
  const { addTechnology } = useTechnologiesApi();
  const navigate = useNavigate();

  const handleSave = async (techData) => {
    try {
      await addTechnology(techData);
      navigate("/technologies");
    } catch (err) {
      console.error("Ошибка при добавлении:", err);
    }
  };

  const handleCancel = () => {
    navigate("/technologies");
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Button
          component={Link}
          to="/technologies"
          startIcon={<ArrowBack />}
          sx={{ mb: 2 }}
        >
          Назад к списку
        </Button>
        <Typography variant="h3" component="h1" gutterBottom>
          Добавить технологию
        </Typography>
      </Box>

      <TechnologyForm onSave={handleSave} onCancel={handleCancel} />
    </Container>
  );
}
export default AddTechnology;
