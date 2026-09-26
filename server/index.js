import express from "express";
import "dotenv/config";
import cors from "cors";
import messageRoutes from "./routes/messages.js";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/message", messageRoutes);

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO, {
    dbName: "blog",
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("DB connect error", error.message);
  });
