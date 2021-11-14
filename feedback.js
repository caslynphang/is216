// EMAIL VALIDATION
function ValidateEmail() {
    let email = document.getElementById('email').value;
    let emailError = document.getElementById('emailError');

    emailError.innerHTML = "";
    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!expr.test(email)) {
        emailError.innerHTML = "Invalid Email Address.";
    }

}

