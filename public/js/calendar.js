import showError from './utils/showError.js'
import showSuccess from './utils/showSuccess.js';
import fetchOK from './utils/fetch.js'

const form = document.querySelector('#new-event-form');
const formModal = bootstrap.Modal.getOrCreateInstance(document.querySelector('.modal'));
const newEventBtn = document.querySelector('#new-event');

newEventBtn.addEventListener('click', () => {
    formModal.show();
})

const token = localStorage.getItem('token');
const eventContainer = document.querySelector('#event-container');
const errorMessage = document.querySelector("#error-message");
const eventTitle = document.querySelector('[name=title]');
const eventDesc = document.querySelector('[name=description]');
const startDate = document.querySelector('[name=startDate]');
const endDate = document.querySelector('[name=endDate]');
const importance = document.querySelector('[name=importance]');
const filterCriteria = document.querySelector('#filter-criteria');
const sortCriteria = document.querySelector('#sort-criteria');

form.addEventListener('submit', createEvent);

async function createEvent(evt) {
    evt.preventDefault();

    const response = fetchOK('/api/events', {
        method: 'POST',
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: eventTitle.value,
            description: eventDesc.value,
            startDate: startDate.value,
            endDate: endDate.value,
            typeEvent: importance.value
        })
    })

    response
        .then(() => {
            showEvents()
            form.reset();
            formModal.hide();

            return showSuccess('Evento creado exitosamente', '');
        }).catch(failedResponse => {
            console.log(failedResponse);
            console.log(failedResponse.status);
            if (failedResponse.status == 400) {
                return showError('Datos enviados incorrectamente', errorMessage);
            }

            return showError('Error inesperado. ' + failedResponse.statusText || "", errorMessage);
        })
}

filterCriteria.addEventListener('change', () => showEvents());
sortCriteria.addEventListener('change', () => showEvents());

function sortEvents(events) {
    const criteria = sortCriteria.value;
    switch (criteria) {
        case '-':
            return events
        case 'by-date':
            return events.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
        case 'by-relevance-imp':
            return events.sort((a, b) => b.typeId > a.typeId ? -1 : 1);
        case 'by-relevance-no-imp':
            return events.sort((a, b) => b.typeId < a.typeId? -1 : 1);
    }
}

function applyFilter(event) {
    const criteria = filterCriteria.value;
    
    switch (criteria) {
        case '-':
            return true;
        case 'future-dates':
            return new Date(event.startTime) > new Date();
        case 'important':
            return event.typeId == 1;
        case 'non-important':
            return event.typeId != 1;
    }
}

// Recuperan los eventos para el usuario actual
async function getEvents() {
    const responseObj = await fetch('/api/events', {
        method: 'GET',
        headers: {
            token: token
        }
    })

    if (responseObj.status == 401) {
        showError('Sesión expirada. Redireccionando a página principal', errorMessage);
        setTimeout(() => {
            window.location.assign('/');
        }, 3000);
        return [];
    }

    if (responseObj.status == 404) return [];

    const {
        events
    } = await responseObj.json();

    return events;
}

async function showEvents() {

    while (eventContainer.hasChildNodes()) {
        eventContainer.removeChild(eventContainer.firstChild);
    }

    const events = await getEvents();

    if (events.length == 0) {
        eventContainer.innerHTML = `
        <p class="display-5 text-center">No se han encontrado eventos</p>
        `;
    }

    const filteredEvents = events.filter(applyFilter);

    const sortedEvents = sortEvents(filteredEvents);

    sortedEvents.forEach(event => eventContainer.appendChild(renderEvent(event)));
}

async function updateEvent(id) {

    const events = await getEvents();

    const eventToUpdate = events.find(event => event.id == id);

    if (!eventToUpdate) {
        return showError('No existe tal evento', errorMessage);
    }

    const {
        title,
        description,
        startTime,
        endTime,
        typeId
    } = eventToUpdate;

    eventTitle.value = title;
    eventDesc.value = description;
    startDate.value = startTime.slice(0, -8);
    if (endTime) endDate.value = endTime.slice(0, -8);
    importance.value = typeId;

    formModal.show();
}

async function deleteEvent(id) {

    const response = await fetch('/api/events', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            token: token
        },
        body: JSON.stringify({
            id
        })
    })

    if (response.ok) {
        showSuccess('Evento eliminado', '');
    } else {
        showError('Algo salió mal', errorMessage);
    }

    showEvents();
}

document.addEventListener('DOMContentLoaded', showEvents);

// Manejan el renderizado de los eventos

const typeColorsMap = new Map([
    [1, "var(--clr-green-400)"],
    [2, "var(--clr-red-600)"]
]);

const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
];


function renderEvent({
    id,
    title,
    description,
    startTime,
    typeId
}) {
    const template = document.createElement('template');

    const startDate = new Date(startTime);

    const eventColor = typeColorsMap.get(typeId);

    template.innerHTML = `
    <section class="d-flex position-relative flex-column flex-md-row border border-3 shadow event-container align-content-center">
        <div class="event-date flex-shrink-0" style="background-color:${eventColor}">
            <span class="event-month">${months[startDate.getMonth()].slice(0, 3)}</span>
            <span class="event-day">${startDate.getDate()}</span>
        </div>
        <div class="event-btns">
            <button class="btn event-delete-btn" id="delete-btn">
                <i class="bi bi-trash"></i>
                <span class="visually-hidden">Eliminar</span>
            </button>
            <button class="btn event-update-btn" id="update-btn">
                <i class="bi bi-pencil"></i>
                <span class="visually-hidden">Actualizar</span>
            </button>
        </div>
        <div class="p-2 my-2 mx-3 event-text flex-shrink-1">
            <h3 class="display-5">${title}</h3>
            <p class="fs-3">
                ${description}
            </p>
            <input type="checkbox" onchange=handleCompletedChange(${id}) /> Completado
        </div>
    </section>
    `
    template.content.querySelector('#delete-btn').addEventListener('click', () => deleteEvent(id))
    template.content.querySelector('#update-btn').addEventListener('click', () => updateEvent(id));

    return template.content;
}