//EDIT NEWS ITEMS
const editnewsEndpoint = "http://localhost:3007/api/v1/edit_newsitem";
const edithomePageUrl = "../HTML/edit_newsitems.html";
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

//SEARCH NEWS ITEMS
const searchEndpoint = "http://localhost:3007/api/v1/search_newsitems";
const searchhomePageUrl = "../HTML/search_newsitems.html";
const loginUrl1="../HTML/login.html";


function onSuccess(response) {

const body = document.getElementsByTagName("body")[0];  
const div =document.createElement('div');


div.className = 'Container'


let table = document.createElement('table');
table.className='table'

let thead = document.createElement('thead');
thead.className='thead'

let tbody = document.createElement('tbody');
tbody.className='tbody'

table.appendChild(thead);
table.appendChild(tbody);



let row_1 = document.createElement('tr');
let heading_1 =document.createElement('th');
heading_1.innerHTML = "newsitemsnumber";
let heading_2 =document.createElement('th');
heading_2.innerHTML = "reportersnumber";
let heading_3 =document.createElement('th');
heading_3.innerHTML = "readersnumber";
let heading_4 =document.createElement('th');
heading_4.innerHTML = "dateofentry";
let heading_5 =document.createElement('th');
heading_5.innerHTML = "newstime";
let heading_6 =document.createElement('th');
heading_6.innerHTML = "newstype";
let heading_7 =document.createElement('th');
heading_7.innerHTML = "comments";

row_1.appendChild(heading_1);
row_1.appendChild(heading_2);
row_1.appendChild(heading_3);
row_1.appendChild(heading_4);
row_1.appendChild(heading_5);
row_1.appendChild(heading_6);
row_1.appendChild(heading_7);
thead.appendChild(row_1);

let row_2 = document.createElement('tr');
let column_1 =document.createElement('td');
column_1.innerText = response[0];
row_2.appendChild(column_1);
let column_2 =document.createElement('td');
column_2.innerText = response[1];
row_2.appendChild(column_2);
let column_3 =document.createElement('td');
column_3.innerText = response[2];
row_2.appendChild(column_3);
let column_4 =document.createElement('td');
column_4.innerText = response[3];
row_2.appendChild(column_4);
let column_5 =document.createElement('td');
column_5.innerText = response[4];
row_2.appendChild(column_5);
let column_6 =document.createElement('td');
column_6.innerText = response[5];
row_2.appendChild(column_6);
let column_7 =document.createElement('td');
column_7.innerText = response[6];
row_2.appendChild(column_7);



table.appendChild(row_2);

div.appendChild(table);
body.appendChild(div);
    
}

function onFailure(response) {
    alert("Unable to search ,Please enter correct news item number");
    return response.json().then(error);
}

function success(response) {
    if (!response.ok) {
        throw response;
    } 
    return response.json();
}

function error(response) {
    console.log(response);
    const body = document.getElementsByTagName("body")[0];
    
    const errorDiv = document.createElement("div");
    
    const errorPar = document.createElement("p");
    errorPar.innerText = response.error;

    errorDiv.appendChild(errorPar);
    body.appendChild(errorDiv);
}
function back(){
    window.location.href= loginUrl1;
}


function search() {
    
    
    const data = {

        "newsitemsnumber": document.getElementsByName("newsitemsnumber")[0].value,
        
        
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

//MANAGE NEWS ITEMS
const registerEndpoint = "http://localhost:3007/api/v1/register_newsitem";
const homePageUrl = "../HTML/manage_newsitems.html";
const loginUrl2="../LOGIN/login.html";

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
    window.location.href= loginUrl2;
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

//LOGIN 
//const e = document.getElementById("Role");
//const strUser = e.options[e.selectedIndex].text;

const usersEndpoint = "http://localhost:3007/api/v1/signin";
const managehomePageUrl = "../HTML/manage_newsitems.html";
const editUrl = "../HTML/Editnewsitems.html";
const searchUrl = "../HTML/search_newsitems.html";

    

function onSuccess(response) {
    const selection = document.getElementById("Role");
    const role = selection.options[selection.selectedIndex].text.toLowerCase();
    if (role ==="administrator"){
        alert("you have successfully logged in");
        window.location.href = managehomePageUrl;
    }else if(role ==="editor"){
        alert("you have successfully logged in");
        window.location.href = editUrl;
    }else if(role ===" News reader"){
        alert("you have successfully logged in");
        window.location.href = searchUrl;
    }else if(role ===" News reporter"){
        alert("you have successfully logged in");
        window.location.href = searchUrl;
    }

    
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