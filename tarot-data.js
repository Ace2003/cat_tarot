const tarotDeck = {
    majorArcana: [
        {
            id: 0,
            name: "愚人",
            nameEn: "The Fool",
            emoji: "😺",
            meaning: "新的开始、冒险精神、天真无邪、无限可能",
            reversed: "鲁莽、冲动、不负责任、逃避现实"
        },
        {
            id: 1,
            name: "魔术师",
            nameEn: "The Magician",
            emoji: "🧙",
            meaning: "创造力、意志力、技能、显化能力",
            reversed: "欺骗、操纵、未实现的潜力、技能不足"
        },
        {
            id: 2,
            name: "女祭司",
            nameEn: "The High Priestess",
            emoji: "👸",
            meaning: "直觉、潜意识、神秘、内在智慧",
            reversed: "压抑直觉、表面肤浅、忽略内心声音"
        },
        {
            id: 3,
            name: "女皇",
            nameEn: "The Empress",
            emoji: "👑",
            meaning: "丰饶、母性、自然、感官享受",
            reversed: "创造力受阻、依赖、过度保护"
        },
        {
            id: 4,
            name: "皇帝",
            nameEn: "The Emperor",
            emoji: "🤴",
            meaning: "权威、结构、控制、父性",
            reversed: "滥用权力、固执、缺乏纪律"
        },
        {
            id: 5,
            name: "教皇",
            nameEn: "The Hierophant",
            emoji: "⛪",
            meaning: "传统、信仰、教育、社会规范",
            reversed: "挑战传统、异端、追求自由"
        },
        {
            id: 6,
            name: "恋人",
            nameEn: "The Lovers",
            emoji: "💕",
            meaning: "爱、和谐、关系、选择",
            reversed: "不和谐、价值观冲突、逃避承诺"
        },
        {
            id: 7,
            name: "战车",
            nameEn: "The Chariot",
            emoji: "🏆",
            meaning: "胜利、意志力、决心、自我控制",
            reversed: "失去方向、缺乏控制、攻击性"
        },
        {
            id: 8,
            name: "力量",
            nameEn: "Strength",
            emoji: "🦁",
            meaning: "勇气、耐心、内在力量、同情心",
            reversed: "自我怀疑、软弱、被情绪控制"
        },
        {
            id: 9,
            name: "隐士",
            nameEn: "The Hermit",
            emoji: "🎋",
            meaning: "内省、独处、寻求真理、指导",
            reversed: "孤立、孤独、逃避社会"
        },
        {
            id: 10,
            name: "命运之轮",
            nameEn: "Wheel of Fortune",
            emoji: "🎡",
            meaning: "好运、因果、生命周期、转折点",
            reversed: "厄运、抵抗变化、不幸"
        },
        {
            id: 11,
            name: "正义",
            nameEn: "Justice",
            emoji: "⚖️",
            meaning: "公正、真理、因果报应、法律",
            reversed: "不公正、逃避责任、不公平"
        },
        {
            id: 12,
            name: "倒吊人",
            nameEn: "The Hanged Man",
            emoji: "🙃",
            meaning: "暂停、牺牲、新视角、等待",
            reversed: "拖延、无谓牺牲、逃避"
        },
        {
            id: 13,
            name: "死神",
            nameEn: "Death",
            emoji: "💀",
            meaning: "结束、转变、重生、过渡",
            reversed: "抗拒改变、停滞、无法放手"
        },
        {
            id: 14,
            name: "节制",
            nameEn: "Temperance",
            emoji: "🧪",
            meaning: "平衡、适度、耐心、调和",
            reversed: "失衡、过度、缺乏远见"
        },
        {
            id: 15,
            name: "恶魔",
            nameEn: "The Devil",
            emoji: "😈",
            meaning: "束缚、物质主义、性、阴影自我",
            reversed: "挣脱束缚、重新掌控、精神觉醒"
        },
        {
            id: 16,
            name: "塔",
            nameEn: "The Tower",
            emoji: "🗼",
            meaning: "突变、混乱、启示、觉醒",
            reversed: "个人转变、避免灾难、恐惧改变"
        },
        {
            id: 17,
            name: "星星",
            nameEn: "The Star",
            emoji: "⭐",
            meaning: "希望、灵感、宁静、精神指引",
            reversed: "绝望、缺乏信仰、消极"
        },
        {
            id: 18,
            name: "月亮",
            nameEn: "The Moon",
            emoji: "🌙",
            meaning: "幻觉、恐惧、焦虑、潜意识",
            reversed: "释放恐惧、压抑情绪、混乱"
        },
        {
            id: 19,
            name: "太阳",
            nameEn: "The Sun",
            emoji: "☀️",
            meaning: "积极、温暖、成功、活力",
            reversed: "内在阴郁、暂时消沉、过度乐观"
        },
        {
            id: 20,
            name: "审判",
            nameEn: "Judgement",
            emoji: "📯",
            meaning: "觉醒、救赎、重生、召唤",
            reversed: "自我怀疑、拒绝召唤、恐惧评判"
        },
        {
            id: 21,
            name: "世界",
            nameEn: "The World",
            emoji: "🌍",
            meaning: "完成、整合、成就、旅行",
            reversed: "未完成、缺乏终结、空虚"
        }
    ],
    minorArcana: {
        wands: [
            { id: 22, name: "权杖一", nameEn: "Ace of Wands", emoji: "🔥", meaning: "新创意、激情、灵感、新开始", reversed: "创意阻塞、缺乏热情、延迟" },
            { id: 23, name: "权杖二", nameEn: "Two of Wands", emoji: "🌴", meaning: "规划、决策、未来愿景", reversed: "恐惧变化、缺乏规划" },
            { id: 24, name: "权杖三", nameEn: "Three of Wands", emoji: "⛵", meaning: "探索、机会、扩展、远见", reversed: "延迟、缺乏进展" },
            { id: 25, name: "权杖四", nameEn: "Four of Wands", emoji: "🏡", meaning: "庆祝、和谐、稳定、家园", reversed: "不和谐、不稳定" },
            { id: 26, name: "权杖五", nameEn: "Five of Wands", emoji: "⚔️", meaning: "竞争、冲突、斗争", reversed: "避免冲突、和谐" },
            { id: 27, name: "权杖六", nameEn: "Six of Wands", emoji: "🏅", meaning: "胜利、成功、认可、荣耀", reversed: "失败、缺乏认可" },
            { id: 28, name: "权杖七", nameEn: "Seven of Wands", emoji: "🛡️", meaning: "防御、挑战、坚持立场", reversed: "放弃、被压倒" },
            { id: 29, name: "权杖八", nameEn: "Eight of Wands", emoji: "🚀", meaning: "快速行动、进展、消息", reversed: "延迟、挫折" },
            { id: 30, name: "权杖九", nameEn: "Nine of Wands", emoji: "💪", meaning: "韧性、防御、坚持", reversed: "疲惫、放弃" },
            { id: 31, name: "权杖十", nameEn: "Ten of Wands", emoji: "🎒", meaning: "负担、责任、压力", reversed: "释放、授权" },
            { id: 32, name: "权杖侍从", nameEn: "Page of Wands", emoji: "🎭", meaning: "热情、新消息、创意灵感", reversed: "缺乏方向、冲动" },
            { id: 33, name: "权杖骑士", nameEn: "Knight of Wands", emoji: "🐎", meaning: "冒险、行动、冲动", reversed: "延迟、缺乏方向" },
            { id: 34, name: "权杖女王", nameEn: "Queen of Wands", emoji: "👑", meaning: "自信、魅力、创造力", reversed: "自我怀疑、嫉妒" },
            { id: 35, name: "权杖国王", nameEn: "King of Wands", emoji: "🦁", meaning: "领导力、愿景、企业家精神", reversed: "冲动、暴君" }
        ],
        cups: [
            { id: 36, name: "圣杯一", nameEn: "Ace of Cups", emoji: "💖", meaning: "新情感、爱、直觉、精神", reversed: "情感空虚、失去爱" },
            { id: 37, name: "圣杯二", nameEn: "Two of Cups", emoji: "🤝", meaning: "伙伴关系、和谐、共同愿景", reversed: "不平衡、分离" },
            { id: 38, name: "圣杯三", nameEn: "Three of Cups", emoji: "🎉", meaning: "庆祝、友谊、幸福", reversed: "孤独、不和谐" },
            { id: 39, name: "圣杯四", nameEn: "Four of Cups", emoji: "😔", meaning: "不满、厌倦、沉思", reversed: "新机会、觉醒" },
            { id: 40, name: "圣杯五", nameEn: "Five of Cups", emoji: "😢", meaning: "损失、悲伤、失望", reversed: "接受、治愈" },
            { id: 41, name: "圣杯六", nameEn: "Six of Cups", emoji: "👶", meaning: "怀旧、童年、纯真", reversed: "活在过去、幼稚" },
            { id: 42, name: "圣杯七", nameEn: "Seven of Cups", emoji: "🌙", meaning: "幻想、迷惑、选择", reversed: "现实、混乱" },
            { id: 43, name: "圣杯八", nameEn: "Eight of Cups", emoji: "🚶", meaning: "离开、失望、寻求更深", reversed: "避免改变、停滞" },
            { id: 44, name: "圣杯九", nameEn: "Nine of Cups", emoji: "😊", meaning: "满足、幸福、愿望实现", reversed: "不满足、缺乏" },
            { id: 45, name: "圣杯十", nameEn: "Ten of Cups", emoji: "👨‍👩‍👧‍👦", meaning: "家庭幸福、和谐、满足", reversed: "家庭不和谐、破碎" },
            { id: 46, name: "圣杯侍从", nameEn: "Page of Cups", emoji: "💌", meaning: "情感消息、新关系、敏感", reversed: "情绪不稳定、幼稚" },
            { id: 47, name: "圣杯骑士", nameEn: "Knight of Cups", emoji: "🎨", meaning: "浪漫、魅力、理想主义", reversed: "情绪波动、幻想" },
            { id: 48, name: "圣杯女王", nameEn: "Queen of Cups", emoji: "👸", meaning: "同理心、直觉、情感成熟", reversed: "情绪失控、依赖" },
            { id: 49, name: "圣杯国王", nameEn: "King of Cups", emoji: "👑", meaning: "情感控制、智慧、外交", reversed: "情绪波动、操纵" }
        ],
        swords: [
            { id: 50, name: "宝剑一", nameEn: "Ace of Swords", emoji: "⚡", meaning: "新思想、真理、清晰、突破", reversed: "困惑、混乱、缺乏" },
            { id: 51, name: "宝剑二", nameEn: "Two of Swords", emoji: "⚔️", meaning: "僵局、决定、平衡", reversed: "困惑、三心二意" },
            { id: 52, name: "宝剑三", nameEn: "Three of Swords", emoji: "💔", meaning: "心碎、悲伤、失望", reversed: "治愈、宽恕" },
            { id: 53, name: "宝剑四", nameEn: "Four of Swords", emoji: "😴", meaning: "休息、恢复、冥想", reversed: "不安、逃避" },
            { id: 54, name: "宝剑五", nameEn: "Five of Swords", emoji: "😤", meaning: "冲突、失败、胜利", reversed: "和解、放下" },
            { id: 55, name: "宝剑六", nameEn: "Six of Swords", emoji: "🚢", meaning: "过渡、离开、治愈", reversed: "停滞、无法前进" },
            { id: 56, name: "宝剑七", nameEn: "Seven of Swords", emoji: "🕵️", meaning: "欺骗、策略、隐藏", reversed: "曝光、诚实" },
            { id: 57, name: "宝剑八", nameEn: "Eight of Swords", emoji: "🙈", meaning: "限制、恐惧、自我限制", reversed: "自由、释放" },
            { id: 58, name: "宝剑九", nameEn: "Nine of Swords", emoji: "😰", meaning: "焦虑、恐惧、噩梦", reversed: "治愈、平静" },
            { id: 59, name: "宝剑十", nameEn: "Ten of Swords", emoji: "💀", meaning: "结束、背叛、痛苦", reversed: "恢复、重生" },
            { id: 60, name: "宝剑侍从", nameEn: "Page of Swords", emoji: "📚", meaning: "好奇、新思想、消息", reversed: "流言蜚语、冲动" },
            { id: 61, name: "宝剑骑士", nameEn: "Knight of Swords", emoji: "⚔️", meaning: "快速行动、冲动、直言不讳", reversed: "鲁莽、缺乏考虑" },
            { id: 62, name: "宝剑女王", nameEn: "Queen of Swords", emoji: "👸", meaning: "独立、清晰、诚实", reversed: "刻薄、痛苦" },
            { id: 63, name: "宝剑国王", nameEn: "King of Swords", emoji: "👑", meaning: "智力、权威、真理", reversed: "操纵、冷酷" }
        ],
        pentacles: [
            { id: 64, name: "钱币一", nameEn: "Ace of Pentacles", emoji: "💰", meaning: "新机会、繁荣、物质", reversed: "失去机会、缺乏" },
            { id: 65, name: "钱币二", nameEn: "Two of Pentacles", emoji: "⚖️", meaning: "平衡、适应、时间管理", reversed: "失衡、混乱" },
            { id: 66, name: "钱币三", nameEn: "Three of Pentacles", emoji: "🏗️", meaning: "团队合作、技能、计划", reversed: "缺乏团队合作、技能不足" },
            { id: 67, name: "钱币四", nameEn: "Four of Pentacles", emoji: "🏦", meaning: "安全、稳定、控制", reversed: "贪婪、吝啬" },
            { id: 68, name: "钱币五", nameEn: "Five of Pentacles", emoji: "🏚️", meaning: "损失、贫困、困难", reversed: "恢复、改善" },
            { id: 69, name: "钱币六", nameEn: "Six of Pentacles", emoji: "🎁", meaning: "给予、接受、慈善", reversed: "自私、债务" },
            { id: 70, name: "钱币七", nameEn: "Seven of Pentacles", emoji: "🌱", meaning: "耐心、投资、长期", reversed: " impatience、缺乏" },
            { id: 71, name: "钱币八", nameEn: "Eight of Pentacles", emoji: "🔨", meaning: "技能、勤奋、专注", reversed: "缺乏技能、懒惰" },
            { id: 72, name: "钱币九", nameEn: "Nine of Pentacles", emoji: "🏠", meaning: "独立、成功、物质", reversed: "依赖、缺乏" },
            { id: 73, name: "钱币十", nameEn: "Ten of Pentacles", emoji: "👨‍👩‍👧‍👦", meaning: "遗产、家庭、安全", reversed: "不稳定、失去" },
            { id: 74, name: "钱币侍从", nameEn: "Page of Pentacles", emoji: "📚", meaning: "学习、新机会、实用", reversed: "缺乏进展、不切实际" },
            { id: 75, name: "钱币骑士", nameEn: "Knight of Pentacles", emoji: "🐎", meaning: "努力、可靠、保守", reversed: "固执、懒惰" },
            { id: 76, name: "钱币女王", nameEn: "Queen of Pentacles", emoji: "👸", meaning: "滋养、实际、安全", reversed: "自我中心、物质主义" },
            { id: 77, name: "钱币国王", nameEn: "King of Pentacles", emoji: "👑", meaning: "成功、安全、稳定", reversed: "固执、物质主义" }
        ]
    }
};

function getFullDeck() {
    const deck = [...tarotDeck.majorArcana];
    
    for (const suit in tarotDeck.minorArcana) {
        deck.push(...tarotDeck.minorArcana[suit]);
    }
    
    return deck;
}
