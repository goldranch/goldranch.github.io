// Initialize Firebase
var config = {
    apiKey: "AIzaSyB_ytkJxt0kH63kQGY0pZH3Jdq_9zPN_L4",
    authDomain: "home-automation-76ca5.firebaseapp.com",
    databaseURL: "https://home-automation-76ca5.firebaseio.com",
    projectId: "home-automation-76ca5",
    storageBucket: "home-automation-76ca5.appspot.com",
    messagingSenderId: "476452786951"
};
firebase.initializeApp(config);

const txtEmail = document.getElementById('usernameTxt');
const txtPassword = document.getElementById('passwordTxt');
const btnLogin = document.getElementById('loginBtn');

var user;

var lightsRef = firebase.database().ref('lights');
var tempRef = firebase.database().ref('temp');
var camerasRef = firebase.database().ref('cameras');
var speakersRef = firebase.database().ref('speakers');


btnLogin.addEventListener('click', e => {
    e.preventDefault();

    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => alert(e.message));

});

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        user = firebaseUser;
        document.getElementById('loginForm').style.display="none";
        document.getElementById('app').style.display="block";
    } else {
        
    }
});

document.getElementById('logoutBtn').addEventListener('click', function(){
    firebase.auth().signOut();
    document.getElementById('loginForm').style.display="block";
    document.getElementById('app').style.display="none";
});

// Back
function back(){
    document.getElementById('main').style.display='block';
    document.getElementById('lights').style.display='none';
    document.getElementById('temp').style.display='none';    
    document.getElementById('cameras').style.display='none';    
    document.getElementById('speakers').style.display='none';        
};


// Lights
document.getElementById('lightsBtn').addEventListener('click', function(){
    document.getElementById('main').style.display='none';
    document.getElementById('lights').style.display='block';
    lightsRef.on('value',gotLightsData,errData);    
});

// Temperature
document.getElementById('tempBtn').addEventListener('click', function(){
    document.getElementById('main').style.display='none';
    document.getElementById('temp').style.display='block';    
});

// Cameras
document.getElementById('camerasBtn').addEventListener('click', function(){
    document.getElementById('main').style.display='none';
    document.getElementById('cameras').style.display='block';    
});

// Speakers
document.getElementById('speakersBtn').addEventListener('click', function(){
    document.getElementById('main').style.display='none';
    document.getElementById('speakers').style.display='block';    
});

var lights;
var keys;

// The id in the database is the same as in the HTML

function gotLightsData(data) {
    lights = data.val();
    keys = Object.keys(lights);
    for (var i=0; i<keys.length; i++){
        var k = keys[i];
        var lightVal = lights[k].value;
        lightVal = lightVal ? 1 : 0;
        var lightST = lights[k].start_time;
        var lightET = lights[k].end_time;
        var lightIsAuto = lights[k].isAutomated;
        document.getElementById(k).value=lightVal;
        var id = k+"_start_time";
        document.getElementById(id).value=lightST;
        var id = k+"_end_time";
        document.getElementById(id).value=lightET;
        var id = k+"_isAutomated";
        document.getElementById(id).checked=lightIsAuto;
        if(lightIsAuto==true){
            document.getElementById('auto').style.display="block";
        } else if(lightIsAuto==false){
            document.getElementById('auto').style.display="none";
        }
    }
}

function errData(err) {
    console.log('Error!');
    console.log(err);
}
//Change Value of light
document.getElementById('b_light').onchange = function(){
    var bLightRef = firebase.database().ref('lights/b_light');
    var currentVal = parseInt(document.getElementById('b_light').value);
    currentVal = ((currentVal == 1) ? true : false);
    bLightRef.update({
        value: currentVal,
        isAutomated: false
    });
};
// Change start time of automation
document.getElementById('b_light_start_time').onchange = function(){
    var bLightRef = firebase.database().ref('lights/b_light');
    var currentVal = document.getElementById('b_light_start_time').value;
    bLightRef.update({
        start_time: currentVal
    });
};
// Change end time of automation
document.getElementById('b_light_end_time').onchange = function(){
    var bLightRef = firebase.database().ref('lights/b_light');
    var currentVal = document.getElementById('b_light_end_time').value;
    bLightRef.update({
        end_time: currentVal
    });
};
// Change if light is automated
document.getElementById('b_light_isAutomated').onchange = function(){
    var bLightRef = firebase.database().ref('lights/b_light');
    var currentVal = document.getElementById('b_light_isAutomated').checked;
    if(currentVal==true){
        document.getElementById('auto').style.display="block";
    } else if(currentVal==false){
        document.getElementById('auto').style.display="none";
    }
    bLightRef.update({
        isAutomated: currentVal
    });
};
