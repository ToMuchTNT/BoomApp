
let username, password;

function getDetails () {
    let form = document.getElementById('signup-form')
    console.log(form[0].value, form[1].value)
    return [form[0].value, form[1].value]
}

username = getDetails[0]
password = getDetails[1]

