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
    const volunteerFields = document.getElementById('volunteerFields');
    const donationFields = document.getElementById('donationFields');
    const donationAmountInput = document.getElementById('donationAmount');

    if (helpTypeSelect) {
        helpTypeSelect.addEventListener('change', (e) => {
            if (e.target.value === 'donate') {
                if(volunteerFields) volunteerFields.style.display = 'none';
                if(donationFields) donationFields.style.display = 'block';
                if(donationAmountInput) donationAmountInput.setAttribute('required', 'true');
            } else if (e.target.value === 'volunteer') {
                if(donationFields) donationFields.style.display = 'none';
                if(volunteerFields) volunteerFields.style.display = 'block';
                if(donationAmountInput) donationAmountInput.removeAttribute('required');
            } else {
                if(volunteerFields) volunteerFields.style.display = 'none';
                if(donationFields) donationFields.style.display = 'none';
                if(donationAmountInput) donationAmountInput.removeAttribute('required');
            }
        });
    }

    if (actionForm) {
        actionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('joinName') ? document.getElementById('joinName').value : actionForm.querySelector('input[type="text"]').value;
            const email = document.getElementById('joinEmail') ? document.getElementById('joinEmail').value : actionForm.querySelector('input[type="email"]').value;
            const phone = document.getElementById('joinPhone') ? document.getElementById('joinPhone').value : '';
            const city = document.getElementById('joinCity') ? document.getElementById('joinCity').value : '';
            
            const type = helpTypeSelect ? helpTypeSelect.value : 'volunteer';
            
            let amount = 0;
            let paymentMethod = '';
            let skill = '';
            let availability = '';

            if (type === 'donate') {
                amount = donationAmountInput ? donationAmountInput.value : 0;
                paymentMethod = document.getElementById('paymentMethod') ? document.getElementById('paymentMethod').value : '';
            } else if (type === 'volunteer') {
                skill = document.getElementById('volunteerSkill') ? document.getElementById('volunteerSkill').value : '';
                availability = document.getElementById('volunteerAvailability') ? document.getElementById('volunteerAvailability').value : '';
            }

            const applications = JSON.parse(localStorage.getItem('ngo_apps') || '{}');
            applications[email.toLowerCase()] = { 
                name, 
                phone,
                city,
                status: 'Pending Review',
                type: type,
                amount: amount,
                paymentMethod: paymentMethod,
                skill: skill,
                availability: availability,
                date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
            };
            localStorage.setItem('ngo_apps', JSON.stringify(applications));

            if (modal) modal.style.display = 'flex';
            actionForm.reset();
            if (helpTypeSelect) helpTypeSelect.dispatchEvent(new Event('change'));
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

    // FAQ Accordion Logic
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');
            
            // Close all
            document.querySelectorAll('.faq-answer').forEach(a => {
                a.style.maxHeight = null;
                a.previousElementSibling.classList.remove('active');
            });

            if (!isActive) {
                question.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // Newsletter Logic
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterMsg = document.getElementById('newsletterMsg');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('newsletterEmail').value;
            const subs = JSON.parse(localStorage.getItem('ngo_subs') || '[]');
            if (!subs.includes(email)) {
                subs.push(email);
                localStorage.setItem('ngo_subs', JSON.stringify(subs));
            }
            newsletterForm.reset();
            newsletterMsg.style.display = 'block';
            setTimeout(() => { newsletterMsg.style.display = 'none'; }, 3000);
        });
    }

    // Dynamic Events Rendering
    const eventsGrid = document.getElementById('eventsGrid');
    if (eventsGrid) {
        let events = JSON.parse(localStorage.getItem('ngo_events') || '[]');
        if (events.length === 0) {
            events = [
                { title: 'Mega Blood Donation Drive', date: '25 May 2026', location: 'City Center Hospital', desc: 'Join hands to save lives. Blood donation camps set up across the city.' },
                { title: 'Coastal Cleanup Campaign', date: '02 Jun 2026', location: 'Marina Beach', desc: 'Help us clear plastic waste and preserve marine life.' }
            ];
            localStorage.setItem('ngo_events', JSON.stringify(events));
        }

        eventsGrid.innerHTML = events.map(ev => `
            <div class="event-card">
                <span class="event-date"><i class="far fa-calendar-alt"></i> ${ev.date}</span>
                <h3>${ev.title}</h3>
                <p><i class="fas fa-map-marker-alt"></i> ${ev.location}</p>
                <p>${ev.desc}</p>
                <a href="#contact-form" class="btn btn-outline btn-trigger" data-type="volunteer">Register Now</a>
            </div>
        `).join('');
    }

    // Dynamic Success Stories / Testimonials Rendering
    const testimonialGrid = document.getElementById('testimonialGrid');
    if (testimonialGrid) {
        let stories = JSON.parse(localStorage.getItem('ngo_stories') || 'null');
        if (!stories) {
            stories = [
                { name: "Aarti K.", role: "Student Beneficiary", quote: "Project Shiksha completely changed my life. I am now pursuing my higher education and dream of becoming a teacher to help others.", image: "https://randomuser.me/api/portraits/women/44.jpg" },
                { name: "Ravi S.", role: "Volunteer", quote: "Volunteering with Health First gave me an opportunity to give back to my community. It's incredibly fulfilling.", image: "https://randomuser.me/api/portraits/men/32.jpg" }
            ];
            localStorage.setItem('ngo_stories', JSON.stringify(stories));
        }

        if (stories.length > 0) {
            testimonialGrid.innerHTML = stories.map(s => `
                <div class="testimonial-card">
                    <i class="fas fa-quote-left quote-icon"></i>
                    <p>"${s.quote}"</p>
                    <div class="testimonial-author">
                        <img src="${s.image}" alt="${s.name}">
                        <div>
                            <h4>${s.name}</h4>
                            <span>${s.role}</span>
                        </div>
                    </div>
                </div>
            `).join('');
        }
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

    // 7. Visitor Counter
    const visitorCountEl = document.getElementById('visitorCount');
    if (visitorCountEl) {
        let visits = parseInt(localStorage.getItem('ngo_visits') || '0');
        visits++;
        localStorage.setItem('ngo_visits', visits.toString());

        // Animate the count
        let current = 0;
        const step = Math.max(1, Math.floor(visits / 60));
        const counterInterval = setInterval(() => {
            current += step;
            if (current >= visits) {
                current = visits;
                clearInterval(counterInterval);
            }
            visitorCountEl.textContent = current.toLocaleString();
        }, 20);
    }

    // 8. Dynamic Volunteer Spotlight Carousel
    const spotlightTrack = document.getElementById('spotlightTrack');
    const spotlightDotsContainer = document.getElementById('spotlightDots');

    if (spotlightTrack && spotlightDotsContainer) {
        let spotlights = JSON.parse(localStorage.getItem('ngo_spotlights') || 'null');
        if (!spotlights) {
            spotlights = [
                { name: "Priya Sharma", badge: "Volunteer of the Month", role: "Teaching & Education", quote: "Seeing children's faces light up when they learn something new makes every moment worth it.", image: "https://randomuser.me/api/portraits/women/65.jpg", stat1: "120+", stat1Label: "Hours", stat2: "45", stat2Label: "Students", stat3: "8", stat3Label: "Months" },
                { name: "Arjun Patel", badge: "Community Hero", role: "Medical / Healthcare", quote: "Every health camp we organize brings essential care to those who need it the most.", image: "https://randomuser.me/api/portraits/men/75.jpg", stat1: "200+", stat1Label: "Hours", stat2: "300", stat2Label: "Patients", stat3: "12", stat3Label: "Months" },
                { name: "Sneha Reddy", badge: "Rising Star", role: "Marketing / Social Media", quote: "Sharing our stories online has helped us reach thousands and inspire new volunteers.", image: "https://randomuser.me/api/portraits/women/45.jpg", stat1: "80+", stat1Label: "Hours", stat2: "5K", stat2Label: "Reach", stat3: "6", stat3Label: "Months" }
            ];
            localStorage.setItem('ngo_spotlights', JSON.stringify(spotlights));
        }

        // Render spotlight cards
        if (spotlights.length > 0) {
            spotlightTrack.innerHTML = spotlights.map((s, i) => `
                <div class="spotlight-card ${i === 0 ? 'active' : ''}">
                    <div class="spotlight-avatar">
                        <img src="${s.image}" alt="${s.name}">
                    </div>
                    <div class="spotlight-info">
                        <span class="spotlight-badge"><i class="fas fa-star"></i> ${s.badge}</span>
                        <h3>${s.name}</h3>
                        <p class="spotlight-role">${s.role}</p>
                        <p class="spotlight-quote">"${s.quote}"</p>
                        <div class="spotlight-stats">
                            <div><strong>${s.stat1}</strong><span>${s.stat1Label}</span></div>
                            <div><strong>${s.stat2}</strong><span>${s.stat2Label}</span></div>
                            <div><strong>${s.stat3}</strong><span>${s.stat3Label}</span></div>
                        </div>
                    </div>
                </div>
            `).join('');

            // Render dots
            spotlightDotsContainer.innerHTML = spotlights.map((_, i) =>
                `<span class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`
            ).join('');

            // Carousel logic
            const cards = spotlightTrack.querySelectorAll('.spotlight-card');
            const dots = spotlightDotsContainer.querySelectorAll('.dot');
            let spotlightIndex = 0;

            function showSpotlight(index) {
                cards.forEach(c => c.classList.remove('active'));
                dots.forEach(d => d.classList.remove('active'));
                if (cards[index]) cards[index].classList.add('active');
                if (dots[index]) dots[index].classList.add('active');
            }

            // Auto-rotate every 4 seconds
            setInterval(() => {
                spotlightIndex = (spotlightIndex + 1) % cards.length;
                showSpotlight(spotlightIndex);
            }, 4000);

            // Click dots to navigate
            dots.forEach(dot => {
                dot.addEventListener('click', () => {
                    spotlightIndex = parseInt(dot.getAttribute('data-index'));
                    showSpotlight(spotlightIndex);
                });
            });
        }
    }
});

/* Animation Styles */
const styleElement = document.createElement('style');
styleElement.textContent = `
    .fade-in-section { opacity: 0; transform: translateY(30px); transition: all 0.8s ease-out; }
    .fade-in-visible { opacity: 1 !important; transform: translateY(0) !important; }
`;
document.head.appendChild(styleElement);
