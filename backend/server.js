import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import channelRoutes from "./routes/channel.routes.js";
import videoRoutes from "./routes/video.routes.js"

dotenv.config();

const app=new express();

// -----------------------
//  CONNECT DATABASE
// -----------------------
connectDB();

// -----------------------
//  CORS MIDDLEWARE
// -----------------------
const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.CLIENT_URL_PROD,
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
}));

// -----------------------
//  MIDDLEWARE
// -----------------------
app.use(express.json());

// Test rote
app.get("/", (req, res) => {
  res.send("Backend server is running...");
});

// User Routes
app.use("/api/user", userRoutes);
app.use("/api/channels",channelRoutes);
app.use("/api/videos",videoRoutes)

// -----------------------
//  SERVER START
// -----------------------
const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`SERVER IS LISTENING ON PORT ${PORT}`);  
});
