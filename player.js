export default class Player extends Phaser.Physics.Matter.Sprite {
    constructor(data) {
        let {scene,x,y,texture,frame} = data;
        super(scene.matter.world,x,y,texture,frame);
        this.scene.add.existing(this);

        const {Body,Bodies} = Phaser.Physics.Matter.Matter;
        var playerCollider =  Bodies.circle(this.x,this.y,10,{isSensor:false,label:'playerCollider'});
        var playerSensor =  Bodies.circle(this.x,this.y,16,{isSensor:true,label:'playerSensor'});
        const compoundBody = Body.create({
            parts:[playerCollider,playerSensor],
            frictionAir: 0.15
        });
        this.setExistingBody(compoundBody);
        this.setFixedRotation();
    }

    static preload(scene) {
        // preloading atlas and animations
        scene.load.atlas('character','./Assets/Sprites/character_atlas.png','./Assets/Sprites/character_atlas.json');
        scene.load.animation('character_anim','./Assets/Sprites/character_anim.json')
    }

    get velocity() {
        return this.body.velocity;
    }



    update(){
        // speed of player, subject to change
        const speed = 2.5;
        // assigning velocity to a 2D vector
        let playerVelocity = new Phaser.Math.Vector2();
        // changing 2d Vector movement such that its constant to 1 and only direction matters
        playerVelocity.normalize();
        // scaling playerVelocity with speed
        playerVelocity.scale(speed);
        // setting player velocity based on input
        this.setVelocity(playerVelocity.x, playerVelocity.y);
    }
}