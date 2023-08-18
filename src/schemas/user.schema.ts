import { checkSchema } from 'express-validator';

export const createUserSchema = checkSchema({
    username: {
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

export const loginUserSchema = checkSchema({
    username: {
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
});

export const changePasswordSchema = checkSchema({
    email: {
        errorMessage: 'Must provide an email to change the password',
        isEmail: true
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
});