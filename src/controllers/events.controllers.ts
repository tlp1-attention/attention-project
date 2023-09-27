import type { Response } from 'express'
import type { AuthRequest } from '../interfaces/auth-request'
import { Events } from '../models/events'
import { eventService } from '../services/event.service'

// Create an event related to some user
async function createEvent(req: AuthRequest, res: Response) {
    const { id: userId } = req.user!

    try {
        const newEvent = await eventService.create(userId, req.body)

        if (!newEvent) {
            return res.status(404).json({
                message: `Usuario con ID ${userId} no encontrado`,
            })
        }

        res.status(201).json({
            message: 'Evento creado exitosamente',
            event: newEvent,
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Error interno del servidor',
        })
    }
}

// Get all events from a user
async function getEventsByUser(req: AuthRequest, res: Response) {
    const { id: userId } = req.user!

    try {
        const events = await eventService.findByUserId(userId)

        if (events.length == 0) {
            return res.status(404).json({
                message: 'No se encontraron eventos para este usuario',
            })
        }

        return res.json({
            events: events,
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Error interno del servidor',
        })
    }
}

export async function getEventById(req: AuthRequest, res: Response) {
    const { eventId } = req.params
    const { id: userId } = req.user

    const eventIdNum = parseInt(eventId)

    try {
        const belongsTo = await eventService.belongsToUser(eventIdNum, userId)

        let found: Events
        if (belongsTo) found = await eventService.findById(eventIdNum)

        if (!found || !(await eventService.belongsToUser(eventIdNum, userId))) {
            return res.status(404).json({
                message: 'Evento no encontrado',
            })
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Error interno del servidor',
        })
    }
}

// Update an existing event for a user
async function updateUserEvent(req: AuthRequest, res: Response) {
    const { eventId } = req.params
    const { id: userId } = req.user;

    try {
        const belongsToUser = await eventService.belongsToUser(
            parseInt(eventId), userId
        );

        if (!belongsToUser) {
            return res.status(400).json({
                message: `No se encontró ningún evento con ID ${eventId} para el usuario`
            })
        }

        const event = await eventService.update(parseInt(eventId), req.body)

        if (!event) {
            return res.status(404).json({
                message: `No se encontró un evento con ID ${eventId} del usuario`,
            })
        }

        return res.status(200).json({
            message: 'Evento actualizado',
            event,
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Error interno del servidor',
        })
    }
}

async function deleteEvent(req: AuthRequest, res: Response) {
    const { eventId } = req.params
    const { id: userId } = req.user

    try {
        const belongsToUser = await eventService.belongsToUser(
            parseInt(eventId), userId
        );

        if (!belongsToUser) {
            return res.status(400).json({
                message: `No se encontró ningún evento con ID ${eventId} para el usuario`
            })
        }

        const deleted = await eventService.delete(parseInt(eventId))

        if (!deleted) {
            return res.status(404).json({
                message: `No se encontró ningún evento de ID ${eventId} para el usuario ${userId}`,
            })
        }

        return res.status(200).json({
            message: 'Evento eliminado exitosamente',
            event: deleted,
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Error interno del servidor',
        })
    }
}

export { createEvent, deleteEvent, getEventsByUser, updateUserEvent }
