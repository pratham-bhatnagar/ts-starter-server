import Joi from "joi";
import { pick } from "../utils/pick";
import { Request, Response, NextFunction } from "express";
import { errors } from "../errors/error.constants";


export const ValidateRequest =
  (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    const validSchema = pick(schema, ["params", "query", "body"]);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: "key" }, abortEarly: false })
      .validate(object);
    if (error) {
      throw errors.BAD_REQUEST;
    }
    Object.assign(req, value);
    return next();
  };
