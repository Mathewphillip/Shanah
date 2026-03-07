        
        // shanahs975@gmail.com is the email
        
        
        // Torus Knot Background
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        const geometry = new THREE.TorusKnotGeometry(1.1, 0.35, 120, 20);
        const material = new THREE.MeshBasicMaterial({ color: 0x00f7ff, wireframe: true });
        const torus = new THREE.Mesh(geometry, material);
        scene.add(torus);

        camera.position.z = 4.2;

        function animateTorus() {
            requestAnimationFrame(animateTorus);
            torus.rotation.x += 0.004;
            torus.rotation.y += 0.008;
            renderer.render(scene, camera);
        }
        animateTorus();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Floating particles
        const particleCanvas = document.getElementById('particles');
        const ctx = particleCanvas.getContext('2d');
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;

        const particles = [];
        for (let i = 0; i < 180; i++) {
            particles.push({
                x: Math.random() * particleCanvas.width,
                y: Math.random() * particleCanvas.height,
                radius: Math.random() * 1.8 + 0.8,
                speed: Math.random() * 0.4 + 0.15
            });
        }

        function animateParticles() {
            requestAnimationFrame(animateParticles);
            ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
            particles.forEach(p => {
                p.y += p.speed;
                if (p.y > particleCanvas.height) p.y = -10;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0,247,255,0.45)';
                ctx.fill();
            });
        }
        animateParticles();

        window.addEventListener('resize', () => {
            particleCanvas.width = window.innerWidth;
            particleCanvas.height = window.innerHeight;
        });

        // Fade-in observer with stagger
        const fades = document.querySelectorAll('.fade');
        const observer = new IntersectionObserver(entries => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add('show'), i * 180);
                }
            });
        }, { threshold: 0.15 });

        fades.forEach(el => observer.observe(el));

        // Smooth scroll
        document.querySelectorAll('nav a').forEach(a => {
            a.addEventListener('click', e => {
                e.preventDefault();
                document.querySelector(a.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu when a link is clicked
                document.querySelector('nav').classList.remove('nav-active');
                document.querySelector('.hamburger').classList.remove('active');
            });
        });

        // Hamburger menu toggle
        const hamburger = document.querySelector('.hamburger');
        const nav = document.querySelector('nav');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('nav-active');
        });

        // Theme Toggle Functionality
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('i');
        
        // Check for saved theme preference or default to dark
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);

        function updateThemeIcon(theme) {
            if (theme === 'light') {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        }

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
