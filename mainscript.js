// config object that will be passed into phaser.game function
// if you don't understand any of this just think about it as you customizing your sims character
// i also don't understand every component
import MainScene from "./mainscene.js";
const config = {
    width: 1920,
    height: 1080,
    backgroundColour: "#333333",
    type: Phaser.AUTO,
    parent: "game-canvas",
    scene:[MainScene],
    scale: {
        mode:Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    //2D games has x and y axis movement so gravity on y-axis is removed, if not the character will fall off screen!
    physics: {
        default: 'matter',
        matter: {
            debug:false,
            gravity:{y:0}
        }
    },
    // using phasermattercollisionplugin for eventhandling
    plugins: {
        scene:[
            {
                plugin: PhaserMatterCollisionPlugin,
                key: "matterCollision",
                mapping: "matterCollision"
            }
        ]
    }
}

// creating game object with these attributes
new Phaser.Game(config);
