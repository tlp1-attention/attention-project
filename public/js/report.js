import { getUserInfo } from './utils/getUserInfo.js'

const reportTitle = document.querySelector('#report-title')
const reportContainer = document.querySelector('#report-container');
const eventCanvas = document.querySelector('#event-canvas');
const readingCanvas = document.querySelector('#reading-canvas');
const token = localStorage.getItem('token')

if (!token) {
    Swal.fire({
        icon: 'error',
        title: 'Sesión expirada. Redireccionando a página principal',
    })
    setTimeout(() => {
        window.location.assign('/')
    }, 1000)
}

document.addEventListener('DOMContentLoaded', async () => {
    const user = await getUserInfo(token)

    reportTitle.innerHTML = `Informe de actividades de ${user.name}`
})

function reportError(err) {
    Swal.fire({
        icon: 'error',
        title: err.message ?? 'Error desconocido. Contacte a los desarrolladores del sitio'
    });
}

const getEventsByWeek = () =>
    fetch('/api/events/by-week', {
        headers: {
            Authorization: token,
        },
    })
        .then((res) => res.json())
        .catch(reportError)

const getReadingsByWeek = () => 
    fetch('/api/exercises/completed/by-week', {
        headers: {
            'Authorization': token
        }
    })
        .then(res => res.json())
        .catch(reportError)


async function renderReport() {
    const { events } = await getEventsByWeek()
    const { completedExercises: readings } = await getReadingsByWeek();

    const readingLastWeek = readings.at(1)?.readingCount ?? 0;
    const readingCurrentWeek = readings.at(0)?.readingCount ?? 0;
    const readingProgress = (( readingCurrentWeek - readingLastWeek ) * 100 / (readingLastWeek + readingCurrentWeek)).toFixed(2);

    const eventsLastWeek = events.at(1)?.eventCount ?? 0;
    const eventCurrentWeek = events.at(0)?.eventCount ?? 0;
    const eventProgress = (( eventCurrentWeek - eventsLastWeek ) * 100 / (eventsLastWeek + eventCurrentWeek)).toFixed(2);

    return `
            <table class="report-table shadow py-3 px-2">
                    <tr>
                            <th class="corner top-left">Categoría</th>
                            <th class="text-center">
                                <i class="bi bi-arrow-left"></i>
                                <span class="d-none d-md-inline mx-1">
                                   Anterior 
                                </span>
                            </th>
                            <th class="text-center">
                                <i class="bi bi-calendar-check"></i>
                                <span class="d-none d-md-inline mx-1">
                                    Última
                                </span>
                            </th>
                            <th class="text-center corner top-right">
                                <i class="bi bi-award"></i>
                                <span class="d-none d-md-inline mx-1">
                                    Progreso
                                </span>
                            </th>
                        </tr>
                        <tbody>
                            <tr>
                                <td scope="row" class="px-4 report-cell report-accent color-green">
                                    <i class="bi bi-book colored-item color-green"></i>
                                    Lectura
                                </td>
                                <td class="text-center">
                                    ${readingLastWeek}
                                </td>
                                <td class="text-center">
                                    ${readingCurrentWeek}
                                </td>
                                <td class="text-center">
                                    ${readingProgress}
                                </td>
                            </tr>
                            <tr>
                                <td scope="row" class="px-4 report-cell report-accent">
                                    <i class="bi bi-puzzle-fill colored-item color-yellow"></i>
                                    Actividades
                                </td>
                                <td class="text-center">
                                    -
                                </td>
                                <td class="text-center">
                                    -
                                </td>
                                <td class="text-center">
                                    -
                                </td>
                            </tr>
                            <tr>
                                <td scope="row" class="px-4 report-cell report-accent corner bottom-left">
                                    <i class="bi bi-calendar colored-item color-blue"></i>
                                    Eventos
                                </td>
                                <td class="text-center">
                                    ${eventsLastWeek}
                                </td>
                                <td class="text-center">
                                    ${eventCurrentWeek}
                                </td>
                                <td class="text-center corner bottom-right">
                                    ${eventProgress}
                                </td>
                            </tr>
                        </tbody>
                </table>
    `
}


async function renderEventChart() {
  const { events: data } = await getEventsByWeek();
  
  new Chart(
    eventCanvas,
    {
      type: 'bar',
      options: {
        plugins: {
          legend: {
            display: false
          },
        }
      },
      data: {
        labels: data.map(group => { 
            const startWeekDate = dayjs(group.startWeek).format('DD/MM');
            const endWeekDate = dayjs(group.endWeek).format('DD/MM');
            return `${startWeekDate} - ${endWeekDate}`
        }).slice(0, 6),
        datasets: [
          {
            label: 'Eventos registrados por semana',
            data: data.map(row => row.eventCount),
            backgroundColor: "#2c87e2"
          }
        ]
      }
    }
  ); 
}

async function renderReadingChart() {
  const { completedExercises: data } = await getReadingsByWeek();
  
  new Chart(
    readingCanvas,
    {
      type: 'line',
      options: {
        plugins: {
          legend: {
            display: false
          },
        }
      },
      data: {
        labels: data.map(group => { 
            const startWeekDate = dayjs(group.startWeek).format('DD/MM');
            const endWeekDate = dayjs(group.endWeek).format('DD/MM');
            return `${startWeekDate} - ${endWeekDate}`
        }).slice(0, 6),
        datasets: [
          {
            label: 'Cantidad de cuestionarios respondidos',
            data: data.map(row => row.readingCount),
            backgroundColor: "#dd4139"
          }
        ]
      }
    }
  ); 
}

document.addEventListener('DOMContentLoaded', async () => {
    reportContainer.innerHTML = await renderReport();
    renderEventChart();
    renderReadingChart()
})