import { Exercises } from "../../models/exercises";
import { Question } from "../../models/questions";
import { Responses } from "../../models/responses";

const READINGS = [
    {
        title: 'El Sistema Solar',
        text: 'Es un conjunto de astros de la galaxia Vía Láctea formado por el Sol, nueve planetas, veintisiete satélites, muchos asteroides y cometas que giran todos alrededor del Sol. Los planetas son: Mercurio, Venus, la Tierra, Marte, Júpiter, Saturno, Urano, Neptuno y Plutón.\nEl Sol es la estrella central del Sistema Solar. Tiene luz propia y nos da luz y calor a la Tierra y a todos los demás astros del Sistema. El Sol es la estrella fuente de toda vida en la Tierra. Sin el Sol no podríamos vivir. El Sol es mucho más grande la Tierra, tanto como 1.300.000, pero en realidad es una estrella pequeña. Casi todas las estrellas más brillantes que vemos por la noche en el cielo son más grandes que el Sol, pero al encontrarse tan alejadas de nosotros se perciben como simples puntos brillantes. Las estrellas son los únicos cuerpos del Universo que emiten luz.\n',
        questions: [
            {
                questionText: '¿Cómo se llama la estrella más cercana a nosotros?',
                options: [
                    {
                        optionText: 'Sol',
                        correct: true
                    }, 
                    {
                        optionText: 'Luna',
                        correct: false
                    },
                    {
                        optionText: 'Marte',
                        correct: false
                    },
                    {
                        optionText: 'Via Láctea',
                        correct: false
                    }
                ]
            },
            {
                questionText: '¿Cómo se llama nuestra galaxia?',
                options: [
                    {
                        optionText: 'Andrómeda',
                        correct: false
                    },
                    {
                        optionText: 'Sistema Solar',
                        correct: false
                    },
                    {
                        optionText: 'Neptuno',
                        correct: false
                    },
                    {
                        optionText: 'Via Láctea',
                        correct: true
                    }
                ]
            },
            {
                questionText: 'Principalmente, ¿qué nos da nuestra estrella?',
                options: [
                    {
                        optionText: 'Luz y calor',
                        correct: true
                    },
                    {
                        optionText: 'Protección gravitacional',
                        correct: false
                    },
                    {
                        optionText: 'Sólo luz',
                        correct: false
                    },
                    {
                        optionText: 'Sólo calor',
                        correct: false
                    }
                ]
            }
        ]

    }
];

export async function createReadings() {
    for (const reading of READINGS) {
        const [{ id: exerciseId }] = await Exercises.findOrCreate({
            where: { read: reading.text, readTitle: reading.title }
        });
        for (const question of reading.questions) {
            const [{ id: questionId }] = await Question.findOrCreate({
                where: {
                    text: question.questionText,
                    exerciseId
                }
            });
            for (const option of question.options) {
                await Responses.findOrCreate({
                    where: { 
                        response: option.optionText, 
                        questionId,
                        correct: option.correct
                    }
                });
            }
        }
    }
}