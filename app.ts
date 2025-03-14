import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import routes from "./core/routes";
import errorHandler from "./core/middlewares/errorHandler";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/api", routes);

// Serve static files
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Global error handler
app.use(errorHandler);

export default app;
