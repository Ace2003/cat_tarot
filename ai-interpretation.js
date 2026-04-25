const AI_CONFIG = {
    providers: {
        openai: {
            name: "OpenAI",
            apiEndpoint: "https://api.openai.com/v1/chat/completions",
            models: ["gpt-4o", "gpt-4-turbo", "gpt-3.5-turbo"],
            defaultModel: "gpt-3.5-turbo"
        },
        deepseek: {
            name: "DeepSeek",
            apiEndpoint: "https://api.deepseek.com/v1/chat/completions",
            models: ["deepseek-chat", "deepseek-coder"],
            defaultModel: "deepseek-chat"
        },
        moonshot: {
            name: "Moonshot AI",
            apiEndpoint: "https://api.moonshot.cn/v1/chat/completions",
            models: ["moonshot-v1-8k", "moonshot-v1-32k", "moonshot-v1-128k"],
            defaultModel: "moonshot-v1-8k"
        },
        qwen: {
            name: "通义千问",
            apiEndpoint: "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
            models: ["qwen-turbo", "qwen-plus", "qwen-max"],
            defaultModel: "qwen-turbo"
        },
        doubao: {
            name: "豆包",
            apiEndpoint: "https://ark.cn-beijing.volces.com/api/v3/chat/completions",
            models: ["doubao-pro-32k", "doubao-seed-1-8k", "doubao-seed-1-32k"],
            defaultModel: "doubao-pro-32k"
        }
    },
    settings: {
        provider: localStorage.getItem('ai_provider') || 'openai',
        apiKey: localStorage.getItem('ai_api_key') || '',
        model: localStorage.getItem('ai_model') || '',
        enabled: localStorage.getItem('ai_enabled') === 'true',
        temperature: 0.7,
        maxTokens: 2000
    }
};

function saveAIConfig() {
    localStorage.setItem('ai_provider', AI_CONFIG.settings.provider);
    localStorage.setItem('ai_api_key', AI_CONFIG.settings.apiKey);
    localStorage.setItem('ai_model', AI_CONFIG.settings.model);
    localStorage.setItem('ai_enabled', AI_CONFIG.settings.enabled.toString());
}

function getCurrentProvider() {
    return AI_CONFIG.providers[AI_CONFIG.settings.provider];
}

function getCurrentModel() {
    const provider = getCurrentProvider();
    return AI_CONFIG.settings.model || provider.defaultModel;
}

function generateTarotPrompt(cards, userQuestion = '') {
    const positions = ['过去', '现在', '未来'];
    let cardsInfo = cards.map((card, index) => {
        const position = positions[index];
        const orientation = card.isReversed ? '逆位' : '正位';
        const basicMeaning = card.isReversed ? card.reversed : card.meaning;
        const detailedMeaning = card.isReversed ? (card.reversedDetailed || card.reversed) : (card.detailedMeaning || card.meaning);
        
        return `
第${index + 1}张牌（${position}）：
- 牌名：${card.name} (${card.nameEn})
- 状态：${orientation}
- 基本含义：${basicMeaning}
- 详细解读：${detailedMeaning}
- 牌面符号：${card.emoji}
`;
    }).join('\n');

    const questionContext = userQuestion ? `
用户的具体问题：${userQuestion}
` : '';

    return `
你是一位专业的塔罗牌解读师，拥有丰富的塔罗知识和心理学背景。请根据以下抽取的三张牌（时间流牌阵：过去、现在、未来），为用户提供一份详细、温暖且富有洞察力的解读。

${questionContext}
抽取的牌面信息：
${cardsInfo}

请按照以下结构提供解读：

## 牌面整体能量分析
分析这三张牌组合在一起所呈现的整体能量流动，从过去到现在再到未来的趋势。

## 单张牌深度解读
分别解读每张牌在其位置上的具体含义，包括：
1. 过去位：过去的经历、影响、因果
2. 现在位：当前的状态、挑战、机遇
3. 未来位：可能的发展趋势、需要注意的地方

## 综合运势解读
结合三张牌，分析：
- 情感/人际关系运势
- 事业/学业运势
- 财务/物质运势
- 精神/个人成长

## 具体建议
1. 需要关注的重点
2. 可以采取的行动
3. 需要避免的陷阱
4. 心态调整建议

## 结语
用温暖、鼓励的语言总结，给予用户希望和力量。

要求：
1. 解读要专业但易懂，避免过于晦涩的术语
2. 要考虑牌与牌之间的相互影响和联系
3. 语言要温暖、有同理心，给予积极的引导
4. 字数控制在1500-2000字左右
5. 如果用户有具体问题，解读要围绕用户的问题展开

请用中文回复，使用Markdown格式。
`;
}

