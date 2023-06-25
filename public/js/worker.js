self.addEventListener('push', async (event) => {

    const { data } = event;

    const pushMessage = await data.json();
 
    event.waitUntil(self.Notification(pushMessage.title, {
        body: pushMessage.message,
        icon: '/assets/logo-1.png'
    }));
})