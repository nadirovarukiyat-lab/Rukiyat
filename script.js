// Мобильное меню
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-list a');

// Открытие/закрытие мобильного меню
mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (nav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        document.body.style.overflow = 'hidden'; // Блокируем скролл
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = 'auto'; // Возвращаем скролл
    }
});

// Закрытие меню при клике на ссылку
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = 'auto';
    });
});

// Закрытие меню при клике вне его
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = 'auto';
    }
});

// Модальное окно
const modal = document.getElementById('appointmentModal');

// Открытие модального окна
function openModal() {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Закрытие модального окна
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Закрытие модального окна при клике вне его
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Закрытие модального окна на Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
    }
});

// Плавный скролл для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Фиксация шапки при скролле
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Прячем шапку при скролле вниз
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.style.transform = 'translateY(-100%)';
        header.style.transition = 'transform 0.3s ease';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    // Добавляем тень при скролле
    if (scrollTop > 50) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
    
    lastScrollTop = scrollTop;
});

// Обработка форм
const contactForm = document.getElementById('contactForm');
const appointmentForm = document.getElementById('appointmentForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем данные формы
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Имитация отправки
        console.log('Данные формы контактов:', data);
        
        // Показать сообщение об успехе
        alert('Спасибо! Ваша заявка отправлена. Я свяжусь с вами в ближайшее время.');
        
        // Закрыть модальное окно, если оно открыто
        closeModal();
        
        // Очистить форму
        this.reset();
    });
}

if (appointmentForm) {
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем данные формы
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Имитация отправки
        console.log('Данные формы записи:', data);
        
        // Показать сообщение об успехе
        alert('Спасибо за запись! Я свяжусь с вами для подтверждения времени приема.');
        
        // Закрыть модальное окно
        closeModal();
        
        // Очистить форму
        this.reset();
    });
}

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Наблюдаем за элементами для анимации
document.querySelectorAll('.category, .feature, .gallery-item').forEach(el => {
    observer.observe(el);
});

// Инициализация даты в форме
function initializeDateInput() {
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        // Устанавливаем минимальную дату - завтра
        dateInput.min = tomorrow.toISOString().split('T')[0];
        
        // Устанавливаем значение по умолчанию - завтра
        dateInput.value = tomorrow.toISOString().split('T')[0];
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    initializeDateInput();
    
    // Добавляем класс для анимации при загрузке
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Адаптивность меню
function handleResize() {
    if (window.innerWidth > 768) {
        // На десктопе закрываем мобильное меню
        nav.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = 'auto';
    }
}

// Обработчик изменения размера окна
window.addEventListener('resize', handleResize);

// Добавляем активный класс к ссылкам навигации при скролле
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-list a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        if (scrollY >= (sectionTop - headerHeight - 100)) {
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

window.addEventListener('scroll', updateActiveNavLink);

// Дополнительные стили для мобильного меню
document.head.insertAdjacentHTML('beforeend', `
<style>
    @media (max-width: 768px) {
        .nav {
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            background: var(--primary-white);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            padding: 20px;
            border-radius: 0 0 15px 15px;
        }
        
        .nav.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .nav-list {
            flex-direction: column;
            gap: 0;
        }
        
        .nav-list li {
            width: 100%;
            border-bottom: 1px solid var(--border-color);
        }
        
        .nav-list li:last-child {
            border-bottom: none;
        }
        
        .nav-list a {
            display: block;
            padding: 15px 0;
            font-size: 1.1rem;
        }
        
        .nav-list a.active {
            color: var(--cta-color);
            font-weight: 600;
        }
        
        .nav-list a.active:after {
            display: none;
        }
        
        .btn-header {
            display: none;
        }
        
        .mobile-menu-btn {
            display: block;
        }
        
        /* Анимация появления элементов */
        .animated {
            animation: fadeUp 0.6s ease forwards;
        }
        
        @keyframes fadeUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    }
    
    /* Планшетная версия */
    @media (max-width: 992px) and (min-width: 769px) {
        .about-content {
            grid-template-columns: 1fr;
            gap: 50px;
        }
        
        .doctor-image {
            height: 400px;
        }
        
        .features {
            grid-template-columns: repeat(2, 1fr);
        }
        
        .services-categories {
            grid-template-columns: repeat(2, 1fr);
        }
        
        .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
        }
        
        .contact-content {
            grid-template-columns: 1fr;
            gap: 50px;
        }
        
        .nav-list {
            gap: 20px;
        }
        
        .btn-header {
            padding: 10px 20px;
            font-size: 0.9rem;
        }
    }
    
    @media (max-width: 768px) {
        .hero-text-content {
            padding: 30px;
            margin: 0 20px;
        }
        
        .hero-title {
            font-size: 2.5rem;
        }
        
        .hero-subtitle {
            font-size: 1.1rem;
        }
        
        .hero-description {
            font-size: 1rem;
        }
        
        .about-content {
            grid-template-columns: 1fr;
            gap: 40px;
        }
        
        .doctor-image {
            height: 300px;
        }
        
        .features {
            grid-template-columns: 1fr;
        }
        
        .services-categories {
            grid-template-columns: 1fr;
        }
        
        .gallery-grid {
            grid-template-columns: 1fr;
        }
        
        .contact-content {
            grid-template-columns: 1fr;
            gap: 40px;
        }
        
        .contact-info {
            order: 2;
        }
        
        .contact-form {
            order: 1;
        }
        
        h2.section-title {
            font-size: 2rem;
        }
        
        .section-subtitle {
            font-size: 1rem;
        }
        
        .category {
            padding: 30px 20px;
        }
        
        .feature {
            padding: 20px;
        }
        
        .modal-content {
            padding: 30px 20px;
            margin: 0 20px;
        }
    }
</style>
`);

// Предзагрузка изображений для лучшего UX
function preloadImages() {
    const images = [
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1586773860418-dc22f8b874bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1585515320312-32a3bf6b2076?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Запускаем предзагрузку
preloadImages();

// Добавляем класс для плавного появления контента
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.3s ease';
    }, 100);
});

// Обработка отправки форм с валидацией
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ff6b6b';
            
            // Убираем красную рамку при вводе
            input.addEventListener('input', () => {
                input.style.borderColor = '';
            });
        } else {
            input.style.borderColor = '';
        }
    });
    
    return isValid;
}

// Добавляем валидацию к формам
[contactForm, appointmentForm].forEach(form => {
    if (form) {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                alert('Пожалуйста, заполните все обязательные поля');
                return false;
            }
            return true;
        });
    }
});