async function callAIAPI(prompt) {
    if (!AI_CONFIG.settings.enabled || !AI_CONFIG.settings.apiKey) {
        console.log('AI not enabled or no API key provided, using demo mode');
        return generateDemoInterpretation();
    }

    const provider = getCurrentProvider();
    const model = getCurrentModel();
    const endpoint = provider.apiEndpoint;
    const apiKey = AI_CONFIG.settings.apiKey;

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    {
                        role: 'system',
                        content: '你是一位专业的塔罗牌解读师，拥有丰富的塔罗知识、心理学背景和敏锐的洞察力。你能够用温暖、富有同理心的语言为用户提供专业但易懂的塔罗牌解读。'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: AI_CONFIG.settings.temperature,
                max_tokens: AI_CONFIG.settings.maxTokens
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `API请求失败: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.choices && data.choices[0] && data.choices[0].message) {
            return data.choices[0].message.content;
        }
        
        throw new Error('无法解析API响应');

    } catch (error) {
        console.error('AI API Error:', error);
        throw error;
    }
}

function generateDemoInterpretation() {
    return `
## 牌面整体能量分析

从这三张牌的组合来看，你的生活正处于一个重要的转变时期。过去的经历正在为你现在的成长提供养分，而未来则充满了无限的可能性。整体能量呈现出从反思到行动再到绽放的积极趋势。

## 单张牌深度解读

### 过去位
过去的你可能经历了一段内省或独处的时期。这段时间让你有机会深入思考生命中的重要问题，虽然有时可能感到孤独或困惑，但这段经历为你现在的成长奠定了重要的基础。你从过去的经历中学到了宝贵的智慧。

### 现在位
当前的你正处于一个充满活力和创造力的阶段。你可能感到新的想法和灵感正在涌现，这是采取行动的好时机。过去的反思正在转化为现在的行动力。你可能感到比以往更有动力去追求你的目标和梦想。

### 未来位
未来的牌面显示出积极的可能性。你正在走向一个更加完整和满足的阶段。你过去的努力和现在的行动将在未来结出果实。这是一个充满希望的信号，提醒你保持信心，继续朝着你的目标前进。

## 综合运势解读

### 情感/人际关系
在情感方面，你正在从过去的经历中学习，并将这些智慧应用到现在的关系中。你可能更加清楚自己在关系中真正想要什么。未来的关系将更加成熟和令人满足。

### 事业/学业
在事业或学业方面，现在是采取行动的好时机。你可能有新的想法或机会出现。过去的准备正在为现在的成功创造条件。保持专注和努力，未来将会看到回报。

### 财务/物质
财务状况可能正在改善或趋于稳定。你可能更加明智地管理你的资源。过去的财务教训正在帮助你现在做出更好的决定。未来有财务稳定和增长的迹象。

### 精神/个人成长
在个人成长方面，你正处于一个美好的旅程中。从过去的反思到现在的行动，你正在不断进化。未来预示着更深的自我了解和个人成就感。这是一个持续学习和成长的时期。

## 具体建议

### 需要关注的重点
- 关注过去学到的智慧，不要忽视它们的价值
- 把握现在的机会，不要让想法停留在想象中
- 对未来保持信心，但也要保持现实的态度

### 可以采取的行动
- 花时间反思过去，确认你学到的重要教训
- 为你的目标制定具体的计划，从小步骤开始
- 保持开放的心态，愿意学习和适应
- 照顾好自己的身心健康，保持平衡的生活

### 需要避免的陷阱
- 不要停留在过去的回忆中，要活在当下
- 不要因为害怕失败而不敢采取行动
- 不要过度担心未来，要相信过程
- 不要忽视自己的直觉和内在的声音

### 心态调整建议
- 培养感恩的心态，感谢过去的所有经历
- 保持积极但现实的态度
- 相信自己的能力和成长的潜力
- 对自己和他人保持耐心和同理心

## 结语

亲爱的朋友，从这三张牌来看，你正走在一条美好的成长道路上。过去的经历是你的财富，现在的你充满了力量，而未来充满了希望。

记住，塔罗牌只是揭示了当前能量的趋势，最终的结果取决于你的选择和行动。你有力量创造你想要的生活。

保持信心，继续前进，相信自己的直觉，勇敢地追求你的梦想。宇宙正在支持你的成长之旅。

✨ 愿你找到内心的平静与力量，绽放属于你的光芒 ✨

---
*注：这是AI功能的演示版本。要获得基于你实际抽取牌面的个性化AI解读，请在设置中配置你的API密钥。*
`;
}

function generateQuickInterpretation(cards) {
    const positions = ['过去', '现在', '未来'];
    let summary = cards.map((card, index) => {
        const orientation = card.isReversed ? '逆位' : '正位';
        return `**${positions[index]}：${card.name}（${orientation}）**`;
    }).join('\n');

    return `
## 快速解读摘要

${summary}

根据牌面组合的简要分析：

这三张牌共同揭示了你从过去到未来的能量流动。过去的经历正在影响你的现在，而你现在的选择将塑造你的未来。

**核心提示：**
- 过去的经历是你的宝贵财富，从中学习但不要被困住
- 现在是采取行动或做出重要决定的关键时期
- 未来充满可能性，保持开放和积极的心态

请使用AI智能解读功能获得更详细、个性化的分析。
`;
}

const AIInterpretation = {
    config: AI_CONFIG,
    saveConfig: saveAIConfig,
    getCurrentProvider,
    getCurrentModel,
    generateTarotPrompt,
    callAIAPI,
    generateDemoInterpretation,
    generateQuickInterpretation
};
