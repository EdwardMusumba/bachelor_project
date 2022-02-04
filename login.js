function ifSuccess(response) {
    return response.json()
}

function signup() {
    const data = {
        name: document.getElementsByName("name")[0].value,
        email: document.getElementsByName("email")[0].value,
        password: document.getElementsByName("password")[0].value,
        role: document.getElementsByName("role")[0].value
        
    }
    url = "http://localhost:5000/users"
    params = {
        method: 'POST',
        body: JSON.stringify(data),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    fetch(url, params)
        .then(ifSuccess)
        .then(newUserCreated)
        .catch(ifError)
}