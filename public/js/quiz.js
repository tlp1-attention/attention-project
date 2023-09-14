const options = document.querySelectorAll('.option');

options.forEach(option => {

    option.setAttribute('isCorrect', Math.random() < 0.5)

    option.addEventListener('click', () => {
        const isCorrect = option.getAttribute('isCorrect') === 'true';
        console.log(option.getAttribute('isCorrect'));
        option.classList.toggle(isCorrect ? 'correct' : 'incorrect');
    })

    
})