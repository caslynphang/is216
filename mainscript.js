// config object that will be passed into phaser.game function
// if you don't understand any of this just think about it as you customizing your sims character
// i also don't understand every component
import BikeScene from "./biking.js";
import BikeHud from "./bikinghud.js";
import HUDScene from "./hudscene.js";
import MainScene from "./mainscene.js";
import DanceScene from "./simon.js";
import SwimScene from "./swim.js";
import SwimHud from "./swimhud.js";
import quiz from "./quiz.js"

const config = {
    width: 1980,
    height: 1080,
    backgroundColour: "#333333",
    type: Phaser.AUTO,
    parent: "game-canvas",
    scene:[MainScene, HUDScene, DanceScene, BikeScene, BikeHud, SwimScene, SwimHud, quiz],
    scale: {
        
        mode:Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    //2D games has x and y axis movement so gravity on y-axis is removed, if not the character will fall off screen!
    physics: {
        default: 'matter',
        matter: {
            debug:true,
            gravity:{y:0}
        }
    },
}

// creating game object with these attributes
new Phaser.Game(config);
