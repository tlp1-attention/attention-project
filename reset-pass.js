const btn = document.getElementById("btn");

const form = document.getElementById("form");

const password = document.querySelector("[name=password]");

console.log(password);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = localStorage.getItem("email");

  console.log(email);

  if (!email) return;

  const user = fetch(`http://localhost:3000/resetPassword`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      email,
      password: password.value,
    }),
  });

  btn.value = "Sending...";

  user
    .then((res) => {
      if (!res.ok) console.error(res);
      else console.log(res);
    })
    .catch(console.log);
});
