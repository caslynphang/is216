document.getElementById('logoutBtn').addEventListener('click', logoutUser);

function logoutUser() {
    firebase.auth().signOut().then(() => {
        window.location.href = "login.html";
    }).catch(e => {
        console.log(e)
    })
}