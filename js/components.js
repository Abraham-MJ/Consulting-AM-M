// Component loader
async function loadComponent(componentName, targetId) {
    try {
        console.log(`Loading component: ${componentName}`);
        const response = await fetch(`components/${componentName}.html`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const html = await response.text();
        const targetElement = document.getElementById(targetId);
        
        if (!targetElement) {
            throw new Error(`Target element ${targetId} not found`);
        }
        
        targetElement.innerHTML = html;
        console.log(`Successfully loaded: ${componentName}`);
        
    } catch (error) {
        console.error(`Error loading component ${componentName}:`, error);
        // Fallback: show error message
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.innerHTML = `<div class="p-4 bg-red-100 text-red-700">Error loading ${componentName}</div>`;
        }
    }
}

// Load all components when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOM loaded, starting component loading...');
    
    // Load components in order with delays to ensure proper loading
    await loadComponent('header', 'header-component');
    await new Promise(resolve => setTimeout(resolve, 100));
    
    await loadComponent('hero', 'hero-component');
    await new Promise(resolve => setTimeout(resolve, 100));
    
    await loadComponent('video-section', 'video-component');
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // await loadComponent('services', 'services-component'); // Commented for now
    
    await loadComponent('about', 'about-component');
    await new Promise(resolve => setTimeout(resolve, 100));
    
    await loadComponent('testimonials', 'testimonials-component');
    await new Promise(resolve => setTimeout(resolve, 100));
    
    await loadComponent('footer', 'footer-component');
    
    console.log('All components loaded, initializing scripts...');
    // Small delay before initializing scripts
    setTimeout(initializeScripts, 200);
});

function initializeScripts() {
    console.log('Initializing scripts...');
    
    // Call the main app initialization function
    if (typeof window.initializeApp === 'function') {
        window.initializeApp();
    } else {
        console.error('initializeApp function not found');
    }
    
    console.log('Scripts initialized');
}
