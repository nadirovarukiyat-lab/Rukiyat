// ==========================================
// Центр медицины высоких технологий им. Исмаилова
// Функциональность для всех версий меню
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== МОБИЛЬНОЕ МЕНЮ (Гамбургер) =====
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.menu');
    
    // Создаем оверлей для мобильного меню
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
    
    mobileMenuToggle.addEventListener('click', function() {
        const isActive = mobileMenu.classList.contains('active');
        
        // Переключаем состояние
        mobileMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Блокируем прокрутку body
        document.body.style.overflow = isActive ? '' : 'hidden';
    });
    
    // Закрытие меню по клику на оверлей
    overlay.addEventListener('click', closeMobileMenu);
    
    // Закрытие меню при клике на ссылку
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
    
    // ===== ПЛАНШЕТНОЕ МЕНЮ (Выпадающий список) =====
    const tabletMenuToggle = document.querySelector('.tablet-menu-toggle');
    const tabletMenu = document.querySelector('.menu-tablet');
    
    if (tabletMenuToggle) {
        tabletMenuToggle.addEventListener('click', function() {
            const isActive = tabletMenu.classList.contains('active');
            
            // Переключаем состояние
            tabletMenu.classList.toggle('active');
            tabletMenuToggle.classList.toggle('active');
            
            // Меняем текст кнопки
            tabletMenuToggle.textContent = isActive ? 'Меню ▼' : 'Меню ▲';
        });
        
        // Закрытие при клике снаружи
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.menu-tablet-dropdown')) {
                tabletMenu.classList.remove('active');
                tabletMenuToggle.classList.remove('active');
                tabletMenuToggle.textContent = 'Меню ▼';
            }
        });
        
        // Закрытие при клике на ссылку
        const tabletLinks = document.querySelectorAll('.menu-tablet a');
        tabletLinks.forEach(link => {
            link.addEventListener('click', function() {
                tabletMenu.classList.remove('active');
                tabletMenuToggle.classList.remove('active');
                tabletMenuToggle.textContent = 'Меню ▼';
            });
        });
    }
    
    // ===== ПЛАВНАЯ ПРОКРУТКО =====
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
    
    // ===== АКТИВНАЯ ССЫЛКА В МЕНЮ =====
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
    setActiveLink(); // Вызов при загрузке
    
    // ===== КНОПКА ЗАПИСИ НА ПРИЕМ =====
    const appointmentButtons = document.querySelectorAll('.btn-appointment, .btn-primary');
    appointmentButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Функция записи на прием будет доступна после подключения к системе регистратуры.\n\nТелефон для записи: +7 (988) 201-70-78');
        });
    });
    
    // ===== АНИМАЦИЯ ПРИ СКРОЛЛЕ =====
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
    
    // Наблюдение за секциями
    [hero, about, director, contactsSection].forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});