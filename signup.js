document.getElementById('signup').addEventListener('click', signUpUser);
document.getElementById('googleLoginBtn').addEventListener('click', GoogleLogin);

let provider = new firebase.auth.GoogleAuthProvider();

// EMAIL VALIDATION
function validateEmail() {
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

// PASSWORD VALIDATION
function validatePassword() {
    let password = document.getElementById('password').value;
    let passwordError = document.getElementById('passwordError');

    passwordError.innerHTML = "";

    // PASSWORD CONSISTS WHITESPACES
    const isWhitespace = /^(?=.*\s)/;
    if (isWhitespace.test(password)) {
        passwordError.innerHTML = "Password must not contain Whitespaces.";
    }

    // AT LEAST ONE UPPERCASE CHARACTER
    const isContainsUppercase = /^(?=.*[A-Z])/;
    if (!isContainsUppercase.test(password)) {
        passwordError.innerHTML = "Password must have at least one Uppercase Character.";
    }

    // AT LEAST ONE LOWERCASE CHARACTER
    const isContainsLowercase = /^(?=.*[a-z])/;
    if (!isContainsLowercase.test(password)) {
        passwordError.innerHTML = "Password must have at least one Lowercase Character.";
    }

    // AT LEAST ONE DIGIT
    const isContainsNumber = /^(?=.*[0-9])/;
    if (!isContainsNumber.test(password)) {
        passwordError.innerHTML = "Password must contain at least one Digit.";
    }

    // AT LEAST ONE SPECIAL SYMBOL
    const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
    if (!isContainsSymbol.test(password)) {
        passwordError.innerHTML = "Password must contain at least one Special Symbol.";
    }

    //  8 - 16 CHARACTERS LONG
    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(password)) {
        passwordError.innerHTML = "Password must be 8-16 Characters Long.";
    }
}

// CONFIRM PASSWORD VALIDATION
function validateConfirmPassword() {
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    let confirmPasswordError = document.getElementById('confirmPasswordError');

    confirmPasswordError.innerHTML = "";

    if (password != confirmPassword) {
        confirmPasswordError.innerHTML = "Password Confirmation does not match.";
    }
}

// INPUT BECOME BLANK AFTER USER CLICK ON SIGN UP BTN
function reset() {
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";
    document.getElementById('confirmPassword').value = "";

}

// CREATING AN ACCOUNT USING EMAIL AND PASSWORD
function signUpUser() {
    // GETTING VALUE OF EMAIL AND PASSWORD
    let email = document.getElementById('email').value;
    let emailError = document.getElementById('emailError');
    let password = document.getElementById('password').value;
    let passwordError = document.getElementById('passwordError');
    let error = document.getElementById('error');

    if (email.length == 0) {
        emailError.innerHTML = "Please enter an Email Address. "
    }

    if (password == 0) {
        passwordError.innerHTML = "Please enter the Password."
    }


    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(function () {
            // CREATING USER & ADDING IT INTO THE FIREBASE
            firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
                firebase.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        window.location.href = "game.html";
                    } else {

                    }
                });
            }).catch(e => {
                error.innerHTML = "Sign Up unsuccessful. Please try again."
                reset();
                console.log(e);
            });

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
                firebase.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        window.location.href = "game.html";
                    } else {
                        
                    }
                });
            }).catch(e => {
                console.log(e)
            })
        })
        .catch(function (error) {
            // Handle Errors here.
            console.log(error);
        });
}
