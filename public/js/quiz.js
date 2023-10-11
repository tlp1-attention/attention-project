// import Swal from 'sweetalert2';
import Timer from './components/timer-component.js'

Swal.fire({
    template: document.querySelector('#final-table-template')
})

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
    let points = 0;
    let step = Math.ceil(100 / questions.length);
    let isTimeout = false;

    const timer = new Timer(300, {
        node: timerElement,
        onTimeout: () => {
            isTimeout = true;
        },
    });

    questionCountTotal.innerHTML = questions.length;
    timer.start();
    function renderNextQuestion(idx) {
        scoreText.innerHTML = points;
        if (idx == questions.length) {
            renderFinalTable(points, questions.length);
            return;
        }
        if (isTimeout) {
            renderFinalTable(points, questions.length);
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
                    points += step;
                    setTimeout(() => renderNextQuestion(idx + 1), 300);
                } else {
                    setTimeout(() => renderNextQuestion(idx + 1), 300);
                }
            }
        });
    }
    renderNextQuestion(0);
}

function renderFinalTable(points, total) {
    const readingId = questionContainer.dataset.id;
    const won = points > total / 2;
    Swal.fire({
        icon: won ? 'success' : 'error',
        title: won ? '¡Felicitaciones!' : 'Inténtelo de nuevo',
        template: '',
        backdrop: true,
        confirmButtonText: 'Volver a la lectura',
        cancelButtonText: 'Intentar de nuevo',
    })
    .then(() => window.location.assign(`/workspace/readings/${readingId}`))
    .catch(() => window.location.assign(`/workspace/readings/${readingId}/quiz`))
}

runQuiz();
