import { body } from 'express-validator'

const commonUserSchemaOptions = {
    usernameValidation: [
        body('username')
            .exists()
            .withMessage('Debe proporcionar un nombre de usuario')
            .not()
            .isEmpty({ ignore_whitespace: true })
            .withMessage('El nombre de usuario no puede estar vacío')
            .isString()
            .withMessage('El nombre de usuario debe ser un string')
            .isLength({ min: 1, max: 255 })
            .withMessage(
                'El nombre de usuario debe tener entre 1 y 255 caracteres'
            ),
    ],
    passwordValidation: [
        body('password')
            .exists()
            .withMessage('Debe proporcionar una contraseña para el usuario')
            .not()
            .isEmpty({ ignore_whitespace: true })
            .isStrongPassword({
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 0,
            })
            .withMessage(
                'La contraseña debe contener al menos ocho caracteres, una mayúscula, una minúscula y un número'
            ),
    ],
    emailValidation: [
        body('email')
            .exists()
            .withMessage('Debe proporcionar una dirección de correo')
            .isEmail()
            .withMessage(
                'Debe proporcionar una dirección de correo electrónico válida'
            ),
    ],
}

export const createUserSchema = [
    ...commonUserSchemaOptions.emailValidation,
    ...commonUserSchemaOptions.passwordValidation,
    ...commonUserSchemaOptions.usernameValidation,
];

export const loginUserSchema = [
    body('username')
        .exists()
        .withMessage('Debe iniciar sesión con su usuario')
        .not()
        .isEmpty()
        .withMessage('El nombre de usuario no puede estar vacío'),
    body('password')
        .exists().withMessage('Debe iniciar sesión con su contraseña')
        .not().isEmpty().withMessage('Su contraseña no puede estar vacía')
];
export const changePasswordSchema = [
    body('email')
        .exists().withMessage('Debe proveer un email para cambiar su contraseña')
        .isEmail().withMessage('Debe proveer un email válido'),
    ...commonUserSchemaOptions.passwordValidation
];
