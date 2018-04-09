var myImage = document.querySelector('img');

myImage.onclick = function() {
    var mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/firefox-icon.png') {
        myImage.setAttribute('src', 'images/wallpaper1.png');
    }
    else if(mySrc === 'images/wallpaper1.png') {
        myImage.setAttribute('src', 'images/wallpaper2.png');
    }
    else {
        myImage.setAttribute('src', 'images/firefox-icon.png');
    }
}

//抓取button和h1的引用
var myButton = document.querySelector('button');
var myHeading = document.querySelector('h1');

function setUserName() {
    var myName = prompt('Please enter your name!');
    localStorage.setItem('name', myName);
    myHeading.innerHTML = 'Welcome! ' + myName;
}

if(!localStorage.getItem('name')) {
    setUserName();
}
else {
    var storedName = localStorage.getItem('name');
    myHeading.innerHTML = 'WelCome back! ' + storedName;
}

myButton.onclick = function() {
    setUserName();
}