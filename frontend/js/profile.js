import { profile, getmyposts, deletepost , likepost} from "./api.js";
const h1 = document.querySelector('.name-heading')
const username = document.querySelector('.username')
const email = document.querySelector('.email')
const postCount = document.querySelector('.post-count')
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

    h1.textContent = `Welcome, ${user.name}`
    username.textContent = `@${user.username}`
    email.textContent = user.email
    postCount.textContent = posts.posts.length

    emptymsg.style.display = posts.posts.length === 0 ? "block" : "none"

    const currentUserId = localStorage.getItem('userId');
    
    postcontainer.innerHTML = posts.posts.map(post => {
        const isLiked = post.likes.includes(currentUserId);

    return`
    <div class="post">
        <div class="post-head" >
            <h3>@${user.username}</h3>
            <p class="date" > Created on: ${new Date(post.createdAt).toLocaleString()}</p>
        </div>
        <p class="content" >${post.content}</p>
        <div class="post-foot">
            <div class="like">
                    <i class="fa-solid fa-thumbs-up like-btn ${isLiked ? 'active' : ''}" data-id="${post._id}"></i>
                    <span class="like-count">${post.likes.length} Likes</span>
              </div>
            <div class="btns">
                <a data-id="${post._id}" class="delete" href="#">Delete</a>
                <a class="edit" href="edit.html?id=${post._id}">Edit</a>
            </div>
        </div>
    </div>
  `}).join('');

    document.querySelectorAll('.delete').forEach(btn => {
        btn.addEventListener('click', async () => {
            await deletepost(btn.dataset.id)
            renderProfile()
        })
    })
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          e.preventDefault()
          const res = await likepost(btn.dataset.id)
          console.log(res);
          renderProfile()
        })
      })
}

logoutbtn.addEventListener('click', (e) => {
    e.preventDefault()
    localStorage.removeItem('token');
    window.location.href = 'login.html';
    localStorage.removeItem('userId');
})


renderProfile()