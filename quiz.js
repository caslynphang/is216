//import Phaser from "phaser"
export default class quiz extends Phaser.Scene {
    constructor() {
        super("quiz");
    }

    preload(){
        this.load.json('questions', "./Assets/data.json")    
    }


    create() {
        console.log("ran")
        window.mainScene = this.scene.get("MainScene")
        this.school = mainScene.schoolvisited

        console.log(this.school)

        this.conquered = mainScene[this.school.toLowerCase() + 'conquered']
        window.questions = this.cache.json.get("questions")
        this.score = 0
        this.print = this.add.text(0, 0, '');
        this.questioncount = 0
        
        console.log(this.conquered)

        if(this.conquered == false){
            createStartDialog(mainScene, this.school)

        } else {
            mainScene.closeScene("quiz")
        }



    }
}

function genQuestionDialog(mainScene, count){
    if(count == questions[mainScene.school].length){
        if(mainScene.score >= Math.floor(questions[mainScene.school].length/2)){
            this.conquered = true
            createEndDialog(mainScene)
            return
        }
        else{
            createRestartDialog(mainScene)
            return
        }
    }

    mainScene.rexUI.modalPromise(
        // Game object
        createQuestionDialog(mainScene, questions[mainScene.school][count]),
        // Config
        {
            manualClose: true,
        }
    )
}


var createQuestionDialog = function (mainScene, qn){
    var dialog = 
    mainScene.rexUI.add.dialog({
        x: mainScene.scale.width*0.5,
        y: mainScene.scale.height*0.5,

        width: mainScene.scale.width*0.8,
        height: mainScene.scale.height*0.8,

        background: mainScene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x3e2723),

        title: mainScene.add.text(0, 0, 'Score: '+ mainScene.score, {
            fontSize: '24px'
        }),

        content: mainScene.rexUI.add.label({
            background: mainScene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x1b0000),
            text: mainScene.add.text(0, 0, 'Question ' + qn.id, {
                fontSize: '24px'
            }),
            space: {
                left: 15,
                right: 15,
                top: 10,
                bottom: 10
            }
        }).setDraggable(),

        description: mainScene.add.text(0, 0, qn.question, {
            fontSize: '24px'
        }),


        choices: [
            createLabel(mainScene, qn.choices[0], 700, 30),
            createLabel(mainScene, qn.choices[1], 700, 30),
            createLabel(mainScene, qn.choices[2], 700, 30),
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

        actions: [createLabel(mainScene, "Continue", 200, 30)]
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
                    mainScene.score += 1
                }
                this.showAction(0)
                for(var choice of this.getElement('choices')){
                    this.setChoiceEnable(choice, false)
                }
            }

            if(this.getElement('actions').includes(button)){ //condition to check if button pushed is continue button
                dialog.destroy(); //close dialog
                mainScene.questioncount += 1 //increment number of questions that have been displayed
                genQuestionDialog(mainScene, mainScene.questioncount) //generate new dialog

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

var createStartDialog = function (mainScene, school){
    console.log("createStartDialog ran")
    var content = 'Welcome to ' + school +"! Play our quiz to learn more about the school, and get a passing score to 'beat' the school!"
    var dialog = 
        mainScene.rexUI.add.dialog({
        x: mainScene.scale.width*0.5,
        y: mainScene.scale.height*0.5,

        width: mainScene.scale.width*0.8,
        height: mainScene.scale.height*0.8,

        background: mainScene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x3e2723),

        content: mainScene.rexUI.add.label({
            background: mainScene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x1b0000),
            text: mainScene.add.text(0, 0, 'Welcome!', {
                fontSize: '24px'
            }),
            space: {
                left: 15,
                right: 15,
                top: 10,
                bottom: 10
            }
        }),

        
        description: mainScene.add.text(0, 0, content, {
            fontSize: '24px',
            wordWrap:{
                width: mainScene.scale.width * 0.6
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

        actions: [createLabel(mainScene, "Continue", 200, 30)]
    })
        .layout()
        //.drawBounds(this.add.graphics(), 0xff0000)
        
        
    dialog    
        .on('button.click', function (button, groupName, index, event) {
            genQuestionDialog(mainScene, 0)
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

var createEndDialog = function (mainScene){
    var dialog = 
        mainScene.rexUI.add.dialog({
        x: mainScene.scale.width*0.5,
        y: mainScene.scale.height*0.5,

        width: mainScene.scale.width*0.8,
        height: mainScene.scale.height*0.8,

        background: mainScene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x3e2723),

        content: mainScene.rexUI.add.label({
            background: mainScene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x1b0000),
            text: mainScene.add.text(0, 0, 'Congratulations!', {
                fontSize: '24px'
            }),
            space: {
                left: 15,
                right: 15,
                top: 10,
                bottom: 10
            }
        }),

        
        description: mainScene.add.text(0, 0, "You have completed! Your final score is: " + mainScene.score, {
            fontSize: '24px',
            wordWrap:{
                width: mainScene.scale.width * 0.6
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

        actions: [createLabel(mainScene, "Quit", 200, 30)]
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

var createRestartDialog = function (mainScene){
    var dialog = 
        mainScene.rexUI.add.dialog({
        x: mainScene.scale.width*0.5,
        y: mainScene.scale.height*0.5,

        width: mainScene.scale.width*0.8,
        height: mainScene.scale.height*0.8,

        background: mainScene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x3e2723),

        content: mainScene.rexUI.add.label({
            background: mainScene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x1b0000),
            text: mainScene.add.text(0, 0, 'Oh no!', {
                fontSize: '24px'
            }),
            space: {
                left: 15,
                right: 15,
                top: 10,
                bottom: 10
            }
        }),

        
        description: mainScene.add.text(0, 0, "You have not conquered the school! Try Again? ", {
            fontSize: '24px',
            wordWrap:{
                width: mainScene.scale.width * 0.6
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

        actions: [createLabel(mainScene, "Quit", 200, 30), createLabel(mainScene, "Restart", 200, 30)]
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
                mainScene.restart();
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

var createLabel = function (mainScene, text, width, height, backgroundColor) {
    return mainScene.rexUI.add.label({
        background: mainScene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x6a4f4b),

        width: width,
        height: height,

        text: mainScene.add.text(0, 0, text, {
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






