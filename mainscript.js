// config object that will be passed into phaser.game function
// if you don't understand any of this just think about it as you customizing your sims character
// i also don't understand every component
import MainScene from "./MainScene.js";
const config = {
    width: 512,
    height: 512,
    backgroundColour: "#333333",
    type: Phaser.AUTO,
    parent: "game-canvas",
    scene:[MainScene],
    scale: {
        zoom:2,
    },
    //2D games has x and y axis movement so gravity on y-axis is removed, if not the character will fall off screen!
    physics: {
        default: 'matter',
        matter: {
            debug:true,
            gravity:{y:0}
        }
    },
    // using phasermattercollisionplugin for eventhandling
    plugins: {
        scene:[
            {
                plugin: PhaserMatterCollisionPlugin,
                key: 'matterCollision',
                mapping: 'matterCollision'
            }
        ]
    }
}

// creating game object with these attributes
new Phaser.Game(config);
