document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = menuToggle.querySelector('i');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (menuIcon) {
                menuIcon.classList.toggle('fa-bars');
                menuIcon.classList.toggle('fa-times');
            }
        });
    }

    /////// 2. Smooth scroll for all anchor links
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
                    if (menuIcon) {
                        menuIcon.classList.replace('fa-times', 'fa-bars');
                    }
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
            const count = +counter.innerText.replace(/,/g, '').replace('+', '');
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
    const closeModalBtns = document.querySelectorAll('.close-modal');

    if (actionForm) {
        actionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulation: Save the application to local storage for status checking
            const name = actionForm.querySelector('input[type="text"]').value;
            const email = actionForm.querySelector('input[type="email"]').value;
            const applications = JSON.parse(localStorage.getItem('ngo_apps') || '{}');
            applications[email.toLowerCase()] = { name, status: 'Pending Review' };
            localStorage.setItem('ngo_apps', JSON.stringify(applications));

            if (modal) modal.style.display = 'flex';
            actionForm.reset();
        });
    }

    if (closeModalBtns) {
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (modal) modal.style.display = 'none';
            });
        });
    }

    window.addEventListener('click', (e) => {
        if (modal && e.target === modal) modal.style.display = 'none';
    });

    // 6. Status Checking Logic
    const checkStatusBtn = document.getElementById('checkStatusBtn');
    const statusEmailInput = document.getElementById('statusEmail');
    const statusResult = document.getElementById('statusResult');
    const statusError = document.getElementById('statusError');
    const resName = document.getElementById('resName');
    const resStatus = document.getElementById('resStatus');
    const statusSteps = document.querySelectorAll('.step');

    if (checkStatusBtn) {
        checkStatusBtn.addEventListener('click', () => {
            const email = statusEmailInput.value.toLowerCase();
            const apps = JSON.parse(localStorage.getItem('ngo_apps') || '{}');
            
            if (apps[email]) {
                const app = apps[email];
                statusResult.style.display = 'block';
                statusError.style.display = 'none';
                resName.innerText = app.name;
                resStatus.innerText = app.status;

                // Update Progress Steps UI
                statusSteps.forEach(step => step.classList.remove('active', 'completed'));
                
                if (app.status === 'Pending Review') {
                    statusSteps[0].classList.add('completed');
                    statusSteps[1].classList.add('active');
                } else if (app.status === 'Onboarding') {
                    statusSteps[0].classList.add('completed');
                    statusSteps[1].classList.add('completed');
                    statusSteps[2].classList.add('active');
                }
                
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
            if (backToTopBtn) backToTopBtn.style.display = 'block';
        } else {
            if (backToTopBtn) backToTopBtn.style.display = 'none';
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

/* Animation Styles */
const styleElement = document.createElement('style');
styleElement.textContent = `
    .fade-in-section { opacity: 0; transform: translateY(30px); transition: all 0.8s ease-out; }
    .fade-in-visible { opacity: 1 !important; transform: translateY(0) !important; }
`;
document.head.appendChild(styleElement);
