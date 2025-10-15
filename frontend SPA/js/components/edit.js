import * as api from '../api.js';
import { router } from '../router.js';

const CONTENT_LIMIT = 250;

const createPostHTML = (post, currentUserId) => {
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
}

const Home = {
    render: async () => {
        const posts = await api.getAllposts();
        const currentUserId = localStorage.getItem('userId');
        return `
            <h2 class="All-posts-title">Recent Posts</h2>
            <div class="postcontainer">
                ${posts.length === 0
                ? `<p class="emptymsg">No posts yet. Why not create one?</p>`
                : posts.map(post => createPostHTML(post, currentUserId)).join('')
            }
            </div>
        `;
    },
    addEventListeners: () => {
        const postContainer = document.querySelector('.postcontainer');
        if (!postContainer) return;

        postContainer.addEventListener('click', async (e) => {
            const target = e.target;
            e.preventDefault();

            if (target.classList.contains('like-btn')) {
                await api.likepost(target.dataset.id);
                router();
            }

            if (target.classList.contains('see-more-btn')) {
                const contentP = target.parentElement;
                const fullContent = unescape(contentP.dataset.fullContent);
                contentP.innerHTML = `
                    ${fullContent}
                    <a href="#" class="see-less-btn">See Less</a>
                `;
            }

            if (target.classList.contains('see-less-btn')) {
                const contentP = target.parentElement;
                const fullContent = unescape(contentP.dataset.fullContent);
                const truncatedContent = fullContent.substring(0, CONTENT_LIMIT) + '...';
                contentP.innerHTML = `
                    ${truncatedContent}
                    <a href="#" class="see-more-btn">See More</a>
                `;
            }
        });
    }
}

export default Home;

