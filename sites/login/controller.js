const siteUrl = "https://idontknowanymore.xyz"
// const siteUrl = "http://localhost:5500"

const form = document.getElementById("login-user")
const urlParams = new URLSearchParams(document.location.search)

form.addEventListener("submit", event => {
    event.preventDefault()

    const email = event.target.email.value
    const password = event.target.password.value

    const xhr = new XMLHttpRequest();
    
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4 && xhr.response === "Login successful") {
            document.location.replace('/register-item')
        }    
    })

    xhr.open("POST", siteUrl + "/login")
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify({
        email,
        password
    }))

})

let alertmsg

if (alertmsg = urlParams.get("alertmsg")) {
    alert(alertmsg)
}