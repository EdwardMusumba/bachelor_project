const endpoint = "http://localhost:3007/api/v1/register_newsitem";
const homePageUrl = "../HTML/manage_newsitems.html";

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