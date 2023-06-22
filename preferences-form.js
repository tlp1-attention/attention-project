//elementos del HTML
const cel = document.getElementById("cel");
const discord = document.getElementById("discord");
const slack = document.getElementById("slack");
const input = document.getElementById("contact-input");
const contacts = document.getElementById("contacts");
const formulario = document.getElementById("formulario");

const preferences = {
    materias: [],
    horario: [],
    personas: [],
    tipo_contacto: "",
    contacto: "",
}

//inputs dependiendo de el contacto elegido
const dInput = document.createElement("input");
dInput.type="text";
dInput.placeholder="@usuario de discord";

const sInput = document.createElement("input");
sInput.type="text";
sInput.placeholder="@usuario de slack";

const cInput = document.createElement("input");
cInput.type="number";
cInput.placeholder="000-0000-0000";
input.appendChild(cInput)

//detectar cambios del radio de contacto y agregar el input correspondiente
contacts.addEventListener("change", (e) => {
    e.preventDefault()

    if (discord.checked) {
        input.appendChild(dInput)
    } else {
        dInput.remove()
    }
    if (slack.checked) {
        input.appendChild(sInput)
    } else {
        sInput.remove()
    }
    if (cel.checked) {
        input.appendChild(cInput)
    } else {
        cInput.remove()
    }
})

//detectar cuando el formulario es enviado
formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    alert("Preferencias guardadas");
    fetch("http://localhost:3000/preferences", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(preferences)
    })
})