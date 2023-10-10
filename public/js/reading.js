const readingContainer = document.querySelector('#reading-container')

const token = localStorage.getItem('token')

if (!token) {
    Swal.fire({
        icon: 'error',
        title: 'Sesión expirada.',
        footer: 'Redireccionándolo a la página principal',
    })
    setTimeout(() => {
        window.location.assign('/')
    })
}

async function getReadings() {
    try {
        const response = await fetch('/api/exercises/readings', {
            headers: {
                authorization: token,
            },
        })
        const { exercises } = await response.json()

        return exercises
    } catch (err) {
        console.error(err)
        Swal.fire({
            icon: 'error',
            title: 'Algo salió mal',
            footer: '<p>Contáctese con los desarrolladores del sitio',
        })
        return []
    }
}

async function showReadings() {
    const exercises = await getReadings();

    if (exercises.length == 0) {
        readingContainer.innerHTML = `<span>No se encontraron lecturas/span>`;
    }


    readingContainer.innerHTML += exercises.map(renderReading).join('');
}

document.addEventListener('DOMContentLoaded', showReadings);

function renderReading(reading) {
    return `
    <section class="reading-card mt-5 shadow-lg">
    <div class="position-relative overflow-hidden reading-img flex-shrink-0">
        <img src="/assets/bg-placeholder-login.png" alt="" />
        <a class="overlay text-decoration-none" href="/workspace/readings/${reading.id}">
            <span class="d-flex fs-3 gap-3 text-white fw-bold">
                <i class="bi bi-book"></i>
                Leer
            </span>
        </a>
    </div>
    <div class="px-3 px-md-2 py-3">
        <hgroup class="">
            <span class="reading-category"></span>
            <h3 class="reading-title">${reading.readTitle}</h3>
        </hgroup>
        <p>
            ${reading.read}
        </p>
    </div>
    </section>`
}
