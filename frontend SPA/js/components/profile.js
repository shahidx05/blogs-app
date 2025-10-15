import * as api from '../api.js';
import { router } from '../router.js';

const CONTENT_LIMIT = 250; // Character limit for post content

const Profile = {
    /**
     * Renders the HTML for the user's profile page.
     * It includes a check to ensure the user is logged in before rendering.
     */
    render: async () => {
        // --- Route Protection ---
        // If there's no token, redirect to the login page immediately.
        if (!localStorage.getItem('token')) {
            window.location.hash = '#/login';
            router(); // Run the router again to render the login page
            return; // Stop rendering the profile page
        }

        try {
            // Fetch both the user's profile info and their posts at the same time
            const [user, postsData] = await Promise.all([
                api.profile(),
                api.getmyposts()
            ]);

            const posts = postsData.posts || [];
            const currentUserId = localStorage.getItem('userId');

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

                <h2 class="your-posts-title">Your Posts</h2>
                <div class="postcontainer">
                    ${posts.length === 0 ? `<p class="emptymsg">You haven't created any posts yet.</p>` :
                    posts.map(post => {
                        const isLiked = post.likes.includes(currentUserId);
                        let contentHTML = '';

                        // Logic for truncating long posts
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
                    }).join('')}
                </div>
            `;
        } catch (error) {
            console.error("Failed to render profile page:", error);
            // Handle cases where the token is invalid or expired
            if (error.message.includes('401')) {
                 localStorage.removeItem('token');
                 localStorage.removeItem('userId');
                 window.location.hash = '#/login';
                 router();
                 return;
            }
            return `<h2 class="your-posts-title">Error</h2><p class="emptymsg">Could not load your profile. Please try logging in again.</p>`;
        }
    },

    /**
     * Attaches event listeners for the profile page after it has been rendered.
     */
    addEventListeners: () => {
        const postContainer = document.querySelector('.postcontainer');
        if (!postContainer) return;

        postContainer.addEventListener('click', async (e) => {
            const target = e.target;

            if (target.classList.contains('like-btn')) {
                e.preventDefault();
                await api.likepost(target.dataset.id);
                router(); // Re-render to show updated like status
            }

            if (target.classList.contains('delete')) {
                e.preventDefault();
                const postId = target.dataset.id;
                if (confirm('Are you sure you want to delete this post?')) {
                    await api.deletepost(postId);
                    router(); // Re-render to remove the deleted post
                }
            }

            if (target.classList.contains('see-more-btn')) {
                e.preventDefault();
                const contentP = target.parentElement;
                const fullContent = unescape(contentP.dataset.fullContent);
                contentP.innerHTML = `${fullContent} <a href="#" class="see-less-btn">See Less</a>`;
            }

            if (target.classList.contains('see-less-btn')) {
                e.preventDefault();
                const contentP = target.parentElement;
                const fullContent = unescape(contentP.dataset.fullContent);
                const truncatedContent = fullContent.substring(0, CONTENT_LIMIT) + '...';
                contentP.innerHTML = `${truncatedContent} <a href="#" class="see-more-btn">See More</a>`;
            }
        });
    }
};

export default Profile;

