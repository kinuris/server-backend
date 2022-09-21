const siteUrl = "https://idontknowanymore.xyz"
// const siteUrl = "http://localhost:5500"
const form = document.getElementById("register-form")

form.addEventListener('submit', event => {
    event.preventDefault()
    
    const name = event.target.name.value
    const price = parseFloat(event.target.price.value)

    const xhr = new XMLHttpRequest();
    xhr.open("POST", siteUrl + "/create-item")
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify({
        name,
        price
    }));
})

const deleteForm = document.getElementById("delete-form")

deleteForm.addEventListener('submit', event => {
    event.preventDefault()
    
    const name = event.target.name.value

    const xhr = new XMLHttpRequest();
    xhr.open("POST", siteUrl + "/delete-item")
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify({
        name
    }));
})

const data = document.getElementById("data")

async function update() {
    const res = await fetch(siteUrl + "/fetch")
    const result = await res.json()

    data.innerHTML = JSON.stringify(result.data)
}

update()

setInterval(update, 1000)