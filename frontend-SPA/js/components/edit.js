import * as api from '../api.js';
import { router } from '../router.js';

const Edit = {
    render: async () => {
        if (!localStorage.getItem('token')) {
            window.location.hash = '#/login';
            router();
            return '';
        }
        const pathParts = window.location.hash.split('/');
        const postId = pathParts[2];
        if (!postId) {
            return `<h1 class="All-posts-title">Error</h1><p class="emptymsg">No post ID provided.</p>`;
        }
        const post = await api.post(postId);
        return `
        <div class="form-card">
            <h1>Edit Post</h1>
            <form>
                <div>
                    <label for="content">Content:</label>
                    <textarea placeholder="Write Somethig here... " name="content" id="textarea" required>${post.content}</textarea>
                </div>
                <button type="submit" class="edit-btn" id="Create">Update Post</button>
            </form>
        </div>
        `;
    },
    addEventListeners: () => {
        const createbtn = document.querySelector('#Create')

        createbtn.addEventListener('click', async (e) => {
            e.preventDefault();

            const textarea = document.querySelector('#textarea').value.trim();
            const pathParts = window.location.hash.split('/');
            const postId = pathParts[2];

            if (!textarea || !postId) return;

            createbtn.disabled = true;
            createbtn.textContent = 'Updating Post...';

            await api.editpost(postId, textarea);

            createbtn.disabled = false;
            createbtn.textContent = 'Update Post';
            window.location.hash = '#/profile';
            router();
        });
    }
}

export default Edit;