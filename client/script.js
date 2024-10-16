// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});
// Select the logo container
const logoContainer = document.querySelector('.logo-container');

// Add an event listener for the animationend event
logoContainer.addEventListener('animationend', (event) => {
// Check if the animation that ended is the moveUp animation
    if (event.animationName === 'moveUp') {
    // Hide the logo container after the animation completes
        logoContainer.style.display = 'none';
}
});