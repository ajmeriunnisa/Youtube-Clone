import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app=new express();

// -----------------------
//  CONNECT DATABASE
// -----------------------
connectDB();

// -----------------------
//  MIDDLEWARE
// -----------------------
app.use(express.json());

// Test rote
app.get("/", (req, res) => {
  res.send("Backend server is running...");
});

// User Routes
app.use("/api/users", userRoutes);

// -----------------------
//  SERVER START
// -----------------------
const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`SERVER IS LISTENING ON PORT ${PORT}`);  
});
