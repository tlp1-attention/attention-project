require("dotenv").config();

const btn = document.getElementById("btn");

const form = document.getElementById("form");

const email = document.getElementById("mail");

form.addEventListener("submit", (e) => {
        e.preventDefault();

        btn.value = "Sending..."

        const serviceID = process.env.SERVICE_ID;
        const templateID = process.env.TEMPLATE_ID;
        const apiKey = process.env.API_KEY;

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
