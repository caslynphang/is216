// MainScene class inherits from Phaser.Scene Class
export default class MainScene extends Phaser.Scene {
    constructor() {
        // calling scene
        super("MainScene");
    }

    preload() {
        console.log("preload");
    }


    create(){
        console.log("create");
        // assigning player object to a physic
        this.player = new Phaser.Physics.Matter.Sprite(this.matter.world);
        // assigning keyboard inputs to variables
        this.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
        })
    }

    update(){
        console.log("update");
        // speed of player, subject to change
        const speed = 2.5;
        // assigning velocity to a 2D vector
        let playerVelocity = new Phaser.Math.Vector2();
        // assigning keyboard inputs to playerVelocity.x and playerVelocity.y
        if(this.inputKeys.left.isDown) {
            playerVelocity.x = -1;
        }
        else if (this.inputKeys.right.isDown) {
            playerVelocity.x = 1;
        }
        if(this.inputKeys.up.isDown) {
            playerVelocity.y = -1;
        }
        else if (this.inputKeys.down.isDown) {
            playerVelocity.y = 1;
        }
        // changing 2d Vector movement such that its constant to 1 and only direction matters
        playerVelocity.normalize();
        // scaling playerVelocity with speed
        playerVelocity.scale(speed);
        // setting player velocity based on input
        this.player.setVelocity(playerVelocity.x, playerVelocity.y);
    }
}