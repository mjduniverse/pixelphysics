function createDescDiv() {

    var self = this;

    // Description

    var descDiv = document.createElement("div");

    descDiv.style = `position: relative;
    bottom: 387px;
    background: rgba(0,0,0,0.8);
    left: 129px;
    height: 243px;
    color: lightblue;
    border-radius: 10px;
    padding: 20px;
    width: 345px;`

    // Description Text

    var descTxt = document.createElement("p");
    descDiv.appendChild(descTxt);
    this.descTxt = descTxt;

    // Play button

    var playButton = document.createElement("span");
    playButton.className = "ppg-sploder-emulator-play-button";
    playButton.innerText = "Play";

    playButton.style = `float: right;
    background-color: #ffb700;
    color: #000000;
    border-radius: 10px;
    padding: 10px;
    position: absolute;
    bottom: 0px;
    right: 0;
    margin: 20px;
    cursor: pointer;`

    playButton.addEventListener("click",function(){

        self.phsim.play().then(function(){

            self.playing = true;

            self.timeLimitCount = setInterval(function(){
                if(self.playing) {
                    self.currentGame.time--;
                }
            },1000);

            if(self.currentLevel.time_limit) {

                self.timeLimitTimeout = setTimeout(function(){

                    if(self.currentLevel.goal_score) {
                        self.endGame();
                    }
    
                    else {
                        self.incrementLevel();
                    }
    
                },self.currentLevel.time_limit * 1000);

            }

        });

        self.descDiv.style.display = "none";

    })

    descDiv.appendChild(playButton);

    this.descDiv = descDiv;

    return descDiv;

}

module.exports = createDescDiv;