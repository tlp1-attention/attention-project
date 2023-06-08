const btn = document.getElementById("btn");

const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    btn.value = "Sending..."

    setTimeout(()=>{
        alert("contraseña cambiada con exito!")
        btn.value = "Success"
    }, 2000)
})