function incrementLevel() {

    var self = this;

    return new Promise(function(resolve,reject){

        if(self.levels[self.currentLevelIndex + 1]) {
            setTimeout(function(){

                self.setLevel(self.levels[self.currentLevelIndex + 1]);

                self.phsim.gotoSimulationIndex(self.phsim.simulationIndex + 1).then(function(){
                    self.firstRender();
                    resolve();
                });

            },1000);
        }

        else {
            reject()
        }
        
    }).catch(function(o){
        console.error(o)
    });

}

module.exports = incrementLevel;