import { getAllposts, likepost } from "./api.js";
const postcontainer = document.querySelector('.postcontainer')
const logoutbtn = document.querySelector('#logout')

const CONTENT_LIMIT = 250;

async function renderPosts() {
  const posts = await getAllposts()
  const currentUserId = localStorage.getItem('userId');

  postcontainer.innerHTML = posts.map(post => {
    const isLiked = post.likes.includes(currentUserId);
    let contentHTML = ''

    if (post.content.length > CONTENT_LIMIT) {
      const truncatedContent = post.content.substring(0, CONTENT_LIMIT) + '...'
      contentHTML = `
        <p class="content" data-full-content="${escape(post.content)}">
            ${truncatedContent}
            <a href="#" class="see-more-btn" data-post-id="${post._id}">See More</a>
        </p>
      `
    }
    else {
      contentHTML = `<p class="content">${post.content}</p>`;
    }

    return `
    <div class="post">
          <div class="post-head" >
            <h3>@${post.user.username}</h3>
            <p class="date" > Created on: ${new Date(post.createdAt).toLocaleString()}</p>
          </div>
          ${contentHTML} 
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


postcontainer.addEventListener('click', async (e) => {
  const target = e.target
  e.preventDefault()

  if (target.classList.contains('see-more-btn')) {
    const contentP = target.parentElement;
    const fullContent = unescape(contentP.dataset.fullContent);
    contentP.innerHTML = `
        ${fullContent}
        <a href="#" class="see-less-btn">See Less</a>
    `;
  }

  else if (target.classList.contains('see-less-btn')) {
    const contentP = target.parentElement;
    const fullContent = unescape(contentP.dataset.fullContent);
    const truncatedContent = fullContent.substring(0, CONTENT_LIMIT) + '...';
    contentP.innerHTML = `
        ${truncatedContent}
        <a href="#" class="see-more-btn">See More</a>
    `;
  }
})

logoutbtn.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.removeItem('token');
  window.location.href = 'login.html';
  localStorage.removeItem('userId');
})

renderPosts()