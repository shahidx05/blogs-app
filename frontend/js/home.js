import { getAllposts, likepost } from "./api.js";
const postcontainer = document.querySelector('.postcontainer')
const logoutbtn = document.querySelector('#logout')

async function renderPosts() {
  const posts = await getAllposts()
  const currentUserId = localStorage.getItem('userId');

  postcontainer.innerHTML = posts.map(post => {
    const isLiked = post.likes.includes(currentUserId);

    return `
    <div class="post">
          <div class="post-head" >
            <h3>@${post.user.username}</h3>
            <p class="date" > Created on: ${new Date(post.createdAt).toLocaleString()}</p>
          </div>
            <p class="content" >${post.content}</p>
            <div class="post-foot">
                <div class="like">
                    <i class="fa-solid fa-thumbs-up like-btn ${isLiked ? 'active' : ''}" data-id="${post._id}"></i>
                    <span class="like-count">${post.likes.length} Likes</span>
                </div>
            </div>
        </div>
  `;
  }).join('');

  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault()
      const res = await likepost(btn.dataset.id)
      console.log(res);
      
      renderPosts()
    })
  })

}
logoutbtn.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.removeItem('token');
  window.location.href = 'login.html';
  localStorage.removeItem('userId');
})

renderPosts()