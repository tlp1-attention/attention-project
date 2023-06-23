import validatePassword from './utils/validate-password.js'
import _showError from './utils/showError.js'

const btn = document.getElementById("btn");
const form = document.getElementById("form");
const password = document.querySelector('[name=password]');
const errorMessage = document.querySelector('#error-message');
const showError = (msg) => _showError(msg, errorMessage);

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = localStorage.getItem('email');

    console.log(email)

    if (!email) return;

    if (!validatePassword(password.value)) {
        return showError('Contraseña insegura: Debe contener al menos 8 caracteres de longitud, ' + 
                         'al menos una mayúscula, una minúscula y un número');
    }

    const user = fetch(`/change-password`,{
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify({
        email, 
        password: password.value 
        })
    })

    btn.value = "Sending..."

    user
    .then(_res => {
        window.location.assign('/login.html');
    })
    .catch(console.log)
})