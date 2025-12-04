import express from "express";

const app=new express();

//Middleware to parse JSON request body
app.use(express.json());

// Default route just to test server
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
