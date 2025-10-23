import * as api from '../api.js';
import { router } from '../router.js';

const Register = {
    render: async () => {
        return `
        <div class="Auth-form-card">
            <h1>Create Account</h1>
            <form id="register-form">
                <div>
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div>
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit" class="btn">Create</button>
                <p class="error-message" id="error-message" style="display: none;"></p>
            </form>
            <div class="form-footer">
                <p>Already have an account? <a href="#/login">Login here</a></p>
            </div>
        </div>
        `;
    },
    addEventListeners: () => {
        const form = document.querySelector('#register-form');
        if (!form) return;


        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.querySelector('#name').value.trim();
            const username = document.querySelector('#username').value.trim();
            const email = document.querySelector('#email').value.trim();
            const password = document.querySelector('#password').value.trim();
            const submitButton = form.querySelector('button')
            const errorEl = document.getElementById('error-message');

            errorEl.style.display = 'none';
            submitButton.disabled = true;
            submitButton.textContent = 'Creating Account...';

            try {
                const result = await api.register(name, username, email, password);
                if (result.token) {
                    localStorage.setItem('token', result.token);
                    localStorage.setItem('userId', result.user._id);
                    window.location.hash = '#/profile';
                } else {
                    throw new Error(result.message || 'Registeration failed.');
                }
            } catch (error) {
                errorEl.textContent = error.message;
                errorEl.style.display = 'block';
                submitButton.disabled = false;
                submitButton.textContent = 'Login';
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = 'Login';
            }
        });

    }
}

export default Register;
