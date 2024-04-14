import type { Request, Response } from "express";
import { FileArray } from "express-fileupload";
import { exerciseService } from "../services/exercises.service";
import { deleteImage, uploadImage } from "../utils/file-uploading";
import { UploadApiResponse } from "cloudinary";

export async function getAllExercises(req: Request, res: Response) {
    const { q } = req.query;
    try {
        const found = await exerciseService.findAllReadings(q && q.toString());

        if (found.length == 0) {
            return res.status(404).json({
                message: 'No se encontraron ejercicios'
            });
        }

        res.status(200).json({
            exercises: found
        });

    } catch (err) {
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

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error interno del servidor.'
        })
    }
}


export async function getQuestionsForExercise(req: Request, res: Response) {
    const { exerciseId } = req.params;

    try {

        const found = await exerciseService.findQuestionsForReading(
            parseInt(exerciseId)
        );

        if (!found) {
            return res.status(404).json({
                message: 'No se encontró el ejercicio'
            });
        }

        res.status(200).json({
            questions: found
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error interno del servidor.'
        })
    }
}

export async function createReading(req: Request, res: Response) {
    const { title, contents, summary, questions } = req.body;
    try {

        const created = await exerciseService.createWithQuestions({
            title,
            text: contents,
            questions,
            coverURL: '',
            summary
        });

        if (!created) {
            console.log("There was an error when creating the exercise. Check for errors in the service.");
            return res.status(400).json({
                message: 'No se pudo crear el ejercicio'
            });
        }

        res.status(201).json({
            exercise: created
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error interno del servidor.'
        })
    }
}

export async function updateReadingCover(req: Request, res: Response) {
    const files = req.files as FileArray;
    let image: UploadApiResponse | null = null;
    try {
        console.log("Recibido archivo...", files);
        if (files && files.cover) {
            const result = await uploadImage(files.cover);
            image = result;
        }

        const { exerciseId } = req.params;

        const updated = await exerciseService.update(
            parseInt(exerciseId),
            { readCoverPath: image.secure_url }
        );

        if (!updated) {
            return res.status(404).json({
                message: 'No se encontró el ejercicio'
            });
        }

        res.status(200).json({
            exercise: updated
        });

    } catch (err) {
        if (image) {
            await deleteImage(image);
        }
        console.error(err);
        res.status(500).json({
            message: 'Error interno del servidor.'
        })
    }
}
