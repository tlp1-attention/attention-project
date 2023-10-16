import { body } from "express-validator";
import { CONTACT_TYPES, TIME_DAY } from "../models/preferences";

type IPreference = {
  id: number;
  time_day: string;
  subject: string;
  people: string;
  contact_type: string;
  contact: string;
  createdAt: Date;
  updatedAt: Date;
  userId?: number;
}

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
            .custom((subjectArr: Array<unknown>) => {
                for (const subject of subjectArr) {
                    if (typeof subject !== "string") {
                        throw new Error('Las materias deben ser un string');
                    } 
                }
                return true;
            })
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

