import { createpost } from "./api.js";

const textarea = document.querySelector('#textarea')
const createbtn = document.querySelector('#Create')

createbtn.addEventListener('click', async(e)=>{
    e.preventDefault()
    const content = textarea.value.trim()
    await createpost(content)
    textarea.value = ''
    window.location.href = "profile.html";
})

