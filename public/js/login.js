import fetchOK from "./utils/fetch.js";
import _showError from "./utils/showError.js";
import showSuccess from './utils/showSuccess.js';

const usernameInput = document.querySelector('[name="username"');
const passwordInput = document.querySelector('[name="password"]'); 
const form = document.querySelector('form');

const errorMessage = document.querySelector('#error-message');
const showError = (message) => _showError(message, errorMessage);

form.addEventListener('submit', async (evt) => {

    const username = usernameInput.value;
    const password = passwordInput.value;

    const requestBody = JSON.stringify({
        username,
        password
    });

    const request = new Request(`/login/`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: requestBody
    });
    
    try {
        const response = await fetchOK(request);

        handleLogin(response);
    } catch (failedResponse) {

        if (failedResponse.status == 400) {
            return showError('Error al iniciar sesión: Usuario o contraseña incorrectos.');
        }
        return showError('No se estableció conexión con el servidor')
    };
})

async function handleLogin() {
    showSuccess('Correct login!');
}