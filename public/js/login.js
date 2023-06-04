import fetchOK from "./utils/fetch.js";
import showError from "./utils/showError.js";

const usernameInput = document.querySelector('[name="login"');
const passwordInput = document.querySelector('[name="password"]'); 
const form = document.querySelector('form');

const errorMessage = document.querySelector('#error-message');

form.addEventListener('submit', async (evt) => {

    evt.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    const requestBody = JSON.stringify({
          username,
          password      
    });

    const request = new Request(`/login/${username}/${password}`, {
        method: 'HEAD',
    });

    await fetchOK(request)
          .then(handleLogin)
          .catch(failedResponse => {

            if (failedResponse.statusCode != 404) {
                return showError('Error al iniciar sesión: Usuario o contraseña incorrectos.', errorMessage);
            }

            return showError('Error inesperado: ' + failedResponse.statusText);
          })
})

function handleLogin() {
    window.location.assign('./index.html');
}