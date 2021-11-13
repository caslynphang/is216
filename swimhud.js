export default class SwimHud extends Phaser.Scene{
    constructor(){
        super('SwimHud')
    }

    preload() {
        this.load.image('playbutton1', 'Assets/Sprites/Unsorted/play_button_2.png')
        this.load.image('exitbutton1', 'Assets/Sprites/Unsorted/exit_button_3.png')
    }

    create() {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        const playButton = this.add.image(screenCenterX - 200, screenCenterY, 'playbutton1').setInteractive()
        const exitButton = this.add.image(screenCenterX + 200, screenCenterY, 'exitbutton1').setInteractive()
        var mainScene = this.scene.get('MainScene')
        exitButton.setScale(4)
        playButton.setScale(4)
        exitButton.on('pointerdown', function(){
            mainScene.closeScene('SwimScene')
            this.scene.stop()
        }, this)
        playButton.on('pointerdown', function(){
            this.scene.resume('SwimScene')
            this.scene.stop()
        }, this)
    }

}