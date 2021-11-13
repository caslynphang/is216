//import Phaser from "phaser"
export default class quiz extends Phaser.Scene {
    constructor() {
        // calling scene
        super("quiz");
    }

    preload(){
        this.load.json('questions', "./Assets/data.json")    
    }


    create() {
        window.mainScene = this.scene.get("MainScene")
        this.school = mainScene.school
        this.conquered = mainScene.conquered
        window.questions = this.cache.json.get("questions")
        this.score = 0
        this.print = this.add.text(0, 0, '');
        this.questioncount = 0
        
        if(this.conquered == false){
            createStartDialog(this, this.school)
        } else {
            mainScene.close("quiz")
        }



    }
}

function genQuestionDialog(scene, count){
    if(count == questions[scene.school].length){
        if(scene.score >= Math.floor(questions[scene.school].length/2)){
            this.conquered = true
            createEndDialog(scene)
            return
        }
        else{
            createRestartDialog(scene)
            return
        }
    }

    scene.rexUI.modalPromise(
        // Game object
        createQuestionDialog(scene, questions[scene.school][count]),
        // Config
        {
            manualClose: true,
        }
    )
}


var createQuestionDialog = function (scene, qn){
    var dialog = 
        scene.rexUI.add.dialog({
        x: scene.scale.width*0.5,
        y: scene.scale.height*0.5,

        width: scene.scale.width*0.8,
        height: scene.scale.height*0.8,

        background: scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x3e2723),

        title: scene.add.text(0, 0, 'Score: '+ scene.score, {
            fontSize: '24px'
        }),

        content: scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x1b0000),
            text: scene.add.text(0, 0, 'Question ' + qn.id, {
                fontSize: '24px'
            }),
            space: {
                left: 15,
                right: 15,
                top: 10,
                bottom: 10
            }
        }).setDraggable(),

        description: scene.add.text(0, 0, qn.question, {
            fontSize: '24px'
        }),


        choices: [
            createLabel(scene, qn.choices[0], 700, 30),
            createLabel(scene, qn.choices[1], 700, 30),
            createLabel(scene, qn.choices[2], 700, 30),
        ],

        space: {
            title: 25,
            content: 25,
            choice: 15,
            description: 25,
            choices: 100,
            

            left: 25,
            right: 25,
            top: 200,
            
        },

        expand: {
            content: false,
            choices: false,
            description: false,
            title: false  
        },

        actions: [createLabel(scene, "Continue", 200, 30)]
    })
        .layout()
        //.drawBounds(this.add.graphics(), 0xff0000)
        
        
    dialog    
        .hideAction(0)
        .on('button.click', function (button, groupName, index, event) {
            console.log(button)
            console.log("test")
            if(this.getElement('choices').includes(button)){ //check if button is a choice button
                if(index == qn.answer){
                    scene.score += 1
                }
                this.showAction(0)
                for(var choice of this.getElement('choices')){
                    this.setChoiceEnable(choice, false)
                }
            }

            if(this.getElement('actions').includes(button)){ //condition to check if button pushed is continue button
                dialog.destroy(); //close dialog
                scene.questioncount += 1 //increment number of questions that have been displayed
                genQuestionDialog(scene, scene.questioncount) //generate new dialog

            }

        }, this)
        .on('button.over', function (button, groupName, index) {
            button.getElement('background').setStrokeStyle(1, 0xffffff);
        })
        .on('button.out', function (button, groupName, index) {
            button.getElement('background').setStrokeStyle();
        })




    return dialog


        
}

var createStartDialog = function (scene, school){
    var content = 'Welcome to ' + school +"! Play our quiz to learn more about the school, and get a passing score to 'beat' the school!"
    var dialog = 
        scene.rexUI.add.dialog({
        x: scene.scale.width*0.5,
        y: scene.scale.height*0.5,

        width: scene.scale.width*0.8,
        height: scene.scale.height*0.8,

        background: scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x3e2723),

        content: scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x1b0000),
            text: scene.add.text(0, 0, 'Welcome!', {
                fontSize: '24px'
            }),
            space: {
                left: 15,
                right: 15,
                top: 10,
                bottom: 10
            }
        }),

        
        description: scene.add.text(0, 0, content, {
            fontSize: '24px',
            wordWrap:{
                width: scene.scale.width * 0.6
            }
        }),


        space: {
            title: 25,
            content: 25,
            choice: 15,
            description: 25,
            choices: 100,
            

            left: 25,
            right: 25,
            top: 300,
            
        },

        expand: {
            content: false,
            choices: false,
            description: false,
            title: false  
        },

        actions: [createLabel(scene, "Continue", 200, 30)]
    })
        .layout()
        //.drawBounds(this.add.graphics(), 0xff0000)
        
        
    dialog    
        .on('button.click', function (button, groupName, index, event) {
            genQuestionDialog(scene, 0)
            dialog.destroy()
        }, this)
        .on('button.over', function (button, groupName, index) {
            button.getElement('background').setStrokeStyle(1, 0xffffff);
        })
        .on('button.out', function (button, groupName, index) {
            button.getElement('background').setStrokeStyle();
        })
  



    return dialog  
}

