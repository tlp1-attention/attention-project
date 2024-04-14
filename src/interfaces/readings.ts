export type QuestionWithResponse = {
    questionText: string,
    options: {
        optionText: string,
        isCorrect: boolean
    }[]
}

export type ReadingWithQuestions = {
    title: string,
    summary: string,
    coverURL: string,
    text: string,
    questions: QuestionWithResponse[]
}