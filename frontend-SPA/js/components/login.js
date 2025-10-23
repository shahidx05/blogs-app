import * as api from '../api.js';
import { router } from '../router.js';

const Login = {
    render: async () => {
        return `
       <div class="Auth-form-card">
            <h1>Login</h1>
            <form id="login-form">
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit" class="btn">Login</button>
                <p class="error-message" id="error-message" style="display: none;"></p>
            </form>
            <div class="form-footer">
                <p>Don't have an account? <a href="#/register">Register here</a></p>
            </div>
        </div>
        `;
    },
    addEventListeners: () => {
        const form = document.querySelector('#login-form');
        if (!form) return;


        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.querySelector('#email').value.trim();
            const password = document.querySelector('#password').value.trim();
            const submitButton = form.querySelector('button')
            const errorEl = document.getElementById('error-message');

            errorEl.style.display = 'none';
            submitButton.disabled = true;
            submitButton.textContent = 'Logging Account...';

            try {
                const result = await api.login(email, password);
                if (result.token) {
                    localStorage.setItem('token', result.token);
                    localStorage.setItem('userId', result.user._id);
                    window.location.hash = '#/profile';
                } else {
                    throw new Error(result.message || 'Login failed. Please check your credentials.');
                }
            } catch (error) {
                errorEl.textContent = error.message;
                errorEl.style.display = 'block';
                submitButton.disabled = false;
                submitButton.textContent = 'Login';
            }finally {
                submitButton.disabled = false;
                submitButton.textContent = 'Login';
            }
        });

    }
}

export default Login;

