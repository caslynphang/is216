// WILL NEED TO CHANGE 
function preload() {
    this.load.image("background", "image/gotBg.png");
    this.load.image("character", "image/tyrion.png");
    this.load.image("dodge", "image/dagger.png");
    this.load.image("collect", "image/cups.png");
}

const gameState = { 
    score: 0
};


function create() {

    // background - scrolling/movement of the background will be created in the update function
    platforms = this.add.tileSprite(208, 300, 416, 600, 'background');
    
    // player
    gameState.player = this.physics.add.sprite(200, 471, 'character');
    gameState.player.setCollideWorldBounds(true);
    this.physics.add.collider(gameState.player, platforms);

    // keyboard movement
    gameState.cursors = this.input.keyboard.createCursorKeys();

    // collectible (cups) 
    const collectibles = this.physics.add.group({
        key: 'item'
    });
    
    // genarate collectibles
    function collectiblesGenerate() {
        const xCoord = Math.random() * 450;
        collectibles.create(xCoord, 10, 'collect');
    }

    // movement of the collectible (dropping of it)
    const collectiblesGenerateLoop = this.time.addEvent({
        delay: 2500,    // NEED TO CHANGE
        callback: collectiblesGenerate,
        callbackScope: this,
        loop: true
    });

    // scoreboard - style and position
    gameState.scoreText = this.add.text(280,20, 'Score: 0', { 
        fontSize: '20px',
        fill: '#fff'
    });

    // collection of collectible - after colliding with the player, score will increase
    function collectItems (player, item){
        item.disableBody(true, true);
        gameState.score += 10;  // MIGHT NEED TO CHANGE 
        gameState.scoreText.setText('Score: ' + gameState.score);
    }

    // when collectible collide with the player
    this.physics.add.overlap(gameState.player, collectibles, collectItems, null, this)

    // obstacles 
    const dodge = this.physics.add.group();

    // generate obstacles
    function dodgeGenerate() {
        const xCoord = Math.random() * 700; 
        dodge.create(xCoord, 20, 'dodge'); 
    }

    // movement of the obstacles (dropping of it)
    const dodgeGenerateLoop = this.time.addEvent({
        delay: 2650,    // NEED TO CHANGE
        callback: dodgeGenerate,
        callbackScope: this, 
        loop:true
    });

    // game over - stop the movement of collectible, obstacles, player
    this.physics.add.collider(gameState.player, dodge, () => {
        dodgeGenerateLoop.destroy();
        collectiblesGenerateLoop.destroy();
        this.physics.pause();
    
        // this.scene.pause();

        this.add.text(140, 240, 'Game Over', { 
            fontSize: '25px',
            fill: "#fff"
        });

        // restart 
        this.add.text(110, 290, 'Click to Restart', { fontSize: '20px', fill: '#fff' });
        this.input.on('pointerup', () =>  {
            console.log("restart");
            gameState.score = 0;
            this.scene.restart();
        });
    });
}

function update() {

    // scrolling/movement of the platforms (background)
    platforms.tilePositionY -= 1; // NEED TO CHANGE THE SPEED

    // keyboard movement
    if (gameState.cursors.left.isDown) {
        gameState.player.setVelocityX(-250);
    } else if (gameState.cursors.right.isDown) {
        gameState.player.setVelocityX(250);
    } else {
        gameState.player.setVelocityX(0); 
    }
}

const config = {
    type: Phaser.AUTO,
    width: 416,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 200 },
        enableBody: true,
      }
    },
    scene: {
      preload,
      create,
      update
    }
  };
  
const game = new Phaser.Game(config);