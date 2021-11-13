document.getElementById('loginBtn').addEventListener('click', loginUser);
document.getElementById('googleLoginBtn').addEventListener('click', GoogleLogin);

let provider = new firebase.auth.GoogleAuthProvider();


// EMAIL VALIDATION
function ValidateEmail() {
    let email = document.getElementById('email').value;
    let emailError = document.getElementById('emailError');

    emailError.innerHTML = "";
    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!expr.test(email)) {
        emailError.innerHTML = "Invalid Email Address.";
    }

    if (email.length == 0) {
        emailError.innerHTML = "Please enter an Email Address."
    }
}

// LOGIN USING EMAIL ADDRESS AND PASSWORD CREATED BEFORE
function loginUser() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let error = document.getElementById('error');

    if (email.length == 0) {
        emailError.innerHTML = "Please enter an Email Address."
    }

    if (password == 0) {
        passwordError.innerHTML = "Please enter the Password."
    }

    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        
    }).catch(e => {
        error.innerHTML = "Incorrect Email Address or Password";
    })

}

// LOGIN WITH GOOGLE ACCOUNT
function GoogleLogin() {
    console.log('Login Btn Call')
    firebase.auth().signInWithPopup(provider).then(res => {
        window.location.href = "game.html"; // NEED TO CHANGE TO INDEX.HTML
    }).catch(e => {
        console.log(e)
    })
}

// STATE OF THE USER
firebase.auth().onAuthStateChanged(user => {
    if (user) { // CHECK IF THE USER IS EXIST 
        
    } else { // USER IS SUCCESSFULLY CREATED 

    }
})
