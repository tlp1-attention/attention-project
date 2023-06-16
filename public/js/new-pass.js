const btn = document.getElementById("btn");
const form = document.getElementById("form");
const password = document.querySelector('[name=password]');

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = localStorage.getItem('email');

    console.log(email)

    if (!email) return;

    const user = fetch(`/change-password`,{
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify({
        email, 
        password: password.value 
        })
    })

    btn.value = "Sending..."

    user
    .then(res => {
        window.location.assign('/login.html');
    })
    .catch(console.log)
})