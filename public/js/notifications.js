const publicKey = 'BKL0lUjtyI6L8TT6vwSE2Y-NT-kYwbbasfbnQoye7R2SuEH8oQEr-yvZKIWiHJ2wkmHDDv4yNbi2sCHa0oFsIqQ'
// TODO: Move the service worker registration to only happen if notification
// TODO: permission is granted
let registration;
if (!('serviceWorker' in navigator)) {
    throw new Error('ServiceWorkers are not supported')
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

const notifyBtn = document.querySelector('#notify');

notifyBtn.addEventListener('click', async (evt) => {

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


