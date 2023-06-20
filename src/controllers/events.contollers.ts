import { Models } from '../db'
import type { Request, Response } from 'express'

const { Events } = Models;

import type { AuthRequest } from '../middleware/validate_jwt';

// Create an event related to some user
async function createEvent(req: AuthRequest, res: Response) {

    const { 
        title: eventTitle, 
        description: eventDesc, 
        startDate,
        endDate,
        typeEvent
     } = req.body;

    const { id: userId } = req.user;
    

    try {
        
        const newEvent = await Events.create({
            title: eventTitle,
            description: eventDesc,
            startTime: startDate,
            endTime: endDate,
            typeId: typeEvent,
            userId
        })

        res.sendStatus(201);

    } catch (err) {
        console.error(err);
        res.sendStatus(400);
    }
}

// Get all eventos from a user
async function getEventsByUser(req: AuthRequest, res: Response) {

    const { id: userId } = req.user;

    try {

        if (!userId) throw new Error('Did not supplied user ID');

        const foundEvents = await Events.findAll({
            where: {
                userId
            }
        });

        if (foundEvents.length == 0) {
            return res.sendStatus(404);
        }

        return res.json({
            events: foundEvents
        });

    } catch (err) {
        console.error(err);
        return res.sendStatus(400);
    }
}

// Update an existing event for a user
async function updateUserEvent(req: AuthRequest, res: Response) {

    const { 
        id: eventId,
        title: eventTitle, 
        description: eventDesc, 
        startDate,
        endDate,
        typeEvent,
     } = req.body
    
    const { id: userId } = req.user;

    try {

        if (!userId) throw new Error('Did not supplied user ID');

        const foundEvent = await Events.findOne({
            where: {
                userId,
                id: eventId
            }
        })

        if (!foundEvent) {
            throw new Error('Did not find any event with ID: ' + eventId);
        }

        await foundEvent.update({
            title: eventTitle,
            description: eventDesc,
            startTime: startDate,
            endTime: endDate,
            typeId: typeEvent,
        })

        return res.sendStatus(200);

    } catch (err) {
        console.error(err);
        return res.sendStatus(400);
    }
}

// Delete an event from an ID
// Only if the user is the user that created it
async function deleteEvent(req: AuthRequest, res: Response) {

    const { id: eventId } = req.body;
    const { id: userId } = req.user;

    try {

        if (!userId) throw new Error('Did not supplied user ID');

        const foundEvent = await Events.findOne({
            where: {
                userId,
                id: eventId
            }
        });

        if (!foundEvent) {
           throw new Error('Did not find any event with a ' + eventId + 'ID and from user ' + userId);
        }

        await foundEvent.destroy();

        return res.sendStatus(200);

    } catch (err) {
        console.error(err);
        return res.sendStatus(400);
    }

}

// Render events view on the workspace
function renderEvents(req: Request, res: Response) {
    res.render('layout-events', {
        title: 'Agenda',
        mainContentPartial: 'partials/events.ejs'
    })
}


export {
    getEventsByUser,
    deleteEvent,
    createEvent,
    updateUserEvent,
    renderEvents
}