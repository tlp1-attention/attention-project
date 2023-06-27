import _showError from './utils/showError.js'

async function promptUser(
  {
    title, message, type = 'text',
    confirmText = 'Sí', cancelText = 'Cancelar'
  }
) {
  const result = Swal.fire({
      title: title,
      text: message,
      icon: type,
      showCancelButton: true,
      confirmButtonColor: 'var(--clr-accent-800)',
      cancelButtonColor: 'var(--clr-red-600)',
      confirmButtonText: confirmText,
      cancelButtonText: cancelText
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(result);
      }
    });

  return result;
}


const errorMessage = document.querySelector('#error-message');

const showError = (msg) => _showError(msg, errorMessage);

let publicKey = localStorage.getItem('vapidPublicKey');

let enabledNotifications = publicKey !== null;

'BOJ4o53xe2kwk7FsEQa8_97gQpdoHdy-lyXopytEwgji3SmtRhtxwdOyN3dQ-7CoIWrPIJh_Omhx0yx1H-Oryd4'
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

async function promptNotificationPermission() {
  const result = await promptUser({
    title: '¿Quiere recibir notificaciones sobre sus eventos cuando se acercan?',
    message: '',
    type: 'question',
    confirmText: 'Sí',
    cancelText: 'Cancelar'
  });

  if (result.isConfirmed) {
    enabledNotifications = true;
    notificationIcon.classList.add('bi-bell');
    notifyBtn.textContent
  }
}

notificationIcon.toggleAttribute('bi-bell', enabledNotifications);

notifyBtn.addEventListener('click', async (evt) => {

    notificationIcon.classList.toggle('bi-bell');

    promptNotificationPermission()
    
    console.log(Swal);

    const permission = await Notification.requestPermission();

    if (permission != 'granted') {
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


