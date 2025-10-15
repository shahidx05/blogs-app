import Home from './components/home.js'
import Profile from './components/profile.js'
import Create from './components/create.js'
import Edit from './components/edit.js'
import Login from './components/login.js'
import Register from './components/register.js'

const appRoot = document.querySelector('main');
const navLinks = document.querySelector('.nav-links');

const routes = {
    "/": Home,
    "/home": Home,
    "/profile": Profile,
    "/create": Create,
    "/edit": Edit,
    "/login": Login,
    "/register": Register,
}

export const router = async () => {
    const path = window.location.hash.slice(1) || "/";
    const component = routes[path];
    if (component) {
        appRoot.innerHTML = await component.render();
        if (component.addEventListeners) {
            component.addEventListeners();
        }
    } else {
        appRoot.innerHTML = `<h1>404 - Page Not Found</h1>`;
    }
    updateNavigation();
} 

const updateNavigation = () => {
    const token = localStorage.getItem('token');
    let navHTML = '';

    if (token) {
        navHTML = `
            <div><a href="#/">Home</a></div>
            <div><a href="#/profile">Profile</a></div>
            <div><a href="#/create">Create Post</a></div>
            <div><a href="#" id="logout">Log Out</a></div>
        `;
    } else {
        navHTML = `
            <div><a href="#/register">Register</a></div>
            <div><a href="#/login">Login</a></div>
        `;
    }

    navLinks.innerHTML = navHTML;

    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            window.location.hash = '#/login'; 
        });
    }
};