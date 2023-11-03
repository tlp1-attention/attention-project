import { param, body, query, checkExact } from 'express-validator'
import { TypeEvent } from '../models/type_events'
import { eventService } from '../services/event.service'

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
        .exists()
        .withMessage('Un evento debe tener una fecha de inicio')
        .isISO8601()
        .withMessage('Debe enviar una fecha de ingreso válida')
        .bail()
        .toDate()
        // Check that the date is on the future
        .custom((date: Date) => {
            if (date.getTime() < Date.now()) {
                throw new Error('La fecha de inicio debe ser futura')
            }
            return date
        }),
    body('endDate')
        .optional()
        .isISO8601()
        .withMessage('Debe enviar una fecha de fin válida')
        .toDate()
        // Check that the date is on the future
        .custom((date: Date) => {
            if (date.getTime() < Date.now()) {
                throw new Error('La fecha final debe ser futura')
            }
            return date
        }),
    body('typeId')
        .exists()
        .withMessage('Debe proveer una ID de tipo de evento')
        .isNumeric()
        .withMessage('La ID del tipo de evento debe ser un entero')
        .toInt()
        .custom(async (id) => {
            const available = await TypeEvent.typesAvailable()
            if (!available.includes(id)) {
                throw new Error(
                    `La ID enviada no representa un tipo de evento válido`
                )
            }
        }),
]

export const getEventsSchema = [
    query('*')
        .custom((_value, { req }) => {
            console.log("Query params: ");
            console.log(req.query);
            if (!req.query.filter) {
                return true;
            }
            const queryParams = Object.keys(req.query.filter);
            const attributes = [...eventService.getAttributes()];
            for (const param of queryParams) {
                if (!attributes.includes(param)) {
                    throw new Error(`Clave de query inválida: ${param}`);
                }
            }
            return true;
        }),
    query('orderField')
        .optional()
        .isString()
        .isIn(["createdAt", "typeId"]),
    query('orderType')
        .optional()
        .isString()
        .isIn(["asc", "desc"]),
];

export const createEventSchema = eventSchemaOptions

export const updateEventSchema = [
    ...eventSchemaOptions,
    param('eventId')
        .exists()
        .isNumeric()
        .withMessage('Debe proveer un ID de evento válido'),
]

export const deleteEventSchema = [
    param('eventId')
        .exists()
        .isNumeric()
        .withMessage('Debe proveer un ID de evento válido'),
]
