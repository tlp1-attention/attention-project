import Timer from './components/timer-component.js'

const options = document.querySelectorAll('.option');
const questionContainer = document.querySelector('.question-container');
const timerElement = questionContainer.querySelector('.timer-text');
const scoreText = document.querySelector('.score-text');
const questionCountCurrent = document.querySelector('.question-count-current');
const questionCountTotal = document.querySelector('.question-count-total');

const templateTable = document.querySelector('#final-table-template');
const totalQuestions = templateTable.content.querySelector('.total-questions');
const correctCount = templateTable.content.querySelector('.correct-count');
const incorrectCount = templateTable.content.querySelector('.incorrect-count');
const totalScore = templateTable.content.querySelector('.total-score');
const multiplier = templateTable.content.querySelector('.multiplier');

const token = localStorage.getItem('token');

if (!token) {
    Swal.fire({
        icon: 'error',
        title: 'Sesión no encontrada. Redireccionando a la página principal.'
    });
    setTimeout(() => {
        window.location.assign('/');
    }, 1000);
}

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
    const step = Math.ceil(100 / questions.length);
    let right = 0;
    let wrong = 0;
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
        scoreText.innerHTML = right * step;
        if (idx == questions.length) {
            renderFinalTable(right, questions.length);
            return;
        }
        if (isTimeout) {
            renderFinalTable(right, questions.length);
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
                options.forEach(op => op.setAttribute('disabled', ''));
                optionElement.classList.add(isCorrect ? 'correct' : 'incorrect');

                if (isCorrect) {
                    right++;
                    setTimeout(() => renderNextQuestion(idx + 1), 300);
                } else {
                    wrong++;
                    setTimeout(() => renderNextQuestion(idx + 1), 300);
                }
            }
        });
    }
    renderNextQuestion(0);
}

async function renderFinalTable(right, total) {
    const readingId = questionContainer.dataset.id;
    const step = Math.ceil(100 / total);
    const points = right * step;
    const won = points > total / 2;

    totalScore.innerHTML = points;
    multiplier.innerHTML = `×${step.toFixed(2)}`;
    correctCount.innerHTML = right;
    incorrectCount.innerHTML = total - right;
    totalQuestions.innerHTML = total;

    await updateCompletedExercise(readingId, won);

    Swal.fire({
        icon: won ? 'success' : 'error',
        title: won ? '¡Felicitaciones!' : 'Inténtalo de nuevo...',
        template: document.querySelector('#final-table-template'),
    })
    .then((result) => { 
        const hasConfirmed = result.isConfirmed;
        if (hasConfirmed) window.location.assign(`/workspace/readings/${readingId}/quiz`);
        else window.location.assign(`/workspace/readings/${readingId}`)
    })
}

async function updateCompletedExercise(readingId, won) {

    try {
        console.log("Won: ", won);
        const response = await fetch('/api/exercises/completed', {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                exerciseId: readingId,
                typeExerciseId: 1,
                complete: won
            })
        });

        if (!response.ok) throw await response.json();

    } catch(err) {
        console.error(err);
        Swal.fire({
            icon: 'error',
            title: err.message,
        });
    }

}

runQuiz();
