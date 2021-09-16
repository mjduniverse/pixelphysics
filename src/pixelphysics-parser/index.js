const decodeExtensions = require("./decodeExtensions");
const Body = require("./body"); 
const dataTypes = require("./datatypes");

function PixelPhysicsParser(xmlTree) {

    this.xmlTree = xmlTree

    // Get author and title

    this.author = this.xmlTree.querySelector("project").getAttribute("author");
    this.title = decodeURI(this.xmlTree.querySelector("project").getAttribute("title"));

    // Decode and get graphics

    this.base64imgdata = {};
    this.graphics = {}
    this.imgDataURLs = {};
    this.xml_base64imgdata_children;

    if(this.xmlTree.querySelector("graphics")) {
    
        this.xml_base64imgdata_children = this.xmlTree.querySelector("graphics").children;

        for(let i = 0; i < this.xml_base64imgdata_children.length; i++) {

            let name = this.xml_base64imgdata_children[i].getAttribute("name");
            let id = Number.parseInt(name.split("_")[0]);
    
            this.graphics[id] = {
                name: name,
                frames: []
            }
    
            let data = this.xml_base64imgdata_children[i].innerHTML;
            this.base64imgdata[name] = data;
    
            let decoded_data = atob(data);
    
            let charPointIntegers = new Uint8Array(decoded_data.length);
    
            for(let j = 0; j < decoded_data.length; j++) {
                charPointIntegers[j] = decoded_data.charCodeAt(j);
            }
    
            let blob = new Blob([charPointIntegers],{
                type: "image/png"
            });
    
            let url = URL.createObjectURL(blob);
    
            this.imgDataURLs[name] = url;
    
            // Add graphics url
    
            this.graphics[id].url = url;


        }

    }

    // Get level information
    
    this.levels = [];
    
    let levelsChildren = this.xmlTree.querySelector("levels").children;

    for(let i = 0; i < levelsChildren.length; i++) {
    
        let envArr = levelsChildren[i].getAttribute("env").split(";");

        let musicInfo;

        if(envArr[12]) {

            let musicArr = envArr[12].split("/");

            // Old Sploder PPG games from early 2011 do not support music, so checking if music information is an array is necessary.

            if(Array.isArray(musicArr) && musicArr[0] !== "0") {
                musicInfo = {
                    author: musicArr[0],
                    filename: musicArr[1],
                    name: musicArr[1].split(".")[0]
                }
            }

        }

        let levelDataStr = levelsChildren[i].innerHTML;
        let entitiesData = levelDataStr.split("$");

        // Data for bodies
 
        let bodyData = entitiesData[0];
        let bodyDataParts = bodyData.split("|");

        let bodies = [];
        let bodyIds = {}
        let groups = {}

        for(let i = 0; i < bodyDataParts.length; i++) {

            let body = new Body(bodyDataParts[i]);
            
            // Body id structure

            bodyIds[body.id] = body;

            // Get object group, if object is grouped

            groups[body.group] = groups[body.group] || [];
            groups[body.group].push(body);

            bodies.push(body);
        }

        // Data for physics, controls and widgets

        let extensions = [];

        let xData = entitiesData[1]; 
        let xDataParts = xData.split("|");

        if(xData) {
            for(let i = 0; i < xDataParts.length; i++) {
                extensions.push(decodeExtensions(xDataParts[i]));
            }    
        }

        // Add level data

        this.levels.push({

            data: levelDataStr,

            extensions: extensions,

            music: musicInfo,

            groups: groups,

            gradient: {
                top: dataTypes.decodeColor(envArr[1]),
                bottom: dataTypes.decodeColor(envArr[0])
            },

            background: envArr[2],

            bounds: Number.parseInt(envArr[3]),

            gravity: !!Number.parseInt(envArr[4]),

            motionResistance: !!Number.parseInt(envArr[5]),

            level_size: Number.parseInt(envArr[6]),

            starting_lives: Number.parseInt(envArr[7]),

            max_penalty: Number.parseInt(envArr[8]),

            score_goal: Number.parseInt(envArr[9]),

            time_limit: Number.parseFloat(envArr[10]),

            description: envArr[11],

            bodies: bodies,

            bodyIds: bodyIds

        });

    }
}




module.exports = PixelPhysicsParser;