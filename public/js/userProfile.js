const nameValue = document.getElementById("name")
const descValue = document.getElementById("description")
const emailValue = document.getElementById("email")
const subjectValue = document.getElementById("subject")
const timeValue = document.getElementById("time_day")
const peopleValue = document.getElementById("people")
const contactValue = document.getElementById("contact")

const token = localStorage.getItem("token")

const getInfo = async () => {
    const userInfo = await fetch("http://localhost:4000/user/info", {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "authorization": token
        }
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            nameValue.innerText = res.name ? res.name : "Sin nombre"
            descValue.innerText = res.ocupation ? res.ocupation : "Sin descripción"
            emailValue.innerText = res.email ? res.email : "Sin email"
            if (res.hasOwnProperty("preferences")) {
                subjectValue.innerText = res.preferences[0].subject ? res.preferences[0].subject : "No especificado!"
                timeValue.innerText = res.preferences[0].time_day ? res.preferences[0].time_day : "No especificado!"
                peopleValue.innerText = res.preferences[0].people ? res.preferences[0].people : "No especificado!"
                contactValue.innerText = res.preferences[0].contact_type ? `${res.preferences[0].contact}: ${res.preferences[0].contact_type}` : "No especificado!"
            } else {
                subjectValue.innerText = "No especificado!"
                timeValue.innerText = "No especificado!"
                peopleValue.innerText = "No especificado!"
                contactValue.innerText = "No especificado!"
            }
        })
    
    console.log(userInfo);
}

getInfo()
