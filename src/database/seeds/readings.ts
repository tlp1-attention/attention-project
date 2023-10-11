import { Exercises } from '../../models/exercises'
import { Question } from '../../models/questions'
import { Responses } from '../../models/responses'

const READINGS = [
    {
        title: 'El Sistema Solar',
        coverURL:
            'https://res.cloudinary.com/drh2dpvgf/image/upload/v1696979991/uub5s3tl67v3e0tcottl.jpg',
        difficulty: 'Fácil',
        summary:
            'El Sistema Solar consta del Sol, nueve planetas, veintisiete satélites, asteroides y cometas que orbitan alrededor del Sol. El Sol es una estrella central que proporciona luz y calor a la Tierra y otros astros.', 
        text: 'Es un conjunto de astros de la galaxia Vía Láctea formado por el Sol, nueve planetas, veintisiete satélites, muchos asteroides y cometas que giran todos alrededor del Sol. Los planetas son: Mercurio, Venus, la Tierra, Marte, Júpiter, Saturno, Urano, Neptuno y Plutón.\nEl Sol es la estrella central del Sistema Solar. Tiene luz propia y nos da luz y calor a la Tierra y a todos los demás astros del Sistema. El Sol es la estrella fuente de toda vida en la Tierra. Sin el Sol no podríamos vivir. El Sol es mucho más grande la Tierra, tanto como 1.300.000, pero en realidad es una estrella pequeña. Casi todas las estrellas más brillantes que vemos por la noche en el cielo son más grandes que el Sol, pero al encontrarse tan alejadas de nosotros se perciben como simples puntos brillantes. Las estrellas son los únicos cuerpos del Universo que emiten luz.\n',
        questions: [
            {
                questionText:
                    '¿Cómo se llama la estrella más cercana a nosotros?',
                options: [
                    {
                        optionText: 'Sol',
                        correct: true,
                    },
                    {
                        optionText: 'Luna',
                        correct: false,
                    },
                    {
                        optionText: 'Marte',
                        correct: false,
                    },
                    {
                        optionText: 'Via Láctea',
                        correct: false,
                    },
                ],
            },
            {
                questionText: '¿Cómo se llama nuestra galaxia?',
                options: [
                    {
                        optionText: 'Andrómeda',
                        correct: false,
                    },
                    {
                        optionText: 'Sistema Solar',
                        correct: false,
                    },
                    {
                        optionText: 'Neptuno',
                        correct: false,
                    },
                    {
                        optionText: 'Via Láctea',
                        correct: true,
                    },
                ],
            },
            {
                questionText: 'Principalmente, ¿qué nos da nuestra estrella?',
                options: [
                    {
                        optionText: 'Luz y calor',
                        correct: true,
                    },
                    {
                        optionText: 'Protección gravitacional',
                        correct: false,
                    },
                    {
                        optionText: 'Sólo luz',
                        correct: false,
                    },
                    {
                        optionText: 'Sólo calor',
                        correct: false,
                    },
                ],
            },
        ],
    },
    {
        title: 'Las Ballenas',
        coverURL:
            'https://res.cloudinary.com/drh2dpvgf/image/upload/v1696979905/cvkkiyw0pgz7tuf49q4i.jpg',
        difficulty: 'Fácil',
        summary:
            'Las ballenas, a pesar de su enorme tamaño, se alimentan de plancton, pequeños animales marinos que tragan al filtrar grandes cantidades de agua, convirtiendo larvas en su comida principal. Este proceso permite a las ballenas, los animales más grandes de la Tierra, alimentarse de diminutos organismos apenas visibles a simple vista.',
        text: 'Las ballenas son unos enormes animales que pueden alcanzar los veinte metros de largo. A pesar de su tamaño, se alimentan de plancton. El plancton está formado por pequeños animales que viven en la superficie del mar. Lo forman millones de larvas que cuando se hacen grandes se transforman en cangrejos, gambas, etc. La ballena, para comerlos, abre la boca y traga una gran cantidad de agua. El agua es filtrada y devuelta al mar. El plancton queda atrapado en una especie de filtro y le sirve de alimento. Luego vuelve a tragar otra gran cantidad de agua y así muchas veces. De esta forma, el animal más grande de la tierra, se alimenta de unos animalitos tan pequeños, que es difícil verlos a simple vista.',
        questions: [
            {
                questionText:
                    '¿Cuántos metros de largo pueden alcanzar las ballenas?',
                options: [
                    {
                        optionText: 'Veinte metros',
                        correct: true,
                    },
                    {
                        optionText: 'Diez metros',
                        correct: false,
                    },
                    {
                        optionText: 'Cinco metros',
                        correct: false,
                    },
                    {
                        optionText: 'Treinta metros',
                        correct: false,
                    },
                ],
            },
            {
                questionText:
                    '¿De qué se alimentan principalmente las ballenas?',
                options: [
                    {
                        optionText: 'Peces',
                        correct: false,
                    },
                    {
                        optionText: 'Plancton',
                        correct: true,
                    },
                    {
                        optionText: 'Algas marinas',
                        correct: false,
                    },
                    {
                        optionText: 'Crustáceos',
                        correct: false,
                    },
                ],
            },
            {
                questionText: '¿Qué es el plancton?',
                options: [
                    {
                        optionText: 'Animales grandes del mar',
                        correct: false,
                    },
                    {
                        optionText: 'Pequeños animales del mar',
                        correct: true,
                    },
                    {
                        optionText: 'Algas marinas',
                        correct: false,
                    },
                    {
                        optionText: 'Peces grandes',
                        correct: false,
                    },
                ],
            },
            {
                questionText:
                    '¿Dónde viven los animales que forman el plancton?',
                options: [
                    {
                        optionText: 'En las profundidades del océano',
                        correct: false,
                    },
                    {
                        optionText: 'En la superficie del mar',
                        correct: true,
                    },
                    {
                        optionText: 'En las playas',
                        correct: false,
                    },
                    {
                        optionText: 'En los arrecifes de coral',
                        correct: false,
                    },
                ],
            },
            {
                questionText: '¿Cómo comen las ballenas el plancton?',
                options: [
                    {
                        optionText: 'Lo cazan con sus aletas',
                        correct: false,
                    },
                    {
                        optionText: 'Lo pescan con redes',
                        correct: false,
                    },
                    {
                        optionText: 'Lo tragan junto con agua y lo filtran',
                        correct: true,
                    },
                    {
                        optionText: 'Lo recogen del fondo del mar',
                        correct: false,
                    },
                ],
            },
            {
                questionText:
                    '¿Dónde va a parar el agua del mar que las ballenas tragan?',
                options: [
                    {
                        optionText: 'La expulsan por sus branquias',
                        correct: false,
                    },
                    {
                        optionText: 'La retienen en su estómago',
                        correct: false,
                    },
                    {
                        optionText: 'La devuelven al mar después de filtrarla',
                        correct: true,
                    },
                    {
                        optionText: 'La almacenan en bolsas en su cuerpo',
                        correct: false,
                    },
                ],
            },
            {
                questionText: '¿Cuántas veces al día comen las ballenas?',
                options: [
                    {
                        optionText: 'Una vez al día',
                        correct: false,
                    },
                    {
                        optionText: 'Dos veces al día',
                        correct: false,
                    },
                    {
                        optionText: 'Múltiples veces al día',
                        correct: true,
                    },
                ],
            },
        ],
    },
]

export async function createReadings() {
    for (const reading of READINGS) {
        const [{ id: exerciseId }] = await Exercises.findOrCreate({
            where: {
                read: reading.text,
                readTitle: reading.title,
                readCoverPath: reading.coverURL,
                readSummary: reading.summary,
            },
        });
        for (const question of reading.questions) {
            const [{ id: questionId }] = await Question.findOrCreate({
                where: {
                    text: question.questionText,
                    exerciseId,
                },
            })
            for (const option of question.options) {
                await Responses.findOrCreate({
                    where: {
                        response: option.optionText,
                        questionId,
                        correct: option.correct,
                    },
                })
            }
        }
    }
}
