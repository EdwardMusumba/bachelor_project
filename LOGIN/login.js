
const endpoint = "http://localhost:3007/api/v1/signin";
const homePageUrl = "../home/home-login.html";

function onSuccess(response) {
    window.location.href = homePageUrl;
}

function onFailure(response) {
    return response.json().then(error);
}

function success(response) {
    if (!response.ok) {
        throw response;
    } 
    return response
}

function error(response) {
    const body = document.getElementsByTagName("body")[0];
    
    const errorDiv = document.createElement("div");
    
    const errorPar = document.createElement("p");
    errorPar.innerText = response.error;

    errorDiv.appendChild(errorPar);
    body.appendChild(errorDiv);
}


function signin() {
    const data = {
        "name": document.getElementsByName("name")[0].value,
        "email": document.getElementsByName("email")[0].value,
        "password": document.getElementsByName("password")[0].value,
        "role": document.getElementsByName("role")[0].value
        
    }
    
    params = {
        method: 'POST',
        body: JSON.stringify(data),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    fetch(url, params)
        .then(success)
        .then(onSuccess,onFailure)
        .catch(error)
}