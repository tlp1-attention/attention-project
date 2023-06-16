const msg = document.getElementById("messages");

// const users = fetch("http://localhost:3000/user")
    // .then(response => response.json())

const users = [
    {
        name: "Javier",
        img: "./090001.jpg"
    },
    {
        name: "Ale",
        img: "./090012.jpg"
    },
    {
        name: "María",
        img: "./090011.jpg"
    },
    {
        name: "Cristian",
        img: "./090018.jpg"
    },
    {
        name: "Leo",
        img: "./090025.jpg"
    }
]

users.forEach(user => {
    messages.innerHTML +=
    `<li class="nav-item">
        <a href="#" class="nav-link active bg-light text-dark" aria-current="page">
            <img src="${user.img}" alt="foto" class="rounded-circle" style="height: 32px; width: 32px;">
            ${user.name}
        </a>
    </li>`
});