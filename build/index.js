"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const logger_service_1 = __importDefault(require("./services/logger.service"));
const morgan_1 = __importDefault(require("morgan"));
const error_handler_1 = __importDefault(require("./errors/error.handler"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.set("trust proxy", true);
app.use((0, morgan_1.default)("combined", {
    stream: {
        write: (message) => logger_service_1.default.debug(message),
    },
}));
app.get("/", (req, res, next) => {
    res.json({
        success: true,
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});
app.use("*", (req, res, next) => {
    res.status(405).json({
        success: false,
        message: "Method Not Allowed!",
    });
});
app.use((0, error_handler_1.default)());
app.listen(process.env.PORT, () => {
    if (process.env.NODE_ENV === "development") {
        logger_service_1.default.info(`
      #############################
      # WARNING: DEVELOPMENT MODE #
      #############################
      `);
    }
    logger_service_1.default.info(`Server:::${process.env.NODE_ENV} running on Port: ${process.env.PORT}`);
});
