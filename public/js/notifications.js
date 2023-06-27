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
    });

  return result;
}

const errorMessage = document.querySelector('#error-message');

const showError = (msg) => _showError(msg, errorMessage);

let publicKey = localStorage.getItem('vapidPublicKey');

let enabledNotifications = publicKey !== null;



const notificationIcon = document.querySelector('i.bi-bell');
const notifyBtn = document.querySelector('#notify');

notificationIcon.addEventListener('DOMContentLoaded', () => {
  notificationIcon.classList.toggle('bi-bell', enabledNotifications);
})

async function promptNotificationPermission() {
  const result = await promptUser({
    title: '¿Quiere recibir notificaciones sobre sus eventos cuando se acercan?',
    message: '',
    type: 'question',
    confirmText: 'Sí',
    cancelText: 'Cancelar'
  });

  enabledNotifications = result.isConfirmed;

  notificationIcon.classList.toggle('bi-bell', enabledNotifications);
  const permission = await Notification.requestPermission();
  return permission;
}

notificationIcon.toggleAttribute('bi-bell', enabledNotifications);

notifyBtn.addEventListener('click', async (_evt) => {

    notificationIcon.classList.toggle('bi-bell');

    const permission = await promptNotificationPermission();

    if (!('Notification' in window)) {
      return showError('Su navegador no soporta notificaciones');
    }

    if (permission == 'granted') {

        if (!publicKey) {
          const resp = await fetch('/api/notifications/vapid-key');
          const { publicKey: key } = await resp.json();
          publicKey = key;
        }

        const registration = await registerNotificationWorker();

        if (!registration) return;

        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: publicKey
        });

        const response = await fetch('/api/notifications/subscription', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
              'content-type': 'application/json'
            }
        });

        if (!response.ok) return showError('Error al solicitar subscripción: ', response);

        console.log(response);
    } else {
      localStorage.removeItem('vapidPublicKey');
    }
})

async function registerNotificationWorker() {
  if (!('serviceWorker' in navigator)) {
    return showError('Su navegador no soporta Service Workers');
  }
  let registration;
  try {
    registration = await navigator.serviceWorker.register("/js/worker.js");
  } catch (error) {
    console.error(`Registration failed with ${error}`);
    return showError('No se pudo completar la acción.');
  } 
  return registration;
}
