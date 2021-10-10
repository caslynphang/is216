// MainScene class inherits from Phaser.Scene Class
import GameButton from "./buttons.js";
import Player from "./player.js";

export default class MainScene extends Phaser.Scene {
    constructor() {
        // calling scene
        super("MainScene");
    }

    preload() {
        // prelaoding atlas png and json and anim json
        Player.preload(this);
        this.load.atlas('buttons', './Assets/Sprites/btn_atlas.png','./Assets/Sprites/btn_atlas.json');
    }


    create(){
        // assigning player object to a physic
        this.player = new Player({scene:this,x:1000,y:600,texture:'character',frame:'male_1'});
        // printing sprite onto screen
        this.player.setScale(3);
        this.btnUp = this.add.existing(new GameButton(this,1700, 800, 'buttons', 'btnup'));
        this.btnLeft = this.add.existing(new GameButton(this,1604, 896, 'buttons', 'btnleft'));
        this.btnDown = this.add.existing(new GameButton(this,1700, 992, 'buttons', 'btndown'));
        this.btnRight = this.add.existing(new GameButton(this,1796, 896, 'buttons', 'btnright'));
        this.btnInteract = this.add.existing(new GameButton(this,1700, 896, 'buttons', 'btninteract'));
        this.btnUp.onPressed=()=> {
            this.player.setVelocityY(-5);
            this.player.anims.play('walking_back',true);
        }
        this.btnUp.onReleased=()=> {
            this.player.anims.play('idle_back',true);
        }
        this.btnLeft.onPressed =()=> {
            this.player.setVelocityX(-5);
            this.player.anims.play('walking_left',true);
        }
        this.btnLeft.onReleased=()=> {
            this.player.anims.play('idle_left',true);
        }
        this.btnRight.onPressed =()=> {
            this.player.setVelocityX(5);
            this.player.anims.play('walking_right',true);
        }
        this.btnRight.onReleased=()=> {
            this.player.anims.play('idle_right',true);
        }
        this.btnDown.onPressed =()=> {
            this.player.setVelocityY(5);
            this.player.anims.play('walking_forward',true);
        }
        this.btnDown.onReleased=()=> {
            this.player.anims.play('idle_forward',true);
        }


    }
    update() {
        this.player.update();
        this.btnUp.update();
        this.btnLeft.update();
        this.btnRight.update();
        this.btnDown.update();
    }
}
