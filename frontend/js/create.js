import { createpost } from "./api.js";

const textarea = document.querySelector('#textarea')
const createbtn = document.querySelector('#Create')
const logoutbtn = document.querySelector('#logout')

createbtn.addEventListener('click', async(e)=>{
    e.preventDefault()
    const content = textarea.value.trim()
    await createpost(content)
    textarea.value = ''
    window.location.href = "profile.html";
})

logoutbtn.addEventListener('click', (e) => {
    e.preventDefault()
    localStorage.removeItem('token');
    window.location.href = 'login.html';
    localStorage.removeItem('userId');
})
