import GameButton from "./buttons.js";

export default class BikeScene extends Phaser.Scene{
    constructor(){
        super('BikeScene')
    }

    preload() {
        this.load.image('cyclingpath', './Assets/Sprites/Unsorted/cycling_path.png')
        this.load.atlas('cycling_sheet', './Assets/Sprites/cycling_sheet.png', './Assets/Sprites/cycling_sheet_atlas.json')
        this.load.animation('cycling_anim','./Assets/Sprites/cycling_sheet_anim.json')
        this.load.atlas('buttons','./Assets/Sprites/btn_atlas.png','./Assets/Sprites/btn_atlas.json');
        this.load.spritesheet('obstacle', './Assets/Sprites/Unsorted/block.png', {frameWidth: 32, frameHeight: 32});
    }

    create() {
        this.divider = 1.5
        this.container = this.add.container()
        this.gameRunning = true
        this.score = 0
        const scene = this;
        this.tweenSpeed = 5300
        this.speed = 4
        var cat1 = this.matter.world.nextCategory();
        var cat2 = this.matter.world.nextCategory();
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        this.cyclingPath = this.add.image(screenCenterX, screenCenterY + this.cameras.main.height / 2, 'cyclingpath')
        this.matter.add.rectangle(screenCenterX - 525, screenCenterY + 400, 20, 100, {isStatic: true})
        this.matter.add.rectangle(screenCenterX + 525, screenCenterY + 400, 20, 100, {isStatic: true})
        this.baseplate = this.matter.add.rectangle(screenCenterX , 1280, 1100, 20, {isStatic: true})
        this.biker = this.matter.add.sprite(screenCenterX, screenCenterY + 400, 'cycling_sheet', 'cycling_idle')
        this.biker.setScale(5)
        this.biker.setBody({
            type: 'rectangle',
            width: 118,
            height: 160,
            frictionAir: 0.5
        })
        this.biker.anims.play('cycle')
        this.biker.setFixedRotation()
        this.cyclingPath.setScale(8)
        this.cyclingPath.setOrigin(0.5, 1)
        var mainScene = this.scene.get('MainScene')
        this.scene.launch('BikeHud')
        this.scene.pause()
        this.btnLeft = this.add.existing(new GameButton(this,1632, 896, 'buttons', 'btnleft'));
        this.btnRight = this.add.existing(new GameButton(this,1768, 896, 'buttons', 'btnright'));
        this.btnLeft.onPressed =()=> {
            this.biker.setVelocityX(-10);
        }
        this.btnRight.onPressed =()=> {
            this.biker.setVelocityX(10);
        }
        function restartScene() {
            scene.scene.restart()
        }
        async function createObstacles() {
            if (scene.gameRunning) {
                const temp = this.matter.add.image(Phaser.Math.Between(600, 1400), 0, 'obstacle', Phaser.Math.Between(0, 1))
                temp.setOnCollideWith(this.baseplate, function(){
                    scene.score++
                    temptween.stop()
                    temp.destroy()
                })
                temp.setScale(4)
                temp.setFixedRotation()
                const temptween = scene.tweens.add({
                    targets: temp,
                    y: 1280,
                    duration: scene.tweenSpeed
                })
                temp.setOnCollideWith(this.biker, function(){
                    scene.biker.anims.stop()
                    scene.time.delayedCall(4000, restartScene, null, this)
                    scene.add.rectangle(screenCenterX, screenCenterY, 1200, 600, 0x000000).setStrokeStyle(10, 0x02167a)
                    scene.add.text(screenCenterX - 250, screenCenterY - 100, 'Obstacle Hit!', {font: '64px Courier'});
                    scene.add.text(screenCenterX - 250, screenCenterY, `Score: ${scene.score}`, {font: '64px Courier'});
                    temptween.stop()
                    scene.gameRunning = false
                })
            }
        }
        this.time.addEvent({ delay: 2000, callback: createObstacles, callbackScope: this, loop: true }); 
    }

    update() {
        let bikerVelocity = new Phaser.Math.Vector2();
        bikerVelocity.normalize();
        this.biker.setVelocity(bikerVelocity.x, bikerVelocity.y);
        this.cyclingPath.y += this.speed
        if(this.cyclingPath.y >= 5700) {
            this.cyclingPath.y = 1080
            this.speed += 2
            this.tweenSpeed /= this.divider
            if (this.divider > 1.2){
                this.divider -= 0.1
            }
            else if(this.divider > 1.01){
                this.divider -= 0.01
            }
        }
        this.biker.update()
        this.btnLeft.update()
        this.btnRight.update()
    }

}