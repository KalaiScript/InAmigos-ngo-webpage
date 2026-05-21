document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 2. Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
            header.style.background = 'rgba(5, 5, 5, 0.95)';
        } else {
            header.style.padding = '1rem 0';
            header.style.background = 'rgba(5, 5, 5, 0.8)';
        }
    });

    // 3. Contact Form Submission (Mock)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic UI feedback
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Transmitting Data...';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            setTimeout(() => {
                alert('Success! Your message has been encrypted and sent to our AI core. We will contact you shortly.');
                contactForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
                btn.style.opacity = '1';
            }, 1500);
        });
    }

    // 4. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Mobile Menu Toggle (Simplified)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 6. Admin Dashboard Section Toggling
    const adminNavLinks = document.querySelectorAll('.admin-nav-link');
    const adminSections = document.querySelectorAll('.admin-section');

    if (adminNavLinks.length > 0) {
        // Simple Auth Check
        if (window.location.pathname.includes('admin.html') && !localStorage.getItem('adminLoggedIn')) {
            window.location.href = 'login.html';
        }

        adminNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSectionId = link.getAttribute('data-section');

                adminNavLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                adminSections.forEach(section => {
                    if (section.id === targetSectionId) {
                        section.classList.add('active');
                        const reveals = section.querySelectorAll('.reveal');
                        reveals.forEach(r => r.classList.add('active'));
                    } else {
                        section.classList.remove('active');
                    }
                });
            });
        });
    }

    // 7. Message View Logic
    const viewModal = document.getElementById('viewModal');
    if (viewModal) {
        document.body.addEventListener('click', (e) => {
            if (e.target.classList.contains('view-message')) {
                const sender = e.target.getAttribute('data-sender');
                const content = e.target.getAttribute('data-content');
                document.getElementById('modalSender').innerText = `From: ${sender}`;
                document.getElementById('modalBody').innerText = content;
                viewModal.classList.add('active');
            }
        });

        viewModal.querySelector('.modal-close').addEventListener('click', () => {
            viewModal.classList.remove('active');
        });
    }

    // 8. New Manual Entry (Simulated)
    const newBtn = document.getElementById('newTransmission');
    if (newBtn) {
        newBtn.addEventListener('click', () => {
            const tbody = document.getElementById('messageBody');
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>Manual Entry</td>
                <td>Direct Log</td>
                <td><span class="badge active">New</span></td>
                <td><button class="btn-small view-message" data-sender="Manual Entry" data-content="Manually entered system log for testing purposes.">View</button></td>
            `;
            tbody.prepend(newRow);
            alert('Manual transmission logged to core.');
        });
    }

    // 9. Settings Save Feedback
    const settingsForm = document.querySelector('#settings button.primary');
    if (settingsForm) {
        settingsForm.addEventListener('click', () => {
            alert('System parameters updated. AI Core synchronized.');
        });
    }
});
