const btn = document.getElementById("btn");

const form = document.getElementById("form");

const email = document.getElementById("mail");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  btn.value = "Sending...";

  fetch("http://localhost:3000/resetPassword", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email: email.value,
    }),
  }).then(
    async () => {
      btn.value = "Send Email";
      localStorage.setItem("email", email.value);
      alert("Sent!");
    },
    (err) => {
      btn.value = "Send Email";
      alert(JSON.stringify(err));
    }
  );
});
