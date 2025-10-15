import * as api from '../api.js';
import { router } from '../router.js';

const Login = {
    render: async () => {
        return`
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

          submitButton.disabled = true;
          submitButton.textContent = 'Logging Account...';
        
          const result = await api.login(email,password);
        
          console.log(result);
        
            if (result.token) {
                localStorage.setItem('token', result.token);
                localStorage.setItem('userId', result.user._id);
                window.location.hash = '#/profile';
                router();
            }
            else {
                alert(result.message || 'Login failed. Please try again.');
            }
        });
        
    }
}

export default Login;

