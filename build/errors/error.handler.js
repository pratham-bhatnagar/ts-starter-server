"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_service_1 = __importDefault(require("../services/logger.service"));
const errorHandler = () => (err, req, res, next) => {
    if (err === null || err === void 0 ? void 0 : err.errorCode) {
        logger_service_1.default.error("User Input Error!");
        logger_service_1.default.error(JSON.stringify(err));
        res.status(err.errorCode).json({
            success: false,
            message: `ErrorName: ${err.status}`,
        });
    }
    else {
        logger_service_1.default.error("Internal Server Error");
        logger_service_1.default.error(JSON.stringify(err));
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.default = errorHandler;
