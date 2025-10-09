import { register } from "./api.js";

const form = document.querySelector('#register-form');
const name = document.querySelector('#name');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const result = await register(
    name.value.trim(),
    username.value.trim(),
    email.value.trim(),
    password.value.trim()
  );

  console.log(result);

    email.value = ''
    username.value = ''
    name.value = ''
    email.value = ''
    password.value = ''

    if (result.token) {
        localStorage.setItem('token', result.token);
    }
    window.location.href = "profile.html";
});
