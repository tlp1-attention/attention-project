import { Exercises } from '../../models/exercises'
import { Question } from '../../models/questions'
import { Responses } from '../../models/responses'

const READINGS: ReadingWithQuestions[] = [
    {
        title: 'El Sistema Solar',
        coverURL:
            'https://res.cloudinary.com/drh2dpvgf/image/upload/v1696979991/uub5s3tl67v3e0tcottl.jpg',
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
    {
        title: 'La tortuga y la liebre',
        summary: 'Una liebre se burla de una tortuga, desafiándola a una carrera. El zorro marca la línea de partida y distancia. La tortuga avanza constante mientras la liebre duerme. La tortuga gana, y el zorro concluye: "Las carreras se ganan con tesón".',
        coverURL: 'https://res.cloudinary.com/drh2dpvgf/image/upload/v1697476537/attention/syspypqxnhbd47op5xtn.jpg',
        text: 'Una liebre se burlaba de una tortuga. -¡Qué lenta eres! ¡Cómo te arrastras! -¿De veras? - dijo la tortuga-. Haz una carrera conmigo y te venceré. - Qué jactanciosa eres –dijo la liebre-. De acuerdo, correré contigo. ¿A quién pediremos que marque la línea de llegada y confirme que la carrera es justa? - Pidámoselo al zorro –dijo la tortuga. El zorro era muy sabio y justo. Les mostró la línea de partida y cuánta distancia debían correr. La tortuga no perdió tiempo. Partió de inmediato y continuó la marcha. La liebre anduvo a brincos varios minutos, hasta que dejó a la tortuga muy atrás. Sabía que podía llegar rápidamente a la meta, así que se acostó a la sombra de un árbol y durmió una siesta. Al cabo de un rato se despertó y se acordó de la carrera. Se levantó de un salto y corrió a toda velocidad. Pero cuando llegó a la meta, la tortuga ya estaba allí. - Las carreras se ganan con tesón –declaró el zorro.',
        questions: [
            {
                questionText: '¿De quién se burlaba la liebre?',
                options: [
                    {
                        optionText: 'De la tortuga',
                        correct: true
                    }, 
                    {
                        optionText: 'Del zorro',
                        correct: false
                    },
                    {
                        optionText: 'De otro animal',
                        correct: false
                    },
                    {
                        optionText: 'De sí misma',
                        correct: false
                    }
                ]
            },
            {
                questionText: '¿A quién eligieron para que marcara la línea de llegada?',
                options: [
                    {
                        optionText: 'Al búho',
                        correct: false
                    },
                    {
                        optionText: 'Al lobo',
                        correct: false
                    },
                    {
                        optionText: 'Al zorro',
                        correct: true
                    },
                    {
                        optionText: 'A la liebre',
                        correct: false
                    }
                ]
            },
            {
                questionText: '¿Qué decidieron hacer la tortuga y la liebre?',
                options: [
                    {
                        optionText: 'Hacer una carrera',
                        correct: true
                    },
                    {
                        optionText: 'Tomar una siesta',
                        correct: false
                    },
                    {
                        optionText: 'Comer juntas',
                        correct: false
                    },
                    {
                        optionText: 'Discutir sobre la velocidad',
                        correct: false
                    }
                ]
            },
            {
                questionText: '¿Cómo era el zorro?',
                options: [
                    {
                        optionText: 'Sabio y justo',
                        correct: true
                    },
                    {
                        optionText: 'Rápido y astuto',
                        correct: false
                    },
                    {
                        optionText: 'Perezoso y torpe',
                        correct: false
                    },
                    {
                        optionText: 'Agresivo y peligroso',
                        correct: false
                    }
                ]
            },
            {
                questionText: '¿Cuándo partió la tortuga?',
                options: [
                    {
                        optionText: 'Después de la siesta de la liebre',
                        correct: false
                    },
                    {
                        optionText: 'Antes de la liebre',
                        correct: true
                    },
                    {
                        optionText: 'Nunca partió',
                        correct: false
                    },
                    {
                        optionText: 'Al mismo tiempo que la liebre',
                        correct: false
                    }
                ]
            },
            {
                questionText: '¿Cuántos animales aparecen en esta lectura?',
                options: [
                    {
                        optionText: 'Dos animales',
                        correct: false
                    },
                    {
                        optionText: 'Tres animales',
                        correct: true
                    },
                    {
                        optionText: 'Cuatro animales',
                        correct: false
                    },
                    {
                        optionText: 'Cinco animales',
                        correct: false
                    }
                ]
            },
            {
                questionText: '¿Qué hizo la liebre mientras la tortuga caminaba?',
                options: [
                    {
                        optionText: 'Corrió a toda velocidad',
                        correct: false
                    },
                    {
                        optionText: 'Descansó y durmió una siesta',
                        correct: true
                    },
                    {
                        optionText: 'Ayudó a la tortuga',
                        correct: false
                    },
                    {
                        optionText: 'Dejó la carrera',
                        correct: false
                    }
                ]
            }
        ]
    },
    {
        title: 'Picasso',
        summary: 'Pablo Picasso, nacido en Málaga en 1881 y fallecido en Moulins, Francia, en 1973, fue un influyente artista andaluz universal. Su carrera incluyó pintura, escultura, dibujo, grabado y más. Su obra cumbre, "Las señoritas de Avignon," marcó el arte del siglo XX. Picasso es ampliamente reconocido como uno de los grandes artistas del siglo.',
        coverURL: 'https://res.cloudinary.com/drh2dpvgf/image/upload/v1697477032/attention/d2tcx5gdlvtzeghu8pmh.png',
        text: 'Andaluz universal Nació en Málaga, en 1881. Murió en Moulins, Francia, en 1973. Hijo del también artista José Ruiz Blasco, en 1895 se trasladó con su familia desde Málaga a Barcelona, donde el joven pintor se rodeó de un grupo de artistas y literatos. Entre 1901 y 1904 Pablo Picasso alternó su residencia entre Madrid, Barcelona y París, mientras su pintura entró en la etapa denominada período azul. Hacia finales de 1906, Pablo Picasso empezó a trabajar en una composición de gran formato que iba a cambiar el curso del arte del siglo XX: Las señoritas de Avignon. Picasso fue pintor y escultor. Además, abordó otros géneros como el dibujo, el grabado, la ilustración de libros, la escultura, la cerámica y el diseño de escenografía y vestuario para montajes teatrales. Está considerado mundialmente como uno de los mayores artistas del siglo XX.',
        questions: [
            {
                questionText: '¿Dónde murió Picasso?',
                options: [
                    {
                        optionText: 'Málaga',
                        correct: false
                    }, 
                    {
                        optionText: 'París',
                        correct: false
                    },
                    {
                        optionText: 'Moulins, Francia',
                        correct: true
                    },
                    {
                        optionText: 'Madrid',
                        correct: false
                    }
                ]
            },
            {
                questionText: 'Cuando Picasso vivía en Barcelona, ¿quiénes eran sus amigos?',
                options: [
                    {
                        optionText: 'Artistas y literatos',
                        correct: true
                    },
                    {
                        optionText: 'Políticos y científicos',
                        correct: false
                    },
                    {
                        optionText: 'Músicos y bailarines',
                        correct: false
                    },
                    {
                        optionText: 'Deportistas y actores',
                        correct: false
                    }
                ]
            },
            {
                questionText: '¿Qué obra de Picasso transforma la pintura del siglo XX?',
                options: [
                    {
                        optionText: 'Período azul',
                        correct: false
                    },
                    {
                        optionText: 'Dibujos y grabados',
                        correct: false
                    },
                    {
                        optionText: 'Las señoritas de Avignon',
                        correct: true
                    },
                    {
                        optionText: 'Cerámica y escenografía',
                        correct: false
                    }
                ]
            },
            {
                questionText: 'En la ciudad natal de Picasso hay hoy un Museo con obras suyas; ¿qué ciudad es?',
                options: [
                    {
                        optionText: 'Madrid',
                        correct: false
                    },
                    {
                        optionText: 'París',
                        correct: false
                    },
                    {
                        optionText: 'Málaga',
                        correct: true
                    },
                    {
                        optionText: 'Barcelona',
                        correct: false
                    }
                ]
            }
        ]
    }
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
