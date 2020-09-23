// This file is for Compsci335 A1 Javascript file
// Author: Hongjun Wang
// UPI: hwan542

window.onload = function () {
    showHome();
    getVersion();
    menuToggle();
}
// function menuToggle is from Youtube tutorial
// URL link: https://www.youtube.com/watch?v=gt8zOLQ8A0w
function menuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    menuToggle.addEventListener('click', () => {
        if (nav.className != 'active') { nav.className = 'active'; }
        else { nav.className = ''; }
    });
}

// all these functions show() are from tutorial
function showHome() {
    showNotabs();
    document.getElementById("homeSection").style.display = "inline";
}
function showNews() {
    showNotabs();
    document.getElementById("newsSection").style.display = "inline";
    getNews();
}
function showDisplays() {
    showNotabs();
    document.getElementById("displaysSection").style.display = "inline";
    getDisplayItem();
}
function showStore(){
    showNotabs();
    document.getElementById("storeSection").style.display = "inline";
    searchGoods();
}
function showLogin(){
    showNotabs();
    document.getElementById("signUpSection").style.display = "inline";
    // searchGoods();
}
function showLogin2(){
    showNotabs();
    document.getElementById("loginSection").style.display = "inline";
    // searchGoods();
}
function showGuestBook() {
    showNotabs();
    document.getElementById("guestBookSection").style.display = "inline";
    getComments();
}

function getVersion() {
    const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/version";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true);
    xhr.onload = () => {
        const version = document.getElementById("version");
        version.innerHTML = xhr.responseText;
    }
    xhr.send(null);
}
function showNotabs() {
    document.getElementById("homeSection").style.display = "none";
    document.getElementById("newsSection").style.display = "none";
    document.getElementById("displaysSection").style.display = "none";
    document.getElementById("storeSection").style.display = "none";
    document.getElementById("signUpSection").style.display = "none";
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("guestBookSection").style.display = "none";
}


function getComments() {
    const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/htmlcomments";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true);
    xhr.onload = () => {
        const comment = document.getElementById("comments");
        comment.innerHTML = xhr.responseText;
    }
    xhr.send(null);
}

function sendComments() {
    let name = document.getElementById("nameBox");
    let comment = document.getElementById("commentBox");
    if (!document.getElementById("commentBox").value) {
        alert("Please input your comment");
        console.log("Empty comment");
    }
    else {
        const xhr = new XMLHttpRequest();
        const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/comment?name=";
        let URL = uri + name.value;
        xhr.open("POST", URL, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        // xhr.setRequestHeader("Content-length", comment.value.length);
        // xhr.setRequestHeader("Connection","close");
        xhr.onload = () => {
            //POST succeeds; do something
            showGuestBook();
            console.log("post successfully");
        }
        xhr.send(JSON.stringify(comment.value));
        // showGuestBook();
    }
}
// To be complete
function sendInfo() {
    let userName = document.getElementById("nameField");
    let userPassword = document.getElementById("passwordField");
    let userAddress = document.getElementById("addressField");
    const xhr = new XMLHttpRequest();
        const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/register";
        let userinfo = {
            "Address": userAddress.value,
            "Name": userName.value,
            "Password": userPassword.value,
        };
        xhr.open("POST", uri, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        // xhr.setRequestHeader("Content-length", comment.value.length);
        // xhr.setRequestHeader("Connection","close");
        xhr.onload = () => {
            //POST succeeds; do something
            console.log("post successfully");
            alert("Hi, "+userName.value+"! You have successfully signed up!");
        }
        xhr.send(JSON.stringify(userinfo));
    }

function checkInfo(){
    let userName = document.getElementById("loginName").value;
    let userPassword = document.getElementById("loginPassword").value;
    const uri = "http://localhost:8189/Service.svc/user";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true, userName, userPassword);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onload = () =>{
        if (xhr.status == 200){
            // showHome();
            alert("Welcome back "+userName);
        } 
        else{
            alert("Invalid username or password, please try again.");
        }
    }
    xhr.send(null);
}

function getNews() {
    const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/news";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onload = () => {
        const resp = JSON.parse(xhr.responseText);
        editNews(resp);
    }
    xhr.send(null);
}

function editNews(news) {
    let allNews = "";
    for (let i = 0; i < news.length; ++i) {
        const singleNews = news[i];
        const description = singleNews.descriptionField;
        const date = singleNews.pubDateField;
        const linkTo = singleNews.linkField;
        let photo = singleNews.enclosureField.urlField;
        const title = singleNews.titleField;
        allNews += "<img src= " + photo + "> <br> <a href=" + linkTo + " target=\"_blank\" class=\"titleLink\">" +
            title + "</a>" + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;"
            + date + "<br>" + description + "<br><br><br>";
    }
    document.getElementById("newsContent").innerHTML = allNews;
}

function getDisplayItem() {
    const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/items";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onload = () => {
        const resp = JSON.parse(xhr.responseText);
        editDisplay(resp);
    }
    xhr.send(null);
}
function editDisplay(item) {
    let allDisplay = "";
    let imgLink = "<img src=\"http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/itemimg?id=";
    for (let i = 0; i < item.length; ++i) {
        const singleItem = item[i];
        const description = singleItem.Description;
        const title = singleItem.Title;
        const itemID = singleItem.ItemId;
        allDisplay += imgLink + itemID + "\"> <br>"
            + title + "<br>" + description + "<br><br><br>";
    }
    document.getElementById("displayItems").innerHTML = allDisplay;
}
function searchDisplay() {
    let input = document.getElementById("inputSearch");
    const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/search?term=";
    let URL = uri + input.value;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", URL, true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onload = () => {
        const resp = JSON.parse(xhr.responseText);
        editDisplay(resp);
    }
    xhr.send(null);
}

function editGoods(item) {
    let allDisplay = "";
    let imgLink = "<img src=\"http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/shopimg?id=";
    // const buyLink = "<a href = \"http://redsox.uoa.auckland.ac.nz/mss/Service.svc/buy?id=";
    const login = "<button onclick='showLogin2()'";
    for (let i = 0; i < item.length; ++i) {
        const singleItem = item[i];
        const description = singleItem.Description;
        const title = singleItem.Title;
        const itemID = singleItem.ItemId; 
        
        allDisplay += imgLink + itemID + "\"> <br>"
            + title + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;"
            + login + "\">" + "&#128722</button>" +
            "<br>" + description + "<br><br><br>";
    }
    document.getElementById("displayGoods").innerHTML = allDisplay;
}
function searchGoods() {
    let input = document.getElementById("SearchingGoods");
    const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/shop?term=";
    let URL = uri + input.value;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", URL, true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onload = () => {
        const resp = JSON.parse(xhr.responseText);
        editGoods(resp);
    }
    xhr.send(null);
}
