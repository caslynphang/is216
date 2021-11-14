const jokeText = document.querySelector('.joke-text');

getJoke();

function getJoke() {
  // MAKING AN API REQUEST TO  https://icanhazdadjoke.com/'
  fetch('https://icanhazdadjoke.com/', {
    headers: {
      'Accept': 'application/json'
    }
  }).then(function(response) {
    // CONVERT STRINGIFIED JSON RESPONSE TO JAVASCRIPT OBJECT
    return response.json();
  }).then(function(data) {
    // REPLACE INNERTEXT OF THE JOKE TEXT WITH DATA JOKE
    // EXTRACT THE JOKE 
    const joke = data.joke;
    // do the replacement
    jokeText.innerText = joke;
  }).catch(function(error) {
    // IF THERE IS AN ERROR
    jokeText.innerText = 'Oops! Some error happened :(';

  });
}
