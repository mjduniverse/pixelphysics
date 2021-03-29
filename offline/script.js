// Emulator Instance Variable

var ppgSploderEmulator;

// Level Testing Div

levelTestingDiv = document.querySelector(".level-test");

// Document

var xmlDoc = document.implementation.createDocument(null,"project");
var project = xmlDoc.querySelector("project");

// Levels

var levels = xmlDoc.createElement("levels");
levels.id = "levels";

project.appendChild(levels);

// Test Level

var testLevel = xmlDoc.createElement("level");
testLevel.setAttribute("env","0;3342489;None;0;1;0;0;3;3;6;0;;0");

levels.appendChild(testLevel);

// On window load

window.addEventListener("load",function(){

    var testButton = document.getElementById("test-code");
    
    document.getElementById("test-button").addEventListener("click",function(){
        testLevel.innerHTML = testButton.value;

        ppgSploderEmulator = new PPGSploderEmulator(xmlDoc);

        ppgSploderEmulator.load().then(function(){
            levelTestingDiv.appendChild(ppgSploderEmulator.phsim.container);
            ppgSploderEmulator.firstRender();
        });

    });

});