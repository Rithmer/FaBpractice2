import { useState, useEffect, useCallback } from "react";

const useTechnologiesApi = () => {
  const [technologies, setTechnologies] = useState(() => {
    const saved = localStorage.getItem("technologies");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem("technologies", JSON.stringify(technologies));
  }, [technologies]);

  const fetchTechnologies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      const formattedData = data.map((user) => ({
        id: user.id,
        title: user.name,
        description: user.email,
        status: "not-started",
      }));

      setTechnologies((prev) => (prev.length === 0 ? formattedData : prev));
    } catch (err) {
      setError("Failed to fetch technologies");
      console.error("Error fetching technologies:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTechnologyStatus = (id, newStatus) => {
    setTechnologies((prev) =>
      prev.map((tech) =>
        tech.id === id
          ? {
              ...tech,
              status: newStatus,
            }
          : tech
      )
    );
  };

  const addTechnology = async (newTechnology) => {
    setLoading(true);
    setError(null);
    try {
      const newTech = {
        id: Date.now(),
        ...newTechnology,
        status: "not-started",
        createdAt: new Date().toISOString(),
      };
      setTechnologies((prev) => [...prev, newTech]);
    } catch (err) {
      setError("Failed to add technology");
      console.error("Error adding technology:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    technologies,
    loading,
    error,
    fetchTechnologies,
    updateTechnologyStatus,
    addTechnology,
  };
};

export default useTechnologiesApi;
