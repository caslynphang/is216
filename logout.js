document.getElementById('logoutBtn').addEventListener('click', logoutUser);

function logoutUser() {
    firebase.auth().signOut().then(() => {
        window.location.href = "feedback.html";
    }).catch(e => {
        console.log(e)
    })
}
