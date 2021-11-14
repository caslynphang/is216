//import Phaser from "phaser"
export default class quiz extends Phaser.Scene {
    constructor() {
        // calling scene
        super("quiz");
    }

    preload(){

        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');




    }


    create() {

        window.mainScene = this.scene.get("MainScene")
        this.school = mainScene.schoolvisited
        this.score = 0
        this.print = this.add.text(0, 0, '');
        this.questioncount = 1


        var schoolDoc = db.collection("quiz").doc(this.school.toLowerCase())

        schoolDoc.get()
        .then((doc) =>{
            if(doc.exists){
                window.questions = doc.data()
                createStartDialog(this, this.school)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });


    }
}

function genQuestionDialog(scene, count){
    if(count == Object.keys(questions).length + 1){
        if(scene.score >= Math.ceil(Object.keys(questions).length/2)){
            scene.conquered = true
            createEndDialog(scene)
            return 
        }
        else{
            createRestartDialog(scene)
            return
        }
    }

    var curr = "q" + String(count)


    scene.rexUI.modalPromise(
        
        createQuestionDialog(scene, questions[curr]),
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

    var answered = false
        
    dialog    
        .hideAction(0)
        .on('button.click', function (button, groupName, index, event) {
            if(this.getElement('choices').includes(button)){ //check if button is a choice button
                if(index == qn.answer){
                    answered = true
                    scene.score += 1
                    button.getElement('background').setStrokeStyle(2, 0x00FF00);
                } else {
                    answered = true
                    button.getElement('background').setStrokeStyle(2, 0xFF0000);
                }
            }

            this.showAction(0)
            for(var choice of this.getElement('choices')){
                this.setChoiceEnable(choice, false)
            }
            

            if(this.getElement('actions').includes(button)){ //condition to check if button pushed is continue button
                dialog.destroy(); //close dialog
                scene.questioncount += 1 //increment number of questions that have been displayed
                genQuestionDialog(scene, scene.questioncount) //generate new dialog

            }

        }, this)
        .on('button.over', function (button, groupName, index) {
            if(this.getElement('choices').includes(button) && index == qn.answer && answered == true){
                button.getElement('background').setStrokeStyle(2, 0x00FF00);
            } else if(this.getElement('choices').includes(button) && index != qn.answer && answered == true) {
                button.getElement('background').setStrokeStyle(2, 0xFF0000);
            } else {
            button.getElement('background').setStrokeStyle(1, 0xffffff);
            }
        })
        .on('button.out', function (button, groupName, index) {
            if(this.getElement('choices').includes(button) && index == qn.answer && answered == true){
                button.getElement('background').setStrokeStyle(2, 0x00FF00);
            } else if(this.getElement('choices').includes(button) && index != qn.answer && answered == true) {
                button.getElement('background').setStrokeStyle(2, 0xFF0000); 
            } else {
            button.getElement('background').setStrokeStyle();
            }
        })




    return dialog


        
}

var createStartDialog = function (scene, school){
    var content = 'Welcome to ' + school +"! Play our quiz to learn more about the school! After answering, you can hover over the choices to find out the correct answer!"
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
            genQuestionDialog(scene, 1)
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

        
        description: scene.add.text(0, 0, "You did not pass the quiz! Try Again? ", {
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






