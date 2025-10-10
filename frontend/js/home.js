import { getAllposts, likepost } from "./api.js";
const postcontainer = document.querySelector('.postcontainer')
const logoutbtn = document.querySelector('#logout')

async function renderPosts() {
  const posts = await getAllposts()

  postcontainer.innerHTML = posts.map(post => `
    <div class="post">
          <div class="post-head" >
            <h3>@${post.user.username}</h3>
            <p class="date" > Created on: ${new Date(post.createdAt).toLocaleString()}</p>
          </div>
            <p class="content" >${post.content}</p>
            <p class="like" ><i class="fa-solid fa-thumbs-up like-btn" data-id="${post._id}"></i>${post.likes.length} Likes</p>
        </div>
  `).join('');

  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault()
      const res = await likepost(btn.dataset.id)
      renderPosts()
    })
  })

}
logoutbtn.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.removeItem('token');
  window.location.href = 'login.html';
})

renderPosts()