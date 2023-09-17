import type { Response } from "express";
import { preferencesService } from "../services/preferences.service";
import { AuthRequest } from "../interfaces/auth-request";

// Create an event related to some user
async function registerPreferences(req: AuthRequest, res: Response) {
    const { id: userId } = req.user!

    try {
        const newPreferences = await preferencesService.create(userId, req.body)

        if (!newPreferences) {
            return res.status(404).json({
                message: `Usuario con ID ${userId} no encontrado`,
            })
        }

        res.status(201).json({
            message: 'Evento creado exitosamente',
            preferences: newPreferences
        });

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Error interno del servidor',
        })
    }
}

// Get all events from a user
async function getPreferencesByUser(req: AuthRequest, res: Response) {
    const { id: userId } = req.user!

    try {
        const preferences = await preferencesService.findByUserId(userId)

        if (!preferences) {
            return res.status(404).json({
                message: 'No se encontraron preferencias para este usuario',
            });
        }

        return res.json({
            preferences
        });

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Error interno del servidor',
        })
    }
}

async function updatePreferenceForUser(req: AuthRequest, res: Response) {
    const { id: userId } = req.user;

    try {
        const updated = await preferencesService.update(userId, req.body);

        if (!updated) {
            return res.status(404).json({
                message: `No se encontró un usuario ID ${userId}`,
            })
        }

        return res.status(200).json({
            message: 'Evento actualizado',
            preferences: updated,
        });

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Error interno del servidor',
        })
    }
}

// Delete an event from an ID
// Only if the user is the user that created it
async function deletePreferences(req: AuthRequest, res: Response) {
    const { id: userId } = req.user

    try {
        const deleted = await preferencesService.delete(userId);

        if (!deleted) {
            return res.status(404).json({
                message: `No se encontró ningún usuario de ID ${userId}` 
            });
        }

        return res.status(200).json({
            message: 'Preferencias eliminadas exitosamente',
            preferences: deleted,
        });

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Error interno del servidor',
        })
    }
}

export {
    registerPreferences,
    updatePreferenceForUser,
    getPreferencesByUser,
    deletePreferences
}