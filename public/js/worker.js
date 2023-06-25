self.addEventListener('push', async (event) => {
    event.waitUntil(self.Notification('ServiceWorker Cookbook', {
        body: 'Push Notcifiation Subscription Management',
        icon: '/assets/logo.'
    }));
})