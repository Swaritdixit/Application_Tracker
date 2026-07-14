const express=require("express");
const dotenv=require("dotenv");
const connectDB=require("./config/db");
const cors=require("cors");
const userRoutes=require("./routes/userRoutes");
const detailRoutes=require("./routes/detailRoutes");
dotenv.config();

connectDB();

const app=express();
app.use(cors());
app.use(express.json());
app.use("/api/auth",userRoutes);
app.use("/api/details",detailRoutes);
app.get("/",(req,res)=>{
    res.send("Backend is running");
});

app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`);
});
