class Timer {
    interval;

    constructor(timeInSecs, {
        node,
        onValueChange = () => {},
        stopBtn,
        onTimeout = () => {}
    }) {
        this.dom = node;
        this.timeInSecs = timeInSecs;
        this.initialTime = timeInSecs;
        this.onValueChange = onValueChange;
        this.stopBtn = stopBtn;
        this.onTimeout = onTimeout;
    }

    start() {
       return new Promise((resolve, reject) => {
            if (this.stopBtn) {
                
                this.stopBtn.addEventListener('click', () => {
                    this.stopBtn.toggleAttribute('disabled')
                    this.stop();
                    reject(null)
                });
            }
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
                
                this.onValueChange(this.timeInSecs, this.initialTime);

                this.dom.textContent = `
                  ${padZero(minutes)}:${padZero(seconds)}
                `;

                this.timeInSecs--;
            }, 1000)
       });
    }

    stop() {
        this.onTimeout();
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

export default Timer;