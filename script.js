/* =============================================
   NamGT Portfolio — JavaScript
   ============================================= */

// --- Page Loader ---
(function initLoader() {
    const loader = document.getElementById('page-loader');
    const progress = document.getElementById('loader-progress');
    if (!loader || !progress) return;

    let width = 0;
    const interval = setInterval(() => {
        width += Math.random() * 15 + 5;
        if (width >= 100) width = 100;
        progress.style.width = width + '%';
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = '';
            }, 400);
        }
    }, 100);

    document.body.style.overflow = 'hidden';
})();


// --- Particle Background ---
(function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }

    function createParticle() {
        return {
            x: Math.random() * canvas.width, y: Math.random() * canvas.height,
            size: Math.random() * 1.5 + 0.5,
            speedX: (Math.random() - 0.5) * 0.3, speedY: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.4 + 0.1
        };
    }

    function init() {
        resize();
        const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 120);
        particles = [];
        for (let i = 0; i < count; i++) particles.push(createParticle());
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, i) => {
            p.x += p.speedX; p.y += p.speedY;
            if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(108, 99, 255, ${p.opacity})`; ctx.fill();
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dist = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
                if (dist < 120) {
                    ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(108, 99, 255, ${0.06 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5; ctx.stroke();
                }
            }
        });
        animationId = requestAnimationFrame(draw);
    }

    init(); draw();
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => { cancelAnimationFrame(animationId); init(); draw(); }, 200);
    });
})();


// --- Theme & Language Toggles ---
(function initToggles() {
    const themeBtn = document.getElementById('theme-toggle');
    const langBtn = document.getElementById('lang-toggle');
    const root = document.documentElement;

    // Load saved preferences
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) root.setAttribute('data-theme', savedTheme);

    const savedLang = localStorage.getItem('lang');
    if (savedLang) root.setAttribute('lang', savedLang);

    // Theme Toggle
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isLight = root.getAttribute('data-theme') === 'light';
            const newTheme = isLight ? 'dark' : 'light';
            root.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Lang Toggle
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const isEn = root.getAttribute('lang') === 'en';
            const newLang = isEn ? 'vi' : 'en';
            root.setAttribute('lang', newLang);
            localStorage.setItem('lang', newLang);
            
            // Dispatch event for typewriter to catch
            window.dispatchEvent(new Event('languageChanged'));
        });
    }
})();

// --- Typewriter Effect ---
(function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;
    
    const phrasesVi = [
        'Developer đam mê Khoa học máy tính',
        'Thành thạo HTML, Node.js, TypeScript',
        'Fan Ngoại hạng Anh ⚽',
        'Đến từ Bình Định, Việt Nam 🇻🇳',
        'Chia sẻ source miễn phí cho cộng đồng'
    ];
    
    const phrasesEn = [
        'Passionate Computer Science Developer',
        'Proficient in HTML, Node.js, TypeScript',
        'Premier League Fan ⚽',
        'From Binh Dinh, Vietnam 🇻🇳',
        'Sharing free sources with the community'
    ];
    
    let phrases = document.documentElement.getAttribute('lang') === 'en' ? phrasesEn : phrasesVi;
    
    window.addEventListener('languageChanged', () => {
        phrases = document.documentElement.getAttribute('lang') === 'en' ? phrasesEn : phrasesVi;
    });

    let phraseIdx = 0, charIdx = 0, isDeleting = false, pauseMs = 0;

    function tick() {
        const current = phrases[phraseIdx];
        if (pauseMs > 0) { pauseMs -= 50; setTimeout(tick, 50); return; }
        if (!isDeleting) {
            el.textContent = current.substring(0, charIdx + 1); charIdx++;
            if (charIdx === current.length) { isDeleting = true; pauseMs = 2000; }
        } else {
            el.textContent = current.substring(0, charIdx - 1); charIdx--;
            if (charIdx === 0) { isDeleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; }
        }
        setTimeout(tick, isDeleting ? 30 : 60);
    }
    setTimeout(tick, 1000);
})();


// --- Navbar ---
(function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        let current = '';
        sections.forEach(s => { if (window.scrollY >= s.offsetTop - 150) current = s.id; });
        navLinks.forEach(l => {
            l.classList.toggle('active', l.getAttribute('href') === '#' + current);
        });

        // Update Reading Progress Bar
        const scrollPx = document.documentElement.scrollTop || document.body.scrollTop;
        const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollPx / winHeightPx) * 100;
        document.getElementById('reading-progress').style.width = scrolled + '%';
    });
})();


// --- Mobile Nav Toggle ---
(function initMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        const isActive = toggle.classList.toggle('active');
        links.classList.toggle('active');
        toggle.setAttribute('aria-expanded', isActive);
        toggle.setAttribute('aria-label', isActive ? 'Đóng menu' : 'Mở menu');
    });
    links.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active'); links.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Mở menu');
        });
    });
})();


// --- Scroll Reveal ---
(function initScrollReveal() {
    const elements = document.querySelectorAll(
        '.about-text, .about-card, .skill-item, .interest-card, .project-card, .source-card, .sources-cta, .contact-info-side, .contact-form'
    );
    elements.forEach(el => el.classList.add('fade-in'));
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    elements.forEach(el => observer.observe(el));
})();


// --- Skill Bar Animation ---
(function initSkillBars() {
    const fills = document.querySelectorAll('.skill-fill[data-level]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.dataset.level + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    fills.forEach(f => observer.observe(f));
})();


// --- Back to Top ---
(function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 600);
    });
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();


// --- Contact Form ---
(function initContactForm() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    const submitBtn = document.getElementById('form-submit');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Basic validation
        const name = form.querySelector('#form-name').value.trim();
        const email = form.querySelector('#form-email').value.trim();
        const message = form.querySelector('#form-message').value.trim();

        if (!name || !email || !message) {
            status.textContent = 'Vui lòng điền đầy đủ thông tin.';
            status.className = 'form-status error';
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            status.textContent = 'Email không hợp lệ.';
            status.className = 'form-status error';
            return;
        }

        // Show loading
        submitBtn.querySelector('.btn-text').style.display = 'none';
        submitBtn.querySelector('.btn-loading').style.display = 'inline';
        submitBtn.disabled = true;

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });

            if (response.ok) {
                status.textContent = '✅ Tin nhắn đã được gửi thành công! Cảm ơn bạn.';
                status.className = 'form-status success';
                form.reset();
            } else {
                throw new Error('Lỗi gửi form');
            }
        } catch (err) {
            status.textContent = '❌ Có lỗi xảy ra. Hãy gửi email trực tiếp đến contact@namgt.xyz';
            status.className = 'form-status error';
        }

        submitBtn.querySelector('.btn-text').style.display = 'inline';
        submitBtn.querySelector('.btn-loading').style.display = 'none';
        submitBtn.disabled = false;
    });
})();


// --- Audio Player ---
(function initAudioPlayer() {
    const playerEl = document.getElementById('audio-player');
    const toggleBtn = document.getElementById('audio-toggle');
    if (!playerEl || !toggleBtn) return;

    // Create audio context for generating ambient sound
    let audioCtx = null;
    let isPlaying = false;
    let nodes = {};

    function createAmbientSound() {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        // Master gain
        const master = audioCtx.createGain();
        master.gain.value = 0.15;
        master.connect(audioCtx.destination);

        // Pad 1 - low drone
        const osc1 = audioCtx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.value = 110;
        const gain1 = audioCtx.createGain();
        gain1.gain.value = 0.3;
        osc1.connect(gain1);
        gain1.connect(master);

        // Pad 2 - soft fifth
        const osc2 = audioCtx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.value = 165;
        const gain2 = audioCtx.createGain();
        gain2.gain.value = 0.15;
        osc2.connect(gain2);
        gain2.connect(master);

        // Pad 3 - higher octave shimmer
        const osc3 = audioCtx.createOscillator();
        osc3.type = 'sine';
        osc3.frequency.value = 220;
        const gain3 = audioCtx.createGain();
        gain3.gain.value = 0.08;
        osc3.connect(gain3);
        gain3.connect(master);

        // Gentle noise layer for texture
        const bufferSize = audioCtx.sampleRate * 2;
        const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.01;
        const noise = audioCtx.createBufferSource();
        noise.buffer = noiseBuffer;
        noise.loop = true;
        const noiseFilter = audioCtx.createBiquadFilter();
        noiseFilter.type = 'lowpass';
        noiseFilter.frequency.value = 400;
        const noiseGain = audioCtx.createGain();
        noiseGain.gain.value = 0.5;
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(master);

        // Slow LFO for movement
        const lfo = audioCtx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.05;
        const lfoGain = audioCtx.createGain();
        lfoGain.gain.value = 5;
        lfo.connect(lfoGain);
        lfoGain.connect(osc1.frequency);

        osc1.start(); osc2.start(); osc3.start(); noise.start(); lfo.start();

        nodes = { osc1, osc2, osc3, noise, lfo, master, gain1, gain2, gain3 };
    }

    function fadeIn() {
        if (!nodes.master) return;
        nodes.master.gain.cancelScheduledValues(audioCtx.currentTime);
        nodes.master.gain.setValueAtTime(nodes.master.gain.value, audioCtx.currentTime);
        nodes.master.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + 1);
    }

    function fadeOut() {
        if (!nodes.master) return;
        nodes.master.gain.cancelScheduledValues(audioCtx.currentTime);
        nodes.master.gain.setValueAtTime(nodes.master.gain.value, audioCtx.currentTime);
        nodes.master.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
    }

    toggleBtn.addEventListener('click', () => {
        if (!isPlaying) {
            if (!audioCtx) createAmbientSound();
            if (audioCtx.state === 'suspended') audioCtx.resume();
            fadeIn();
            isPlaying = true;
            playerEl.classList.add('playing');
            playerEl.classList.remove('muted');
        } else {
            fadeOut();
            isPlaying = false;
            playerEl.classList.remove('playing');
            playerEl.classList.add('muted');
        }
    });
})();


// --- Smooth Scroll ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});


// --- Terminal Detection ---
(function initTerminal() {
    const osEl = document.getElementById('term-os');
    const browserEl = document.getElementById('term-browser');
    const ipEl = document.getElementById('term-ip');
    if (!osEl || !browserEl || !ipEl) return;

    // Detect OS
    function getOS() {
        const ua = navigator.userAgent;
        const pd = navigator.platform;
        if (/Win/i.test(pd)) return 'Windows';
        if (/Mac/i.test(pd)) return 'macOS';
        if (/Linux/i.test(pd)) return 'Linux';
        if (/Android/i.test(ua)) return 'Android';
        if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS';
        if (/CrOS/i.test(ua)) return 'ChromeOS';
        return 'Unknown';
    }

    // Detect Browser
    function getBrowser() {
        const ua = navigator.userAgent;
        if (ua.includes('Edg/')) return 'Edge';
        if (ua.includes('OPR/') || ua.includes('Opera')) return 'Opera';
        if (ua.includes('Brave')) return 'Brave';
        if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
        if (ua.includes('Firefox')) return 'Firefox';
        if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
        if (ua.includes('MSIE') || ua.includes('Trident')) return 'IE';
        return 'Unknown';
    }

    // Fill OS & Browser after animation delay
    setTimeout(() => {
        osEl.textContent = getOS();
        browserEl.textContent = getBrowser();
    }, 1800);

    // Fetch IP
    setTimeout(() => {
        fetch('https://api.ipify.org?format=json')
            .then(r => r.json())
            .then(data => { ipEl.textContent = data.ip; })
            .catch(() => { ipEl.textContent = 'không thể xác định'; });
    }, 2600);
})();

// --- Security & Anti-Copy Module ---
(function initSecurity() {
    // 1. Console Warning
    console.log(
        "%cDỪNG LẠI! %c\nĐây là tính năng dành cho nhà phát triển.\nNếu ai đó bảo bạn copy/paste nội dung vào đây, đó có thể là lừa đảo (Scam). \n\n%c© 2026 Bản quyền mã nguồn thuộc về NamGT. Mọi hành vi sao chép mà không được phép là vi phạm!",
        "color: red; font-size: 40px; font-weight: bold; text-shadow: 2px 2px 0 #000;",
        "color: white; font-size: 16px;",
        "color: #00d4aa; font-size: 14px; font-weight: bold;"
    );

    // 2. Disable Right Click
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });

    // 3. Disable F12, Ctrl+Shift+I, Ctrl+U
    document.addEventListener('keydown', function(e) {
        // F12
        if (e.key === 'F12' || e.keyCode === 123) {
            e.preventDefault();
        }
        // Ctrl+Shift+I / J / C
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C' || e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67 || e.key === 'i' || e.key === 'j' || e.key === 'c')) {
            e.preventDefault();
        }
        // Ctrl+U (View Source)
        if (e.ctrlKey && (e.key === 'U' || e.key === 'u' || e.keyCode === 85)) {
            e.preventDefault();
        }
    });

    // 4. Domain Lock Check
    // List of allowed domains (include localhost for your testing)
    const allowedDomains = ['localhost', '127.0.0.1', 'namgt.xyz', 'www.namgt.xyz', 'namgtitm.github.io'];
    const currentDomain = window.location.hostname;
    
    // Only check if it's served over HTTP/HTTPS (not file:///)
    if (currentDomain !== '' && !allowedDomains.includes(currentDomain)) {
        // Obliterate the DOM and show a copyright error
        document.body.innerHTML = `
            <div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#0a0a0f;color:#ff5f57;font-family:sans-serif;text-align:center;padding:20px;line-height:1.6;">
                <div>
                    <h1 style="font-size:2.5rem;margin-bottom:20px;">⚠ VI PHẠM BẢN QUYỀN</h1>
                    <p style="font-size:1.2rem;color:#f0f0f5;">Trang web này đã bị sao chép trái phép lên tên miền không được cấp quyền.</p>
                    <p style="font-size:1rem;color:#808096;margin-top:10px;">Mã nguồn gốc thuộc sở hữu của <strong>NamGT</strong>.</p>
                </div>
            </div>
        `;
        // Stop further execution
        throw new Error('Copyright Violation: Unauthorized Domain Execution');
    }
})();
