import { getAllposts, likepost } from "./api.js";
const postcontainer = document.querySelector('.postcontainer')
const logoutbtn = document.querySelector('#logout')

async function renderPosts() {
    const posts = await getAllposts()

    postcontainer.innerHTML = posts.map(post => `
    <div style="border: 2px solid;" class="post">
            <h3>@${post.user.username}</h3>
            <p>${post.content}</p>
            <button type="button" data-id="${post._id}" class="like">Like</button>
            <p>${post.likes.length}</p>
            <p> Created on: ${new Date(post.createdAt).toLocaleString()}</p>
        </div>
  `).join('');
  
  document.querySelectorAll('.like').forEach(btn=>{
    btn.addEventListener('click', async(e)=>{
        e.preventDefault()
        const res = await likepost(btn.dataset.id)
        console.log(res);
        renderPosts()
    })
  })

}
logoutbtn.addEventListener('click', (e)=>{
    e.preventDefault()
    localStorage.removeItem('token');
    window.location.href = 'login.html';
})

renderPosts()