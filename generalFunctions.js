//======================================
// General
// =====================================

function listFunctions() {
  var i=1;
  console.log(">>> Loading all Functions into buffer...");
  var availableFunctions = ["changeTitle(windowTitle)","cutOutChar(str_to_remove,str)","removeCharFromStart(element,amount)","removeCharFromEnd(element,amount)","sleep(ms)","getRandomInt(min,max)","getRandomFloat(min,max)","getRandomBool","checkIfInt(value)","checkIfFloat(value)","checkIfString(value)","checkIfObject(value)","doStyleTransform(objectID,argument,value)","doTextTransform(objectID,value)","getTime()","getDay()","getDate()","setCookie(name,value)","getCookieByName(name)","isMailValid(mail)","isInArray(needle,haystack)","isInArrayCount(needle,haystack)","insertIntoArray(arr,pos,value)","getFromArray(arr,pos)","getWebcamAccess()"];
  console.log(">>> These are all functions you can youse:");
  availableFunctions.forEach(function(entry) {
    console.log(">>> "+i+" ) "+entry);
    i++;
  });
}
function changeTitle(windowtitle) {
  document.title = windowtitle;
}

// =====================================
// String handling
// =====================================

function cutOutChar(str_to_remove, str) {
  let reg = new RegExp(str_to_remove)
  return str.replace(reg, '')
}
function removeCharFromStart(element,amount) {
  return element.slice(amount);
}
function removeCharFromEnd(element,amount) {
  return element.slice(0,element.length - amount)
}

// =====================================
// Sleep
// =====================================

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// =====================================
// RNG
// =====================================

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomBool() {
  return Math.random() >= 0.5;
}
function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

// =====================================
// Checking Datatypes
// =====================================

function checkIfInt(value) {
  return Number.isInteger(value);
}
function checkIfFloat(value) {
  return Number(value) === value && value % 1 !== 0;
}
function checkIfString(value) {
  if(typeof value === "string") {
    return true;
  }
  return false;
}
function checkIfObject(value) {
  if(typeof value === "object") {
    return true;
  }
  return false;
}

// =====================================
// Object Changing
// =====================================

function doStyleTransform(objectID,argument,value) {
  document.getElementById(objectID).style.argument = value;
}
function doTextTransform(objectID,value) {
  document.getElementById(objectID).style.innerHTML = value;
}

// =====================================
// Date and Time
// =====================================

function getTime() {
  return new Date().toLocaleTimeString();
}
function getDate() {
  return new Date().toLocaleDateString();
}
function getDay() {
  var d = new Date();
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  return  weekday[d.getDay()];
}

// =====================================
// Cookiehandling
// =====================================

function setCookie(name,value) {
  document.cookie = name+"="+value;
}
function getCookieByName(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

// =====================================
// Mail Handling
// =====================================

// requires special Form: <form onSubmit="return isMailValid(this);" action="">
function isMailValid(mail) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(mail).toLowerCase());
}

// =====================================
// Arrays
// =====================================

function isInArray(needle,haystack) {
  var countStack=haystack.length;
  for(var i=0; i<countStack;i++) {
    if(haystack[i]===needle) {
      return true;
    }
  }
  return false;
}
function isInArrayCount(needle,haystack) {
  var hitCount = 0;
  var countStack=haystack.length;
  for(var i=0; i<countStack;i++) {
    if(haystack[i]===needle) {
      for(var i=0; i<countStack;i++) {
        if(haystack[i]===needle) {
          hitCount++;
        }
      }
    }
  }
  return hitCount;
}
function insertIntoArray(arr,pos,value) {
  if(pos === "next") {
    arr[arr.length] = value;
    return true;
  }
  arr[pos] = value;
  return true;
}
function getFromArray(arr,pos) {
  if(pos < arr.length) {
    return arr[pos];
  }
  return false;
}

// =====================================
// I/O Handling
// =====================================

function errorMessage(message, e) {
  console.error(message, typeof e == 'undefined' ? '' : e);
  //alert(message);
}

function getWebcamAccess() {
  if (location.protocol === 'https:') {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    if (navigator.getUserMedia) {
      navigator.getUserMedia({
        audio: true,
        video: true
      }, function(stream) {
        document.querySelector('video').src = window.URL.createObjectURL(stream);
        var mediaStreamTrack = stream.getVideoTracks()[0];
        if (typeof mediaStreamTrack != "undefined") {
          mediaStreamTrack.onended = function() { //for Chrome.
            errorMessage('Your webcam is busy!')
          }
        } else errorMessage('Permission denied!');
      }, function(e) {
        var message;
        switch (e.name) {
          case 'NotFoundError':
          case 'DevicesNotFoundError':
            message = 'Please setup your webcam first.';
            break;
          case 'SourceUnavailableError':
            message = 'Your webcam is busy';
            break;
          case 'PermissionDeniedError':
          case 'SecurityError':
            message = 'Permission denied!';
            break;
          default:
            errorMessage('Reeeejected!', e);
            return;
        }
        errorMessage(message);
      });
    } else errorMessage('Uncompatible browser!');
  } else errorMessage('Use https protocol for open this page.')
}


console.log(">>> All JS Toolkit functions loaded!");
