export default class BikeHud extends Phaser.Scene{
    constructor(){
        super('BikeHud')
    }

    preload() {
        this.load.image('playbutton', 'Assets/Sprites/Unsorted/play_button.png')
        this.load.image('exitbutton', 'Assets/Sprites/Unsorted/exit_button_2.png')
    }

    create() {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        this.add.rectangle(screenCenterX, screenCenterY, 1200, 600, 0x000000).setStrokeStyle(10, 0x02167a)
        this.add.text(screenCenterX - 300, screenCenterY - 100, 'Dodge Obstacles!', {font: '64px Courier'});
        const playButton = this.add.image(screenCenterX - 200, screenCenterY + 100, 'playbutton').setInteractive()
        const exitButton = this.add.image(screenCenterX + 200, screenCenterY + 100, 'exitbutton').setInteractive()
        var mainScene = this.scene.get('MainScene')
        exitButton.setScale(4)
        playButton.setScale(4)
        exitButton.on('pointerdown', function(){
            mainScene.closeScene('BikeScene')
            this.scene.stop()
        }, this)
        playButton.on('pointerdown', function(){
            this.scene.resume('BikeScene')
            this.scene.stop()
        }, this)
    }

}