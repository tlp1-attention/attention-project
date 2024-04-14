import { body } from "express-validator";

const commonSchemaOptions = {
    validateReadingTitle: [
        body('title')
            .exists()
            .withMessage('La lectura debe tener un título')
            .trim()
            .isString().withMessage('El título debe ser un string')
            .not().isEmpty().withMessage('El título no puede estar vacío')
    ],
    validateReadingSummary: [
        body('summary')
            .exists()
            .withMessage('La lectura debe tener un resumen')
            .trim()
            .isString()
            .withMessage('El resumen debe ser un string')
            .not().isEmpty().withMessage('El resumen no puede estar vacío')
    ],
    validateReadingContents: [
        body('contents')
            .exists()
            .withMessage('La lectura debe tener contenido')
            .trim()
            .isString()
            .withMessage('El contenido de la lectura debe ser un string')
            .not().isEmpty().withMessage('El contenido de la lectura no puede estar vacío')
    ],
    validateQuestions: [
        body('questions')
            .exists()
            .withMessage('La lectura debe tener preguntas')
            .isArray().withMessage('Las preguntas deben estar dispuestas en un array')
            .not().isEmpty().withMessage('La lectura debe tener al menos una pregunta'),
        body('questions.*.questionText')
            .exists()
            .withMessage('La pregunta debe tener un texto')
            .trim()
            .not().isEmpty().withMessage('La pregunta no puede estar vacía'),
        body('questions.*.options')
            .exists()
            .withMessage('La pregunta debe tener opciones')
            .isArray({ min: 4, max: 4 }).withMessage('Cuatro opciones deben estar dispuestas en un array')
            .not().isEmpty().withMessage('La pregunta debe tener al menos una opción'),
        body('questions.*.options.*.optionText')
            .exists()
            .withMessage('La opción debe tener un texto')
            .trim()
            .not().isEmpty().withMessage('La opción no puede estar vacía'),
        body('questions.*.options.*.isCorrect')
            .exists()
            .withMessage('La opción debe tener un valor de correctitud')
            .isBoolean().withMessage('El valor de correctitud debe ser un booleano')
    ],
    validateCover: [
        body('_')
            .custom((_, { req }) => {
                if (!req.files?.cover) {
                    throw new Error('La lectura debe tener una portada');
                }
                if (req.files.cover.mimetype !== 'image/jpeg' && req.files.cover.mimetype !== 'image/png') {
                    throw new Error('La portada debe ser una imagen en formato PNG o JPEG');
                }
                return true;
            })
    ]
}

export const createReadingSchema = [
    ...commonSchemaOptions.validateReadingTitle,
    ...commonSchemaOptions.validateReadingContents,
    ...commonSchemaOptions.validateReadingSummary,
    ...commonSchemaOptions.validateQuestions,
];

export const updateReadingSchema = [...createReadingSchema];
export const updateReadingCoverSchema = [...commonSchemaOptions.validateCover];

