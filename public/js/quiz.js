const options = document.querySelectorAll('.option');
const questionContainer = document.querySelector('.question-container');

async function getQuestions() {
    const readingId = questionContainer.dataset.id;
    const response = await fetch(`/api/exercises/readings/${readingId}/questions`);
    console.log(response);
    const { questions } = await response.json();

    return questions;
}

getQuestions().then(console.log);