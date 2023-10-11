class Quiz {
    constructor({
        questions = [],
        onMouseOver = f => f,
        onRightAnswer = f => f,
        onWrongAnswer = f => f,
        onEnd = f => f,
        onTimeout = f => f
    }) {
        this.questions = questions;
        this.onMouseOver = onMouseOver;
        this.onRightAnswer = onRightAnswer;
        this.onWrongAnswer = onWrongAnswer;
        this.onEnd = onEnd;
        this.onTimeout = onTimeout();

        this.questionIndex = 0;
    }

    render() {
        const idx = this.questionIndex;
        if (idx >= this.questions.length) {
            this.onEnd();
            return;
        }
        const questionData = this.questions[idx];

        const { dom } = new Question(questionData, {
            onMouseOver: this.onMouseOver,
            onRightAnswer: this.onRightAnswer,
            onWrongAnswer: this.onWrongAnswer,
            onTimeout: this.onTimeout
        });

        if (!this.dom.firstChild) {
            this.dom.append(dom);
        } else {
            this.dom.replaceChild(dom, this.dom.firstChild);
        }
    }
}

class Question {
    constructor({
        question,
        onMouseOver = f => f,
        onRightAnswer = f => f,
        onWrongAnswer = f => f,
        onTimeout = f => f
    }) {
        this.question = question;
        this.onMouseOver = onMouseOver;
        this.onRightAnswer = onRightAnswer;
        this.onWrongAnswer = onWrongAnswer;
        this.onTimeout = onTimeout;
    }



}

