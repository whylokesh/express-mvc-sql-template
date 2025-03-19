import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import routes from "./core/routes";
import errorHandler from "./core/middlewares/errorHandler";

dotenv.config();

const app = express();

// Security middleware
app.use(helmet()); // Helps secure Express apps by setting HTTP headers

// Enable CORS
app.use(cors());

// Request payload parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable compression for better performance
app.use(compression());

// Rate Limiting (Limits requests to avoid abuse)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per 15 mins per IP
  message: "⚠️ Too many requests, please try again later.",
});

app.use(limiter);

// API Routes
app.use("/api", routes);

// Serve static files
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Global error handler
app.use(errorHandler);

export default app;
