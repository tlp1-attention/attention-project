import type { Response } from 'express'
import { AuthRequest } from '../interfaces/auth-request'
import { exerciseService } from '../services/exercises.service'
import { CompleteExercises } from '../models/complete_exercises'
import { Events } from '../models/events'
import { sequelize } from '../database/connection'

// Render timer view on the workspace
function renderTimer(req: AuthRequest, res: Response) {
    return res.render('layout-time', {
        title: 'Espacio de trabajo',
        headerContentPartial: 'partials/timer-head.ejs',
        mainContentPartial: 'partials/timer.ejs',
        username: req.user?.name || 'Usuario',
    })
}

// Render events view on the workspace
function renderEvents(req: AuthRequest, res: Response) {
    res.render('layout-events', {
        title: 'Agenda',
        mainContentPartial: 'partials/events.ejs',
        username: req.user?.name || 'Usuario',
    })
}

function renderReadingList(req: AuthRequest, res: Response) {
    res.render('layout-readings', {
        title: 'Lectura',
        mainContentPartial: 'partials/reading-list.ejs',
        username: req.user?.name || 'Usuario',
    })
}

async function renderReading(req: AuthRequest, res: Response) {
    const { readingId } = req.params

    const reading = await exerciseService.findById(parseInt(readingId))

    res.render('layout-readings', {
        title: 'Lectura',
        mainContentPartial: 'partials/reading.ejs',
        username: req.user?.name || 'Usuario',
        reading,
    })
}

async function renderQuiz(req: AuthRequest, res: Response) {
    const { readingId } = req.params

    res.render('layout-readings', {
        title: 'Cuestionario',
        mainContentPartial: 'partials/quiz.ejs',
        username: req.user?.name || 'Usuario',
        readingId,
    })
}

async function renderReport(req: AuthRequest, res: Response) {
    const { userId } = req.params;

    const completeExercises = await CompleteExercises.findAll({
        attributes: [[sequelize.fn('count', sequelize.col('id')), 'readings']],
        where: {
            typeExerciseId: 1,
            userId,
        },
        group: [sequelize.fn('week', sequelize.col('createdAt'))],
        order: [[sequelize.fn('week', sequelize.col('createdAt')), 'DESC']],
    })

    console.log('Complete exercises: ', completeExercises)

    // @ts-expect-error
    const readingCurrentWeek = completeExercises.at(0).dataValues.readings
    // @ts-expect-error
    const readingLastWeek = completeExercises.at(1)?.dataValues.readings

    const events = await Events.findAll({
        attributes: [[sequelize.fn('count', sequelize.col('id')), 'events']],
        where: {
            userId,
        },
        group: [sequelize.fn('week', sequelize.col('createdAt'))],
        order: [[sequelize.fn('week', sequelize.col('createdAt')), 'DESC']],
    });

    // @ts-expect-error
    const eventsCurrentWeek = events.at(0)?.dataValues.events;
    // @ts-expect-error
    const eventsLastWeek = events.at(1)?.dataValues.events;

    console.log(readingLastWeek, readingCurrentWeek)

    res.render('layout-report', {
        title: 'Reporte semanal',
        mainContentPartial: 'partials/report.ejs',
        username: req.user?.name || 'Usuario',
        readingCurrentWeek: readingCurrentWeek,
        readingLastWeek: readingLastWeek,
        activityLastWeek: 0,
        activityCurrentWeek: 0,
        eventsLastWeek: eventsLastWeek,
        eventsCurrentWeek: eventsCurrentWeek,
    })
}

export {
    renderEvents,
    renderReadingList,
    renderTimer,
    renderReading,
    renderQuiz,
    renderReport,
}
