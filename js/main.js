var instance = M.Tabs.init(document.querySelector('.tabs'), {
    duration: 1000
})


const signUpBtn = document.querySelector('.sign__up-btn')
const signInBtn = document.querySelector('.sign__in-btn')

const upInputs = document.querySelectorAll('#sign-up input')
const inINputs = document.querySelectorAll('#sign-in input')

//Data
let url = 'https://618e8c7050e24d0017ce1360.mockapi.io/api/v1/users'
async function getData() {
    const res = await fetch(url)
    const data = await res.json()
    return data
}



function inValid() {
    const fname = document.forms['form']['first_name'].value
    if (fname === "") {
        document.forms['form']['first_name'].classList.add('invalid')
        signUpBtn.classList.add('disabled')
        return false
    }
    const lname = document.forms['form']['last_name'].value
    if (lname === "") {
        signUpBtn.classList.add('disabled')
        document.forms['form']['last_name'].classList.add('invalid')
        return false
    }
    const email = document.forms['form']['email'].value
    if (!email.includes('@') || email === "") {
        signUpBtn.classList.add('disabled')
        document.forms['form']['email'].classList.add('invalid')
        return false
    } else {
        document.forms['form']['email'].classList.remove('invalid')
        document.forms['form']['email'].classList.add('valid')
        signUpBtn.classList.remove('disabled')
    }

    const login = document.forms['form']['login'].value
    if (login === "" || login.length < 5) {
        signUpBtn.classList.add('disabled')
        document.forms['form']['login'].classList.add('invalid')
        return false
    }
    const pass = document.forms['form']['password'].value
    if (pass === "" || pass.length < 5) {
        signUpBtn.classList.add('disabled')
        document.forms['form']['password'].classList.add('invalid')
        return false
    }
    signUpBtn.classList.remove('disabled')
    return true
}

upInputs.forEach(input => {
    input.addEventListener('blur', e => {
        inValid()
    })
})


signUpBtn.addEventListener('click', postUser)

async function postUser() {
    const user = {
        fname: document.forms['form']['first_name'].value.toLowerCase(),
        lname: document.forms['form']['last_name'].value.toLowerCase(),
        email: document.forms['form']['email'].value.toLowerCase(),
        login: document.forms['form']['login'].value.toLowerCase(),
        pass: document.forms['form']['password'].value.toLowerCase()
    }
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
                'charset': 'utf-8'
            }
        });
    } catch (error) {
        console.error('Ошибка:', error);
    }
    upInputs.forEach(input => {
        input.value = ""
        input.classList.remove('valid')
    })
}





const logUp = document.getElementById('sign__in-email')
const passUp = document.getElementById('sign__in-password')

const successful = document.querySelector('.successful')
const unsuccessful = document.querySelector('.unsuccessful')

let login = false;
async function getUser() {
    const data = await getData()

    data.forEach((user, index) => {

        const logValue = logUp.value.toLowerCase()
        const passValue = passUp.value.toLowerCase()

        if (user.login.toLowerCase() === logValue && user.pass.toLowerCase() === passValue) {
            login = true
        }
    });
    if (login) {
        setTimeout(function() {
            successful.classList.add('active')
        }, 500)
        setTimeout(function() {
            successful.classList.remove('active')
        }, 3000)
        console.log(login)
    } else {
        unsuccessful.classList.add('active')
        setTimeout(function() {
            unsuccessful.classList.remove('active')
        }, 2000)
          logUp.value = ""
          passUp.value = ""
          passUp.classList.remove('invalid')
          logUp.classList.remove('valid')
    }
    logUp.value = ""
    passUp.value = ""
    logUp.classList.remove('valid')
    passUp.classList.remove('valid')
    login = false

}

signInBtn.addEventListener('click', getUser)