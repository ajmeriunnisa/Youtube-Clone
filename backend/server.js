import express from "express";
import connectDB from "./config/db.js";

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

// -----------------------
//  SERVER START
// -----------------------
const PORT=5000;

app.listen(PORT,()=>{
    console.log(`SERVER IS LISTENING ON PORT ${PORT}`);  
});
