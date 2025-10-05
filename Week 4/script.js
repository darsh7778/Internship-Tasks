document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set initial theme based on user preference or saved preference
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Apply initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update theme icon based on current theme
    function updateThemeIcon(theme) {
        if (themeIcon) {
            if (theme === 'light') {
                themeIcon.style.color = '#000000';
            } else {
                themeIcon.style.color = '#ffffff';
            }
        }
    }
    
    // Initialize theme icon
    updateThemeIcon(currentTheme);
    
    // Theme toggle functionality
    if (themeToggle && themeIcon) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
    
    // Check if hamburger menu exists (for mobile navigation)
    if (hamburger && navLinks) {

        // Toggle mobile menu
        hamburger.addEventListener('click', function() {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
            hamburger.setAttribute('aria-expanded', !isExpanded);
            navLinks.setAttribute('data-visible', !isExpanded);
            
            // Toggle body scroll when menu is open
            if (!isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close mobile menu when clicking on a nav link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    hamburger.setAttribute('aria-expanded', 'false');
                    navLinks.setAttribute('data-visible', 'false');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    // Handle window resize to close mobile menu when switching to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks) {
            hamburger.setAttribute('aria-expanded', 'false');
            navLinks.setAttribute('data-visible', 'false');
            document.body.style.overflow = '';
        }
    });

    // Add shadow to navbar on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            navLinks &&
            hamburger &&
            !e.target.closest('.nav-links') && 
            !e.target.closest('.hamburger') &&
            navLinks.getAttribute('data-visible') === 'true') {
            
            hamburger.setAttribute('aria-expanded', 'false');
            navLinks.setAttribute('data-visible', 'false');
            document.body.style.overflow = '';
        }
    });

    // Update year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Add smooth scrolling for better mobile experience
    if ('scrollBehavior' in document.documentElement.style) {
        // Native smooth scrolling is supported
    } else {
        // Fallback for older browsers
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
});