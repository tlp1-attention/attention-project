import type { Response } from 'express'
import type { AuthRequest } from '../interfaces/auth-request'
import { completeExerciseService } from '../services/complete-exercises.service'

// Create an event related to some user
async function createCompleteExercise(req: AuthRequest, res: Response) {
    const { id: userId } = req.user!

    try {
        const newCompletedExercise = await completeExerciseService.create(userId, req.body)

        if (!newCompletedExercise) {
            return res.status(404).json({
                message: `Usuario con ID ${userId} no encontrado`,
            })
        }

        res.status(201).json({
            message: 'Ejercicio creado exitosamente',
            completeExercise: newCompletedExercise,
        });

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Error interno del servidor',
        })
    }
}

// Get all events from a user
async function getCompletedExercisesByUser(req: AuthRequest, res: Response) {
    const { id: userId } = req.user!

    try {
        const exercises = await completeExerciseService.findByUserId(userId)

        if (exercises.length == 0) {
            return res.status(404).json({
                message: 'No se encontraron ejercicios completos para este usuario',
            })
        }

        return res.status(200).json({
            exercises,
        });

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Error interno del servidor',
        })
    }
}

async function getCompletedExercise(req: AuthRequest, res: Response) {
    const { completedId } = req.params;
    const { id: userId } = req.user;

    const numId = parseInt(completedId)

    try {
        const found = await completeExerciseService.findById(numId, userId);

        if (!found) {
            return res.status(404).json({
                message: 'Ejercicio no encontrado',
            })
        }

        res.status(200).json({
            completeExercise: found
        });

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Error interno del servidor',
        })
    }
}

// Update an existing event for a user
async function updateUserCompleteExercise(req: AuthRequest, res: Response) {
    const { completedId }  = req.params
    const { id: userId } = req.user;

    try {
        const updated = await completeExerciseService.update(
            parseInt(completedId), 
            userId, 
            req.body
        );

        if (!updated) {
            return res.status(400).json({
                message: `No se encontró ningún evento con ID ${completedId} para el usuario`
            })
        }

        return res.status(200).json({
            message: 'Evento actualizado',
            completedExercise: updated,
        });

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Error interno del servidor',
        })
    }
}

async function deleteCompleteExercise(req: AuthRequest, res: Response) {
    const { completedId } = req.params
    const { id: userId } = req.user

    try {
        const deleted = await completeExerciseService.delete(parseInt(completedId), userId)

        if (!deleted) {
            return res.status(404).json({
                message: `No se encontró ningún evento de ID ${completedId} para el usuario ${userId}`,
            })
        }

        return res.status(200).json({
            message: 'Ejercicio completo eliminado exitosamente',
            completedExercises: deleted,
        });

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Error interno del servidor',
        })
    }
}

async function getCompleteExerciseByWeek(req: AuthRequest, res: Response) {
    const { id: userId } = req.user;

    try {
        const found = await completeExerciseService.groupByWeek(userId);

        if (found.length == 0) {
            return res.status(404).json({
                message: `No se encontró ningún ejercicio para el usuario ${userId}`,
            })
        }

        return res.status(200).json({
            completedExercises: found,
        });

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Error interno del servidor',
        })
    }
}

export {
    getCompletedExercisesByUser,
    getCompletedExercise,
    createCompleteExercise,
    deleteCompleteExercise,
    updateUserCompleteExercise,
    getCompleteExerciseByWeek
};