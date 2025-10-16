import * as api from '../api.js';
import { router } from '../router.js';

const CONTENT_LIMIT = 250;

const createPostHTML = (post, user) => {
    const currentUserId = localStorage.getItem('userId');
    const isLiked = post.likes.includes(currentUserId);
    let contentHTML;

    if (post.content.length > CONTENT_LIMIT) {
        const truncatedContent = post.content.substring(0, CONTENT_LIMIT) + '...';
        contentHTML = `
            <p class="content" data-full-content="${escape(post.content)}">
                ${truncatedContent}
                <a href="#" class="see-more-btn">See More</a>
            </p>
        `;
    } else {
        contentHTML = `<p class="content">${post.content}</p>`;
    }

    return `
        <div class="post">
            <div class="post-head">
                <h3>@${user.username}</h3>
                <p class="date">Created on: ${new Date(post.createdAt).toLocaleString()}</p>
            </div>
            ${contentHTML}
            <div class="post-foot">
                <div class="like">
                    <i class="fa-solid fa-thumbs-up like-btn ${isLiked ? 'active' : ''}" data-id="${post._id}"></i>
                    <span class="like-count">${post.likes.length} Likes</span>
                </div>
                <div class="btns">
                    <a href="#/edit/${post._id}" class="edit">Edit</a>
                    <a href="#" class="delete" data-id="${post._id}">Delete</a>
                </div>
            </div>
        </div>
    `;
};

const Profile = {
    render: async () => {
        if (!localStorage.getItem('token')) {
            window.location.hash = '#/login';
            router();
            return ''; 
        }
        
        const user = await api.profile()
        const postsData = await api.getmyposts()
        const posts = postsData.posts || [];

        return `
            <div class="profile-card">
                <div class="profile-info">
                    <h2 class="name-heading">Welcome, ${user.name}</h2>
                    <p class="username">@${user.username}</p>
                    <p class="email">${user.email}</p>
                </div>
                <div class="profile-actions">
                    <p class="post-stats"><i class="fa-solid fa-pen"></i> Posts: <span class="post-count">${posts.length}</span></p>
                    <a href="#/create" class="create-btn">+ Create New Post</a>
                </div>
            </div>
            <p style="margin: 1rem 0 ;">Here you can manage your posts.</p>
            <h2 class="your-posts-title">Your Posts</h2>
            <div class="postcontainer">
                ${posts.length === 0
                    ? `<p class="emptymsg">You haven't created any posts yet.</p>`
                    : posts.map(post => createPostHTML(post, user)).join('')
                }
            </div>
        `;
    },

    addEventListeners: () => {
        const postContainer = document.querySelector('.postcontainer');
        if (!postContainer) return;

        postContainer.addEventListener('click', async (e) => {
            const target = e.target;
         
            if (target.matches('.like-btn, .delete, .see-more-btn, .see-less-btn')) {
                e.preventDefault();
            }

            if (target.matches('.like-btn')) {
                await api.likepost(target.dataset.id);
                router();
            }

            if (target.matches('.delete')) {
                await api.deletepost(target.dataset.id);
                router();
            }
            if (target.matches('.see-more-btn')) {
                const contentP = target.parentElement;
                const fullContent = unescape(contentP.dataset.fullContent);
                contentP.innerHTML = `
                    ${fullContent}
                    <a href="#" class="see-less-btn">See Less</a>
                `;
            }

            if (target.matches('.see-less-btn')) {
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
};

export default Profile;

