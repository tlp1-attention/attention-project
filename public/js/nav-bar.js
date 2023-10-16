import { getUserInfo } from "./utils/getUserInfo.js";

const slideButtons = document.querySelectorAll('.slide-button');
const offcanvas = document.querySelector('#offcanvas');
const reportLink = document.querySelector('.report-link');
const username = document.querySelector('#username');

slideButtons.forEach(btn => {
    btn.addEventListener('click', (_event) => {
        offcanvas.classList.toggle('open');
    }, {
        capture: true
    })
});

const token = localStorage.getItem('token');


document.addEventListener('DOMContentLoaded', async () => {
    const user = await getUserInfo(token);

    username.innerHTML = user.name;

    reportLink.href = `/workspace/report/${user.id}`;
});

