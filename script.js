    (() => {

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetEl = document.getElementById(targetId);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    history.pushState(null, '', `#${targetId}`);
                }
            });
        });


        const panel = document.getElementById('mobile-panel');
        const openMenu = () => { panel.classList.add('open'); document.body.style.overflow = 'hidden'; };
        const closeMenu = () => { panel.classList.remove('open'); document.body.style.overflow = ''; };

        document.getElementById('menu-btn')?.addEventListener('click', openMenu);
        document.getElementById('menu-close')?.addEventListener('click', closeMenu);
        document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', closeMenu));


        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 20);
        }, { passive: true });


        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(s => {
                if (window.scrollY >= s.offsetTop - 150) current = s.id;
            });
            navLinks.forEach(l => {
                l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
            });
        }, { passive: true });




        const words = ['Discord Bot Developer', 'Roblox Scripting Specialist', 'Automation System Maker', 'Problem Solver'];
        const el = document.getElementById('typing');
        let wi = 0, ci = 0, deleting = false;

        function type() {
            const word = words[wi];
            el.textContent = deleting ? word.substring(0, --ci) : word.substring(0, ++ci);

            if (!deleting && ci === word.length) { setTimeout(type, 2200); deleting = true; return; }
            if (deleting && ci === 0) { wi = (wi + 1) % words.length; deleting = false; setTimeout(type, 400); return; }

            setTimeout(type, deleting ? 35 : 75);
        }
        type();



        const reveals = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0, rootMargin: '0px 0px 0px 0px' });

        reveals.forEach(el => observer.observe(el));





        document.getElementById('year').textContent = new Date().getFullYear();

        (async function initViewCounter() {
            const namespace = 'namgtitm_portfolio';
            const key = 'homepage';
            let views = 0;

            try {
                const response = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`);
                const data = await response.json();
                views = data.count; 
            } catch (error) {
                console.error("Đã xảy ra lỗi khi tải số lượt xem:", error);
                views = 50; 
            }

            // Hiệu ứng đếm số chạy lên (count-up)
            const desktopEl = document.getElementById('view-count-desktop');
            const mobileEl = document.getElementById('view-count-mobile');

            function animateCount(el, target) {
                if (!el) return;
                const duration = 800;
                const start = performance.now();
                const from = Math.max(0, target - 20);

                function tick(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease-out
                    const ease = 1 - Math.pow(1 - progress, 3);
                    const current = Math.round(from + (target - from) * ease);
                    el.textContent = current.toLocaleString('vi-VN');
                    if (progress < 1) requestAnimationFrame(tick);
                }
                requestAnimationFrame(tick);
            }

            animateCount(desktopEl, views);
            animateCount(mobileEl, views);
        })();


        (async function upgradeTerminal() {
            const ipEl = document.getElementById('visitor-ip');
            if (!ipEl) return;
            
            // Get OS
            let os = "Unknown OS";
            let ua = navigator.userAgent;
            if (/Windows|Win32|Win64/.test(ua)) os = "Windows";
            else if (/iPhone|iPad|iPod/.test(ua)) os = "iOS";
            else if (/Mac/.test(ua)) os = "macOS";
            else if (/Android/.test(ua)) os = "Android";
            else if (/Linux|X11/.test(ua)) os = "Linux";
            
            // Get Browser
            let browser = "Unknown Browser";
            if (/Edg/.test(ua)) browser = "Edge";
            else if (/OPR|Opera/.test(ua)) browser = "Opera";
            else if (/Chrome/.test(ua)) browser = "Chrome";
            else if (/Safari/.test(ua)) browser = "Safari";
            else if (/Firefox/.test(ua)) browser = "Firefox";
            
            try {
                const res = await fetch('https://api.ipify.org?format=json');
                const data = await res.json();
                const ip = data.ip;

                const parentStr = ipEl.parentElement;
                parentStr.innerHTML = `<span class="text-text-muted">root@server:~$</span> Đã phát hiện ra bạn!<br>
                <span class="text-text-muted">root@server:~$</span> OS: <span class="text-emerald-400">${os}</span> | Browser: <span class="text-emerald-400">${browser}</span><br>
                <span class="text-text-muted">root@server:~$</span> Xác định IP: <span id="visitor-ip-new" class="text-red-400 font-semibold"></span>`;
                
                const newIpEl = document.getElementById('visitor-ip-new');
                let i = 0;
                function typeIP() {
                    if (i < ip.length) {
                        newIpEl.textContent += ip[i];
                        i++;
                        setTimeout(typeIP, 60 + Math.random() * 40);
                    }
                }
                setTimeout(typeIP, 800);
            } catch {
                ipEl.textContent = '***.***.***.***';
            }
        })();



        const progressBar = document.getElementById('scroll-progress');
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            if(progressBar) progressBar.style.width = scrolled + '%';
        }, { passive: true });



        document.querySelectorAll('.color-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const rgb = btn.getAttribute('data-color');
                const hex = btn.getAttribute('data-hex');
                const dim = btn.getAttribute('data-dim');
                const bright = btn.getAttribute('data-bright');
                
                document.documentElement.style.setProperty('--accent', hex);
                document.documentElement.style.setProperty('--accent-rgb', rgb);
                document.documentElement.style.setProperty('--accent-dim', dim);
                document.documentElement.style.setProperty('--accent-bright', bright);
            });
        });







        const langToggles = document.querySelectorAll('#lang-toggle-desktop, #lang-toggle-mobile, #lang-toggle-panel');
        let currentLang = 'vn';
        
        const dict = {
            en: {
                nav: ['About', 'Skills', 'Projects', 'Snippets', 'Contact'],
                heroSubtitle: 'Ready for creative solutions',
                heroDesc: 'Passionate about building automated bot systems, highly interactive game scripts and designing optimal, modern applications.',
                heroBtn1: 'View Projects',
                heroBtn2: 'Contact Me',
                heroStats: ['Projects', 'Roblox Luau Projects', 'Programming Languages'],
                aboutTitle: 'Passionate about optimizing systems and building automation scripts.',
                aboutP1: 'I am a developer focused on building automated bot systems and interactive game scripts. With practical experience from various personal projects, I am passionate about turning complex logic into stable, optimized solutions that bring real value.',
                aboutP2: 'Besides developing tools, I continuously hone my algorithmic thinking, data structures, and source code optimization. Currently, I am deeply focused on the application ecosystem with Python, Node.js, and Luau to scale existing projects.',
                aboutGridLabels: ['Education', 'Location', 'Field', 'Languages'],
                aboutGridVals: ['Software Dev', 'HCMC, Vietnam', 'Bot Dev & Scripting', 'Vietnamese, English'],
                aboutSections: ['01 — ABOUT', '02 — SKILLS', '03 — PROJECTS', '04 — USEFUL CODE', '05 — GUESTBOOK', '06 — CONTACT'],
                sectionTitles: ['About Me', 'Technologies Used', 'Featured Projects', 'Source Code Library', 'Guestbook', 'Connect'],
                sectionDescs: [
                    'Tools and languages I use daily to create quality products.',
                    'Each project is a journey of learning and improving skills.',
                    'Commonly used code snippets that I have compiled.',
                    'Leave a greeting or your feedback!',
                    'Have an interesting project or collaboration opportunity? I am always ready to listen.'
                ],
                skillDescs: ['Automation & Interaction', 'Scripts & Game Systems', 'Version Control & Tools'],
                projDescs: [
                    'Automated moderation system for Discord, supporting bad word filtering, spam prevention, and real-time logs.',
                    'Custom extensions for Adonis Admin on Roblox, optimizing internal commands and server permissions.',
                    'Building community bots using discord.js or discord.py.'
                ],
                ghBtn: '<i class="fa-brands fa-github"></i> View more on GitHub',
                contactLabels: ['Location', 'Follow', 'Full Name', 'Email', 'Subject', 'Message'],
                contactBtn: '<i class="fa-solid fa-paper-plane text-xs"></i> Send Message',
                footerTop: '<i class="fa-solid fa-arrow-up text-[9px]"></i> Top'
            },
            vn: {
                nav: ['Giới thiệu', 'Kỹ năng', 'Dự án', 'Thư viện Code', 'Liên hệ'],
                heroSubtitle: 'Sẵn sàng cho các giải pháp sáng tạo',
                heroDesc: 'Đam mê xây dựng hệ thống bot tự động, lập trình kịch bản game tương tác cao và thiết kế các ứng dụng tối ưu, hiện đại.',
                heroBtn1: 'Xem dự án',
                heroBtn2: 'Liên hệ',
                heroStats: ['Dự án lớn nhỏ', 'Dự án về roblox luau', 'Ngôn ngữ lập trình'],
                aboutTitle: 'Đam mê tối ưu hóa hệ thống và xây dựng kịch bản tự động hóa.',
                aboutP1: 'Tôi là một nhà phát triển tập trung vào xây dựng hệ thống bot tự động và lập trình kịch bản trò chơi tương tác. Với kinh nghiệm thực chiến qua nhiều dự án cá nhân, tôi đam mê biến logic phức tạp thành các giải pháp chạy ổn định, tối ưu và mang lại giá trị thực tế.',
                aboutP2: 'Ngoài việc phát triển công cụ, tôi không ngừng trau dồi tư duy thuật toán, cấu trúc dữ liệu và tối ưu hóa hiệu năng mã nguồn. Hiện tại, tôi đang tập trung sâu vào hệ sinh thái ứng dụng với Python, Node.js và Luau để mở rộng quy mô các dự án hiện có.',
                aboutGridLabels: ['Học vấn', 'Địa điểm', 'Lĩnh vực', 'Ngôn ngữ'],
                aboutGridVals: ['Phát triển Phần mềm & Lập trình', 'TP.HCM, Việt Nam', 'Bot Dev & Scripting', 'Tiếng Việt, English'],
                aboutSections: ['01 — GIỚI THIỆU', '02 — KỸ NĂNG', '03 — DỰ ÁN', '04 — THƯ VIỆN CODE', '05 — SỔ LƯU BÚT', '06 — LIÊN HỆ'],
                sectionTitles: ['Về tôi', 'Công nghệ sử dụng', 'Dự án nổi bật', 'Thư Viện Mã Nguồn', 'Sổ Lưu Bút', 'Kết nối'],
                sectionDescs: [
                    'Các công cụ và ngôn ngữ tôi sử dụng hàng ngày để tạo ra sản phẩm chất lượng.',
                    'Mỗi dự án là một hành trình học hỏi và cải thiện kỹ năng.',
                    'Những đoạn code hay dùng mà mình đã tổng hợp lại.',
                    'Để lại một lời chào hoặc nhận xét của bạn nhé!',
                    'Có dự án thú vị hoặc cơ hội hợp tác? Tôi luôn sẵn sàng lắng nghe.'
                ],
                skillDescs: ['Tự động hóa & Tương tác', 'Kịch bản & Hệ thống game', 'Quản lý mã nguồn & Công cụ'],
                projDescs: [
                    'Hệ thống quản trị và kiểm duyệt tự động cho Discord, hỗ trợ lọc từ ngữ xấu, chặn spam theo tần suất và ghi nhận log thời gian thực.',
                    'Bộ tiện ích mở rộng tùy biến dành cho hệ thống quản trị Adonis Admin trên Roblox, tối ưu hóa các lệnh quản lý nội bộ và phân quyền máy chủ.',
                    'Làm những con bot sử dụng discord.js hoặc discord.py để vận hành cộng đồng.'
                ],
                ghBtn: '<i class="fa-brands fa-github"></i> Xem thêm trên GitHub',
                contactLabels: ['Địa điểm', 'Theo dõi', 'Họ tên', 'Email', 'Tiêu đề', 'Lời nhắn'],
                contactBtn: '<i class="fa-solid fa-paper-plane text-xs"></i> Gửi tin nhắn',
                footerTop: '<i class="fa-solid fa-arrow-up text-[9px]"></i> Đầu trang'
            },
            jp: {
                nav: ['紹介', 'スキル', 'プロジェクト', 'スニペット', '連絡先'],
                heroSubtitle: '創造的なソリューションのために',
                heroDesc: '自動ボットシステムの構築、インタラクティブなゲームスクリプト、最適化されたモダンなアプリケーションの設計に情熱を注いでいます。',
                heroBtn1: 'プロジェクトを見る',
                heroBtn2: 'お問い合わせ',
                heroStats: ['プロジェクト', 'Roblox Luau プロジェクト', 'プログラミング言語'],
                aboutTitle: 'システムの最適化と自動化スクリプトの構築。',
                aboutP1: '私は自動化ボットシステムとインタラクティブなゲームスクリプトの構築に重点を置く開発者です。様々なプロジェクトの経験から、複雑な論理を最適化されたソリューションに変えることに情熱を持っています。',
                aboutP2: 'ツールの開発だけでなく、アルゴリズム的思考やコードの最適化も磨いています。現在はPython、Node.js、Luauを用いたアプリケーション開発に深く取り組んでいます。',
                aboutGridLabels: ['教育', '場所', '分野', '言語'],
                aboutGridVals: ['ソフトウェア開発', 'ホーチミン市, ベトナム', 'Bot開発 & スクリプト', 'ベトナム語、英語'],
                aboutSections: ['01 — 紹介', '02 — スキル', '03 — プロジェクト', '04 — スニペット', '05 — ゲストブック', '06 — 連絡先'],
                sectionTitles: ['私について', '使用技術', '注目のプロジェクト', 'スニペットライブラリ', 'ゲストブック', '接続'],
                sectionDescs: [
                    '高品質な製品を作成するために毎日使用しているツールと技術。',
                    '各プロジェクトは学習とスキル向上の旅です。',
                    '私がまとめたよく使うコードスニペット。',
                    '挨拶やフィードバックを残してください！',
                    '面白いプロジェクトやコラボの機会がありますか？いつでもお話を伺います。'
                ],
                skillDescs: ['自動化とインタラクション', 'スクリプトとゲームシステム', 'バージョン管理とツール'],
                projDescs: [
                    '禁止用語のフィルタリング、スパム防止、リアルタイムログをサポートするDiscordの自動モデレーションシステム。',
                    'RobloxのAdonis Admin用カスタム拡張機能。内部管理コマンドとサーバー権限を最適化します。',
                    'discord.jsまたはdiscord.pyを使用してコミュニティボットを構築します。'
                ],
                ghBtn: '<i class="fa-brands fa-github"></i> GitHubでさらに見る',
                contactLabels: ['場所', 'フォロー', '氏名', 'メール', '件名', 'メッセージ'],
                contactBtn: '<i class="fa-solid fa-paper-plane text-xs"></i> メッセージを送信',
                footerTop: '<i class="fa-solid fa-arrow-up text-[9px]"></i> トップへ'
            }
        };

        const updateLanguage = () => {
            const t = dict[currentLang];
            
            const btnText = currentLang === 'vn' ? 'EN | JP' : (currentLang === 'en' ? 'JP | VN' : 'VN | EN');
            langToggles.forEach(btn => btn.textContent = btnText);
            
            document.querySelectorAll('.hidden.md\\:flex .nav-link').forEach((el, i) => { if(t.nav[i]) el.textContent = t.nav[i]; });
            document.querySelectorAll('.mobile-panel .mob-link').forEach((el, i) => { if(t.nav[i]) el.textContent = t.nav[i]; });
            
            const subtitle = document.querySelector('#hero .glow-dot')?.nextSibling;
            if(subtitle) subtitle.textContent = ' ' + t.heroSubtitle;
            const desc = document.querySelector('#hero p.text-text-secondary');
            if(desc) desc.textContent = t.heroDesc;
            const btns = document.querySelectorAll('#hero a.btn-primary, #hero a.btn-outline');
            if(btns[0]) btns[0].textContent = t.heroBtn1;
            if(btns[1]) btns[1].textContent = t.heroBtn2;
            const stats = document.querySelectorAll('#hero .text-\\[11px\\].text-text-muted.uppercase');
            if(stats.length >= 3) {
                stats[0].textContent = t.heroStats[0]; stats[1].textContent = t.heroStats[1]; stats[2].textContent = t.heroStats[2];
            }
            
            const aboutT = document.querySelector('#about p.text-xl');
            if(aboutT) aboutT.textContent = t.aboutTitle;
            const aboutPs = document.querySelectorAll('#about .lg\\:col-span-3 p.text-\\[15px\\]');
            if(aboutPs[0]) aboutPs[0].textContent = t.aboutP1;
            if(aboutPs[1]) aboutPs[1].textContent = t.aboutP2;
            const gridLabels = document.querySelectorAll('#about .grid-cols-2 .text-xs');
            gridLabels.forEach((el, i) => { if(t.aboutGridLabels[i]) el.textContent = t.aboutGridLabels[i]; });
            const gridVals = document.querySelectorAll('#about .grid-cols-2 .text-sm');
            gridVals.forEach((el, i) => { if(t.aboutGridVals[i]) el.textContent = t.aboutGridVals[i]; });

            const secLines = document.querySelectorAll('.accent-line + span');
            secLines.forEach((el, i) => { if(t.aboutSections[i]) el.textContent = t.aboutSections[i]; });
            const secTitles = document.querySelectorAll('section h2');
            secTitles.forEach((el, i) => { if(t.sectionTitles[i]) el.textContent = t.sectionTitles[i]; });
            const secDescs = document.querySelectorAll('section > div > div > p.text-text-secondary');
            secDescs.forEach((el, i) => { if(t.sectionDescs[i]) el.textContent = t.sectionDescs[i]; });

            const skillDs = document.querySelectorAll('#skills h3 + p');
            skillDs.forEach((el, i) => { if(t.skillDescs[i]) el.textContent = t.skillDescs[i]; });
            const projDs = document.querySelectorAll('#projects h3 + p');
            projDs.forEach((el, i) => { if(t.projDescs[i]) el.textContent = t.projDescs[i]; });
            
            const ghBtn = document.querySelector('#projects a.btn-outline');
            if(ghBtn) ghBtn.innerHTML = t.ghBtn;
            
            const cL = document.querySelectorAll('#contact .text-\\[11px\\].uppercase');
            if(cL[1]) cL[1].textContent = t.contactLabels[0];
            if(cL[2]) cL[2].textContent = t.contactLabels[1];
            if(cL[3]) cL[3].textContent = t.contactLabels[2];
            if(cL[4]) cL[4].textContent = t.contactLabels[3];
            if(cL[5]) cL[5].textContent = t.contactLabels[4];
            if(cL[6]) cL[6].textContent = t.contactLabels[5];
            
            const submitBtn = document.querySelector('#contact button[type="submit"]');
            if(submitBtn) submitBtn.innerHTML = t.contactBtn;
            const topBtn = document.querySelector('footer a');
            if(topBtn) topBtn.innerHTML = t.footerTop;
        };

        langToggles.forEach(btn => btn.addEventListener('click', () => {
            currentLang = currentLang === 'vn' ? 'en' : (currentLang === 'en' ? 'jp' : 'vn');
            updateLanguage();
        }));






        (function initLanyard() {
            const discordId = '770130300755640362'; // Lấy từ link avatar
            const dot = document.getElementById('discord-dot');
            const ping = document.getElementById('discord-ping');
            const text = document.getElementById('discord-text');
            if (!dot || !text) return;

            const ws = new WebSocket('wss://api.lanyard.rest/socket');
            let heartbeatInterval;

            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                
                if (data.op === 1) { // Hello
                    ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: discordId } }));
                    // Giữ kết nối (Heartbeat) mỗi 30s
                    heartbeatInterval = setInterval(() => {
                        if (ws.readyState === WebSocket.OPEN) {
                            ws.send(JSON.stringify({ op: 3 }));
                        }
                    }, data.d.heartbeat_interval);
                }

                if ((data.op === 0 && data.t === 'INIT_STATE') || data.t === 'PRESENCE_UPDATE') {
                    const p = data.t === 'INIT_STATE' ? data.d[discordId] : data.d;
                    if (!p) {
                        text.textContent = 'Chưa tham gia server Lanyard';
                        dot.className = 'relative inline-flex rounded-full h-2.5 w-2.5 bg-gray-500';
                        ping.classList.add('hidden');
                        return;
                    }

                    // Đổi màu theo trạng thái
                    const colors = { online: 'bg-emerald-500', idle: 'bg-amber-500', dnd: 'bg-red-500', offline: 'bg-gray-500' };
                    const pingColors = { online: 'bg-emerald-400', idle: 'bg-amber-400', dnd: 'bg-red-400' };
                    
                    const statusClass = colors[p.discord_status] || colors.offline;
                    dot.className = `relative inline-flex rounded-full h-2.5 w-2.5 ${statusClass}`;
                    
                    if (p.discord_status === 'offline') {
                        ping.classList.add('hidden');
                    } else {
                        ping.classList.remove('hidden');
                        ping.className = `animate-ping absolute inline-flex h-full w-full rounded-full ${pingColors[p.discord_status]} opacity-75`;
                    }

                    // Xử lý text trạng thái
                    let statusText = p.discord_status === 'online' ? 'Đang Online' : 
                                     p.discord_status === 'idle' ? 'Đang treo máy (Idle)' : 
                                     p.discord_status === 'dnd' ? 'Không làm phiền' : 'Đang Offline';

                    if (p.activities && p.activities.length > 0) {
                        const game = p.activities.find(a => a.type === 0); // Đang chơi game
                        const code = p.activities.find(a => a.name === 'Visual Studio Code'); // Đang code
                        
                        if (code) {
                            statusText = 'Đang code trên VS Code';
                        } else if (game) {
                            statusText = `Đang chơi ${game.name}`;
                        } else if (p.listening_to_spotify) {
                            statusText = `Đang nghe Spotify`;
                        }
                    }

                    text.textContent = statusText;
                }
            };
            
            ws.onclose = () => {
                if (heartbeatInterval) clearInterval(heartbeatInterval);
                text.textContent = 'Mất kết nối trạng thái';
                dot.className = 'relative inline-flex rounded-full h-2.5 w-2.5 bg-gray-500';
                ping.classList.add('hidden');
            };
        })();

        // ===========================
        // PROJECTS FILTER
        // ===========================
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectItems = document.querySelectorAll('.project-item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => {
                    b.classList.remove('active', 'bg-bg-soft', 'text-text');
                    b.classList.add('bg-bg-card', 'text-text-secondary');
                });
                btn.classList.add('active', 'bg-bg-soft', 'text-text');
                const filter = btn.getAttribute('data-filter');
                projectItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        requestAnimationFrame(() => item.style.opacity = '1');
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => item.style.display = 'none', 300);
                    }
                });
            });
        });

        // ===========================
        // PROJECT MODAL
        // ===========================
        const modal = document.getElementById('project-modal');
        const modalContent = document.getElementById('modal-content');

        window.openProjectModal = (btn) => {
            const data = JSON.parse(btn.getAttribute('data-project'));
            document.getElementById('modal-icon').innerHTML = `<i class="fa-solid ${data.icon} text-2xl text-accent"></i>`;
            document.getElementById('modal-title').textContent = data.title;
            document.getElementById('modal-desc').innerHTML = data.desc;
            document.getElementById('modal-link').href = data.link;
            
            const tagsHtml = data.tags.map(t => `<span class="px-2.5 py-1 text-[11px] font-mono text-text-secondary bg-border/40 rounded-md border border-border/60">${t}</span>`).join('');
            document.getElementById('modal-tags').innerHTML = tagsHtml;

            modal.classList.remove('hidden');
            requestAnimationFrame(() => {
                modalContent.classList.remove('scale-95', 'opacity-0');
                modalContent.classList.add('scale-100', 'opacity-100');
            });
            document.body.style.overflow = 'hidden';
        };

        window.closeModal = () => {
            modalContent.classList.remove('scale-100', 'opacity-100');
            modalContent.classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }, 300);
        };

        const qrModal = document.getElementById('qr-modal');
        const qrModalContent = document.getElementById('qr-modal-content');

        window.openQrModal = () => {
            qrModal.classList.remove('hidden');
            requestAnimationFrame(() => {
                qrModalContent.classList.remove('scale-95', 'opacity-0');
                qrModalContent.classList.add('scale-100', 'opacity-100');
            });
            document.body.style.overflow = 'hidden';
        };

        window.closeQrModal = () => {
            qrModalContent.classList.remove('scale-100', 'opacity-100');
            qrModalContent.classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                qrModal.classList.add('hidden');
                document.body.style.overflow = '';
            }, 300);
        };


        // ===========================
        // BACKGROUND MUSIC AUTOPLAY
        // ===========================
        const bgMusic = document.getElementById('bg-music');
        const musicToggle = document.getElementById('music-toggle');
        let isMusicPlaying = false;

        function playMusic() {
            if (!bgMusic) return;
            bgMusic.play().then(() => {
                isMusicPlaying = true;
                if(musicToggle) {
                    musicToggle.innerHTML = '<i class="fa-solid fa-pause"></i>';
                    musicToggle.classList.add('text-accent');
                }
            }).catch(err => console.log("Trình duyệt yêu cầu tương tác trước khi tự động phát nhạc."));
        }

        function pauseMusic() {
            if (!bgMusic) return;
            bgMusic.pause();
            isMusicPlaying = false;
            if(musicToggle) {
                musicToggle.innerHTML = '<i class="fa-solid fa-music"></i>';
                musicToggle.classList.remove('text-accent');
            }
        }

        if(bgMusic) bgMusic.volume = 0.5;
        playMusic();

        let interactionHandled = false;
        let audioCtx, analyser, dataArray, visualizerBars;

        const firstInteraction = () => {
            if (interactionHandled) return;
            interactionHandled = true;
            
            // Hide intro screen
            const intro = document.getElementById('intro-screen');
            if(intro) {
                intro.style.opacity = '0';
                intro.style.pointerEvents = 'none';
                setTimeout(() => intro.remove(), 700);
                document.body.classList.remove('overflow-hidden');
            }

            // Init Audio & Visualizer
            if (!isMusicPlaying) playMusic();
            
            try {
                if(!audioCtx && bgMusic) {
                    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                    analyser = audioCtx.createAnalyser();
                    const source = audioCtx.createMediaElementSource(bgMusic);
                    source.connect(analyser);
                    analyser.connect(audioCtx.destination);
                    
                    analyser.fftSize = 32;
                    const bufferLength = analyser.frequencyBinCount;
                    dataArray = new Uint8Array(bufferLength);
                    
                    visualizerBars = document.getElementById('visualizer-bars');
                    if(visualizerBars) visualizerBars.style.opacity = '1';

                    function animateVisualizer() {
                        if(isMusicPlaying && analyser && visualizerBars) {
                            analyser.getByteFrequencyData(dataArray);
                            const bars = visualizerBars.children;
                            if(bars.length >= 3) {
                                bars[0].style.height = Math.max(4, dataArray[0] / 10) + 'px';
                                bars[1].style.height = Math.max(8, dataArray[2] / 8) + 'px';
                                bars[2].style.height = Math.max(4, dataArray[4] / 10) + 'px';
                            }
                        }
                        requestAnimationFrame(animateVisualizer);
                    }
                    animateVisualizer();
                }
            } catch(e) { console.error("Audio visualizer error:", e); }
        };
        
        const introScreen = document.getElementById('intro-screen');
        if(introScreen) introScreen.addEventListener('click', firstInteraction);
        else document.addEventListener('click', firstInteraction, { once: true });



        // tsParticles config
        if(typeof tsParticles !== 'undefined') {
            tsParticles.load("tsparticles", {
                background: { color: { value: "transparent" } },
                particles: {
                    color: { value: "#ffffff" },
                    links: { enable: true, color: "#ffffff", distance: 150, opacity: 0.1, width: 1 },
                    move: { enable: true, speed: 0.5 },
                    number: { value: 80, density: { enable: true, area: 800 } },
                    opacity: { value: 0.3 },
                    size: { value: { min: 1, max: 2 } }
                }
            });
        }

        if(musicToggle) {
            musicToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                if (isMusicPlaying) pauseMusic();
                else playMusic();
            });
        }

        // Footer Tracking Info
        const footerTime = document.getElementById('footer-time');
        const footerIp = document.getElementById('footer-ip');
        const footerDevice = document.getElementById('footer-device');
        const footerBrowser = document.getElementById('footer-browser');

        if(footerTime) {
            setInterval(() => {
                const now = new Date();
                const timeStr = now.toLocaleTimeString('vi-VN', { hour12: false });
                const dateStr = now.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
                footerTime.textContent = `${timeStr} ${dateStr}`;
            }, 1000);
        }

        if(footerIp) {
            fetch('https://api.ipify.org?format=json')
                .then(res => res.json())
                .then(data => { footerIp.textContent = data.ip; })
                .catch(() => { footerIp.textContent = 'Không thể xác định'; });
        }

        const ua = navigator.userAgent;
        let device = "Không rõ";
        if (/Windows/i.test(ua)) device = "Windows";
        else if (/iPhone|iPad|iPod/i.test(ua)) device = "iOS";
        else if (/Android/i.test(ua)) device = "Android";
        else if (/Mac/i.test(ua)) device = "MacOS";
        else if (/Linux/i.test(ua)) device = "Linux";
        if(footerDevice) footerDevice.textContent = device;

        let browser = "Không rõ";
        if (/Edg/i.test(ua)) browser = "Edge";
        else if (/Chrome/i.test(ua)) browser = "Chrome";
        else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = "Safari";
        else if (/Firefox/i.test(ua)) browser = "Firefox";
        else if (/OPR/i.test(ua) || /Opera/i.test(ua)) browser = "Opera";
        if(footerBrowser) footerBrowser.textContent = browser;

    })();

