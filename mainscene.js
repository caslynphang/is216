// MainScene class inherits from Phaser.Scene Class
import HUDScene from "./hudscene.js";
import Player from "./player.js";

export default class MainScene extends Phaser.Scene {
    constructor() {
        // calling scene
        super("MainScene");
    }

    preload() {
        // prelaoding images and animations
        Player.preload(this);
        HUDScene.preload(this);
        this.load.image('concourse', './Assets/Sprites/concoursetilemap.png');
        this.load.image('arrows', './Assets/Sprites/arrow.png');
        this.load.tilemapTiledJSON('map','./Assets/Sprites/mainmap.json');
        this.load.scenePlugin('AnimatedTiles', 'https://raw.githubusercontent.com/nkholski/phaser-animated-tiles/master/dist/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
    }


    create(){
        // conquered attribute
        this.sisconquered = false
        this.soeconquered = false
        this.sobconquered = false
        this.soaconquered = false
        // transfering school data 
        this.schoolvisited = null
        //to see which scene is currently open
        this.currentOpenScene = null
        //a boolean controlling if a overlay scene is in play
        this.popUp = false
        //sensor list
        this.iZoneArr = []

        const {Body,Bodies} = Phaser.Physics.Matter.Matter;
        const map = this.make.tilemap({key: 'map'});

        //creating sensors from tiled object layer
        const iZone = map.objects[2].objects;
        for (let zone of iZone) {
            //dont need to set static as it is a sensor, no rigidbody/ physics will appply to it
            let temp = this.matter.add.rectangle(zone.x + zone.width/2, zone.y + zone.height/2, zone.width, zone.height, {isSensor: true})
            //this layer will only collide with player category, == 1, if not there will be constant collisions with world border
            temp.collisionFilter.mask = 1
            //adding sensor object into arr
            this.iZoneArr.push(temp)
        }

        //linking sensor objects to escalator variables
        this.escalatorUp = this.iZoneArr[0]
        this.escalatorDown = this.iZoneArr[1]
        this.danceZone = this.iZoneArr[2]
        this.bikeZone = this.iZoneArr[3]
        this.swimZone = this.iZoneArr[4]
        this.fishZone = this.iZoneArr[5]
        this.sobZone = this.iZoneArr[6]
        this.soaZone = this.iZoneArr[7]
        this.sisZone = this.iZoneArr[8]
        this.soeZone = this.iZoneArr[9]
        this.schoolZone = this.iZoneArr[10]
        this.quizZone = this.iZoneArr[11]

        const startZones = map.objects[0].objects;
        this.sisStartx = startZones[0].x;
        this.sisStarty = startZones[0].y;
        this.soeStartx = startZones[1].x;
        this.soeStarty = startZones[1].y;
        this.sobStartx = startZones[4].x;
        this.sobStarty = startZones[4].y;
        this.soaStartx = startZones[3].x;
        this.soaStarty = startZones[3].y;
        this.schoolStartx = startZones[5].x;
        this.schoolStarty = startZones[5].y;
        const collisionPoints = map.objects[1].objects;
        for (let collisionPoint of collisionPoints) {
            let temp = this.matter.add.rectangle(collisionPoint.x + collisionPoint.width/2, collisionPoint.y + collisionPoint.height/2, collisionPoint.width, collisionPoint.height);
            Body.setStatic(temp, true)
            temp.collisionFilter.category = 2
        }

        //loading tilemap
        const ground = map.addTilesetImage('concoursetilemap','concourse');
        const playerFront = map.addTilesetImage('concoursetilemap', 'concourse');
        const arrow = map.addTilesetImage('arrow', 'arrows')
        const playerBack = map.addTilesetImage('concoursetilemap', 'concourse');
        const groundLayer = map.createLayer('ground',ground);
        const playerFrontLayer = map.createLayer('playerFront', playerFront);
        const playerBackLayer = map.createLayer('playerBack', [playerBack,arrow]).setDepth(1);
        this.animatedTiles.init(map);

        // assigning player object to a physic
        this.player = new Player({scene:this,x:this.soaStartx,y:this.soaStarty,texture:'character',frame:'male_1'});
        

        // printing sprite onto screen
        this.scene.launch('HUDScene', {player: this.player});
        this.cameras.main.startFollow(this.player);
        this.cameras.main.zoom = 3;    
    }

    // close scene function will be used to close minigames
    closeScene(scene) {
        this.scene.stop(scene)
        this.scene.resume()
    }

    
    update() {
        this.player.update();  
        // checks if player coords in hitbox
        if(this.matter.containsPoint(this.escalatorUp, this.player.x, this.player.y)){
            this.player.setVelocityY(-1)
        }
        else if(this.matter.containsPoint(this.escalatorDown, this.player.x, this.player.y)){
            this.player.setVelocityY(1)
        }
        else if(this.matter.containsPoint(this.danceZone, this.player.x, this.player.y) && this.popUp == false){
            this.popUp = true
            this.scene.launch('DanceScene')
            this.scene.pause()
        }
        else if(this.matter.containsPoint(this.bikeZone, this.player.x, this.player.y) && this.popUp == false){
            this.popUp = true
            this.scene.launch('BikeScene')
            this.scene.pause()
        }
        else if(this.matter.containsPoint(this.swimZone, this.player.x, this.player.y) && this.popUp == false){
            this.popUp = true
            this.scene.launch('SwimScene')
            this.scene.pause()
        }
        else if(this.matter.containsPoint(this.quizZone, this.player.x, this.player.y) && this.popUp == false){
            this.popUp = true
            this.scene.launch('quiz')
            this.scene.pause()
        }
        else if(this.matter.containsPoint(this.sobZone, this.player.x, this.player.y)){
            this.player.x = this.schoolStartx
            this.player.y = this.schoolStarty
            this.schoolvisited = 'SOB'
            this.cameras.main.fadeIn(4000)
        }
        else if(this.matter.containsPoint(this.soaZone, this.player.x, this.player.y)){
            this.player.x = this.schoolStartx
            this.player.y = this.schoolStarty
            this.schoolvisited = 'SOA'
            this.cameras.main.fadeIn(4000)
        }
        else if(this.matter.containsPoint(this.sisZone, this.player.x, this.player.y)){
            this.player.x = this.schoolStartx
            this.player.y = this.schoolStarty
            this.schoolvisited = 'SIS'
            this.cameras.main.fadeIn(4000)
        }
        else if(this.matter.containsPoint(this.soeZone, this.player.x, this.player.y)){
            this.player.x = this.schoolStartx
            this.player.y = this.schoolStarty
            this.schoolvisited = 'SOE'
            this.cameras.main.fadeIn(4000)
        }
        else if(this.matter.containsPoint(this.sobZone, this.player.x, this.player.y)){
            this.player.x = this.schoolStartx
            this.player.y = this.schoolStarty
            this.schoolvisited = 'SOB'
            this.cameras.main.fadeIn(4000)
        }
        else if(this.matter.containsPoint(this.schoolZone, this.player.x, this.player.y)){
            this.player.x = this.schoolStartx
            this.player.y = this.schoolStarty
            if (this.schoolvisited == 'SOB'){
                this.player.x = this.sobStartx
                this.player.y = this.sobStarty
            }
            else if (this.schoolvisited == 'SOA'){
                this.player.x = this.soaStartx
                this.player.y = this.soaStarty
            }
            else if (this.schoolvisited == 'SIS'){
                this.player.x = this.sisStartx
                this.player.y = this.sisStarty
            }
            else if (this.schoolvisited == 'SOE'){
                this.player.x = this.soeStartx
                this.player.y = this.soeStarty
            }
            this.cameras.main.fadeIn(4000)
        }
        


        if(!this.matter.containsPoint(this.danceZone, this.player.x, this.player.y) && !this.matter.containsPoint(this.quizZone, this.player.x, this.player.y) && !this.matter.containsPoint(this.swimZone, this.player.x, this.player.y) && !this.matter.containsPoint(this.bikeZone, this.player.x, this.player.y) && this.popUp == true){
            this.popUp = false
        }
        
    }
}
