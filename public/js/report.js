import { getUserInfo } from "./utils/getUserInfo.js";

const reportTitle = document.querySelector('#report-title');

const token = localStorage.getItem('token');

if (!token) {
    Swal.fire({
        icon: 'error',
        title: 'Sesión expirada. Redireccionando a página principal'
    });
    setTimeout(() => {
        window.location.assign('/');
    }, 1000);
}

document.addEventListener('DOMContentLoaded', async () => {
    const user = await getUserInfo(token);

    reportTitle.innerHTML = `Informe de actividades de ${user.name}`;
})