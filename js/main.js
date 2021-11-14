const loginReg = document.querySelector('.loginReg')
const passReg = document.querySelector('.passReg')
const regBtn = document.querySelector('.regBtn')


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


regBtn.addEventListener('click',postUser)

async function postUser () {

	const userLogin = loginReg.value.toLowerCase()
	const userPass = passReg.value.toLowerCase()
	const user = {
		login:userLogin,
		pass:userPass
	}
	console.log(user)
	try {
  	const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
      'charset' : 'utf-8'
    }
  });
  const json = await response.json();
  console.log('Успех:', JSON.stringify(json));
	} catch (error) {
	  console.error('Ошибка:', error);
	}
	getUsersList()
	loginReg.value = ""
	passReg.value = ''
}


signBtn.addEventListener('click',
async function getUser() {
	const res = await fetch(url)
	const data = await res.json()

	data.forEach(user=> {
		if(user.login.toLowerCase() === loginSign.value.toLowerCase() & user.pass.toLowerCase() === passSign.value.toLowerCase()) {
			setTimeout(function(){
				successful.classList.add('active')
			},500)
			setTimeout(function(){
				successful.classList.remove('active')
			},3000)

			loginSign.value = ''
			passSign.value = ''
		}
		else {
			setTimeout(function(){
				unsuccessful.classList.add('active')
			},500)
			setTimeout(function(){
				unsuccessful.classList.remove('active')
			},3000)
		}
	})

})


const usersList = document.querySelector('.users__list')


async function getUsersList() {
	const res = await fetch(url)
	const data = await res.json()
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
    </div>
	`)
	})
}

getUsersList()