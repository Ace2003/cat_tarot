document.addEventListener('DOMContentLoaded', function() {
    const introSection = document.getElementById('intro-section');
    const shuffleSection = document.getElementById('shuffle-section');
    const readingSection = document.getElementById('reading-section');
    const startBtn = document.getElementById('start-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const drawBtn = document.getElementById('draw-btn');
    const restartBtn = document.getElementById('restart-btn');
    const deck = document.getElementById('deck');
    const cardCount = document.getElementById('card-count');
    const cardsContainer = document.getElementById('cards-container');
    const loadingOverlay = document.getElementById('loading-overlay');

    const questionInput = document.getElementById('question-input');
    
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettings = document.getElementById('close-settings');
    const cancelSettings = document.getElementById('cancel-settings');
    const saveSettings = document.getElementById('save-settings');
    const aiToggle = document.getElementById('ai-toggle');
    const aiSettingsSection = document.getElementById('ai-settings-section');
    const aiProvider = document.getElementById('ai-provider');
    const apiKey = document.getElementById('api-key');
    const aiModel = document.getElementById('ai-model');
    const temperature = document.getElementById('temperature');
    const temperatureValue = document.getElementById('temperature-value');
    const maxTokens = document.getElementById('max-tokens');

    const tabTraditional = document.getElementById('tab-traditional');
    const tabAI = document.getElementById('tab-ai');
    const traditionalInterpretation = document.getElementById('traditional-interpretation');
    const aiInterpretation = document.getElementById('ai-interpretation');
    
    const aiLoading = document.getElementById('ai-loading');
    const aiContent = document.getElementById('ai-content');
    const aiError = document.getElementById('ai-error');
    const errorMessage = document.getElementById('error-message');
    const aiInterpretBtn = document.getElementById('ai-interpret-btn');
    const aiDemoBtn = document.getElementById('ai-demo-btn');

    let currentDeck = [];
    let drawnCards = [];
    let isShuffled = false;
    let userQuestion = '';

    function initSettings() {
        aiToggle.checked = AI_CONFIG.settings.enabled;
        aiProvider.value = AI_CONFIG.settings.provider;
        apiKey.value = AI_CONFIG.settings.apiKey;
        maxTokens.value = AI_CONFIG.settings.maxTokens.toString();
        
        const tempPercent = AI_CONFIG.settings.temperature * 100;
        temperature.value = tempPercent.toString();
        temperatureValue.textContent = AI_CONFIG.settings.temperature.toFixed(1);
        
        updateAISettingsVisibility();
        updateModelOptions();
    }

    function updateAISettingsVisibility() {
        if (aiToggle.checked) {
            aiSettingsSection.classList.remove('hidden');
        } else {
            aiSettingsSection.classList.add('hidden');
        }
    }

    function updateModelOptions() {
        const provider = AI_CONFIG.providers[aiProvider.value];
        aiModel.innerHTML = '';
        
        provider.models.forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            
            if (model === AI_CONFIG.settings.model || 
                (!AI_CONFIG.settings.model && model === provider.defaultModel)) {
                option.selected = true;
            }
            
            aiModel.appendChild(option);
        });
    }

    function openSettings() {
        initSettings();
        settingsModal.classList.remove('hidden');
    }

    function closeSettingsModal() {
        settingsModal.classList.add('hidden');
    }

    function saveCurrentSettings() {
        AI_CONFIG.settings.enabled = aiToggle.checked;
        AI_CONFIG.settings.provider = aiProvider.value;
        AI_CONFIG.settings.apiKey = apiKey.value.trim();
        AI_CONFIG.settings.model = aiModel.value;
        AI_CONFIG.settings.temperature = parseFloat(temperature.value) / 100;
        AI_CONFIG.settings.maxTokens = parseInt(maxTokens.value);
        
        saveAIConfig();
        closeSettingsModal();
    }

    function switchToTraditional() {
        tabTraditional.classList.add('active');
        tabAI.classList.remove('active');
        traditionalInterpretation.classList.remove('hidden');
        aiInterpretation.classList.add('hidden');
    }

    function switchToAI() {
        tabAI.classList.add('active');
        tabTraditional.classList.remove('active');
        aiInterpretation.classList.remove('hidden');
        traditionalInterpretation.classList.add('hidden');
    }

    function showAIError(message) {
        aiLoading.classList.add('hidden');
        aiContent.classList.add('hidden');
        aiError.classList.remove('hidden');
        errorMessage.textContent = message;
        aiActionsVisible(true);
    }

    function showAIContent(content) {
        aiLoading.classList.add('hidden');
        aiError.classList.add('hidden');
        aiContent.classList.remove('hidden');
        aiContent.innerHTML = parseMarkdown(content);
        aiActionsVisible(true);
    }

    function showAILoading() {
        aiContent.classList.add('hidden');
        aiError.classList.add('hidden');
        aiLoading.classList.remove('hidden');
        aiActionsVisible(false);
    }

    function aiActionsVisible(visible) {
        if (visible) {
            aiInterpretBtn.disabled = false;
            aiDemoBtn.disabled = false;
        } else {
            aiInterpretBtn.disabled = true;
            aiDemoBtn.disabled = true;
        }
    }

    function parseMarkdown(text) {
        let result = text;
        
        result = result.replace(/^## (.+)$/gm, '<h2>$1</h2>');
        result = result.replace(/^### (.+)$/gm, '<h3>$1</h3>');
        result = result.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
        
        result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        result = result.replace(/\*(.+?)\*/g, '<em>$1</em>');
        
        result = result.replace(/^[-•] (.+)$/gm, '<li>$1</li>');
        result = result.replace(/(<li>.+<\/li>\n?)+/g, '<ul>$&</ul>');
        
        result = result.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
        result = result.replace(/(<li>.+<\/li>\n?)+/g, function(match) {
            if (match.includes('<ul>')) return match;
            return '<ol>' + match + '</ol>';
        });
        
        result = result.replace(/^---$/gm, '<hr>');
        
        result = result.split('\n\n').map(para => {
            if (para.startsWith('<') && !para.startsWith('<li>')) return para;
            return '<p>' + para + '</p>';
        }).join('\n');
        
        result = result.replace(/\n/g, '<br>');
        
        return result;
    }

    async function generateAIInterpretation() {
        if (drawnCards.length === 0) {
            showAIError('没有抽取的牌可以解读');
            return;
        }

        if (!AI_CONFIG.settings.enabled) {
            showAIContent(generateDemoInterpretation());
            return;
        }

        if (!AI_CONFIG.settings.apiKey) {
            showAIError('请先在设置中配置您的API密钥。如果没有API密钥，可以点击"查看演示版本"体验示例解读。');
            return;
        }

        showAILoading();

        try {
            const prompt = generateTarotPrompt(drawnCards, userQuestion);
            const result = await callAIAPI(prompt);
            showAIContent(result);
        } catch (error) {
            console.error('AI interpretation error:', error);
            let errorMsg = '发生未知错误，请稍后重试。';
            
            if (error.message.includes('401')) {
                errorMsg = 'API密钥无效，请检查您的API密钥是否正确。';
            } else if (error.message.includes('429')) {
                errorMsg = '请求过于频繁或额度不足，请稍后重试或检查您的API余额。';
            } else if (error.message.includes('network') || error.message.includes('fetch')) {
                errorMsg = '网络连接失败，请检查您的网络连接。';
            } else if (error.message) {
                errorMsg = error.message;
            }
            
            showAIError(errorMsg);
        }
    }

    function showDemoInterpretation() {
        showAIContent(generateDemoInterpretation());
    }

    function shuffleDeck() {
        currentDeck = getFullDeck();
        
        for (let i = currentDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [currentDeck[i], currentDeck[j]] = [currentDeck[j], currentDeck[i]];
        }
        
        isShuffled = true;
        cardCount.textContent = `剩余: ${currentDeck.length} 张`;
        
        deck.classList.add('shuffling');
        setTimeout(() => {
            deck.classList.remove('shuffling');
            drawBtn.classList.remove('hidden');
        }, 600);
    }

    function drawCards(num = 3) {
        if (currentDeck.length < num) {
            alert('牌不够了！请重新洗牌。');
            return;
        }

        userQuestion = questionInput.value.trim();

        drawnCards = [];
        const positions = ['过去', '现在', '未来'];

        for (let i = 0; i < num; i++) {
            const randomIndex = Math.floor(Math.random() * currentDeck.length);
            const card = currentDeck.splice(randomIndex, 1)[0];
            const isReversed = Math.random() < 0.5;
            
            drawnCards.push({
                ...card,
                isReversed: isReversed,
                position: positions[i]
            });
        }

        cardCount.textContent = `剩余: ${currentDeck.length} 张`;
        displayCards();
    }

    function displayCards() {
        cardsContainer.innerHTML = '';
        traditionalInterpretation.innerHTML = '';
        resetAIInterpretation();

        drawnCards.forEach((card, index) => {
            const cardWrapper = document.createElement('div');
            cardWrapper.className = 'card-wrapper';
            cardWrapper.innerHTML = `
                <div class="card-inner">
                    <div class="card-back-face">
                        <div class="card-pattern">
                            <span class="cat-emoji">🐾</span>
                            <span class="cat-emoji">🐱</span>
                            <span class="cat-emoji">🐾</span>
                        </div>
                    </div>
                    <div class="card-front" style="${card.isReversed ? 'transform: rotateY(180deg) rotate(180deg);' : ''}">
                        <div class="card-image">${card.emoji}</div>
                        <div class="card-name">${card.name}</div>
                        ${card.isReversed ? '<div class="card-reversed">逆位</div>' : ''}
                        <div class="card-position">${card.position}</div>
                    </div>
                </div>
            `;
            cardsContainer.appendChild(cardWrapper);
        });

        const interpretationTitle = document.createElement('h3');
        interpretationTitle.className = 'interpretation-title';
        interpretationTitle.textContent = '✨ 牌面解读 ✨';
        traditionalInterpretation.appendChild(interpretationTitle);

        const summaryDiv = document.createElement('div');
        summaryDiv.className = 'interpretation-summary';
        let questionText = userQuestion ? `<p class="question-text"><strong>💭 你的问题：</strong>${userQuestion}</p>` : '';
        summaryDiv.innerHTML = `
            ${questionText}
            <p class="summary-text">这三张牌分别代表你问卜事情的<strong>${drawnCards[0].position}</strong>、<strong>${drawnCards[1].position}</strong>和<strong>${drawnCards[2].position}</strong>。</p>
        `;
        traditionalInterpretation.appendChild(summaryDiv);

        drawnCards.forEach((card, index) => {
            const interpretationItem = document.createElement('div');
            interpretationItem.className = 'interpretation-item';
            
            const meaningText = card.isReversed ? card.reversed : card.meaning;
            const detailedMeaning = card.isReversed ? (card.reversedDetailed || card.reversed) : (card.detailedMeaning || card.meaning);
            
            interpretationItem.innerHTML = `
                <div class="interpretation-card-name">
                    ${card.emoji} ${card.name} - ${card.position}${card.isReversed ? ' (逆位)' : ''}
                </div>
                <div class="interpretation-meaning">
                    <strong>${card.isReversed ? '逆位含义：' : '正位含义：'}</strong>${meaningText}<br><br>
                    <strong>详细解读：</strong>${detailedMeaning}
                </div>
            `;
            traditionalInterpretation.appendChild(interpretationItem);
        });

        const overallInterpretation = generateOverallInterpretation(drawnCards);
        const overallDiv = document.createElement('div');
        overallDiv.className = 'interpretation-overall';
        overallDiv.innerHTML = `
            <div class="overall-title">🔮 综合解读 🔮</div>
            <div class="overall-text">${overallInterpretation}</div>
        `;
        traditionalInterpretation.appendChild(overallDiv);

        setTimeout(() => {
            const cardWrappers = document.querySelectorAll('.card-wrapper');
            cardWrappers.forEach((wrapper, index) => {
                setTimeout(() => {
                    wrapper.classList.add('flipped');
                }, index * 500);
            });
        }, 300);

        setTimeout(() => {
            shuffleSection.classList.add('hidden');
            readingSection.classList.remove('hidden');
        }, drawnCards.length * 500 + 500);
    }

    function resetAIInterpretation() {
        aiLoading.classList.add('hidden');
        aiContent.classList.add('hidden');
        aiError.classList.add('hidden');
        aiActionsVisible(true);
    }

    function generateOverallInterpretation(cards) {
        const past = cards[0];
        const present = cards[1];
        const future = cards[2];
        
        let overall = '';
        
        const pastPositive = !past.isReversed;
        const presentPositive = !present.isReversed;
        const futurePositive = !future.isReversed;
        
        if (futurePositive) {
            if (presentPositive && pastPositive) {
                overall = `从${past.position}到${future.position}，你的运势呈现出积极向上的趋势。${past.name}所代表的过去为你奠定了良好的基础，${present.name}显示你当前正处于有利的状态，而${future.name}预示着未来充满希望。建议你保持当前的积极态度，继续努力，好运将会接踵而至。`;
            } else if (presentPositive) {
                overall = `虽然${past.name}所代表的${past.position}可能经历了一些挑战，但${present.name}显示你当前已经走出了困境，处于积极的状态。${future.name}预示着${future.position}将会更加美好。建议你从过去的经历中吸取教训，珍惜当下的机会，迎接更光明的未来。`;
            } else {
                overall = `从${past.name}（${past.position}）到${present.name}（${present.position}），你可能经历了一些起伏。不过好消息是，${future.name}预示着${future.position}将会有积极的转变。建议你保持耐心和信心，困难只是暂时的，阳光总在风雨后。`;
            }
        } else {
            if (presentPositive) {
                overall = `${past.name}（${past.position}）和${present.name}（${present.position}）显示你目前的状态还不错，但${future.name}（${future.position}）提醒你需要警惕一些潜在的问题。建议你在顺境中保持谦逊和谨慎，提前做好准备，以应对可能的挑战。`;
            } else if (pastPositive) {
                overall = `${past.name}（${past.position}）代表着美好的过去，但${present.name}（${present.position}）和${future.name}（${future.position}）显示你可能正处于或即将面临一些困难。建议你回顾过去成功的经验，从中汲取力量，勇敢面对当前的挑战。记住，每一次困境都是成长的机会。`;
            } else {
                overall = `从${past.name}（${past.position}）到${future.name}（${future.position}），你可能正在经历一段较为艰难的时期。但请记住，塔罗牌只是揭示了当前能量的趋势，命运最终掌握在你自己手中。${present.name}（${present.position}）提醒你要关注当下，积极寻求改变的方法。保持希望，低谷之后必然会有回升。`;
            }
        }
        
        return overall;
    }

    function showShuffleSection() {
        introSection.classList.add('hidden');
        shuffleSection.classList.remove('hidden');
        
        currentDeck = getFullDeck();
        isShuffled = false;
        cardCount.textContent = `剩余: ${currentDeck.length} 张`;
        drawBtn.classList.add('hidden');
    }

    function restart() {
        readingSection.classList.add('hidden');
        shuffleSection.classList.remove('hidden');
        
        currentDeck = getFullDeck();
        isShuffled = false;
        cardCount.textContent = `剩余: ${currentDeck.length} 张`;
        drawBtn.classList.add('hidden');
        
        switchToTraditional();
        resetAIInterpretation();
    }

    startBtn.addEventListener('click', showShuffleSection);
    shuffleBtn.addEventListener('click', shuffleDeck);
    drawBtn.addEventListener('click', () => drawCards(3));
    restartBtn.addEventListener('click', restart);

    settingsBtn.addEventListener('click', openSettings);
    closeSettings.addEventListener('click', closeSettingsModal);
    cancelSettings.addEventListener('click', closeSettingsModal);
    saveSettings.addEventListener('click', saveCurrentSettings);
    
    aiToggle.addEventListener('change', updateAISettingsVisibility);
    aiProvider.addEventListener('change', updateModelOptions);
    
    temperature.addEventListener('input', function() {
        const temp = (parseFloat(this.value) / 100).toFixed(1);
        temperatureValue.textContent = temp;
    });

    tabTraditional.addEventListener('click', switchToTraditional);
    tabAI.addEventListener('click', switchToAI);
    
    aiInterpretBtn.addEventListener('click', generateAIInterpretation);
    aiDemoBtn.addEventListener('click', showDemoInterpretation);

    settingsModal.addEventListener('click', function(e) {
        if (e.target === settingsModal) {
            closeSettingsModal();
        }
    });

    initSettings();
});
