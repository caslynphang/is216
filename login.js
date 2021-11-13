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

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(function () {
            firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
                window.location.href = "game.html";
            }).catch(e => {
                error.innerHTML = "Incorrect Email Address or Password";
            })
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });
}

// LOGIN WITH GOOGLE ACCOUNT
function GoogleLogin() {
    // console.log('Login Btn Call')

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(function () {
            firebase.auth().signInWithPopup(provider).then(res => {
                window.location.href = "game.html";
            }).catch(e => {
                console.log(e)
            })
        })
        .catch(function (error) {
            // Handle Errors here.
            console.log(error);
        });
}
