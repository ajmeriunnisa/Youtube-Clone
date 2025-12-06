import { useState, useEffect } from "react";
import axios from "../api/axios";

const useVideos = (category = "All") => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVideos() {
      setLoading(true);
      try {
        let url = "/api/videos";
        if (category && category !== "All") url = `/api/videos/category/${encodeURIComponent(category)}`;
        const res = await axios.get(url);
        setVideos(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch videos from server");
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, [category]);

  return { videos, loading, error };
};

export default useVideos;