var createEndDialog = function (scene){
    var dialog = 
        scene.rexUI.add.dialog({
        x: scene.scale.width*0.5,
        y: scene.scale.height*0.5,

        width: scene.scale.width*0.8,
        height: scene.scale.height*0.8,

        background: scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x3e2723),

        content: scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x1b0000),
            text: scene.add.text(0, 0, 'Congratulations!', {
                fontSize: '24px'
            }),
            space: {
                left: 15,
                right: 15,
                top: 10,
                bottom: 10
            }
        }),

        
        description: scene.add.text(0, 0, "You have completed! Your final score is: " + scene.score, {
            fontSize: '24px',
            wordWrap:{
                width: scene.scale.width * 0.6
            }
        }),


        space: {
            title: 25,
            content: 25,
            choice: 15,
            description: 25,
            choices: 100,
            

            left: 25,
            right: 25,
            top: 300,
            
        },

        expand: {
            content: false,
            choices: false,
            description: false,
            title: false  
        },

        actions: [createLabel(scene, "Quit", 200, 30)]
    })
        .layout()
        //.drawBounds(this.add.graphics(), 0xff0000)
        
        
    dialog    
        .on('button.click', function (button, groupName, index, event) {
            dialog.destroy()
            mainScene.closeScene("quiz")
        }, this)
        .on('button.over', function (button, groupName, index) {
            button.getElement('background').setStrokeStyle(1, 0xffffff);
        })
        .on('button.out', function (button, groupName, index) {
            button.getElement('background').setStrokeStyle();
        })
    return dialog  
}

var createRestartDialog = function (scene){
    var dialog = 
        scene.rexUI.add.dialog({
        x: scene.scale.width*0.5,
        y: scene.scale.height*0.5,

        width: scene.scale.width*0.8,
        height: scene.scale.height*0.8,

        background: scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x3e2723),

        content: scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x1b0000),
            text: scene.add.text(0, 0, 'Oh no!', {
                fontSize: '24px'
            }),
            space: {
                left: 15,
                right: 15,
                top: 10,
                bottom: 10
            }
        }),

        
        description: scene.add.text(0, 0, "You have not conquered the school! Try Again? ", {
            fontSize: '24px',
            wordWrap:{
                width: scene.scale.width * 0.6
            }
        }),


        space: {
            title: 25,
            content: 25,
            choice: 15,
            description: 25,
            choices: 100,
            action: 25,

            left: 25,
            right: 25,
            top: 300,
            
        },

        expand: {
            content: false,
            choices: false,
            description: false,
            title: false  
        },

        actions: [createLabel(scene, "Quit", 200, 30), createLabel(scene, "Restart", 200, 30)]
    })
        .layout()
        //.drawBounds(this.add.graphics(), 0xff0000)
        
        
    dialog    
        .on('button.click', function (button, groupName, index, event) {
            if(button == dialog.getElement("actions")[0]){
                dialog.destroy()
                mainScene.closeScene("quiz")
            }

            else{
                scene.scene.restart();
            }
        }, this)
        .on('button.over', function (button, groupName, index) {
            button.getElement('background').setStrokeStyle(1, 0xffffff);
        })
        .on('button.out', function (button, groupName, index) {
            button.getElement('background').setStrokeStyle();
        })
    return dialog  
}

var createLabel = function (scene, text, width, height, backgroundColor) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x6a4f4b),

        width: width,
        height: height,

        text: scene.add.text(0, 0, text, {
            fontSize: '24px'
        }),

        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
        },
        expand: {
            content: false
        },
        align: 'center'
        
    });

}






