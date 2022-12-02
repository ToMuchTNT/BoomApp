let logo = document.getElementById('logo')
let welcome = document.getElementById('welcome')
let welcomeText = document.getElementById('welcome-text')
let signUp = document.getElementById('sign-up')
let logIn = document.getElementById('log-in')

let action;

function sign_up() {
    action = false
}

if (action) {
    logo.style.display = 'none'
    welcome.style.display = 'none'
    welcomeText.style.display = 'none'
} else {
    logo.style.display = 'inline'
    welcome.style.display = 'inline'
    welcomeText.style.display = 'inline'
}

