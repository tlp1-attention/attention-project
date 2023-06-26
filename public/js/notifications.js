import _showError from './utils/showError.js'

const errorMessage = document.querySelector('#error-message');

const showError = (msg) => _showError(msg, errorMessage);

const publicKey = 'BOJ4o53xe2kwk7FsEQa8_97gQpdoHdy-lyXopytEwgji3SmtRhtxwdOyN3dQ-7CoIWrPIJh_Omhx0yx1H-Oryd4'
// TODO: Move the service worker registration to only happen if notification
// TODO: permission is granted
let registration;
if (!('serviceWorker' in navigator)) {
    'ServiceWorkers are not supported'
} else {
    try {
        registration = await navigator.serviceWorker.register("/js/worker.js");
        if (registration.installing) {
          console.log("Service worker installing");
        } else if (registration.waiting) {
          console.log("Service worker installed");
        } else if (registration.active) {
          console.log("Service worker active");
        }
      } catch (error) {
        console.error(`Registration failed with ${error}`);
      } 
}

const notificationIcon = document.querySelector('i.bi-bell');
const notifyBtn = document.querySelector('#notify');

notifyBtn.addEventListener('click', async (evt) => {

    notificationIcon.classList.toggle('bi-bell')

    notificationIcon.animate([
      { transform: 'rotate(2deg)' },
      { transform: 'rotate(0deg)'},
      { transform: 'rotate(-2deg)'}
    ], 100);

    const permission = await Notification.requestPermission()

    if (permission == 'granted') {
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: publicKey
        })

        const response = await fetch('/subscribe', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
            'content-type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Something happened  to the request');


        console.log(response);

    } else {
        throw new Error('Something happened  to the request')
    }
})


