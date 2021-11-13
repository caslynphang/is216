import GameButton from "./buttons.js";

export default class HUDScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'HUDScene',
        });

        this.player = null
    }

    init(args) {
        this.player = args.player;
    }

    static preload(scene) {
        scene.load.atlas('buttons','./Assets/Sprites/btn_atlas.png','./Assets/Sprites/btn_atlas.json');
        scene.load.image('logout', './Assets/Sprites/Unsorted/logout.png')
    }

    create() {
        const logout = this.add.image(1890, 100, 'logout').setInteractive()
        logout.setScale(2)
        logout.on('pointerdown', function(){
            window.location.href = "login.html";
        })
        this.btnUp = this.add.existing(new GameButton(this,1700, 800, 'buttons', 'btnup'));
        this.btnLeft = this.add.existing(new GameButton(this,1652, 896, 'buttons', 'btnleft'));
        this.btnDown = this.add.existing(new GameButton(this,1700, 992, 'buttons', 'btndown'));
        this.btnRight = this.add.existing(new GameButton(this, 1748, 896, 'buttons', 'btnright'));
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
        this.btnUp.update();
        this.btnLeft.update();
        this.btnRight.update();
        this.btnDown.update();
    }
}
