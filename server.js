import express from "express"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import dotenv from "dotenv";
import cors from "cors"
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.set( "trust proxy" , 1);

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
}));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGO_URI)
        .then(()=>console.log("mongoDB connected"))
        .catch((error)=>console.log(`Error - ${error}`)) ;
        
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`server running on http://localhost:${PORT}`)
);