import GameButton from "./buttons.js";

export default class SwimScene extends Phaser.Scene{
    constructor(){
        super('SwimScene')
    }

    preload() {
        this.load.atlas('pool', './Assets/Sprites/pool.png', './Assets/Sprites/pool_atlas.json');
        this.load.atlas('buttons','./Assets/Sprites/btn_atlas.png','./Assets/Sprites/btn_atlas.json');
        this.load.atlas('swim', './Assets/Sprites/swim.png', './Assets/Sprites/swim_atlas.json')
        this.load.animation('swimming', './Assets/Sprites/swim_anim.json')
    }

    create() {
        this.gameRunning = true
        this.score = 0
        this.maxScore = Phaser.Math.Between(3, 8)
        this.maxTime = 0
        for (let i = 0; i < this.maxScore; i++) {
            this.maxTime += Phaser.Math.FloatBetween(1.5, 2.5)
        }
        this.goLeft = false;
        const scene = this
        var mainScene =  this.scene.get('MainScene')
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        var pool = this.add.sprite(screenCenterX, screenCenterY, 'pool').setScale(4.85);
        this.leftSide = this.matter.add.rectangle(10, screenCenterY, 10, 1000, {isStatic: true})
        this.rightSide = this.matter.add.rectangle(this.cameras.main.width -10, screenCenterY, 10, 1000, {isStatic: true})
        this.swimmer = this.matter.add.sprite(100, screenCenterY + 20, 'swim', 'swimming_1').setScale(5).setBounce(0.3)
        this.btnInteractive = this.add.existing(new GameButton(this, 1700, 896, 'buttons', 'btninteract')).setScale(2)
        this.swimmer.anims.play('swimming')
        this.Laptext = this.add.text(50, 30, `Laps remaining: ${this.maxScore - this.score}` , {font: 'bold 64px Courier'});
        this.Timetext = this.add.text(50, 85, `Time Left:` , {font: 'bold 64px Courier'});
        this.swimmer.setOnCollideWith(this.rightSide, function(){
            if(scene.gameRunning){
                scene.swimmer.flipX = true
                scene.goLeft = true
                scene.score++
                scene.Laptext.setText(`Laps remaining: ${scene.maxScore - scene.score}`)
                if(scene.score == scene.maxScore){
                    scene.gameRunning = false
                    scene.timer.paused = true
                    scene.add.rectangle(screenCenterX, screenCenterY, 1200, 600, 0x000000).setStrokeStyle(10, 0x02167a)
                    scene.add.text(screenCenterX - 60, screenCenterY - 60, 'WIN!!!', {font: '64px Courier'});   
                    scene.time.delayedCall(4000, restartScene, null, this)
                }
            }  
        })
        this.swimmer.setOnCollideWith(this.leftSide, function(){
            if(scene.gameRunning){
                scene.swimmer.flipX = false
                scene.goLeft = false
                scene.score++
                scene.Laptext.setText(`Laps remaining: ${scene.maxScore - scene.score}`)
                if(scene.score == scene.maxScore){
                    scene.gameRunning = false
                    scene.timer.paused = true
                    scene.add.rectangle(screenCenterX, screenCenterY, 1200, 600, 0x000000).setStrokeStyle(10, 0x02167a)
                    scene.add.text(screenCenterX - 60, screenCenterY - 60, 'WIN!!!', {font: '64px Courier'});
                    scene.time.delayedCall(4000, restartScene, null, this)
                }
            }    
        })
        this.btnInteractive.on('pointerdown', function(){
            if(scene.gameRunning) {
                if (this.goLeft){
                    this.swimmer.thrustBack(Phaser.Math.FloatBetween(0.1, 0.2))
                }
                else {
                    this.swimmer.thrust(Phaser.Math.FloatBetween(0.1, 0.2));
                }
            } 
        }, this)
        this.anims.create({
            "key": "pooling",
            "type": "frames",
            "repeat": -1,
            "frameRate": 2,
            "frames": [
                {
                    "key": "pool",
                    "frame": "pool_1"
                },
                {
                    "key": "pool",
                    "frame": "pool_2"
                },
                {
                    "key": "pool",
                    "frame": "pool_3"
                },
                {
                    "key": "pool",
                    "frame": "pool_2"
                }
            ]
            
        })
        pool.anims.play('pooling')
        this.scene.launch('SwimHud')
        this.swimmer.setFixedRotation()
        this.scene.pause()

        function restartScene(){
            scene.scene.restart()
        }

        function theGame() {
            scene.gameRunning = false
            scene.time.delayedCall(4000, restartScene, null, this)
            scene.add.rectangle(screenCenterX, screenCenterY, 1200, 600, 0x000000).setStrokeStyle(10, 0x02167a)
            scene.add.text(screenCenterX - 275, screenCenterY - 50, 'Did not finish!', {font: '64px Courier'});
        }
        this.timer = this.time.addEvent({ delay: this.maxTime*1000, callback: theGame, callbackScope: this});
    }

    update(){
        this.Timetext.setText(`Time Left: ${this.timer.getRemainingSeconds()}`)
    }
}