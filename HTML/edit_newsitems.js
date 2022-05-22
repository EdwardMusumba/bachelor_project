const endpoint = "http://localhost:3007/api/v1/edit_newsitem";
const homePageUrl = "../HTML/edit_newsitems.html";
const loginUrl="../LOGIN/login.html";

function onSuccess(response) {
    alert("The news item can be edited")
    window.location.href = homePageUrl;
    
}

function onFailure(response) {
    alert("The news item can not be edited")
    return response.json().then(error);
}

function success(response) {
    if (!response.ok) {
        throw response;
    } 
    return response
}
function back(){
    window.location.href= loginUrl;
}

function displayNewsitem(response) {
    const body = document.querySelector('body');
    for (const newsitem of response) {
        const p = document.createElement("p");
        p.innerText = `News item number: ${newsitem[0]}. News item type : ${newsitem[1]}`; 
        body.appendChild(p);
    }
}

function error(response) {
    const body = document.getElementsByTagName("body")[0];
    
    const errorDiv = document.createElement("div");
    
    const errorPar = document.createElement("p");
    errorPar.innerText = response.error;

    errorDiv.appendChild(errorPar);
    body.appendChild(errorDiv);
}

function showNewsitem() {
    const DisplayNewsitemUrl = "http://localhost:5000/newsitem"

    const params = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    fetch(DisplayNewsitemUrl, params)
        .then(success)
        .then(onSuccess,onFailure)
        .then(displayNewsitem)
        .catch(error);
} 

function signup() {
    const payload = {
        "newsitemsnumber": document.getElementsByName("newsitemsnumber")[0].value,
        "reportersnumber": document.getElementsByName("reportersnumber")[0].value,
        "readersnumber": document.getElementsByName("readersnumber")[0].value,
        "dateofentry": document.getElementsByName("dateofentry")[0].value,
        "newstime" : document.getElementsByName("newstime")[0].value,
        "newstype" : document.getElementsByName("newstype")[0].value,
        "comments": document.getElementsByName("comments")[0].value
    };
    

    const params = {
        body: JSON.stringify(payload),
        method: "PUT",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
    };
    console.log(params)
    fetch(endpoint, params)
        .then(success)
        .then(onSuccess, onFailure)
        .catch(error);
}