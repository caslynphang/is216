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
        this.add.rectangle(screenCenterX, screenCenterY, 1200, 600, 0x000000).setStrokeStyle(10, 0x02167a)
        this.add.text(screenCenterX - 300, screenCenterY - 150, 'Mash the button!', {font: '64px Courier'});
        this.add.text(screenCenterX - 325, screenCenterY - 100, 'Complete the laps', {font: '64px Courier'});
        const playButton = this.add.image(screenCenterX - 200, screenCenterY + 100, 'playbutton1').setInteractive()
        const exitButton = this.add.image(screenCenterX + 200, screenCenterY + 100, 'exitbutton1').setInteractive()
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