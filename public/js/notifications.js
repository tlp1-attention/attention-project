import _showError from './utils/showError.js'
import promptUser from './utils/promptUser.js'

const errorMessage = document.querySelector('#error-message');

const showError = (msg) => _showError(msg, errorMessage);

const token = localStorage.getItem('token');
let enabledNotifications = localStorage.getItem('vapidPublicKey') !== null;

const notificationIcon = document.querySelector('i.bi-bell');
const notifyBtn = document.querySelector('#notify');

document.addEventListener('DOMContentLoaded', () => {
    notificationIcon.classList.toggle('bi-bell', !enabledNotifications);
})

async function promptNotificationPermission() {
    const result = await promptUser({
        title: '¿Quiere recibir notificaciones sobre sus eventos cuando se acercan?',
        message: '',
        type: 'question',
        confirmText: 'Sí',
        cancelText: 'Ignorar'
    });
    
    enabledNotifications = result.isConfirmed;
    
    notificationIcon.classList.toggle('bi-bell', !enabledNotifications);
    
    const permission = enabledNotifications
    ? await Notification.requestPermission()
    : 'denied';
    
    return permission;
}

notifyBtn.addEventListener('click', async (_evt) => {
    
    const permission = await promptNotificationPermission();
    
    if (!('Notification' in window)) {
        return showError('Su navegador no soporta notificaciones');
    }
    
    if (permission == 'granted') {
        const registration = await registerNotificationWorker();
        
        if (!registration) return;
        
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: await getPublicKey()
        });
        
        const response = await fetch('/api/notifications/subscription', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
                'Authorization': token,
                'content-type': 'application/json'
            }
        });
        
        if (!response.ok) return showError('Error al solicitar subscripción: ', response);
    } else {
        // Remove all registered service workers
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
            for(let registration of registrations) {
                registration.unregister();
            } 
        });
        
        // Delete subscription on back-end
        const response = await fetch('/api/notifications/subscription', {
            method: 'DELETE',
            headers: {
                'Authorization': token,
                'content-type': 'application/json'
            }
        });
        
        localStorage.removeItem('vapidPublicKey');
    }
})

const getPublicKey = async () => {
    const publicKey = localStorage.getItem('vapidPublicKey');
    
    if (publicKey) return publicKey;
    
    const resp = await fetch('/api/notifications/vapid-key');
    const { publicKey: key } = await resp.json();
    localStorage.setItem('vapidPublicKey', key);
    return key;
}

async function registerNotificationWorker() {
    if (!('serviceWorker' in navigator)) {
        showError('Su navegador no soporta Service Workers');
        return;
    }
    let registration;
    try {
        registration = await navigator.serviceWorker.register("/js/worker.js");
    } catch (error) {
        console.error(`Registration failed with ${error}`);
        showError('No se pudo completar la acción.');
        return;
    } 
    return registration;
}
