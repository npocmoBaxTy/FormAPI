const loginReg = document.querySelector('.loginReg')
const passReg = document.querySelector('.passReg')
const regBtn = document.querySelector('.regBtn')
const regEmail = document.querySelector('.regEmail')


const loginSign = document.querySelector('.loginSign')
const passSign = document.querySelector('.passSign')
const signBtn = document.querySelector('.signBtn')


const successful = document.querySelector('.successful')
const unsuccessful = document.querySelector('.unsuccessful')


const showPass = document.querySelectorAll('.show__pass')

showPass.forEach(item=> {
	item.addEventListener('click',e=> {
	if (e.target.previousElementSibling.getAttribute('type') == 'password') {
		e.target.classList.add('active');
		e.target.previousElementSibling.setAttribute('type', 'text');
	} else {
		e.target.classList.remove('active');
		e.target.previousElementSibling.setAttribute('type', 'password');
	}
})
})


let url = 'https://618e8c7050e24d0017ce1360.mockapi.io/api/v1/users'
async function getData() {
	const res = await fetch(url)
	const data = await res.json()
	return data
}

regBtn.addEventListener('click',postUser)

async function postUser () {

	const userLogin = loginReg.value.toLowerCase()
	const userPass = passReg.value.toLowerCase()
	const userEmail = regEmail.value.toLowerCase()
	const user = {
		login:userLogin,
		pass:userPass,
		email:userEmail
	}
	try {
  	const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
      'charset' : 'utf-8'
    }
  });
	} catch (error) {
	  console.error('Ошибка:', error);
	}
	renderUsersList()
	loginReg.value = ""
	passReg.value = ''
	regEmail.value = ''
}

	var login = false;
	async function getUser() {
	const data = await getData()
	localStorage.clear()

	data.forEach((user,index)=> {

		const logValue = loginSign.value.toLowerCase()
		const passValue = passSign.value.toLowerCase()
		
		if(user.login.toLowerCase() === logValue && user.pass.toLowerCase() === passValue) {
			login = true
		}
	});
	if(login) {
		setTimeout(function(){
				successful.classList.add('active')
			},500)
			setTimeout(function(){
				successful.classList.remove('active')
			},3000)
			console.log(login)
	}
	else {
		  unsuccessful.classList.add('active')
			setTimeout(function() {
				unsuccessful.classList.remove('active')
			},2000)
			loginSign.value =""
			passSign.value = ""
	}
		loginSign.value =""
		passSign.value = ""
		login = false

}

signBtn.addEventListener('click',getUser)


const usersList = document.querySelector('.users__list')


async function renderUsersList() {
	const data = await getData()
	usersList.innerHTML = ""
	data.forEach(user=> {
		usersList.insertAdjacentHTML('afterbegin',`
		<div class="user">
        <div class="user__login">
            Login: ${user.login}
        </div>
        <div class="user__pass">
            Password: ${user.pass}
        </div>
        <div class="user__pass">
            Email: ${user.email}
        </div>
    </div>
	`)
	})
}

renderUsersList()