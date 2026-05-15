document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = menuToggle.querySelector('i');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuIcon.classList.toggle('fa-bars');
            menuIcon.classList.toggle('fa-times');
        });
    }

    // 2. Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Handle specific triggers (Volunteer/Donate)
                if (this.classList.contains('btn-trigger')) {
                    const type = this.getAttribute('data-type');
                    const select = document.getElementById('helpType');
                    if (select) select.value = type;
                }

                // Close mobile menu
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuIcon.classList.replace('fa-times', 'fa-bars');
                }
            }
        });
    });

    // 3. Counter Animation for Impact Section
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const startCounter = (counter) => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace(/,/g, '');
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc).toLocaleString();
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target.toLocaleString() + '+';
            }
        };
        updateCount();
    };

    // 4. Intersection Observer
    const observerOptions = { threshold: 0.2 };
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                if (entry.target.classList.contains('impact')) {
                    counters.forEach(counter => startCounter(counter));
                }
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in-section');
        sectionObserver.observe(section);
    });

    // 5. Form Submission & Modal (with simulation storage)
    const actionForm = document.getElementById('mainActionForm');
    const modal = document.getElementById('successModal');
    const closeModal = document.querySelector('.close-modal');

    if (actionForm) {
        actionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulation: Save the application to local storage for status checking
            const name = actionForm.querySelector('input[type="text"]').value;
            const email = actionForm.querySelector('input[type="email"]').value;
            const applications = JSON.parse(localStorage.getItem('ngo_apps') || '{}');
            applications[email.toLowerCase()] = { name, status: 'Pending Review' };
            localStorage.setItem('ngo_apps', JSON.stringify(applications));

            modal.style.display = 'flex';
            actionForm.reset();
        });
    }

    // 6. Status Checking Logic
    const checkStatusBtn = document.getElementById('checkStatusBtn');
    const statusEmailInput = document.getElementById('statusEmail');
    const statusResult = document.getElementById('statusResult');
    const statusError = document.getElementById('statusError');
    const resName = document.getElementById('resName');

    if (checkStatusBtn) {
        checkStatusBtn.addEventListener('click', () => {
            const email = statusEmailInput.value.toLowerCase();
            const apps = JSON.parse(localStorage.getItem('ngo_apps') || '{}');
            
            if (apps[email]) {
                statusResult.style.display = 'block';
                statusError.style.display = 'none';
                resName.innerText = apps[email].name;
                
                // Trigger animation
                statusResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                statusResult.style.display = 'none';
                statusError.style.display = 'block';
            }
        });
    }

    // 7. Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

/* Animation Styles */
const style = document.createElement('style');
style.textContent = `
    .fade-in-section { opacity: 0; transform: translateY(30px); transition: all 0.8s ease-out; }
    .fade-in-visible { opacity: 1 !important; transform: translateY(0) !important; }
`;
document.head.appendChild(style);
