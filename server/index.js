import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
const __dirname = path.resolve();
console.log(__dirname);
const app = express();

const whitelist = ["http://localhost:3000"];

// app.options('*', cors())
app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (whitelist.includes(origin)) return callback(null, true);

      callback(new Error("Not allowed by CORS"));
    },
  })
);
// app.use(helmet());
// app.use(cors());
const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
//error handler
// app.use(express.static(path.join("public")));
// app.use((req, res, next) => {
//   res.sendFile(path.resolve(__dirname, "public", "index.html"));
// });
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});
const port = process.env.PORT || 8800;
app.listen(port, () => {
  connect();
  console.log("Connected to Server");
});
