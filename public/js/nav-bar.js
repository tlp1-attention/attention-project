const slideButtons = document.querySelectorAll('.slide-button');
const offcanvas = document.querySelector('#offcanvas');
const lateralBar = document.querySelector('.lateral-bar');

slideButtons.forEach(btn => {
    btn.addEventListener('click', (_event) => {
        offcanvas.classList.toggle('open');
    }, {
        capture: true
    })
});