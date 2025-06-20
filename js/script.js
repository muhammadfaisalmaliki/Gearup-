document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const submenuLinks = document.querySelectorAll('.main-nav li.has-submenu > a'); // Tambahkan kelas 'has-submenu' di HTML

    // Toggle navigasi mobile
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active'); // Untuk animasi hamburger
        });
    }

    // Toggle submenu di mobile
    submenuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) { // Hanya aktif di layar kecil
                e.preventDefault(); // Mencegah navigasi langsung
                const parentLi = link.closest('li');
                parentLi.classList.toggle('open'); // Toggle class 'open'
                const submenu = parentLi.querySelector('.submenu');
                if (submenu) {
                    // Animasi tinggi submenu
                    if (parentLi.classList.contains('open')) {
                        submenu.style.maxHeight = submenu.scrollHeight + 'px';
                    } else {
                        submenu.style.maxHeight = '0';
                    }
                }
            }
        });
    });

    // Efek fade-in saat scroll untuk section
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.3 // Ketika 30% section terlihat
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                observer.unobserve(entry.target); // Berhenti mengamati setelah muncul
            }
        });
    }, options);

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        observer.observe(section);
    });

    // Carousel/Slider sederhana untuk hero section (opsional, jika ingin menambahkan)
    // const heroImages = document.querySelectorAll('.hero-image img');
    // let currentHero = 0;

    // function nextHero() {
    //     heroImages[currentHero].classList.remove('active');
    //     currentHero = (currentHero + 1) % heroImages.length;
    //     heroImages[currentHero].classList.add('active');
    // }
    // setInterval(nextHero, 5000); // Ganti gambar setiap 5 detik

    // Micro-interaksi: Animasi pada hover kartu produk (bisa pakai CSS saja, tapi JS bisa lebih kompleks)
    const productCards = document.querySelectorAll('.product-card, .category-item');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Misalnya, tambahkan kelas untuk efek bayangan yang lebih kuat atau sedikit rotasi 3D
            card.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = 'var(--shadow-light)';
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Smooth scroll untuk navigasi (jika menggunakan anchor link)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

});