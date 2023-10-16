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
    
    console.log(userInfo);
}

getInfo()
