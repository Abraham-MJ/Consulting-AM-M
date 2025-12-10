// JavaScript para Consulting Landing Page

// Testimonials data
const testimonials = [
  {
    name: "Patricia Rodriguez",
    position: "CEO, Tech Solutions",
    initials: "PR",
    color: "#171A73",
    text: "Manejar la contabilidad y los taxes de mi empresa en EE.UU con ustedes, no solo tengo la tranquilidad de estar 100% en cumplimiento, sino que su asesoría financiera me ha permitido proteger mi dinero de la inflación y tomar decisiones mucho más inteligentes.",
  },
  {
    name: "Daniel Montes",
    position: "Founder, Digital Marketing",
    initials: "DM",
    color: "#C4AD0F",
    text: "La preparación de taxes en EE.UU. me generaba mucho estrés, especialmente por el desconocimiento. Tus Asesores no solo gestionaron mis impuestos de manera impecable, sino que también me brindaron asesoría financiera práctica para entender cómo optimizar mis recursos.",
  },
  {
    name: "Carlos Perdomo",
    position: "Director, Import/Export",
    initials: "CP",
    color: "#171A73",
    text: "Necesitaba un socio confiable para las finanzas de mi empresa y la asesoría contable, Y ustedes superaron mis expectativas. Su equipo es transparente, eficiente y siempre está al tanto de las últimas regulaciones de taxes. Gracias a ello, mi negocio está creciendo de forma sostenible.",
  },
];

// Generate testimonial card HTML
function createTestimonialCard(testimonial, isMobile = false) {
  const cardClass = isMobile ? "w-full flex-shrink-0" : "";
  const containerClass = isMobile
    ? "bg-white p-6 sm:p-8 rounded-xl shadow-lg mx-2 sm:mx-4 min-h-[400px] flex flex-col"
    : "bg-white p-6 lg:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 fade-in-section min-h-[450px] flex flex-col";

  return `
        <div class="${cardClass}">
            <div class="${containerClass}">
                <div class="flex items-center mb-4 sm:mb-6">
                    <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-3 sm:mr-4 flex-shrink-0" style="background-color: ${testimonial.color};">
                        ${testimonial.initials}
                    </div>
                    <div class="min-w-0 flex-1">
                        <h3 class="font-bold text-base sm:text-lg text-gray-900 leading-tight">${testimonial.name}</h3>
                        <p class="text-gray-600 text-xs sm:text-sm mt-1">${testimonial.position}</p>
                    </div>
                </div>
                
                <div class="flex mb-3 sm:mb-4">
                    <i class="fa-solid fa-star text-sm sm:text-base" style="color: #C4AD0F;"></i>
                    <i class="fa-solid fa-star text-sm sm:text-base" style="color: #C4AD0F;"></i>
                    <i class="fa-solid fa-star text-sm sm:text-base" style="color: #C4AD0F;"></i>
                    <i class="fa-solid fa-star text-sm sm:text-base" style="color: #C4AD0F;"></i>
                    <i class="fa-solid fa-star text-sm sm:text-base" style="color: #C4AD0F;"></i>
                </div>

                <p class="text-gray-700 leading-relaxed text-sm sm:text-base flex-1">
                    ${testimonial.text}
                </p>
            </div>
        </div>
    `;
}

// Generate testimonials sections
function generateTestimonials() {
  const desktopGrid = document.getElementById("desktopTestimonials");
  const mobileTrack = document.getElementById("testimonialTrack");
  const dotsContainer = document.getElementById("sliderDots");

  console.log("Generating testimonials...", {
    desktopGrid,
    mobileTrack,
    dotsContainer,
  });

  if (desktopGrid) {
    // Desktop: only first 3 testimonials
    desktopGrid.innerHTML = testimonials
      .slice(0, 3)
      .map((t) => createTestimonialCard(t))
      .join("");
    console.log("Desktop testimonials generated");
  }

  if (mobileTrack) {
    // Mobile: all testimonials
    mobileTrack.innerHTML = testimonials
      .map((t) => createTestimonialCard(t, true))
      .join("");
    console.log("Mobile testimonials generated");
  }

  if (dotsContainer) {
    // Generate dots for all testimonials
    dotsContainer.innerHTML = testimonials
      .map(
        (_, index) =>
          `<button class="slider-dot w-3 h-3 rounded-full transition-all duration-300 ${
            index === 0 ? "" : "bg-gray-300"
          }" ${
            index === 0 ? 'style="background-color: #171A73;"' : ""
          }></button>`
      )
      .join("");
    console.log("Slider dots generated");
  }
}

