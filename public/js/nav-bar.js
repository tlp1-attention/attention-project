import { getUserInfo } from "./utils/getUserInfo.js";

const slideButtons = document.querySelectorAll('.slide-button');
const offcanvas = document.querySelector('#offcanvas');
const lateralBar = document.querySelector('.lateral-bar');
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
    username.innerHTML = await getUserInfo(token).then(user => user.name);
});