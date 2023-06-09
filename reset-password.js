const btn = document.getElementById("btn")

const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
        e.preventDefault();

        btn.value = "Sending..."

        const serviceID = 'service_1iywyzn';
        const templateID = 'template_3kewoy7';
        const apiKey = '5pImIaxqkTmuNIZnG';

        emailjs.sendForm(serviceID, templateID, form, apiKey)
            .then(() => {
                btn.value = 'Send Email';
                alert('Sent!');
            }, (err) => {
                btn.value = 'Send Email';
                alert(JSON.stringify(err));
            });
})
