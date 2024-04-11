type QuestionWithResponse = {
    questionText: string,
    options: {
        optionText: string,
        correct: boolean
    }[]
}

type ReadingWithQuestions = {
    title: string,
    summary: string,
    coverURL: string,
    text: string,
    questions: QuestionWithResponse[]
}