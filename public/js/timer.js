class Timer {
    interval;

    constructor(timeInSecs, domNode) {
        this.dom = domNode;
        this.timeInSecs = timeInSecs;
    }

    start() {
       return new Promise(resolve => {
            this.interval = setInterval(() => {

                if (this.timeInSecs == 0) {
                    this.stop();
                    resolve(null);
                }

                let seconds = this.timeInSecs;

                let minutes = Math.floor(
                      seconds / 60
                );

                seconds = seconds % 60;

                this.dom.textContent = `
                  ${padZero(minutes)}:${padZero(seconds)}
                `;

                this.timeInSecs--;
            }, 1000)
       });
    }

    stop() {
        clearInterval(this.interval);
    }

    restart() {
        this.dom.textContent = "00:00";
        this.timeInSecs = this.initial;
    }
}

function padZero(num) {
    return num.toString().padStart(2, '0');
}

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

const modal = bootstrap.Modal.getOrCreateInstance(document.querySelector('.modal'), { show: false });

submitButton.addEventListener('click', (evt) => {

    evt.preventDefault();

    const minutes = parseInt(totalTimeSelect.value);

    const intervals = divideTime(minutes);

    runTimers(intervals);

    modal.hide();
})

document.addEventListener('DOMContentLoaded', () => {
    // modal.show();
})

const workTimer = document.querySelector('#work');

const freeTimer = document.querySelector('#free');

async function runTimers(intervals) {

    for (let interval of intervals) {

       const node = interval.mode == Mode.Work
                    ? workTimer
                    : freeTimer

       const timer = new Timer(interval.time * 60, node);

       timerContainer.classList.add(
           interval.mode
       );

       await timer.start()
             .then(() => timer.restart());
    }

    timerContainer.remove();
}