 const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach(link => {
    const linkPage = link.getAttribute("href").split("/").pop();
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });