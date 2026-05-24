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

    // 3. Contact Form Submission (Mock to LocalStorage)
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

            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const msg = document.getElementById('message').value;

            // Save to localStorage
            const messages = JSON.parse(localStorage.getItem('adminMessages') || '[]');
            messages.push({
                id: Date.now(),
                sender: name,
                email: email,
                subject: 'New Inquiry',
                content: msg,
                status: 'New',
                date: new Date().toLocaleDateString()
            });
            localStorage.setItem('adminMessages', JSON.stringify(messages));

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
    const navItems = document.querySelectorAll('.nav-links a');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            });
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

    // 10. Pathfinder AI Widget Logic
    const pfAnalyzeBtn = document.getElementById('pf-analyze-btn');
    const pfInput = document.getElementById('pf-skills');
    const pfOutput = document.getElementById('pf-output');

    if (pfAnalyzeBtn && pfInput && pfOutput) {
        const careers = [
            "Data Scientist", "Machine Learning Engineer", "Prompt Engineer",
            "AI Ethicist", "Robotics Programmer", "NLP Specialist",
            "Predictive Analyst", "AI Product Manager", "Computer Vision Engineer"
        ];

        pfAnalyzeBtn.addEventListener('click', () => {
            const val = pfInput.value.trim();
            if (!val) return;

            pfAnalyzeBtn.disabled = true;
            pfOutput.innerHTML = '<div class="typing-effect">Analyzing neural pathways...</div>';

            setTimeout(() => {
                pfOutput.innerHTML = '<div class="typing-effect">Cross-referencing global job markets...</div>';

                setTimeout(() => {
                    const randomCareer = careers[Math.floor(Math.random() * careers.length)];
                    const matchScore = (Math.random() * 15 + 84).toFixed(1);
                    pfOutput.innerHTML = `
                        <div>
                            <span style="color: var(--text-muted); font-size: 0.9rem;">Optimal Alignment:</span><br>
                            <span style="font-size: 1.5rem; text-transform: uppercase; color: var(--primary); text-shadow: 0 0 10px var(--primary);">${randomCareer}</span><br>
                            <span style="color: var(--text-main); font-size: 0.85rem; margin-top: 10px; display: inline-block;">Match Confidence: ${matchScore}%</span><br>
                            <button class="btn-small" style="margin-top: 15px;" onclick="document.getElementById('contact').scrollIntoView({behavior: 'smooth'})">Get Career Roadmap</button>
                        </div>
                    `;
                    pfAnalyzeBtn.disabled = false;
                }, 1500);
            }, 1500);
        });
    }

    // 11. Admin Panel Dynamic Data Load & Chart.js
    const adminPageCheck = document.querySelector('.admin-page');
    if (adminPageCheck) {
        // Load messages from localStorage
        const tbody = document.getElementById('messageBody');
        if (tbody) {
            let messages = JSON.parse(localStorage.getItem('adminMessages') || '[]');

            // Add some default messages if empty for showcase
            if (messages.length === 0) {
                messages = [
                    { id: 1, sender: "Alex Johnson", subject: "Pathfinder Feedback", content: "Pathfinder identified exactly what I needed. Great tool!", status: "New" },
                    { id: 2, sender: "Sarah Miller", subject: "Partnership Inquiry", content: "Interested in integrating your AI with our university portal.", status: "Read" }
                ];
                localStorage.setItem('adminMessages', JSON.stringify(messages));
            }

            messages.slice().reverse().forEach(msg => {
                const tr = document.createElement('tr');
                const badgeClass = msg.status === 'New' ? 'badge active' : 'badge';
                tr.innerHTML = `
                    <td>${msg.sender}</td>
                    <td>${msg.subject}</td>
                    <td><span class="${badgeClass}">${msg.status}</span></td>
                    <td><button class="btn-small view-message" data-sender="${msg.sender}" data-content="${msg.content}">View</button></td>
                `;
                tbody.appendChild(tr);
            });
        }

        // Initialize Chart.js
        const ctx = document.getElementById('usageChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                    datasets: [{
                        label: 'AI Analyses Processed',
                        data: [12000, 19000, 25000, 32000, 48000, 65000, 84921],
                        borderColor: '#00f2ff',
                        backgroundColor: 'rgba(0, 242, 255, 0.1)',
                        borderWidth: 2,
                        pointBackgroundColor: '#7000ff',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#7000ff',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: { color: '#ffffff' }
                        }
                    },
                    scales: {
                        y: {
                            grid: { color: 'rgba(255, 255, 255, 0.05)' },
                            ticks: { color: '#a0a0a0' }
                        },
                        x: {
                            grid: { color: 'rgba(255, 255, 255, 0.05)' },
                            ticks: { color: '#a0a0a0' }
                        }
                    }
                }
            });
        }
    }
        // 12. Logout Logic
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('adminLoggedIn');
            window.location.href = 'login.html';
        });
    }

    // 13. CSV Export Logic
    const exportCsvBtn = document.getElementById('exportCsv');
    if (exportCsvBtn) {
        exportCsvBtn.addEventListener('click', () => {
            let messages = JSON.parse(localStorage.getItem('adminMessages') || '[]');
            if (messages.length === 0) {
                alert('No data to export.');
                return;
            }
            
            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += "ID,Sender,Email,Subject,Content,Status,Date\n";
            
            messages.forEach(msg => {
                let email = msg.email ? msg.email.replace(/"/g, '""') : '';
                let content = msg.content ? msg.content.replace(/"/g, '""') : '';
                let row = `${msg.id},"${msg.sender}","${email}","${msg.subject}","${content}","${msg.status}","${msg.date || ''}"`;
                csvContent += row + "\n";
            });
            
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "transmissions.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
});
