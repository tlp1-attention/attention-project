import { Exercises } from "../../models/exercises";
import { Question } from "../../models/questions";
import { Responses } from "../../models/responses";

const READINGS = [
    {
        text: '',
        questions: [
            {
                questionText: '',
                options: [{
                    optionText: '',
                    correct: false
                }]
            }
        ]

    }
];

export async function createReadings() {
    for (const reading of READINGS) {
        const { id: exerciseId } = await Exercises.create({
            read: reading.text
        });
        for (const question of reading.questions) {
            const { id: questionId } = await Question.create({
                text: question.questionText,
                exerciseId,
            });
            for (const option of question.options) {
                await Responses.create({
                    response: option.optionText,
                    questionId,
                    correct: option.correct
                });
            }
        }
    }
}