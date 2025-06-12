// ===== PATOLOGIA ORAL - FUNCIONALIDADES JAVASCRIPT =====

// Dados das questões de Patologia Oral
const questionsData = [
    {
        id: 1,
        category: 'lesoes',
        question: 'Qual é a principal característica histopatológica da leucoplasia?',
        options: [
            'Hiperqueratose com displasia epitelial variável',
            'Infiltrado inflamatório crônico',
            'Necrose tecidual',
            'Proliferação vascular'
        ],
        correct: 0,
        explanation: 'A leucoplasia caracteriza-se histopatologicamente por hiperqueratose, acantose e graus variáveis de displasia epitelial, sendo esta última fundamental para determinar o potencial de malignização.'
    },
    {
        id: 2,
        category: 'diagnostico',
        question: 'O líquen plano oral apresenta como característica clínica típica:',
        options: [
            'Úlceras profundas unilaterais',
            'Estrias brancas entrelaçadas (estrias de Wickham)',
            'Placas removíveis',
            'Crescimento exofítico'
        ],
        correct: 1,
        explanation: 'As estrias de Wickham são características patognomônicas do líquen plano oral, apresentando-se como linhas brancas entrelaçadas, especialmente na forma reticular.'
    },
    {
        id: 3,
        category: 'biopsia',
        question: 'A biópsia incisional está indicada quando:',
        options: [
            'A lesão é menor que 5mm',
            'A lesão é maior que 1cm ou em localização complexa',
            'Há suspeita de lesão benigna',
            'O paciente é jovem'
        ],
        correct: 1,
        explanation: 'A biópsia incisional é indicada para lesões extensas (>1cm), múltiplas, em localizações anatômicas complexas ou quando a remoção completa resultaria em defeito significativo.'
    },
    {
        id: 4,
        category: 'neoplasias',
        question: 'O carcinoma espinocelular oral tem como principal fator de risco:',
        options: [
            'Idade avançada',
            'Tabagismo e etilismo',
            'Exposição ao frio',
            'Deficiência nutricional'
        ],
        correct: 1,
        explanation: 'O tabagismo e etilismo são os principais fatores de risco para carcinoma espinocelular oral, com efeito sinérgico que pode aumentar o risco em até 15 vezes.'
    },
    {
        id: 5,
        category: 'diagnostico',
        question: 'A eritroplasia caracteriza-se por:',
        options: [
            'Placa branca não removível',
            'Placa vermelha aveludada com alto potencial maligno',
            'Vesículas agrupadas',
            'Nódulo endurecido'
        ],
        correct: 1,
        explanation: 'A eritroplasia é uma lesão pré-maligna caracterizada por placa vermelha aveludada com alto potencial de malignização (14-50%), frequentemente apresentando displasia severa ou carcinoma in situ.'
    },
    {
        id: 6,
        category: 'lesoes',
        question: 'Uma úlcera oral persistente por mais de 2 semanas requer:',
        options: [
            'Apenas observação',
            'Tratamento com antibióticos',
            'Investigação e possível biópsia',
            'Aplicação de corticoides tópicos'
        ],
        correct: 2,
        explanation: 'Úlceras orais persistentes por mais de 2 semanas são consideradas suspeitas e requerem investigação detalhada, incluindo possível biópsia para descartar malignidade.'
    }
];

// Respostas da IA para Patologia Oral
const aiResponses = {
    'lesões': 'As lesões orais podem ser classificadas em elementares (mácula, pápula, vesícula, úlcera), proliferativas (hiperplasia, hipertrofia) e degenerativas (atrofia, necrose). Cada tipo tem características específicas que auxiliam no diagnóstico.',
    'leucoplasia': 'A leucoplasia é definida como uma placa branca que não pode ser removida por raspagem e não corresponde a nenhuma outra doença. Apresenta potencial de malignização variável (0,13-17,5%) dependendo da presença de displasia.',
    'diagnóstico': 'O diagnóstico diferencial em patologia oral baseia-se na correlação entre características clínicas, localização, sintomatologia e achados histopatológicos. A biópsia é fundamental para diagnóstico definitivo.',
    'biópsia': 'A biópsia pode ser incisional (fragmento representativo) ou excisional (remoção completa). A escolha depende do tamanho da lesão, localização e suspeita diagnóstica.',
    'carcinoma': 'O carcinoma espinocelular é a neoplasia maligna mais comum da cavidade oral (90-95% dos casos). O diagnóstico precoce é fundamental para o prognóstico.',
    'hpv': 'O HPV, especialmente tipos 16 e 18, está associado ao desenvolvimento de carcinomas em orofaringe e cavidade oral. A presença viral geralmente indica melhor prognóstico.',
    'default': 'Sou especializado em patologia oral. Posso ajudar com questões sobre lesões orais, diagnóstico diferencial, técnicas de biópsia, neoplasias e manifestações orais de doenças sistêmicas.'
};

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAI();
    initializeQuestions();
    initializeAnimations();
    initializeSpecialties();
});

