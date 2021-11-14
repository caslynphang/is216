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
        this.load.image('chat', './Assets/Sprites/chat.png');
        this.load.tilemapTiledJSON('map','./Assets/Sprites/mainmap.json');
        this.load.audio('mainbgm', './Assets/sounds/concourse_bgm.mp3')
        this.load.audio('dancebgm', './Assets/sounds/dance_bgm.mp3')
        this.load.audio('schoolbgm', './Assets/sounds/school_bgm.mp3')
        this.load.audio('cyclebgm', './Assets/sounds/cycle_bgm.mp3')
        this.load.audio('swimbgm', './Assets/sounds/swim_bgm.mp3')
        this.load.video('smuvid', './Assets/sounds/smu_vid.mp4', 'loadeddata', false, false);
        this.load.video('whysmu', './Assets/sounds/whysmu.mp4', 'loadeddata', false, false);
        this.load.scenePlugin('AnimatedTiles', 'https://raw.githubusercontent.com/nkholski/phaser-animated-tiles/master/dist/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
    }


    create(){
        // check area
        this.inSchool = false
        // adding video and text
        var vidplay = false
        var video2 = this.add.video(4608, 5129, 'whysmu');
        video2.setLoop(true)
        video2.setDepth(1)
        video2.setScale(0.40)
        video2.setInteractive()
        video2.setVolume(0)
        video2.on('pointerdown', function(){
            if (vidplay) {
                vidplay = false
                video2.setVolume(0)
                this.concoursebgm.resume()
            }
            else {
                vidplay = true
                video2.setVolume(0.5)
                this.concoursebgm.pause()
            }
        },this)
        this.add.text(4486, 5060, 'Click!', {font: '8px Courier', fill: 'black'}).setDepth(1);
        var video = this.add.video(4352, 5129, 'smuvid');
        video.setDepth(1)
        video.setLoop(true)
        video.setScale(0.40)
        video.setInteractive()
        video.setVolume(0)
        video.on('pointerdown', function(){
            if (vidplay) {
                vidplay = false
                video.setVolume(0)
                this.concoursebgm.resume()
            }
            else {
                vidplay = true
                video.setVolume(0.5)
                this.concoursebgm.pause()
            }
        },this)
        video.play()
        video2.play()
        this.add.text(4230, 5060, 'Click!', {font: '8px Courier', fill: 'black'}).setDepth(1);
        
        // adding music
        this.concoursebgm = this.sound.add('mainbgm', {
            mute: false,
            volume: 0.1,
            loop: true,
        })
        this.schoolbgm = this.sound.add('schoolbgm', {
            mute: false,
            volume: 0.1,
            loop: true,
        })
        this.dancebgm = this.sound.add('dancebgm', {
            mute: false,
            volume: 0.1,
            loop: true,
        })
        this.cyclebgm = this.sound.add('cyclebgm', {
            mute: false,
            volume: 0.1,
            loop: true,
        })
        this.swimbgm = this.sound.add('swimbgm', {
            mute: false,
            volume: 0.1,
            loop: true,
        })
        this.concoursebgm.play()
        // conquered attribute
        this.scisconquered = false
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
        const chat = map.addTilesetImage('chat', 'chat')
        const playerBack = map.addTilesetImage('concoursetilemap', 'concourse');
        const groundLayer = map.createLayer('ground',ground);
        const playerFrontLayer = map.createLayer('playerFront', [playerFront,arrow]);
        const playerBackLayer = map.createLayer('playerBack', [playerBack,arrow, chat]).setDepth(1);
        this.animatedTiles.init(map);

        // assigning player object to a physic
        this.player = new Player({scene:this,x:this.sisStartx,y:this.sisStarty,texture:'character',frame:'male_1'});
       
        // printing sprite onto screen
        this.scene.launch('HUDScene', {player: this.player});
        this.cameras.main.startFollow(this.player);
        this.cameras.main.zoom = 3;    
        
    }

    // close scene function will be used to close minigames
    closeScene(scene) {
        this.scene.stop(scene)
        this.scene.resume()
        if (scene == 'DanceScene'){
            this.dancebgm.stop()
        }
        else if (scene == 'BikeScene'){
            this.cyclebgm.stop()
        }
        else if (scene == 'SwimScene'){
            this.swimbgm.stop()
        }
        if (!this.inSchool) {
            this.concoursebgm.resume()
        }   
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
            this.concoursebgm.pause()
            this.dancebgm.play()
        }
        else if(this.matter.containsPoint(this.bikeZone, this.player.x, this.player.y) && this.popUp == false){
            this.popUp = true
            this.scene.launch('BikeScene')
            this.scene.pause()
            this.concoursebgm.pause()
            this.cyclebgm.play()
        }
        else if(this.matter.containsPoint(this.swimZone, this.player.x, this.player.y) && this.popUp == false){
            this.popUp = true
            this.scene.launch('SwimScene')
            this.scene.pause()
            this.concoursebgm.pause()
            this.swimbgm.play()
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
            this.cameras.main.fadeIn(6000)
            this.concoursebgm.pause()
            this.schoolbgm.play()
            this.inSchool = true
        }
        else if(this.matter.containsPoint(this.soaZone, this.player.x, this.player.y)){
            this.player.x = this.schoolStartx
            this.player.y = this.schoolStarty
            this.schoolvisited = 'SOA'
            this.cameras.main.fadeIn(6000)
            this.concoursebgm.pause()
            this.schoolbgm.play()
            this.inSchool = true
        }
        else if(this.matter.containsPoint(this.sisZone, this.player.x, this.player.y)){
            this.player.x = this.schoolStartx
            this.player.y = this.schoolStarty
            this.schoolvisited = 'SCIS'
            this.cameras.main.fadeIn(6000)
            this.concoursebgm.pause()
            this.schoolbgm.play()
            this.inSchool = true
        }
        else if(this.matter.containsPoint(this.soeZone, this.player.x, this.player.y)){
            this.player.x = this.schoolStartx
            this.player.y = this.schoolStarty
            this.schoolvisited = 'SOE'
            this.cameras.main.fadeIn(6000)
            this.concoursebgm.pause()
            this.schoolbgm.play()
            this.inSchool = true
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
            else if (this.schoolvisited == 'SCIS'){
                this.player.x = this.sisStartx
                this.player.y = this.sisStarty
            }
            else if (this.schoolvisited == 'SOE'){
                this.player.x = this.soeStartx
                this.player.y = this.soeStarty
            }
            this.cameras.main.fadeIn(4000)
            this.concoursebgm.resume()
            this.schoolbgm.stop()
            this.inSchool = false
        }
        


        if(!this.matter.containsPoint(this.danceZone, this.player.x, this.player.y) && !this.matter.containsPoint(this.quizZone, this.player.x, this.player.y) && !this.matter.containsPoint(this.swimZone, this.player.x, this.player.y) && !this.matter.containsPoint(this.bikeZone, this.player.x, this.player.y) && this.popUp == true){
            this.popUp = false
        }
        
    }
}
