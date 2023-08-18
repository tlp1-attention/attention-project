import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";
import { RunnableValidationChains } from "express-validator/src/middlewares/schema";

export const validate = <T extends ValidationChain>(schema: RunnableValidationChains<T>) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        await schema.run(request);
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response
                .status(400)
                .send({
                    errors: errors.array().map(error => error.msg),
                });
        }

        return next();
    }
}