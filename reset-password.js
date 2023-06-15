const btn = document.getElementById("btn");

const form = document.getElementById("form");

const email = document.getElementById("mail");

form.addEventListener("submit", (e) => {
        e.preventDefault();

        btn.value = "Sending..."

        const serviceID = 'service_1iywyzn';
        const templateID = 'template_3kewoy7';
        const apiKey = '5pImIaxqkTmuNIZnG';

        emailjs.sendForm(serviceID, templateID, form, apiKey)
            .then(async () => {
                btn.value = 'Send Email';
                localStorage.setItem('email', email.value)
                alert('Sent!');
            }, (err) => {
                btn.value = 'Send Email';
                alert(JSON.stringify(err));
            });
})
