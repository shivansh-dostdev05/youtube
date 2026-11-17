import "dotenv/config";

import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";

import connectDB from "./config/db.js";

import myVideosRouter from "./routes/myVideos.js";
import authRoutes from "./routes/authRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";


import "./config/passport.js";


const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());


app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  })
);


app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/api/my-videos", myVideosRouter);
app.use("/api/videos", videoRoutes);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();

export default app;