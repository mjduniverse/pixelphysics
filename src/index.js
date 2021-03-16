/**
 * Constructor for an instance of the emulator
 * @param {*} xmlTree - XML Document tree for the game
 */

function PPGSploderEmulator(xmlTree) {

    this.xmlTree = xmlTree;

}

// Loading module

import load from "./load";
PPGSploderEmulator.prototype.load = load;

