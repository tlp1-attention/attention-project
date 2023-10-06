import { Models } from "../database/models";
import { Op } from 'sequelize';
import { sendMessage } from "../controllers/push-subscriber.controller";
const {  Users } = Models;

const ONE_DAY_MS = 1000 * 60 * 60 * 24;

export function scheduleReminders() {
    return new Promise(resolve => resolve(setInterval(async () => {

        const subscribers = await Users.findAll({
            where: {
                [Op.not]: {
                    subscriptionPayload: null
                }
            }
        });

        for (const user of subscribers) {
            const events = await user.getEvents();
            for (const event of events) {
                // Only remind of important events
                if (event.typeId !== 1) continue;

                const now = Date.now();

                const hasBeenReminded = event.remindedAt
                                     ? now - event.remindedAt?.getTime() < ONE_DAY_MS / 2
                                     : false


                if (event.startDate.getTime() - now < ONE_DAY_MS &&
                    !hasBeenReminded) {

                    const typeEvent = await event.getType();
                    const payload = {
                        title: `Recordatorio de evento ${typeEvent.description.toLowerCase()}`,
                        message: `${event.title}`
                    };
                    try {
                        await sendMessage(JSON.stringify(payload), user.id);
                    } catch (err) {
                        console.error(err);
                    }

                    // Once the reminder is sent, update the remindedAt column to avoid 
                    // doing it again in other 12 hours 
                    await event.update({
                        remindedAt: new Date()
                    });
                }
            }
        }
    }, 5000)));
}

