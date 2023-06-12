const slideButtons = document.querySelectorAll('#slide-button');
const offcanvas = document.querySelector('#offcanvas');

slideButtons.forEach(btn => {
    btn.addEventListener('click', (_event) => {
        offcanvas.classList.toggle('open');
    })
});