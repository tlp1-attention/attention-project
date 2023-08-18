import { checkSchema } from 'express-validator';

export const validateUserSchema = checkSchema({
    name: {
        errorMessage: 'Users must have a name',
        isString: true,
        isEmpty: false,
    },
    password: {
        isLength: {
            errorMessage: 'Password must be at least 8 characters long',
            options: {
                min: 8,
            }
        },
        contains: {
            errorMessage: 'Password must contain at least one upper case letter, one lower case letter, and a number',
            options: {
                isLowerCase: true,
                isUpperCase: true,
                isFinite: true,
            }
        }
    },
    email: {
        isEmail: true,
    }
});