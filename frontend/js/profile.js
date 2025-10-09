import { profile, getmyposts, createpost, deletepost } from "./api.js";
const h1 = document.querySelector('.h1')
const postcontainer = document.querySelector('.postcontainer')
const textarea = document.querySelector('#textarea')
const createbtn = document.querySelector('#Create')
const emptymsg = document.querySelector('.emptymsg')
const logoutbtn = document.querySelector('#logout')

async function renderProfile() {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("You are not logged in!");
        window.location.href = "login.html";
        return;
    }

    const user = await profile()
    const posts = await getmyposts()

    h1.textContent = `Welcome ${user.username} 👋`

    emptymsg.style.display = posts.posts.length===0 ? "block" : "none" 


    postcontainer.innerHTML = posts.posts.map(post => `
    <div style="border: 2px solid;" class="post">
            <h3>@${user.username}</h3>
            <p>${post.content}</p>
            <p>Likes ${post.likes.length}</p>
            <div class="btns">
                <a data-id="${post._id}" class="delete" href="#">Delete</a>
                <a class="edit" href="edit.html?id=${post._id}">Edit</a>
            </div>
        </div>
  `).join(''); 

  document.querySelectorAll('.delete').forEach(btn=>{
    btn.addEventListener('click', async()=>{
        await deletepost(btn.dataset.id)
        renderProfile()
    })
  })

}

createbtn.addEventListener('click', async(e)=>{
    e.preventDefault()
    const content = textarea.value.trim()
    await createpost(content)
    textarea.value = ''
    renderProfile()
})


logoutbtn.addEventListener('click', (e)=>{
    e.preventDefault()
    localStorage.removeItem('token');
    window.location.href = 'login.html';
})


renderProfile()