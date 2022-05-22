const endpoint = "http://localhost:3007/api/v1/register_newsitem";
const homePageUrl = "../HTML/manage_newsitems.html";
const loginUrl="../LOGIN/login.html";

function onSuccess(response) {
    alert("News item is created");
    window.location.href = homePageUrl;
}

function onFailure(response) {
    alert("news item can not to be created");
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
function back(){
    window.location.href= loginUrl;
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
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
    };
    
    fetch(endpoint, params)
        .then(success)
        .then(onSuccess, onFailure)
        .catch(error);
}