document.addEventListener("DOMContentLoaded", () => {
   const card = document.querySelector(".card.popular");

   // Activar animación al cargar
   card.classList.add("animated-hover");

   // Quitar la animación cuando el usuario pase el mouse
   card.addEventListener("mouseenter", () => {
      card.classList.remove("animated-hover");
   });
});
