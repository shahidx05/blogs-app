import { profile, getmyposts, deletepost } from "./api.js";
const h1 = document.querySelector('.name-heading')
const postcontainer = document.querySelector('.postcontainer')
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

    h1.textContent = `Welcome, ${user.username} 👋`

    emptymsg.style.display = posts.posts.length === 0 ? "block" : "none"


    postcontainer.innerHTML = posts.posts.map(post => `
    <div class="post">
        <div class="post-head" >
            <h3>@${user.username}</h3>
            <p class="date" > Created on: ${new Date(post.createdAt).toLocaleString()}</p>
        </div>
        <p class="content" >${post.content}</p>
        <div class="post-foot">
            <p class="like" ><i class="fa-solid fa-thumbs-up like-btn" data-id="${post._id}"></i>${post.likes.length} Likes</p>
            <div class="btns">
                <a data-id="${post._id}" class="delete" href="#">Delete</a>
                <a class="edit" href="edit.html?id=${post._id}">Edit</a>
            </div>
        </div>
    </div>
  `).join('');

    document.querySelectorAll('.delete').forEach(btn => {
        btn.addEventListener('click', async () => {
            await deletepost(btn.dataset.id)
            renderProfile()
        })
    })

}

logoutbtn.addEventListener('click', (e) => {
    e.preventDefault()
    localStorage.removeItem('token');
    window.location.href = 'login.html';
})


renderProfile()