import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import env from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
const app = express();
env.config();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Set-Cookie, Authorization",
  })
);

pool.connect((err) => {
  if (err) {
    console.error("DB Connection Error:", err.stack);
    return;
  }
  console.log("Connected to DB");
});

app.get("/healthz", (req, res) => {
  res.status(200).json("Systems up & running");
});

app.use("/api", contactRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
