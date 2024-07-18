import Express, { Response, Request, NextFunction } from "express";
import { config } from "dotenv";
import cors from "cors";
import logger from "./services/logger.service";
import morgan from "morgan";
import errorHandler from "./errors/error.handler";
config();

const app = Express();
app.use(Express.json());
app.use(cors());
app.set("trust proxy", true);
app.use(
  morgan("combined", { 
    stream: {
      write: (message) => logger.debug(message),
    },
  })
);
app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });
  
  app.use("*", (req: Request, res: Response, next: NextFunction) => {
    res.status(405).json({
      success: false,
      message: "Method Not Allowed!",
    });
  });
  
  app.use(errorHandler());

  app.listen(process.env.PORT!, () => {
    if (process.env.NODE_ENV === "development") {
      logger.info(
        `🚀 Server:::${process.env.NODE_ENV} running on Port: ${process.env.PORT} 🚀`
      );
    }
  });
  