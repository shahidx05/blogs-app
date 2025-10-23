const LOCAL_BACKEND_URL = 'http://localhost:3000/api';
const LIVE_BACKEND_URL = 'https://blogs-app-backend-w58h.onrender.com/api'

const isLocal = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';

const BASE_URL = isLocal ? LOCAL_BACKEND_URL : LIVE_BACKEND_URL;


export const register = async (name, username, email, password) => {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, name, email, password }),
  });

  return res.json();
};

export const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
  });

  return res.json();
};

export const profile = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/users/profile`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch profile: ${res.status}`);
  }
  return res.json();
};

export const post = async (id) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  return res.json();
}

export const getAllposts = async () => {
  const res = await fetch(`${BASE_URL}/posts/`);
  return res.json();
}

export const getmyposts = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/posts/myposts`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  return res.json();
}

export const createpost = async (content) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content }),
  });

  return res.json();
}

export const deletepost = async (id) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  return res.json();
}

export const editpost = async (id, content) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PUT',
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content }),
  });

  return res.json();
}

export const likepost = async (id) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/posts/like/${id}`, {
    method: 'PUT',
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });
  return res.json();
}