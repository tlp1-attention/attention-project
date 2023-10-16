import { param, body } from 'express-validator'
import { TypeExercises } from '../models/type_exercises'

const completeExerciseSchemaOptions = {
    validateComplete: [
        body('complete')
            .exists()
            .withMessage(
                'Debe enviar un estado de `completo` para el ejercicio'
            )
            .isBoolean()
            .withMessage('`complete` debe ser un booleano'),
    ],
    validateTypeExercise: [
        body('typeExerciseId')
            .exists()
            .withMessage('Debe proveer una ID de tipo de ejercicio')
            .isNumeric()
            .withMessage('La ID del tipo de evento debe ser un entero')
            .toInt()
            .custom(async (id) => {
                const available = await TypeExercises.typesAvailable()
                if (!available.includes(id)) {
                    throw new Error(
                        'La ID enviada no representa un tipo de ejercicio válido'
                    )
                }
            }),
    ],
    validateExerciseId: [
        body('exerciseId')
            .exists()
            .withMessage('Debes proveer el ID de un ejercicio.')
            .isNumeric()
            .isInt()
            .toInt()
            .withMessage('El ID debe ser un entero')
            .bail(),
    ],
}

export const createCompletedSchema = [
    ...completeExerciseSchemaOptions.validateComplete,
    ...completeExerciseSchemaOptions.validateExerciseId,
    ...completeExerciseSchemaOptions.validateTypeExercise,
]

export const updateCompletedSchema = [
    ...completeExerciseSchemaOptions.validateComplete,
    ...completeExerciseSchemaOptions.validateExerciseId,
    ...completeExerciseSchemaOptions.validateTypeExercise,
    param('completedId')
        .exists()
        .isNumeric()
        .withMessage('Debe proveer un ID de ejercicio válido'),
]

export const deleteCompletedSchema = [
    param('completedId')
        .exists()
        .isNumeric()
        .withMessage('Debe proveer un ID de ejercicio válido'),
]
