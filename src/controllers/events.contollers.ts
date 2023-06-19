import { SequelizeValidationError } from 'sequelize/lib/errors';
import { Models } from '../db'
import type { Response } from 'express'

const { Events } = Models;

import type { AuthRequest } from '../middleware/validate_jwt';

async function createEvent(req: AuthRequest, res: Response) {

    const { 
        title: eventTitle, 
        description: eventDesc, 
        startDate,
        endDate,
        typeEvent
     } = req.body;

    try {
        
        const newEvent = await Events.create({
            title: eventTitle,
            description: eventDesc,
            startTime: startDate,
            endTime: endDate,
            typeId: typeEvent,
            userId: req.user.id
        })





    } catch (err) {

        if (err instanceof SequelizeValidationError) {
            return res.sendStatus(500);
        }

        res.sendStatus(400);
    }



}




