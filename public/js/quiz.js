import Timer from './components/timer-component.js'

const options = document.querySelectorAll('.option');
const questionContainer = document.querySelector('.question-container');
const timerElement = questionContainer.querySelector('.timer-text');
const scoreText = document.querySelector('.score-text');
const questionCountCurrent = document.querySelector('.question-count-current');
const questionCountTotal = document.querySelector('.question-count-total');

async function getQuestions() {
    const readingId = questionContainer.dataset.id;
    const response = await fetch(`/api/exercises/readings/${readingId}/questions`);
    const { questions } = await response.json();
    return questions;
}

async function renderQuestion(currentQuestion, {
    onOptionClick = option => {},
    beforeRender =  () => {}
}) {
    const forQuestion = questionContainer.querySelector('.question');
    console.log(currentQuestion);
    beforeRender();
    forQuestion.innerHTML = currentQuestion.text;
    const randomSortedResponses = sortRandom(currentQuestion.response);
    options.forEach((op, i) => {
        const optionObj = randomSortedResponses[i];
        console.log(currentQuestion.text, optionObj.response, optionObj.correct);
        const optionText = op.querySelector('.option-text');
        optionText.innerHTML = optionObj.response;
        op.onclick =  () => {
            const isEnabled = op.getAttribute('disabled') == null;
            if (!isEnabled) return;
            onOptionClick(optionObj, op)
        };
    });
}

const sortRandom = (arr) => arr.slice(0).sort((a, b) => Math.random() > 0.5 ? 1 : -1);

async function runQuiz() {
    const questions = await getQuestions();
    console.log(questions);
    let points = 0;
    let isTimeout = false;

    const timer = new Timer(300, {
        node: timerElement,
        onTimeout: () => {
            isTimeout = true;
            console.log('Se acabó el tiempo');
            renderFinalTable(points, false);
        },
    });
    questionCountTotal.innerHTML = questions.length;
    timer.start();
    function renderNextQuestion(idx) {
        if (idx == questions.length) {
            renderFinalTable(points, true);
            return;
        }
        if (isTimeout) {
            renderFinalTable(points, false);
        }

        questionCountCurrent.innerHTML = idx + 1;

        renderQuestion(questions[idx], {
            beforeRender: () => {
                options.forEach(op => {
                    op.classList.remove('correct', 'incorrect');
                    op.removeAttribute('disabled');
                })
            },
            onOptionClick: (optionData, optionElement) => {
                const isCorrect = optionData.correct;
                console.log("OptionData: ", optionData, isCorrect);
                options.forEach(op => op.setAttribute('disabled', ''));
                optionElement.classList.add(isCorrect ? 'correct' : 'incorrect');

                if (isCorrect) {
                    points += 5;
                    setTimeout(() => renderNextQuestion(idx + 1), 300);
                } else {
                    renderFinalTable(points, false);
                }
            }
        });
    }
    renderNextQuestion(0);
}

function renderFinalTable(points, won) {
    console.log('Renderizando tabla final');
}

runQuiz();
