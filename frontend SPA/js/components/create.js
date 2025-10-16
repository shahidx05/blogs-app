import * as api from '../api.js';
import { router } from '../router.js';

const Create = {
    render: async () => {
        return `
       <div class="form-card">
            <h1>Create a New Post</h1>
            <form>
                <div>
                    <label for="content">Content:</label>
                    <textarea placeholder="Write Somethig here... " name="content" id="textarea" required></textarea>
                </div>
                <button type="submit" class="create-btn" id="Create">Create Post</button>
            </form>
        </div>
        `;
    },
    addEventListeners: () => {
        const createbtn = document.querySelector('#Create')

        createbtn.addEventListener('click', async (e) => {
            e.preventDefault();

            const textarea = document.querySelector('#textarea').value.trim();
            if (!textarea) return;

            createbtn.disabled = true;
            createbtn.textContent = 'Creating Post...';

            await api.createpost(textarea);

            createbtn.disabled = false;
            createbtn.textContent = 'Create Post';

            window.location.hash = '#/profile';
            router();

        });
    }
}

export default Create;

