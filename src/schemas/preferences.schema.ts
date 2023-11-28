import { body } from "express-validator";
import { CONTACT_TYPES, TIME_DAY } from "../models/preferences";

const commonSchemaOptions = {
    validateTimeDay: [
        body('timeDay')
            .optional()
            .isString().withMessage('El momento del día debe ser un string')
            .custom((value) => {
                const timeAvailable = Object.values(TIME_DAY);
                if (timeAvailable.includes(value)) {
                    return true;
                }
                throw new Error('El momento del día debe ser válido: Day, Afternoon o Night');
            }),
    ],
    validateSubject: [
        body('subjects')
            .optional()
            .isArray().withMessage('Los temas deben estar dispuestos en un array')
    ],
    validateContact: [
        body('contactType')
            .optional()
            .isString().withMessage('El tipo de contacto debe ser un string')
            .custom(type => {
                const availableTypes = Object.values(CONTACT_TYPES);
                if (!availableTypes.includes(type)) {
                    throw new Error('Tipo de contacto inválido')
                }
                return true;
            }),
        body('contact')
            .exists().withMessage('Debe proveer un contacto')
            .if((_value, { req }) => req.body.contactType !== null)
            .isString().withMessage('La información de contacto debe ser un string')
            .if((_value, { req }) => req.body.contactType === CONTACT_TYPES.EMAIL)
            .isEmail().withMessage('Debe proporcionar un correo electrónico válido')
    ]
}

export const createPreferenceSchema = [
    ...commonSchemaOptions.validateContact,
    ...commonSchemaOptions.validateSubject,
    ...commonSchemaOptions.validateTimeDay
];

export const updatePreferenceSchema = [...createPreferenceSchema];

