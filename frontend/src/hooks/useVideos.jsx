import { useState, useEffect } from "react";
import apiCalling from "../utils/apiCalling.js";

const useVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadVideos() {
      try {
        const data = await apiCalling();
        setVideos(data || []);
      } catch (err) {
        setError("Failed to fetch videos.");
      } finally {
        setLoading(false);
      }
    }
    loadVideos();
  }, []);

  return { videos, loading, error };
};

export default useVideos;
