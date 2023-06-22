import Timer from './utils/timer-class.js'

const Mode = {
    Work: 'WORK',
    Free: 'FREE'
}

function getTimerConfig(totalTime) {

    switch (totalTime) {
        case 60: 
            return {
                timeOfWork: 25,
                timeFree: 5
            }
        case 45:
            return {
                timeOfWork: 15,
                timeFree: 5
            };
        default:
            return {
                timeOfWork: 20,
                timeFree: 10
            }
    }
}

function divideTime(minutes) {
    let intervals = [];

    const { timeOfWork, timeFree } = getTimerConfig(minutes);
    let timeTaken = 0;
    let i = 0;

    while (timeTaken < minutes) {
        if (i % 2 == 0) {
            intervals.push({
                time: timeOfWork,
                mode: Mode.Work
            })
            timeTaken += timeOfWork;
        } else {
            intervals.push({
                time: timeFree,
                mode: Mode.Free
            })
            timeTaken += timeFree;
        }
        i++;
    }
    return intervals;
}

const timerContainer = document.querySelector('#timer-container');

const totalTimeSelect = document.querySelector('[name="total-time"]');

const submitButton = document.querySelector('button[type="submit"]')

const newTimerButton = document.querySelector('#new-timer');

const modal = bootstrap.Modal.getOrCreateInstance(document.querySelector('.modal'), { show: false, backdrop: true });

const stopBtn = document.querySelector('#stop-btn'); 

newTimerButton.addEventListener('click', () => {
    modal.show()
})

submitButton.addEventListener('click', (evt) => {

    evt.preventDefault();

    const minutes = parseInt(totalTimeSelect.value);

    const intervals = divideTime(minutes);

    runTimers(intervals);

    modal.hide();
})

let currentTimer = null;

const workTimer = document.querySelector('#work');

const freeTimer = document.querySelector('#free');

const workProgress = document.querySelector('#work-progress');
const freeProgress = document.querySelector('#free-progress');

async function runTimers(intervals) {

    if (currentTimer) return;

    newTimerButton.toggleAttribute('disabled');
    stopBtn.removeAttribute('disabled');

    for (let interval of intervals) {
       const node = interval.mode == Mode.Work
                    ? workTimer
                    : freeTimer
        const indicator = interval.mode == Mode.Work 
                    ? workProgress
                    : freeProgress

       currentTimer = new Timer(interval.time * 60, {
            node,
            onValueChange: (currentTime, total) => {
                const currentValue = (currentTime * 100 / total);
                indicator.setAttribute('style', `stroke-dashoffset:${currentValue-100}`)
            },
            stopBtn: stopBtn
       });

       timerContainer.classList.add(
           interval.mode
       );

       try {
            await currentTimer.start();
       } catch(e) {
           currentTimer.restart();
           break;
       }
    }
    currentTimer = null;
    stopBtn.setAttribute('disabled', '');
    newTimerButton.toggleAttribute('disabled');
}