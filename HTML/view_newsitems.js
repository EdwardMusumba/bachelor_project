const endpoint = "http://localhost:3007/api/v1/view_newsitems";
const homePageUrl = "../HTML/view_newsitems.html";







function onSuccess(response) {

const body = document.getElementsByTagName("body")[0];  
const div =document.createElement('div');

div.className = 'Container'

//window.location.href = homePageUrl;
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

function view_Newsitems() {
    
    
    const data =document.getElementsByName("newsitemsnumber")[0].onSuccess
        
        
    
    
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