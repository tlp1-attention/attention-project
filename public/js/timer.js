import html from './utils/html.js'

const workTimer = document.querySelector('#work');
const freeTimer = document.querySelector('#free');

class Timer {
    constructor(initialTimeInSecs) {
        this.secs = initialTimeInSecs;
        this.dom = html`
            <div>
                00:00
            </div>
        
        
        `
    }

    start(){

    }
}