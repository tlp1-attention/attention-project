import type { Request, Response } from "express";
import { exerciseService } from "../services/exercises.service";

export async function getAllExercises(_req: Request, res: Response) {
    try {
        const found = await exerciseService.findAllReadings();

        if (found.length == 0) {
            return res.status(404).json({
                message: 'No se encontraron ejercicios'
            });
        }

        res.status(200).json({
            exercises: found
        });

    } catch(err) {
        console.error(err);
        res.status(500).json({
            message: 'Error interno del servidor.'
        })
    }
}

export async function getExercise(req: Request, res: Response) {
    const { exerciseId } = req.params;

    try {

        const found = await exerciseService.findById(
            parseInt(exerciseId)
        );

        if (!found) {
            return res.status(404).json({
                message: 'No se encontró el ejercicio'
            });
        }

        res.status(200).json({
            exercise: found
        });

    } catch(err) {
        console.error(err);
        res.status(500).json({
            message: 'Error interno del servidor.'
        })
    }
}