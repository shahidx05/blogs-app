import { login } from "./api.js";

const form = document.querySelector('#login-form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const result = await login(
        email.value.trim(),
        password.value.trim()
    );
    email.value = ''
    password.value = ''
    if (result.token) {
        localStorage.setItem('token', result.token);
    }
    window.location.href = "profile.html";
});
