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
    
    const helpTypeSelect = document.getElementById('helpType');
    const donationAmountGroup = document.getElementById('donationAmountGroup');
    const donationAmountInput = document.getElementById('donationAmount');

    if (helpTypeSelect && donationAmountGroup) {
        helpTypeSelect.addEventListener('change', (e) => {
            if (e.target.value === 'donate') {
                donationAmountGroup.style.display = 'block';
                if (donationAmountInput) donationAmountInput.setAttribute('required', 'true');
            } else {
                donationAmountGroup.style.display = 'none';
                if (donationAmountInput) donationAmountInput.removeAttribute('required');
            }
        });
    }

    if (actionForm) {
        actionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = actionForm.querySelector('input[type="text"]').value;
            const email = actionForm.querySelector('input[type="email"]').value;
            const type = helpTypeSelect ? helpTypeSelect.value : 'volunteer';
            let amount = 0;
            if (type === 'donate' && donationAmountInput) {
                amount = donationAmountInput.value;
            }

            const applications = JSON.parse(localStorage.getItem('ngo_apps') || '{}');
            applications[email.toLowerCase()] = { 
                name, 
                status: 'Pending Review',
                type: type,
                amount: amount,
                date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
            };
            localStorage.setItem('ngo_apps', JSON.stringify(applications));

            if (modal) modal.style.display = 'flex';
            actionForm.reset();
            if (donationAmountGroup) donationAmountGroup.style.display = 'none';
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

    // Dynamic Gallery Rendering
    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryGrid) {
        let galleryImages = JSON.parse(localStorage.getItem('ngo_gallery') || '[]');
        if (galleryImages.length === 0) {
            galleryImages = [
                "https://images.unsplash.com/photo-1509099836639-18ba1795216d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1524069290683-0457abfe42c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            ];
            localStorage.setItem('ngo_gallery', JSON.stringify(galleryImages));
        }

        galleryGrid.innerHTML = galleryImages.map(img => `
            <div class="gallery-item"><img src="${img}" alt="Gallery Image"></div>
        `).join('');
    }

    // Dark Mode Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const rootElement = document.documentElement;
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

    const savedTheme = localStorage.getItem('ngo_theme');
    if (savedTheme === 'dark') {
        rootElement.classList.add('dark-mode');
        if (themeIcon) themeIcon.className = 'fas fa-sun';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            rootElement.classList.toggle('dark-mode');
            const isDark = rootElement.classList.contains('dark-mode');
            
            if (themeIcon) {
                themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
            }
            
            localStorage.setItem('ngo_theme', isDark ? 'dark' : 'light');
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
