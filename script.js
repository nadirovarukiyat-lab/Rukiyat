// ==========================================
// Центр медицины высоких технологий им. Исмаилова
// Полная функциональность для всех секций
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== 1. МОБИЛЬНОЕ МЕНЮ =====
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.menu');
    
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
    
    mobileMenuToggle.addEventListener('click', function() {
        const isActive = mobileMenu.classList.contains('active');
        mobileMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = isActive ? '' : 'hidden';
    });
    
    overlay.addEventListener('click', closeMobileMenu);
    
    const mobileLinks = document.querySelectorAll('.menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // ===== 2. ПЛАНШЕТНОЕ МЕНЮ =====
    const tabletMenuToggle = document.querySelector('.tablet-menu-toggle');
    const tabletMenu = document.querySelector('.menu-tablet');
    
    if (tabletMenuToggle) {
        tabletMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isActive = tabletMenu.classList.contains('active');
            tabletMenu.classList.toggle('active');
            tabletMenuToggle.classList.toggle('active');
            tabletMenuToggle.textContent = isActive ? 'Меню ▼' : 'Меню ▲';
        });
        
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.menu-tablet-dropdown')) {
                tabletMenu.classList.remove('active');
                tabletMenuToggle.classList.remove('active');
                tabletMenuToggle.textContent = 'Меню ▼';
            }
        });
        
        const tabletLinks = document.querySelectorAll('.menu-tablet a');
        tabletLinks.forEach(link => {
            link.addEventListener('click', function() {
                tabletMenu.classList.remove('active');
                tabletMenuToggle.classList.remove('active');
                tabletMenuToggle.textContent = 'Меню ▼';
            });
        });
    }
    
    // ===== 3. ПЛАВНАЯ ПРОКРУТКА =====
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== 4. АКТИВНАЯ ССЫЛКА В МЕНЮ =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.menu-desktop a, .menu-tablet a, .menu a');
    
    function setActiveLink() {
        let current = '';
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    setActiveLink();
    
    // ===== 5. КНОПКИ ЗАПИСИ (Общие) =====
    const appointmentButtons = document.querySelectorAll('.btn-appointment, .btn-primary');
    appointmentButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Функция записи на прием будет доступна после подключения к системе регистратуры.\n\nТелефон для записи: +7 (988) 201-70-78');
        });
    });
    
    // ===== 6. КНОПКИ ЗАПИСИ К ВРАЧУ =====
    const specialistButtons = document.querySelectorAll('.btn-book-specialist');
    specialistButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const doctorName = this.getAttribute('data-doctor');
            alert(`Запись к врачу: ${doctorName}\n\nПожалуйста, позвоните по телефону:\n+7 (988) 201-70-78`);
        });
    });
    
    // ===== 7. КНОПКИ ЗАПИСИ НА УСЛУГИ =====
    const serviceButtons = document.querySelectorAll('.btn-book-service');
    serviceButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceName = this.getAttribute('data-service');
            alert(`Запись на услугу: ${serviceName}\n\nПожалуйста, позвоните по телефону:\n+7 (988) 201-70-78`);
        });
    });
    
    // ===== 8. АНИМАЦИИ ПРИ СКРОЛЛЕ =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const hero = document.querySelector('.hero');
    const about = document.querySelector('.about');
    const specialists = document.querySelector('.specialists');
    const services = document.querySelector('.services');
    const director = document.querySelector('.director');
    const contactsSection = document.querySelector('.contacts-section');
    
    [hero, about, specialists, services, director, contactsSection].forEach(section => {
        section.style.opacity = '0';
        section.style.transform = translateY('20px');
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});