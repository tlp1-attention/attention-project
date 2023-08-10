//elementos del HTML
const cel = document.getElementById("cel");
const discord = document.getElementById("discord");
const slack = document.getElementById("slack");
const input = document.getElementById("contact-input");
const contacts = document.getElementById("contacts");
const formulario = document.getElementById("formulario");
const subjects = Array.from(document.getElementsByName("subject"));
let checkeds;

let preferences = {
  materias: [],
  horario: "",
  personas: "",
  tipo_contacto: "",
  contacto: "",
};

//inputs dependiendo de el contacto elegido
const dInput = document.createElement("input");
dInput.type = "text";
dInput.placeholder = "@usuario de discord";

const sInput = document.createElement("input");
sInput.type = "text";
sInput.placeholder = "@usuario de slack";

const cInput = document.createElement("input");
cInput.type = "number";
cInput.placeholder = "000-0000-0000";
input.appendChild(cInput);

//detectar cambios del radio de contacto y agregar el input correspondiente
contacts.addEventListener("change", (e) => {
  e.preventDefault();

  if (discord.checked) {
    dInput.name = "contacto";
    input.appendChild(dInput);
  } else {
    dInput.name = "";
    dInput.value = "";
    preferences.contacto = "";
    dInput.remove();
  }
  if (slack.checked) {
    sInput.name = "contacto";
    input.appendChild(sInput);
  } else {
    sInput.name = "";
    sInput.value = "";
    preferences.contacto = "";
    sInput.remove();
  }
  if (cel.checked) {
    cInput.name = "contacto";
    preferences.contacto = "";
    input.appendChild(cInput);
  } else {
    cInput.name = "";
    cInput.value = "";
    preferences.contacto = "";
    cInput.remove();
  }
});

//detectar cuando el formulario es enviado
formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  alert("Preferencias guardadas");
  fetch("http://localhost:3000/preferences", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(preferences),
  });
});

formulario.addEventListener("change", (e) => {
  e.preventDefault();

  checkeds = [];
  subjects.forEach((check) => {
    if (check.checked) {
      checkeds.push(check.value);
    }
  });
  // console.log(checkeds);
  preferences = {
    ...preferences,
    [e.target.name]: e.target.value,
    materias: checkeds,
  };
  delete preferences.subject;
  console.log(preferences);
});
