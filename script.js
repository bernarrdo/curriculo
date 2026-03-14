document.addEventListener('DOMContentLoaded', () => {
    // Inicializa EmailJS
    emailjs.init("5sQNNi4YkxT2LsVLp");

    // --- TEMA CLARO/ESCURO ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeToggleBtn.innerHTML = '🌙';
        } else {
            body.classList.remove('dark-mode');
            themeToggleBtn.innerHTML = '💡';
        }
        localStorage.setItem('theme', theme);
    };

    applyTheme(localStorage.getItem('theme') || 'light');

    themeToggleBtn.addEventListener('click', () => {
        const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    // --- SCROLL SUAVE (CORREÇÃO TELETRANSPORTE) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Ajuste do header fixo
                    behavior: 'smooth'
                });
                document.getElementById('navbar').classList.remove('open');
            }
        });
    });

    // --- MENU HAMBURGUER ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navbar = document.getElementById('navbar');
    hamburgerBtn.addEventListener('click', () => navbar.classList.toggle('open'));

    // --- BOAS VINDAS ---
    const welcome = document.getElementById('welcome-message');
    const hr = new Date().getHours();
    welcome.textContent = hr < 12 ? "Bom dia! ☀️" : hr < 18 ? "Boa tarde! 🌅" : "Boa noite! 🌙";

    // --- FORMULÁRIO ---
    // --- FORMULÁRIO (COLE DAQUI ATÉ O FIM) ---
    const contactForm = document.getElementById('contact-form');
    const successMsg = document.getElementById('success-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('.btn-submit');
            btn.disabled = true;
            btn.innerText = 'Enviando...';

            emailjs.sendForm('service_608jdtg', 'template_h22uwtv', this)
                .then(() => {
                    btn.disabled = false;
                    btn.innerText = 'Enviar Mensagem';
                    
                    // Ativa o Pop-up e força visibilidade
                    successMsg.textContent = 'Mensagem enviada com sucesso! 🚀';
                    successMsg.style.display = 'block';
                    setTimeout(() => { successMsg.style.opacity = '1'; }, 10);
                    
                    contactForm.reset();

                    // Esconde depois de 5 segundos
                    setTimeout(() => { 
                        successMsg.style.opacity = '0';
                        setTimeout(() => { successMsg.style.display = 'none'; }, 300);
                    }, 5000);
                }, (err) => {
                    btn.disabled = false;
                    btn.innerText = 'Enviar Mensagem';
                    alert('Erro ao enviar: ' + JSON.stringify(err));
                });
        });
    }
}); // ESTA CHAVE FECHA O DOMContentLoaded (Manter ela aqui)
