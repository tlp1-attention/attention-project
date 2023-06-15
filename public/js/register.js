import fetchOK from './utils/fetch.js';
import showError from './utils/showError.js'

const userInput = document.querySelector('[name="username"]');
const passwordInput = document.querySelector('[name="password"]');
const emailInput = document.querySelector('[name="email"]');
const form = document.querySelector('form');

const errorMessage = document.querySelector('#error-message');

form.addEventListener('submit', async (evt) => {

    // Prevenimos el envío del formulario y la recarga
    // de la página
    evt.preventDefault();

    const username = userInput.value;
    const password = passwordInput.value;
    const email = emailInput.value;

    if (!validatePassword(password)) {
        return showError('Contraseña insegura: Debe contener al menos 8 caracteres de longitud,'+ 
                         'al menos una mayúscula, una minúscula y un número', errorMessage);
    }

    const body = JSON.stringify({
        username,
        password,
        email
    });

    const request = new Request('/register', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body
    })

    const response = fetchOK(request);
    
    response
        .then(handleRegister)
        .catch(failedResponse => {
            if (failedResponse.status === 400) {
                return showError('Usuario no disponible', errorMessage);
            }
            return showError(failedResponse.statusText || "Error inesperado", errorMessage);
        })
})

function handleRegister() {
    window.location.assign('./login.html');
}

function validatePassword(pass) {

    // Al menos 8 caracteres de longitud
    if (pass.length < 8) return false;

    // Una mayúscula,
    // minúscula y número
    if (!(pass.match(/[A-Z]/) &&
        pass.match(/[a-z]/) &&
        pass.match(/\d/))) {
            return false;
    };

    return true;
}



