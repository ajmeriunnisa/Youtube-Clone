import { useState, useEffect } from "react";
import apiCalling from "../utils/apiCalling.js";

const useVideos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function loadVideos() {
      const data = await apiCalling();
      if (data) {
        setVideos(data);
      }
    }
    loadVideos();
  }, []);

  return videos;
};

export default useVideos;
