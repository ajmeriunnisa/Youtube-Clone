import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function apiCalling() {
  try {
    const res = await axios.get(`${API_URL}/api/videos`);
    return res.data;  
  } catch (err) {
    console.error("Error fetching videos:", err);
    return null;
  }
}

export default apiCalling;