// ===== NAVEGAÇÃO =====
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu mobile
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Fechar menu ao clicar em link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    // Scroll suave para seções
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar transparente no scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(26, 26, 46, 0.98)';
        } else {
            navbar.style.background = 'rgba(26, 26, 46, 0.95)';
        }
    });
}

// ===== ASSISTENTE IA =====
function initializeAI() {
    const aiAvatar = document.querySelector('.ai-avatar');
    const aiChat = document.querySelector('.ai-chat');
    const aiClose = document.querySelector('.ai-close');
    const aiInput = document.querySelector('#aiInput');
    const aiSend = document.querySelector('#aiSend');
    const aiMessages = document.querySelector('#aiMessages');

    // Toggle chat
    aiAvatar?.addEventListener('click', () => {
        aiChat.style.display = aiChat.style.display === 'flex' ? 'none' : 'flex';
    });

    // Fechar chat
    aiClose?.addEventListener('click', () => {
        aiChat.style.display = 'none';
    });

    // Enviar mensagem
    function sendMessage() {
        const message = aiInput?.value.trim();
        if (!message) return;

        // Adicionar mensagem do usuário
        addMessage(message, 'user');
        
        // Limpar input
        aiInput.value = '';

        // Simular resposta da IA
        setTimeout(() => {
            const response = getAIResponse(message);
            addMessage(response, 'ai');
        }, 1000);
    }

    aiSend?.addEventListener('click', sendMessage);
    aiInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ${sender}`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        aiMessages?.appendChild(messageDiv);
        aiMessages.scrollTop = aiMessages.scrollHeight;
    }

    function getAIResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        for (const [key, response] of Object.entries(aiResponses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        
        return aiResponses.default;
    }
}

// ===== QUESTÕES =====
function initializeQuestions() {
    const questionsGrid = document.querySelector('#questionsGrid');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const loadMoreBtn = document.querySelector('#loadMoreQuestions');

    let currentCategory = 'all';
    let displayedQuestions = 0;
    const questionsPerLoad = 3;

    // Filtrar questões por categoria
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            displayedQuestions = 0;
            questionsGrid.innerHTML = '';
            loadQuestions();
        });
    });

    // Carregar mais questões
    loadMoreBtn?.addEventListener('click', loadQuestions);

    function loadQuestions() {
        const filteredQuestions = currentCategory === 'all' 
            ? questionsData 
            : questionsData.filter(q => q.category === currentCategory);

        const questionsToShow = filteredQuestions.slice(
            displayedQuestions, 
            displayedQuestions + questionsPerLoad
        );

        questionsToShow.forEach(question => {
            const questionElement = createQuestionElement(question);
            questionsGrid?.appendChild(questionElement);
        });

        displayedQuestions += questionsToShow.length;

        // Ocultar botão se não há mais questões
        if (displayedQuestions >= filteredQuestions.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }

    function createQuestionElement(question) {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-card';
        questionDiv.innerHTML = `
            <div class="question-header">
                <h3>Questão ${question.id}</h3>
                <span class="question-category">${getCategoryName(question.category)}</span>
            </div>
            <div class="question-content">
                <p class="question-text">${question.question}</p>
                <div class="question-options">
                    ${question.options.map((option, index) => `
                        <button class="option-btn" data-index="${index}">
                            ${String.fromCharCode(65 + index)}) ${option}
                        </button>
                    `).join('')}
                </div>
                <div class="question-explanation" style="display: none;">
                    <h4>Explicação:</h4>
                    <p>${question.explanation}</p>
                </div>
            </div>
        `;

        // Adicionar event listeners para as opções
        const optionBtns = questionDiv.querySelectorAll('.option-btn');
        optionBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                selectOption(questionDiv, question, index);
            });
        });

        return questionDiv;
    }

    function selectOption(questionElement, question, selectedIndex) {
        const optionBtns = questionElement.querySelectorAll('.option-btn');
        const explanation = questionElement.querySelector('.question-explanation');

        // Desabilitar todos os botões
        optionBtns.forEach((btn, index) => {
            btn.disabled = true;
            if (index === question.correct) {
                btn.classList.add('correct');
            } else if (index === selectedIndex && index !== question.correct) {
                btn.classList.add('incorrect');
            }
        });

        // Mostrar explicação
        explanation.style.display = 'block';
    }

    function getCategoryName(category) {
        const names = {
            'lesoes': 'Lesões',
            'diagnostico': 'Diagnóstico',
            'biopsia': 'Biópsia',
            'neoplasias': 'Neoplasias'
        };
        return names[category] || category;
    }

    // Carregar questões iniciais
    loadQuestions();
}

// ===== ESPECIALIDADES =====
function initializeSpecialties() {
    const specialtyCards = document.querySelectorAll('.specialty-card');
    
    specialtyCards.forEach(card => {
        card.addEventListener('click', () => {
            const specialty = card.dataset.specialty;
            openSpecialty(specialty);
        });
    });
}

function openSpecialty(specialty) {
    const specialtyInfo = {
        'lesoes': {
            title: 'Lesões Fundamentais',
            content: 'Estudo detalhado das lesões elementares, proliferativas e degenerativas da cavidade oral.'
        },
        'diagnostico': {
            title: 'Diagnóstico Diferencial',
            content: 'Metodologia diagnóstica para lesões brancas, vermelhas e pigmentadas da mucosa oral.'
        },
        'biopsia': {
            title: 'Biópsia e Técnicas',
            content: 'Técnicas de biópsia, processamento histopatológico e métodos diagnósticos complementares.'
        }
    };

    const info = specialtyInfo[specialty];
    if (info) {
        // Criar modal visual em vez de alert
        const modal = document.createElement('div');
        modal.className = 'specialty-modal';
        modal.innerHTML = `
            <div class="specialty-modal-content">
                <div class="specialty-modal-header">
                    <h3>${info.title}</h3>
                    <button class="specialty-modal-close">&times;</button>
                </div>
                <div class="specialty-modal-body">
                    <p>${info.content}</p>
                    <p class="specialty-modal-note">Em breve: conteúdo interativo completo!</p>
                </div>
                <div class="specialty-modal-footer">
                    <button class="specialty-modal-btn">Entendi</button>
                </div>
            </div>
        `;
        
        // Adicionar estilos para o modal
        const modalStyles = document.createElement('style');
        if (!document.querySelector('#specialty-modal-styles')) {
            modalStyles.id = 'specialty-modal-styles';
            modalStyles.textContent = `
                .specialty-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.7);
                    z-index: 2000;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                    box-sizing: border-box;
                    animation: fadeIn 0.3s ease;
                }
                
                .specialty-modal-content {
                    background: var(--darker-bg);
                    width: 90%;
                    max-width: 500px;
                    border-radius: 15px;
                    overflow: hidden;
                    box-shadow: var(--shadow-heavy);
                    animation: slideIn 0.3s ease;
                }
                
                .specialty-modal-header {
                    background: var(--gradient-primary);
                    padding: 15px 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .specialty-modal-header h3 {
                    color: white;
                    margin: 0;
                    font-family: 'Orbitron', monospace;
                }
                
                .specialty-modal-close {
                    background: transparent;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    padding: 0;
                    line-height: 1;
                }
                
                .specialty-modal-body {
                    padding: 20px;
                    color: var(--text-primary);
                    line-height: 1.6;
                }
                
                .specialty-modal-note {
                    color: var(--accent-color);
                    font-style: italic;
                    margin-top: 15px;
                }
                
                .specialty-modal-footer {
                    padding: 15px 20px;
                    text-align: right;
                    border-top: 1px solid var(--border-color);
                }
                
                .specialty-modal-btn {
                    background: var(--gradient-primary);
                    color: white;
                    border: none;
                    padding: 8px 20px;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .specialty-modal-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-medium);
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideIn {
                    from { transform: translateY(-50px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                
                @media (max-width: 768px) {
                    .specialty-modal-content {
                        width: 95%;
                    }
                }
            `;
            document.head.appendChild(modalStyles);
        }
        
        // Adicionar ao DOM
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden'; // Impedir rolagem
        
        // Adicionar event listeners
        const closeBtn = modal.querySelector('.specialty-modal-close');
        const confirmBtn = modal.querySelector('.specialty-modal-btn');
        
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        });
        
        confirmBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        });
    }
}

// ===== ANIMAÇÕES =====
function initializeAnimations() {
    // Intersection Observer para animações
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const animatedElements = document.querySelectorAll(
        '.specialty-card, .summary-card, .section-header'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== FUNÇÕES UTILITÁRIAS =====
function scrollToSection(sectionId) {
    const section = document.querySelector(`#${sectionId}`);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function toggleAI() {
    const aiChat = document.querySelector('.ai-chat');
    aiChat.style.display = aiChat.style.display === 'flex' ? 'none' : 'flex';
}

function openPDF(pdfType) {
    const pdfInfo = {
        'lesoes': {
            title: 'Lesões e Diagnóstico - Patologia Oral',
            file: 'lesoes_fundamentais.pdf'
        },
        'tecnicas': {
            title: 'Técnicas Diagnósticas - Biópsia e Métodos',
            file: 'biopsia_tecnicas.pdf'
        },
        'neoplasias': {
            title: 'Neoplasias e Infecções - Casos Clínicos',
            file: 'introducao_patologia_oral.pdf'
        }
    };

    const info = pdfInfo[pdfType] || { title: 'Documento de Patologia Oral', file: '' };
    
    // Usar a função createPDFViewer para criar o visualizador com botões de navegação
    createPDFViewer(info.file);
}

// ===== ESTILOS DINÂMICOS PARA QUESTÕES =====
const questionStyles = `
<style>
.question-card {
    background: var(--darker-bg);
    border-radius: 15px;
    padding: 2rem;
    box-shadow: var(--shadow-medium);
    border: 1px solid var(--border-color);
    margin-bottom: 1.5rem;
}

.question-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.question-header h3 {
    color: var(--primary-color);
    font-size: 1.2rem;
    font-weight: 700;
}

.question-category {
    background: var(--gradient-primary);
    color: white;
    padding: 0.3rem 0.8rem;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 500;
}

.question-text {
    font-size: 1.1rem;
    color: var(--text-primary);
    margin-bottom: 1.5rem;
    line-height: 1.6;
}

.question-options {
    display: grid;
    gap: 0.8rem;
    margin-bottom: 1.5rem;
}

.option-btn {
    background: var(--border-color);
    color: var(--text-primary);
    border: none;
    padding: 1rem;
    border-radius: 8px;
    text-align: left;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.95rem;
}

.option-btn:hover:not(:disabled) {
    background: var(--primary-color);
    color: white;
}

.option-btn.correct {
    background: var(--success-color);
    color: white;
}

.option-btn.incorrect {
    background: var(--accent-color);
    color: white;
}

.option-btn:disabled {
    cursor: not-allowed;
}

.question-explanation {
    background: var(--dark-bg);
    padding: 1.5rem;
    border-radius: 8px;
    border-left: 4px solid var(--primary-color);
}

.question-explanation h4 {
    color: var(--primary-color);
    margin-bottom: 0.8rem;
    font-size: 1rem;
}

.question-explanation p {
    color: var(--text-secondary);
    line-height: 1.6;
}
</style>
`;

// Adicionar estilos das questões ao head
document.head.insertAdjacentHTML('beforeend', questionStyles);


// ===== FUNCIONALIDADE DE DOWNLOAD DE PDF =====
function downloadPDF(filename) {
    // Verificar se é chamada direta ou de um botão dentro do visualizador
    if (document.querySelector('.pdf-viewer-overlay')) {
        // Já está no visualizador, apenas fazer download
        const link = document.createElement('a');
        link.href = `pdfs/${filename}`;
        link.download = filename;
        link.target = '_blank';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification(`Baixando ${filename}...`, 'success');
    } else {
        // Criar visualizador de PDF com botões de navegação
        createPDFViewer(filename);
    }
}

// Função para criar visualizador de PDF com botões de navegação
function createPDFViewer(filename) {
    // Criar overlay para visualização do PDF
    const overlay = document.createElement('div');
    overlay.className = 'pdf-viewer-overlay';
    overlay.innerHTML = `
        <div class="pdf-viewer-container">
            <div class="pdf-viewer-header">
                <h3>Visualizador de PDF - Patologia Oral</h3>
                <div class="pdf-nav-buttons">
                    <button class="pdf-btn" id="pdfBack">
                        <i class="fas fa-arrow-left"></i> Voltar
                    </button>
                    <button class="pdf-btn" id="pdfDownload">
                        <i class="fas fa-file-download"></i> Baixar
                    </button>
                    <button class="pdf-btn" id="pdfView">
                        <i class="fas fa-eye"></i> Visualizar
                    </button>
                    <button class="pdf-btn" id="pdfPrint">
                        <i class="fas fa-print"></i> Imprimir
                    </button>
                    <button class="pdf-btn pdf-btn-close" id="pdfClose">
                        <i class="fas fa-times"></i> Fechar
                    </button>
                </div>
            </div>
            <div class="pdf-viewer-content">
                <iframe src="pdfs/${filename}" id="pdfFrame"></iframe>
            </div>
        </div>
    `;
    
    // Adicionar estilos para o overlay
    const overlayStyles = document.createElement('style');
    if (!document.querySelector('#pdf-viewer-styles')) {
        overlayStyles.id = 'pdf-viewer-styles';
        overlayStyles.textContent = `
            .pdf-viewer-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.85);
                z-index: 2000;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px;
                box-sizing: border-box;
            }
            
            .pdf-viewer-container {
                background: var(--darker-bg);
                width: 90%;
                max-width: 1200px;
                height: 90%;
                border-radius: 15px;
                overflow: hidden;
                box-shadow: var(--shadow-heavy);
                display: flex;
                flex-direction: column;
            }
            
            .pdf-viewer-header {
                background: var(--dark-bg);
                padding: 15px 20px;
                border-bottom: 1px solid var(--border-color);
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 10px;
            }
            
            .pdf-viewer-header h3 {
                color: var(--primary-color);
                margin: 0;
                font-family: 'Orbitron', monospace;
            }
            
            .pdf-nav-buttons {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
            }
            
            .pdf-btn {
                background: var(--gradient-primary);
                color: white;
                border: none;
                padding: 8px 15px;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 5px;
                min-width: 100px;
                justify-content: center;
                white-space: nowrap;
            }
            
            .pdf-btn:hover {
                transform: translateY(-2px);
                box-shadow: var(--shadow-medium);
            }
            
            .pdf-btn-close {
                background: var(--gradient-accent);
            }
            
            .pdf-viewer-content {
                flex: 1;
                overflow: hidden;
            }
            
            .pdf-viewer-content iframe {
                width: 100%;
                height: 100%;
                border: none;
            }
            
            @media (max-width: 768px) {
                .pdf-viewer-header {
                    flex-direction: column;
                    align-items: flex-start;
                }
                
                .pdf-nav-buttons {
                    width: 100%;
                    justify-content: center;
                }
                
                .pdf-btn {
                    padding: 8px 12px;
                    min-width: auto;
                    font-size: 0.9rem;
                }
            }
        `;
        document.head.appendChild(overlayStyles);
    }
    
    // Adicionar ao DOM
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden'; // Impedir rolagem
    
    // Adicionar event listeners
    document.getElementById('pdfBack').addEventListener('click', () => {
        document.body.removeChild(overlay);
        document.body.style.overflow = '';
    });
    
    document.getElementById('pdfClose').addEventListener('click', () => {
        document.body.removeChild(overlay);
        document.body.style.overflow = '';
    });
    
    document.getElementById('pdfDownload').addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = `pdfs/${filename}`;
        link.download = filename;
        link.target = '_blank';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification(`Baixando ${filename}...`, 'success');
    });
    
    document.getElementById('pdfView').addEventListener('click', () => {
        window.open(`pdfs/${filename}`, '_blank');
    });
    
    document.getElementById('pdfPrint').addEventListener('click', () => {
        const iframe = document.getElementById('pdfFrame');
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
    });
}

// Função para mostrar notificações
function showNotification(message, type = 'info') {
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Estilos da notificação
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
    `;
    
    // Adicionar ao DOM
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Adicionar animações CSS para notificações
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

