export default class GameButton extends Phaser.GameObjects.Image
{
    constructor(scene, x, y, texture, frame = null)
    {
        super(scene, x, y, texture, frame);

        this.setInteractive();
        this.isDown = false;

        this.onPressed = null;
        this.onReleased = null;

        this.on('pointerdown', () => { this.isDown = true; });
        this.on('pointerup', () => { this.pointerUp(); });
        this.on('pointerout', () => { this.pointerUp(); });
    }

    pointerUp()
    {
        this.isDown = false;
        if(this.onReleased != null) this.onReleased();
    }

    update()
    {
        if(this.isDown && this.onPressed != null) this.onPressed();
    }
}