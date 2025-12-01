import { useState, useEffect } from "react";
import videos from "../utils/videos";

const useVideos = () => {
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    setVideoData(videos);
  }, []);

  return videoData;
};

export default useVideos;
