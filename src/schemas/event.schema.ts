import { param, body } from 'express-validator'
import { TypeEvent } from '../models/type_events';

const eventSchemaOptions = [
    body('title')
        .exists()
        .withMessage('Un evento debe tener título')
        .isString()
        .withMessage('El título de un evento debe ser un string')
        .trim()
        .notEmpty()
        .withMessage('El título no puede estar vacío')
        .isLength({
            max: 255,
        })
        .withMessage('El título no puede tener más de 255 caracteres'),
    body('description')
        .exists()
        .withMessage('Un evento debe tener una descripción')
        .isString()
        .withMessage('La descripción de un evento debe ser un string')
        .trim()
        .notEmpty()
        .withMessage('La descripción no puede estar vacía')
        .isLength({
            max: 255,
        })
        .withMessage('La descripción no puede tener más de 255 caracteres'),
    body('startDate')
        .exists().withMessage('Un evento debe tener una fecha de inicio')
        .isISO31661Alpha2().withMessage('Debe enviar una fecha de ingreso válida')
        .toDate()
        // Check that the date is on the future
        .custom((date: Date) => {
            if (date.getTime() < Date.now()) {
                throw new Error('La fecha de inicio debe ser futura');
            };
        }),
    body('endDate')
        .optional()
        .isISO31661Alpha2().withMessage('Debe enviar una fecha de fin válida')
        .toDate()
        // Check that the date is on the future
        .custom((date: Date) => {
            if (date.getTime() < Date.now()) {
                throw new Error('La fecha final debe ser futura');
            };
        }),
    body('typeId')
        .exists().withMessage('Debe proveer una ID de tipo de evento')
        .isNumeric().withMessage('La ID del tipo de evento debe ser un entero')
        .toInt()
        .custom(async id => {
            const available = await TypeEvent.typesAvailable();
            if (available.includes(id)) {
                throw new Error('La ID enviada no representa un tipo de evento válido')
            };
        })
];

export const createEventSchema = eventSchemaOptions;

export const updateEventSchema = [
    ...eventSchemaOptions,
    param('eventId')
        .exists().withMessage('Debe proveer un ID de evento válido')
]