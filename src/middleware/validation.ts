import { Request, Response, NextFunction } from 'express'
import { validationResult, ValidationChain } from 'express-validator'
import { Middleware } from 'express-validator/src/base'
import { ContextRunner, ValidationChainLike } from 'express-validator/src/chain'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'

export const validate = <T extends ValidationChain>(
    schemas: (RunnableValidationChains<T> | ValidationChainLike | ContextRunner & Middleware)[]
) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        for (const schema of schemas) {
            await schema.run(request)
            const errors = validationResult(request)

            if (!errors.isEmpty()) {
                return response.status(400).send({
                    errors: errors.array(),
                })
            }
        }

        return next()
    }
}
