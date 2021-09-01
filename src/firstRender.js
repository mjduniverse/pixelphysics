const dictionary = require("./dictionary.json");

function firstRender() {

    this.renderGradient(); 

    this.renderExtensions();

    for(let i = 0; i < this.phsim.objUniverse.length; i++) {

        let currentObj = this.phsim.objUniverse[i];
        let currentObjData2 = this.currentLevel.bodyIds[currentObj.name];

        if(currentObjData2 && currentObjData2.builtInGraphicOnly) {
            this.phsim.phRender.dynamicRenderDraw({
                ...currentObj,
                strokeStyle: "white",
                lineWidth: 1
            });
        }

        else {
            this.phsim.phRender.dynamicRenderDraw(currentObj);
        }

        if(currentObjData2 && currentObjData2.built_in_graphic) {
            this.phsim.ctx.textAlign = "center";
            this.phsim.ctx.fillStyle = "white";
            this.phsim.ctx.fillText(dictionary.built_in_graphics[currentObjData2.built_in_graphic],currentObj.matter.position.x,currentObj.matter.position.y);
        }
        
    }

    this.renderGameData();

}

module.exports = firstRender;