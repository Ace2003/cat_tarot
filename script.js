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
    const loadingOverlay = document.getElementById('loading-overlay');

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
                isReversed: isReversed,
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
        interpretationContainer.appendChild(interpretationTitle);

        const summaryDiv = document.createElement('div');
        summaryDiv.className = 'interpretation-summary';
        summaryDiv.innerHTML = `
            <p class="summary-text">这三张牌分别代表你问卜事情的<strong>${drawnCards[0].position}</strong>、<strong>${drawnCards[1].position}</strong>和<strong>${drawnCards[2].position}</strong>。</p>
        `;
        interpretationContainer.appendChild(summaryDiv);

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
            interpretationContainer.appendChild(interpretationItem);
        });

        const overallInterpretation = generateOverallInterpretation(drawnCards);
        const overallDiv = document.createElement('div');
        overallDiv.className = 'interpretation-overall';
        overallDiv.innerHTML = `
            <div class="overall-title">🔮 综合解读 🔮</div>
            <div class="overall-text">${overallInterpretation}</div>
        `;
        interpretationContainer.appendChild(overallDiv);

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
    }

    startBtn.addEventListener('click', showShuffleSection);
    shuffleBtn.addEventListener('click', shuffleDeck);
    drawBtn.addEventListener('click', () => drawCards(3));
    restartBtn.addEventListener('click', restart);
});
