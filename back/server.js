import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import placeRoutes from "./routes/placeRoutes.js"
import reservationRoutes from "./routes/reservationRoutes.js"

// DATABASE CONNECTION
connectDB();



const app = express();


app.use(express.json());
app.use(cors());


//ROUTES
app.use("/api/user", userRoutes);
app.use("/api/place", placeRoutes);
app.use("/api/reservation", reservationRoutes);


app.get("/",(req,res)=>{
    res.send("API IS RUNNING..")
})

const PORT =  5000
app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}`));