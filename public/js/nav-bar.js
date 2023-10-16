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
    try {
        const response = await fetch('/api/users', {
            headers: {
                'Authorization': token
            }
        });

        if (!response.ok) throw response;

        const { user } = await response.json();

        username.innerHTML = user.name;

    } catch(err) {
        console.error(err);
        Swal.fire({
            icon: 'error',
            title: 'Hubo un error al obtener información del usuario',
            footer: 'Si el error persiste, contacte a los desarrolladores del sitio.'
        });
    }
})