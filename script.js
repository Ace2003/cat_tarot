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
    const interpretationContainer = document.getElementById('interpretation-container');

    let currentDeck = [];
    let drawnCards = [];
    let isShuffled = false;

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

        drawnCards = [];
        const positions = ['过去', '现在', '未来'];

        for (let i = 0; i < num; i++) {
            const randomIndex = Math.floor(Math.random() * currentDeck.length);
            const card = currentDeck.splice(randomIndex, 1)[0];
            const isReversed = Math.random() < 0.5;
            
            drawnCards.push({
                ...card,
                reversed: isReversed,
                position: positions[i]
            });
        }

        cardCount.textContent = `剩余: ${currentDeck.length} 张`;
        displayCards();
    }

    function displayCards() {
        cardsContainer.innerHTML = '';
        interpretationContainer.innerHTML = '';

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
                    <div class="card-front" style="${card.reversed ? 'transform: rotateY(180deg) rotate(180deg);' : ''}">
                        <div class="card-image">${card.emoji}</div>
                        <div class="card-name">${card.name}</div>
                        ${card.reversed ? '<div class="card-reversed">逆位</div>' : ''}
                        <div class="card-position">${card.position}</div>
                    </div>
                </div>
            `;
            cardsContainer.appendChild(cardWrapper);
        });

        const interpretationTitle = document.createElement('h3');
        interpretationTitle.className = 'interpretation-title';
        interpretationTitle.textContent = '✨ 牌面解读 ✨';
        interpretationContainer.appendChild(interpretationTitle);

        drawnCards.forEach((card, index) => {
            const interpretationItem = document.createElement('div');
            interpretationItem.className = 'interpretation-item';
            interpretationItem.innerHTML = `
                <div class="interpretation-card-name">
                    ${card.emoji} ${card.name} - ${card.position}${card.reversed ? ' (逆位)' : ''}
                </div>
                <div class="interpretation-meaning">
                    <strong>${card.reversed ? '逆位含义：' : '正位含义：'}</strong>
                    ${card.reversed ? card.reversed : card.meaning}
                </div>
            `;
            interpretationContainer.appendChild(interpretationItem);
        });

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
    }

    startBtn.addEventListener('click', showShuffleSection);
    shuffleBtn.addEventListener('click', shuffleDeck);
    drawBtn.addEventListener('click', () => drawCards(3));
    restartBtn.addEventListener('click', restart);
});