// Testimonial slider functionality
function initTestimonialSlider() {
  const track = document.getElementById("testimonialTrack");
  const dots = document.querySelectorAll(".slider-dot");

  if (!track || !dots.length) return;

  let currentSlide = 0;
  const totalSlides = testimonials.length;

  function updateSlider() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.style.backgroundColor = "#171A73";
      } else {
        dot.style.backgroundColor = "#d1d5db";
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  }

  // Auto-slide every 5 seconds
  setInterval(nextSlide, 5000);

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      updateSlider();
    });
  });

  // Touch/swipe support
  let startX = 0;
  let isDragging = false;

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  track.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
  });

  track.addEventListener("touchend", (e) => {
    if (!isDragging) return;

    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        currentSlide = (currentSlide + 1) % totalSlides;
      } else {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      }
      updateSlider();
    }

    isDragging = false;
  });
}

// Wait for components to load before initializing
function initializeApp() {
  // Header scroll effect (can initialize immediately)
  const header = document.getElementById("header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("shadow-xl");
        header.classList.remove("shadow-md");
      } else {
        header.classList.remove("shadow-xl");
        header.classList.add("shadow-md");
      }
    });
  }

  // Wait for DOM elements to be available
  setTimeout(() => {
    // Generate testimonials
    generateTestimonials();

    // Initialize testimonial slider
    initTestimonialSlider();

    // Initialize smooth scroll and active nav
    initSmoothScroll();
    updateActiveNavItem();

    // Scroll animations
    initScrollAnimations();

    // Mobile menu
    initMobileMenu();

    console.log("App initialized successfully");
  }, 500);
}

// Smooth scroll for navigation links
function initSmoothScroll() {
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");
  const header = document.getElementById("header");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Active page indicator
function updateActiveNavItem() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const header = document.getElementById("header");

  function checkActiveSection() {
    let current = "";
    const headerHeight = header ? header.offsetHeight : 0;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    // If no section is active and we're at the top, set first section as active
    if (!current && window.scrollY < 100) {
      current = sections[0]?.getAttribute("id") || "inicio";
    }

    navLinks.forEach((link) => {
      const indicator = link.querySelector(".nav-indicator");
      if (link.getAttribute("href") === `#${current}`) {
        link.style.color = "#171A73";
        if (indicator) {
          indicator.style.width = "100%";
        }
      } else {
        link.style.color = "";
        if (indicator) {
          indicator.style.width = "0%";
        }
      }
    });
  }

  // Check on scroll
  window.addEventListener("scroll", checkActiveSection);

  // Check immediately on load
  checkActiveSection();
}

// Mobile menu toggle
function initMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const menuClose = document.getElementById("menuClose");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
  const menuItems = document.querySelectorAll(".menu-item");

  if (menuToggle && menuClose && mobileMenu && mobileMenuOverlay) {
    function openMenu() {
      mobileMenuOverlay.classList.remove("hidden");
      mobileMenu.classList.remove("translate-x-full");

      // Animate menu items
      menuItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "translateX(0)";
        }, index * 100);
      });
    }

    function closeMenu() {
      mobileMenu.classList.add("translate-x-full");
      mobileMenuOverlay.classList.add("hidden");

      // Reset menu items
      menuItems.forEach((item) => {
        item.style.opacity = "0";
        item.style.transform = "translateX(20px)";
      });
    }

    menuToggle.addEventListener("click", openMenu);
    menuClose.addEventListener("click", closeMenu);
    mobileMenuOverlay.addEventListener("click", closeMenu);

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observe all fade-in sections
  document.querySelectorAll(".fade-in-section").forEach((section) => {
    observer.observe(section);
  });
}

// Export for use in components.js
window.initializeApp = initializeApp;
