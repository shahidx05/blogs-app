import { post, editpost } from "./api.js";

const textarea = document.querySelector('#textarea')
const createbtn = document.querySelector('#Create')
const params = new URLSearchParams(window.location.search)
const id = params.get('id')

async function loadDetails(){
    const Post = await post(id)
    textarea.value = Post.content
}

createbtn.addEventListener('click', async(e)=>{
    e.preventDefault()
    await editpost(id, textarea.value.trim())
    textarea.value = ''
    window.location.href = "profile.html";
})

loadDetails()