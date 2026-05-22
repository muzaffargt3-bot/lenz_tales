// Initialize Lucide Icons
lucide.createIcons();

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');
const mobileNavLinks = mobileNav.querySelectorAll('a');

mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
});

// Close mobile menu when clicking a link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
    });
});

// Scroll Reveal Animation (Intersection Observer)
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: stop observing once revealed
            // observer.unobserve(entry.target);
        }
    });
};

const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Portfolio Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                // Trigger reflow for animation
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Form Submission (WhatsApp Integration)
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const eventType = document.getElementById('event-type').value;
        const date = document.getElementById('date').value;
        const message = document.getElementById('message').value;
        
        const text = `Hello Lenz Tales, I would like to book a shoot!%0A%0A*Name*: ${name}%0A*Phone*: ${phone}%0A*Event*: ${eventType}%0A*Date*: ${date}%0A*Message*: ${message}`;
        
        const whatsappNumber = "919809092540";
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;
        
        window.open(whatsappUrl, '_blank');
        bookingForm.reset();
    });
}
