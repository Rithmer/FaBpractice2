import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { theme, darkTheme } from "./styles/theme";
import Navigation from "./components/Navigation/Navigation";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Home from "./pages/Home/Home";
import TechnologyList from "./pages/TechnologyList/TechnologyList";
import AddTechnology from "./pages/AddTechnology/AddTechnology";
import Login from "./pages/Login/Login";
import SearchTechnologies from "./pages/SearchTechnologies/SearchTechnologies";
import Dashboard from "./pages/Dashboard/Dashboard";
import DataImportExport from "./components/DataImportExport/DataImportExport";
import ProductSearch from "./pages/ProductSearch/ProductSearch";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || "";
  });
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    document.documentElement.setAttribute(
      "data-theme",
      newMode ? "dark" : "light"
    );
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999 }}>
          <IconButton
            onClick={toggleDarkMode}
            color="primary"
            sx={{
              bgcolor: "background.paper",
              boxShadow: 3,
              "&:hover": {
                bgcolor: "background.paper",
                boxShadow: 6,
              },
            }}
          >
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
        <Navigation
          isLoggedIn={isLoggedIn}
          username={username}
          onLogout={handleLogout}
        />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/technologies" element={<TechnologyList />} />
            <Route
              path="/add-technology"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <AddTechnology />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/search" element={<SearchTechnologies />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/import-export"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <DataImportExport />
                </ProtectedRoute>
              }
            />
            <Route path="/product-search" element={<ProductSearch />} />
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  );
}
export default App;
