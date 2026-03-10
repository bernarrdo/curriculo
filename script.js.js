document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------------------------------
    // OBRIGATÓRIO a) Botão para trocar tema claro/escuro
    // -----------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Verifica a preferência salva no localStorage ao carregar a página
    const savedTheme = localStorage.getItem('theme');
    
    // Função que aplica o tema e salva no localStorage
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeToggleBtn.innerHTML = '🌙'; // Ícone para "claro"
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            themeToggleBtn.innerHTML = '💡'; // Ícone para "escuro"
            localStorage.setItem('theme', 'light');
        }
    }
    
    // Aplica o tema salvo (ou padrão 'light' se não houver)
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        // Se não houver preferência, verifica a preferência do sistema ou define 'light'
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
    }

    // Listener para alternar o tema ao clicar
    themeToggleBtn.addEventListener('click', () => {
        const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    // -----------------------------------------------------------------
    // OBRIGATÓRIO c) Scroll suave entre seções
    // -----------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Fecha o menu responsivo após clicar no link (se estiver aberto)
                const navbar = document.getElementById('navbar');
                if (navbar.classList.contains('open')) {
                    navbar.classList.remove('open');
                }
            }
        });
    });

    // -----------------------------------------------------------------
    // OBRIGATÓRIO d) Mensagem de boas-vindas dinâmica
    // -----------------------------------------------------------------
    const welcomeMessage = document.getElementById('welcome-message');
    const now = new Date();
    const hour = now.getHours();
    let greeting;

    if (hour < 12) {
        greeting = "Bom dia, visitante! ☀️";
    } else if (hour >= 12 && hour < 18) {
        greeting = "Boa tarde! 🌅";
    } else {
        greeting = "Boa noite! 🌙";
    }

    welcomeMessage.textContent = greeting;

    // -----------------------------------------------------------------
    // ADICIONAL 1) Menu responsivo (hambúrguer)
    // -----------------------------------------------------------------
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navbar = document.getElementById('navbar');

    hamburgerBtn.addEventListener('click', () => {
        navbar.classList.toggle('open');
        // Acessibilidade: alterna o texto do botão ou o atributo aria-expanded
        const isExpanded = navbar.classList.contains('open');
        hamburgerBtn.setAttribute('aria-expanded', isExpanded);
    });
    
    // -----------------------------------------------------------------
    // OBRIGATÓRIO b) Validação de formulário de contato + 
    // ADICIONAL 6) Mensagem automática temporária
    // -----------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    // Função auxiliar para exibir mensagens de erro
    function displayError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        errorElement.textContent = message;
    }
    
    // Função de validação de e-mail simples
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        // Limpa erros anteriores
        displayError('name', '');
        displayError('email', '');
        displayError('message', '');
        successMessage.classList.remove('show');
        
        // Validação do Nome
        if (nameInput.value.trim() === '') {
            displayError('name', 'O nome é obrigatório.');
            isValid = false;
        }

        // Validação do E-mail
        if (emailInput.value.trim() === '') {
            displayError('email', 'O e-mail é obrigatório.');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            displayError('email', 'Por favor, insira um e-mail válido.');
            isValid = false;
        }

        // Validação da Mensagem
        if (messageInput.value.trim() === '') {
            displayError('message', 'A mensagem é obrigatória.');
            isValid = false;
        }
        
        // Se a validação for bem-sucedida
        if (isValid) {
            // Simular o envio (na prática, usaria fetch/XMLHttpRequest)
            console.log('Formulário enviado com sucesso!', {
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value
            });
            
            // Exibir mensagem de sucesso (Adicional 6)
            successMessage.textContent = 'Mensagem enviada com sucesso! Em breve retornarei o contato.';
            successMessage.classList.add('show');

            // Limpar formulário
            contactForm.reset();
            
            // Ocultar a mensagem após 5 segundos (Adicional 6)
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000); 
        }
    });

});