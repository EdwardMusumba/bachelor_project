
const endpoint = "http://localhost:3007/api/v1/signin";
const homePageUrl = "../HTML/manage_newsitems.html";
const homePageUrl1 = "../HTML/Editnewsitems.html";
const homePageUrl2 = "../HTML/search_newsitems.html";

//const e = document.getElementById("Role");
//const strUser = e.options[e.selectedIndex].text;
    

function onSuccess(response) {
    const selection = document.getElementById("Role");
    const role = selection.options[selection.selectedIndex].text.toLowerCase();
    if (role ==="administrator"){
        alert("you have successfully logged in");
        window.location.href = homePageUrl;
    }else if(role ==="editor"){
        alert("you have successfully logged in");
        window.location.href = homePageUrl1;
    }else if(role ===" News reader"){
        alert("you have successfully logged in");
        window.location.href = homePageUrl2;
    }else if(role ===" News reporter"){
        alert("you have successfully logged in");
        window.location.href = homePageUrl2;
    }

    //window.location.href = homePageUrl;
}

function onFailure(response) {
    alert("login failed");
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
    const selection = document.getElementById("Role");
    const data = {

        "name": document.getElementsByName("name")[0].value,
        "email": document.getElementsByName("email")[0].value,
        "password": document.getElementsByName("password")[0].value,
        "role": selection.options[selection.selectedIndex].text.toLowerCase()
        
        
    };
    

    
    const params = {
        method: 'POST',
        body: JSON.stringify(data),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    fetch(endpoint, params)
        .then(success)
        .then(onSuccess,onFailure)
        .catch(error);
}