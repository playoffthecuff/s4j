let links = document.querySelectorAll(".menu-link");
links.forEach(elem => elem.addEventListener('click', (event) => {
  links.forEach(elem => elem.classList.remove("active"));
  event.currentTarget.classList.add("active");
};));