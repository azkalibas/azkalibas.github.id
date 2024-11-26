function searchProducts() {
    const input = document.getElementById('searchInput').value.toLowerCase().trim();
    const products = document.getElementsByClassName('product-card');
    
    // Membatalkan timeout sebelumnya untuk menghindari multiple searches
    clearTimeout(window.searchTimeout);
    
    // Jika input kosong, tampilkan semua produk
    if (input === '') {
        Array.from(products).forEach(product => {
            product.style.display = '';
        });
        return;
    }
    
    // Debounce search untuk performa lebih baik
    window.searchTimeout = setTimeout(() => {
        // Convert ke Array dan cache DOM queries
        Array.from(products).forEach(product => {
            const title = product.querySelector('.card-title')?.innerText.toLowerCase() || '';
            const description = product.querySelector('.card-description')?.innerText.toLowerCase() || '';
            
            // Menggunakan includes untuk pencarian partial
            const isMatch = title.includes(input) || description.includes(input);
            product.style.display = isMatch ? '' : 'none';
        });
    }, 300);
}

document.getElementById('searchInput').addEventListener('input', searchProducts);

document.addEventListener('DOMContentLoaded', function () {
    // Menangani pengiriman form Sign Up
    document.getElementById('signupForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Mencegah form untuk reload halaman

        // Mengambil nilai input dari form
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirmPassword').value;

        // Validasi Password dan Konfirmasi Password
        if (password !== confirmPassword) {
            alert("Password dan Konfirmasi Password tidak sama!");
            return;
        }

        // Menyimpan data pengguna di LocalStorage (untuk demonstrasi saja)
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);

        // Menampilkan informasi yang dimasukkan
        document.getElementById('signupMessage').style.display = 'block';  // Menampilkan div signupMessage
        document.getElementById('displayName').innerText = name;  // Menampilkan nama
        document.getElementById('displayEmail').innerText = email;  // Menampilkan email
        document.getElementById('displayPassword').innerText = password;  // Menampilkan password (hati-hati di aplikasi nyata)

        // Menutup modal setelah form dikirim
        var modal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
        modal.hide(); // Menutup modal

        // Clear form setelah submit
        document.getElementById('signupForm').reset();
    });

    // Add touch event handling for mobile
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navbarToggler.addEventListener('click', function() {
        navbarCollapse.classList.toggle('show');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navbarCollapse.contains(event.target) && !navbarToggler.contains(event.target)) {
            navbarCollapse.classList.remove('show');
        }
    });
    
    // Disable hover effects on mobile
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }

    // Mobile menu handling
    document.addEventListener('DOMContentLoaded', function() {
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            const navbar = document.querySelector('.navbar-collapse');
            if (navbar.classList.contains('show') && !e.target.closest('.navbar')) {
                navbar.classList.remove('show');
            }
        });

        // Smooth scroll handling for mobile
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const navbar = document.querySelector('.navbar-collapse');
                if (navbar.classList.contains('show')) {
                    navbar.classList.remove('show');
                }
                
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Improve mobile touch experience
        const addTouchClass = () => document.documentElement.classList.add('touch-device');
        const removeTouchClass = () => document.documentElement.classList.remove('touch-device');

        if ('ontouchstart' in window) {
            addTouchClass();
        }

        // Handle orientation changes
        window.addEventListener('orientationchange', function() {
            // Reset any necessary layouts
            setTimeout(() => {
                window.scrollTo(0, window.scrollY);
            }, 300);
        });

        // Mobile-friendly card interactions
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });

            card.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            });
        });

        // Optimize modal behavior for mobile
        const profileModal = document.getElementById('profileModal');
        if (profileModal) {
            profileModal.addEventListener('shown.bs.modal', function() {
                // Ensure modal is scrollable on mobile
                this.querySelector('.modal-body').style.maxHeight = 
                    window.innerHeight * 0.7 + 'px';
            });
        }

        // Improve search experience on mobile
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('focus', function() {
                // Scroll to search input when focused on mobile
                setTimeout(() => {
                    this.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
            });
        }
    });

    // Optimize scroll performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                // Handle scroll-based animations/effects
                ticking = false;
            });
            ticking = true;
        }
    });

    // Optimize image loading for mobile
    function loadImagesProgressively() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Initialize mobile optimizations
    window.addEventListener('load', function() {
        loadImagesProgressively();
        
        // Remove loading overlay smoothly
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 300);
        }
    });

    // Fungsi untuk mengatur background responsif
    function adjustBackground() {
        const windowWidth = window.innerWidth;
        const body = document.body;
        
        if (windowWidth <= 576) {
            // Mobile
            body.style.backgroundSize = 'contain';
            body.style.backgroundPosition = 'center center';
        } else if (windowWidth <= 992) {
            // Tablet
            body.style.backgroundSize = '100% auto';
            body.style.backgroundPosition = 'center top';
        } else {
            // Desktop/Laptop
            body.style.backgroundSize = 'cover';
            body.style.backgroundPosition = 'center center';
        }
    }

    // Panggil fungsi saat halaman dimuat
    adjustBackground();

    // Panggil fungsi saat ukuran window berubah
    window.addEventListener('resize', adjustBackground);
});