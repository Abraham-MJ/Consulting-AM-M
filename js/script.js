// JavaScript para Consulting Landing Page

// Header scroll effect
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('bg-black', 'shadow-lg');
    } else {
        header.classList.remove('bg-black', 'shadow-lg');
    }
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const menuClose = document.getElementById('menuClose');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const menuItems = document.querySelectorAll('.menu-item');

function openMenu() {
    mobileMenuOverlay.classList.remove('hidden');
    mobileMenu.classList.remove('translate-x-full');
    
    // Animate menu items
    menuItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

function closeMenu() {
    mobileMenu.classList.add('translate-x-full');
    mobileMenuOverlay.classList.add('hidden');
    
    // Reset menu items
    menuItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(20px)';
    });
}

menuToggle.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
mobileMenuOverlay.addEventListener('click', closeMenu);

// Close mobile menu when clicking on a link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in sections
document.querySelectorAll('.fade-in-section').forEach(section => {
    observer.observe(section);
});
