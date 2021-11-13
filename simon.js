const TINT_DIM = 0x666666;
const TINT_NORMAL = 0xffffff;

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}



// add export default class..
export default class DanceScene extends Phaser.Scene {
    constructor() {
        super('DanceScene');
    }
    
    preload() {
        const color = new Phaser.Display.Color(255,255,255);

        this.load.image('dancefloor', 'Assets/Sprites/Unsorted/dancefloor.png')
        this.load.image('exit', 'Assets/Sprites/Unsorted/exit_button.png')
        this.load.image('restart', 'Assets/Sprites/Unsorted/restart_button.png')
        this.load.spritesheet("item", "Assets/Sprites/dance.png", {
            frameWidth: 128,
            frameHeight: 128,
        });

        for (let i = 0; i < 6; i++) {
            this.load.audio(`note-${i}`, [`Assets/sounds/note-${i}.mp3`]);
        }
    }

    create() {
        var mainScene = this.scene.get('MainScene')
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        let scoreText;
        let score = 0;
        let pattern = [];
        let isAcceptingInput = false;
        let lastInputPressed = null;

        const backgroundRec = this.add.image(screenCenterX, screenCenterY, 'dancefloor')
        backgroundRec.setScale(20)
        backgroundRec.setTint(TINT_DIM)
        const scene = this;
        const text = this.add.text(10, 10, "Tap the Sprite", {
            font: "32px Courier",
            fill: "#FFFFFF",
        });
        scoreText = this.add.text(10, 40, 'Score: 0', { 
            font: "32px Courier",
            fill: "#FFFFFF", });


        const buttons = [];
        const sounds = [];

        function handlePointerDown(i) {
            return function (pointer) {
                if (isAcceptingInput) {
                    flashButton(i);
                    lastInputPressed = i;
                }
            };
        }

        function appendPattern() {
            const i = Math.floor(Math.random() * 6);
            pattern.push(i);
        }

        async function flashButton(i) {
            const duration = 200;
            const item = buttons[i];
            const note = sounds[i];

            note.play();
            item.setTint(TINT_NORMAL);
            await sleep(duration);
            item.setTint(TINT_DIM);
        }


        function createButtons() {
            const offset = { x: screenCenterX - 375, y: screenCenterY - 160};
            const size = { width: 160, height: 160 };
            const gap = 200;
            const itemsPerRow = 3;

            for (let i = 0; i < 6; i++) {
                const posX = offset.x + (size.width + gap) * (i % itemsPerRow);
                const posY = offset.y + (size.height + gap) * Math.floor(i / itemsPerRow);
                const item = scene.add.sprite(posX, posY, "item", i % 6).setInteractive();
                item.setScale(2)

                item.setTint(TINT_DIM);
                item.on("pointerdown", handlePointerDown(i));
                buttons.push(item);

                const note = scene.sound.add(`note-${i}`);
                sounds.push(note);
            }
        }

        async function playPattern() {
            const DELAY = 500;
            await sleep(DELAY);
            for (const i of pattern) {
                await flashButton(i);
                await sleep(DELAY);
            }
        }

        async function getPlayerInput() {
            isAcceptingInput = true;
            lastInputPressed = null;
            while (lastInputPressed == null) {
                await sleep(500);
            }
            isAcceptingInput = false;
            return lastInputPressed;
        }

        async function gameLoop() {
            while (true) {
                appendPattern();
                text.setText("Pay attention!");
                await playPattern();

                text.setText("Your turn!");
                for (const answer of pattern) {
                    const input = await getPlayerInput();
                    if (input !== answer) {
                        text.setText("You lose!");
                        const exitButton = scene.add.image(scene.cameras.main.width - 100, 128, 'exit').setInteractive()
                        exitButton.setScale(2)
                        exitButton.setTint(TINT_DIM)
                        exitButton.on('pointerdown', function(){
                            mainScene.closeScene('DanceScene')
                        })
                        const restartButton = scene.add.image(scene.cameras.main.width - 200, 128, 'restart').setInteractive()
                        restartButton.setScale(2)
                        restartButton.setTint(TINT_DIM)
                        restartButton.on('pointerdown', function(){
                            scene.scene.restart()
                        })
                        return false; // lose
                    }
                    score += 1;
                    scoreText.setText('Score: ' + score);
                }
            }
        }

        

        createButtons();
        gameLoop();    
    }
    
    
}

