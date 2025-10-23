import { profile, getmyposts, deletepost, likepost } from "./api.js";
const h1 = document.querySelector('.name-heading')
const username = document.querySelector('.username')
const email = document.querySelector('.email')
const postCount = document.querySelector('.post-count')
const postcontainer = document.querySelector('.postcontainer')
const emptymsg = document.querySelector('.emptymsg')
const logoutbtn = document.querySelector('#logout')

const CONTENT_LIMIT = 250;

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
            <h3>@${user.username}</h3>
            <p class="date" > Created on: ${new Date(post.createdAt).toLocaleString()}</p>
        </div>
        ${contentHTML} 
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


postcontainer.addEventListener('click', async (e) => {
    const target = e.target

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


renderProfile()