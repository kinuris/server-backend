const siteUrl = "https://idontknowanymore.xyz"
// const siteUrl = "http://localhost:5500"

const form = document.getElementById("login-user")

form.addEventListener("submit", event => {
    event.preventDefault()

    const email = event.target.email.value
    const password = event.target.password.value

    const xhr = new XMLHttpRequest();
    xhr.open("POST", siteUrl + "/login")
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify({
        email,
        password
    }))
})