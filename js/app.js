// ===================================
// カテゴリー定義と質問データ
// ===================================
const categories = [
    { id: 1, name: "心身の健康" },
    { id: 2, name: "仕事の充実感" },
    { id: 3, name: "人間関係" },
    { id: 4, name: "成長機会" },
    { id: 5, name: "組織への信頼" },
    { id: 6, name: "ワークライフバランス" },
    { id: 7, name: "評価と報酬" },
    { id: 8, name: "職場環境" },
    { id: 9, name: "キャリア展望" },
    { id: 10, name: "組織文化" }
];

const questions = [
    // カテゴリー1: 心身の健康 (Q1-Q10)
    { id: 1, category: 1, text: "仕事のストレスは適切に管理できていると感じる" },
    { id: 2, category: 1, text: "十分な休息が取れていると感じる" },
    { id: 3, category: 1, text: "仕事とプライベートのバランスが取れている" },
    { id: 4, category: 1, text: "心身ともに健康だと感じる" },
    { id: 5, category: 1, text: "職場で心理的な安全性を感じる" },
    { id: 6, category: 1, text: "業務量は適切だと感じる" },
    { id: 7, category: 1, text: "職場の人間関係によるストレスは少ない" },
    { id: 8, category: 1, text: "健康面でのサポートが十分にある" },
    { id: 9, category: 1, text: "疲労感を感じることは少ない" },
    { id: 10, category: 1, text: "仕事による不安は少ない" },

    // カテゴリー2: 仕事の充実感 (Q11-Q20)
    { id: 11, category: 2, text: "自分の仕事に誇りを持っている" },
    { id: 12, category: 2, text: "仕事にやりがいを感じている" },
    { id: 13, category: 2, text: "自分の仕事が組織に貢献していると感じる" },
    { id: 14, category: 2, text: "日々の業務に意義を見出せている" },
    { id: 15, category: 2, text: "仕事を通じて達成感を得られている" },
    { id: 16, category: 2, text: "自分のスキルが仕事で活かされている" },
    { id: 17, category: 2, text: "仕事の目標が明確である" },
    { id: 18, category: 2, text: "仕事の成果が見える形で現れている" },
    { id: 19, category: 2, text: "仕事を通じて自己実現ができている" },
    { id: 20, category: 2, text: "毎日の仕事に意欲的に取り組んでいる" },

    // カテゴリー3: 人間関係 (Q21-Q30)
    { id: 21, category: 3, text: "上司との関係は良好である" },
    { id: 22, category: 3, text: "同僚との関係は良好である" },
    { id: 23, category: 3, text: "チーム内でのコミュニケーションは円滑である" },
    { id: 24, category: 3, text: "困ったときに相談できる人がいる" },
    { id: 25, category: 3, text: "職場の雰囲気は良いと感じる" },
    { id: 26, category: 3, text: "他部署との連携はスムーズである" },
    { id: 27, category: 3, text: "意見を自由に言える環境がある" },
    { id: 28, category: 3, text: "職場で孤立していると感じることはない" },
    { id: 29, category: 3, text: "チームメンバーを信頼している" },
    { id: 30, category: 3, text: "職場での人間関係にストレスは少ない" },

    // カテゴリー4: 成長機会 (Q31-Q40)
    { id: 31, category: 4, text: "新しいスキルを学ぶ機会がある" },
    { id: 32, category: 4, text: "研修や教育プログラムが充実している" },
    { id: 33, category: 4, text: "仕事を通じて成長できている" },
    { id: 34, category: 4, text: "挑戦的な業務に取り組む機会がある" },
    { id: 35, category: 4, text: "上司からのフィードバックが適切である" },
    { id: 36, category: 4, text: "自己啓発の時間が確保できている" },
    { id: 37, category: 4, text: "キャリアアップの道筋が見えている" },
    { id: 38, category: 4, text: "専門性を高める環境が整っている" },
    { id: 39, category: 4, text: "自分の能力を伸ばすサポートがある" },
    { id: 40, category: 4, text: "成長を実感できる機会が多い" },

    // カテゴリー5: 組織への信頼 (Q41-Q50)
    { id: 41, category: 5, text: "経営陣の方針に共感できる" },
    { id: 42, category: 5, text: "組織の将来性に期待が持てる" },
    { id: 43, category: 5, text: "組織のビジョンが明確である" },
    { id: 44, category: 5, text: "組織の意思決定プロセスは透明である" },
    { id: 45, category: 5, text: "組織の価値観に共感できる" },
    { id: 46, category: 5, text: "経営陣を信頼している" },
    { id: 47, category: 5, text: "組織の変革に前向きである" },
    { id: 48, category: 5, text: "組織の方向性に納得している" },
    { id: 49, category: 5, text: "組織の情報共有は適切である" },
    { id: 50, category: 5, text: "組織の一員であることに誇りを持っている" },

    // カテゴリー6: ワークライフバランス (Q51-Q60)
    { id: 51, category: 6, text: "労働時間は適切である" },
    { id: 52, category: 6, text: "残業は少ない" },
    { id: 53, category: 6, text: "休暇を取りやすい環境である" },
    { id: 54, category: 6, text: "プライベートの時間が確保できている" },
    { id: 55, category: 6, text: "柔軟な働き方ができている" },
    { id: 56, category: 6, text: "家族との時間を大切にできている" },
    { id: 57, category: 6, text: "趣味の時間が持てている" },
    { id: 58, category: 6, text: "仕事とプライベートの切り替えができている" },
    { id: 59, category: 6, text: "リモートワークなどの制度が活用できている" },
    { id: 60, category: 6, text: "ワークライフバランスに満足している" },

    // カテゴリー7: 評価と報酬 (Q61-Q70)
    { id: 61, category: 7, text: "給与に満足している" },
    { id: 62, category: 7, text: "評価制度は公平である" },
    { id: 63, category: 7, text: "自分の成果が適切に評価されている" },
    { id: 64, category: 7, text: "昇進・昇給の基準が明確である" },
    { id: 65, category: 7, text: "福利厚生が充実している" },
    { id: 66, category: 7, text: "報酬は業界水準と比べて適切である" },
    { id: 67, category: 7, text: "インセンティブ制度が適切である" },
    { id: 68, category: 7, text: "努力が報われる環境である" },
    { id: 69, category: 7, text: "評価面談は有意義である" },
    { id: 70, category: 7, text: "報酬体系に納得している" },

    // カテゴリー8: 職場環境 (Q71-Q80)
    { id: 71, category: 8, text: "オフィスの設備は充実している" },
    { id: 72, category: 8, text: "働きやすい物理的環境である" },
    { id: 73, category: 8, text: "ITツールやシステムは使いやすい" },
    { id: 74, category: 8, text: "必要な業務リソースが揃っている" },
    { id: 75, category: 8, text: "職場の清潔さが保たれている" },
    { id: 76, category: 8, text: "騒音や温度など環境面で快適である" },
    { id: 77, category: 8, text: "集中できる環境が整っている" },
    { id: 78, category: 8, text: "安全性が確保されている" },
    { id: 79, category: 8, text: "業務効率を高める環境が整っている" },
    { id: 80, category: 8, text: "職場環境の改善提案が受け入れられる" },

    // カテゴリー9: キャリア展望 (Q81-Q90)
    { id: 81, category: 9, text: "この会社で長く働きたいと思う" },
    { id: 82, category: 9, text: "キャリアパスが明確である" },
    { id: 83, category: 9, text: "将来のキャリアに希望が持てる" },
    { id: 84, category: 9, text: "異動や配置転換の機会がある" },
    { id: 85, category: 9, text: "自分のキャリア目標が達成できそうである" },
    { id: 86, category: 9, text: "社内でのキャリア相談ができる" },
    { id: 87, category: 9, text: "多様なキャリアの選択肢がある" },
    { id: 88, category: 9, text: "将来のポジションが想像できる" },
    { id: 89, category: 9, text: "この会社でのキャリアに満足している" },
    { id: 90, category: 9, text: "長期的に働ける環境である" },

    // カテゴリー10: 組織文化 (Q91-Q100)
    { id: 91, category: 10, text: "組織の文化や風土に共感できる" },
    { id: 92, category: 10, text: "イノベーションが奨励されている" },
    { id: 93, category: 10, text: "多様性が尊重されている" },
    { id: 94, category: 10, text: "失敗を恐れずチャレンジできる" },
    { id: 95, category: 10, text: "オープンなコミュニケーション文化がある" },
    { id: 96, category: 10, text: "組織の価値観が浸透している" },
    { id: 97, category: 10, text: "協力的な文化が根付いている" },
    { id: 98, category: 10, text: "顧客志向の文化がある" },
    { id: 99, category: 10, text: "継続的改善の文化がある" },
    { id: 100, category: 10, text: "組織文化に誇りを持っている" }
];

// ===================================
// グローバル変数
// ===================================
let currentSection = 0;
let answers = {};
let userInfo = {};

// ===================================
// ページ遷移
// ===================================
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    const targetPage = document.getElementById(pageId);
    
    if (!targetPage) {
        console.error(`ページが見つかりません: ${pageId}`);
        console.log('利用可能なページID:', Array.from(pages).map(p => p.id));
        return;
    }
    
    targetPage.classList.add('active');
    window.scrollTo(0, 0);
}

// ===================================
// 基本情報の保存と診断開始（従業員コード別）
// ===================================
function saveDepartmentAndStart() {
    const employeeCode = document.getElementById('employee-code').value;
    const department = document.getElementById('department').value;

    if (!employeeCode || !department) {
        alert('すべての項目を入力してください');
        return;
    }

    userInfo = {
        employeeCode: employeeCode,
        department: department,
        timestamp: new Date().toISOString()
    };

    // 従業員コード別に保存
    localStorage.setItem(`userInfo_${employeeCode}`, JSON.stringify(userInfo));
    localStorage.setItem('currentEmployeeCode', employeeCode);
    
    // この従業員コードの既存回答を読み込む（途中から再開）
    const savedAnswers = localStorage.getItem(`surveyAnswers_${employeeCode}`);
    if (savedAnswers) {
        answers = JSON.parse(savedAnswers);
    } else {
        answers = {};  // 新規開始
    }
    
    currentSection = 0;
    renderSection();
    showPage('survey-page');
}

// ===================================
// セクション描画（10問まとめて表示）
// ===================================
function renderSection() {
    const startIdx = currentSection * 10;
    const endIdx = startIdx + 10;
    const sectionQuestions = questions.slice(startIdx, endIdx);

    const container = document.getElementById('questions-container');
    container.innerHTML = '';

    sectionQuestions.forEach(question => {
        const questionBlock = document.createElement('div');
        questionBlock.className = 'question-block';
        questionBlock.id = `question-${question.id}`;
        
        questionBlock.innerHTML = `
            <div class="question-text">${question.text}</div>
            <div class="answer-options">
                ${[5, 4, 3, 2, 1].map(value => `
                    <label class="answer-option">
                        <input type="radio" name="q${question.id}" value="${value}" 
                               ${answers[question.id] === value ? 'checked' : ''}
                               onchange="saveAnswer(${question.id}, ${value})">
                        <span>${getAnswerLabel(value)}</span>
                    </label>
                `).join('')}
            </div>
        `;
        
        container.appendChild(questionBlock);
    });

    updateProgress();
    updateNavigationButtons();
}

// ===================================
// 回答ラベル
// ===================================
function getAnswerLabel(value) {
    const labels = {
        5: 'とてもそう思う',
        4: 'そう思う',
        3: 'どちらともいえない',
        2: 'そう思わない',
        1: '全くそう思わない'
    };
    return labels[value];
}

// ===================================
// 回答の保存と自動スクロール（従業員コード別）
// ===================================
function saveAnswer(questionId, value) {
    answers[questionId] = value;
    const employeeCode = localStorage.getItem('currentEmployeeCode');
    localStorage.setItem(`surveyAnswers_${employeeCode}`, JSON.stringify(answers));
    
    // 自動スクロール（次の質問へ）
    setTimeout(() => {
        const nextQuestionId = questionId + 1;
        const nextQuestion = document.getElementById(`question-${nextQuestionId}`);
        
        if (nextQuestion) {
            nextQuestion.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 400);
}

// ===================================
// 進捗表示の更新
// ===================================
function updateProgress() {
    const answeredCount = Object.keys(answers).length;
    const totalQuestions = questions.length;
    const percentage = Math.round((answeredCount / totalQuestions) * 100);
    
    document.getElementById('progress-fill').style.width = `${percentage}%`;
    document.getElementById('progress-percentage').textContent = `${percentage}%`;
}

// ===================================
// ナビゲーションボタンの更新
// ===================================
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    prevBtn.style.display = currentSection > 0 ? 'inline-block' : 'none';
    nextBtn.textContent = currentSection === 9 ? '結果を見る' : '次のセクション';
}

// ===================================
// 次のセクションへ
// ===================================
function nextSection() {
    const startIdx = currentSection * 10;
    const endIdx = startIdx + 10;
    const sectionQuestions = questions.slice(startIdx, endIdx);
    
    const unanswered = sectionQuestions.filter(q => !answers[q.id]);
    
    if (unanswered.length > 0) {
        alert('このセクションの全ての質問に回答してください');
        return;
    }

    if (currentSection < 9) {
        currentSection++;
        renderSection();
        window.scrollTo(0, 0);
    } else {
        calculateResults();
    }
}

// ===================================
// 前のセクションへ
// ===================================
function previousSection() {
    if (currentSection > 0) {
        currentSection--;
        renderSection();
        window.scrollTo(0, 0);
    }
}

// ===================================
// 結果計算
// ===================================
function calculateResults() {
    const categoryScores = {};
    
    categories.forEach(cat => {
        const catQuestions = questions.filter(q => q.category === cat.id);
        const catAnswers = catQuestions.map(q => answers[q.id] || 0);
        const total = catAnswers.reduce((sum, val) => sum + val, 0);
        
        categoryScores[cat.id] = {
            name: cat.name,
            score: total,
            maxScore: catQuestions.length * 5,
            percentage: Math.round((total / (catQuestions.length * 5)) * 100)
        };
    });

    const totalScore = Object.values(categoryScores).reduce((sum, cat) => sum + cat.score, 0);
    const maxScore = questions.length * 5;

    displayResults(totalScore, maxScore, categoryScores);
    showPage('result-page');
}

// ===================================
// 結果表示
// ===================================
function displayResults(totalScore, maxScore, categoryScores) {
    document.getElementById('total-score').textContent = totalScore;

    const categoryResultsHtml = Object.values(categoryScores).map(cat => `
        <div class="category-score-item">
            <h3>${cat.name}</h3>
            <div class="score-bar">
                <div class="score-fill" style="width: ${cat.percentage}%"></div>
            </div>
            <p>${cat.score} / ${cat.maxScore} 点（${cat.percentage}%）</p>
        </div>
    `).join('');
    
    document.getElementById('category-results').innerHTML = categoryResultsHtml;

    renderRadarChart(categoryScores);
    generateFeedback(totalScore, maxScore, categoryScores);
}

// ===================================
// レーダーチャート描画
// ===================================
function renderRadarChart(categoryScores) {
    const ctx = document.getElementById('radarChart').getContext('2d');
    
    const labels = Object.values(categoryScores).map(cat => cat.name);
    const data = Object.values(categoryScores).map(cat => cat.percentage);

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'あなたのスコア',
                data: data,
                backgroundColor: 'rgba(93, 173, 226, 0.2)',
                borderColor: 'rgba(93, 173, 226, 1)',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// ===================================
// フィードバック生成
// ===================================
function generateFeedback(totalScore, maxScore, categoryScores) {
    const percentage = Math.round((totalScore / maxScore) * 100);
    
    let overallFeedback = '';
    if (percentage >= 80) {
        overallFeedback = '<span class="feedback-good">非常に良好</span>です！高いエンゲージメントを維持されています。';
    } else if (percentage >= 60) {
        overallFeedback = '<span class="feedback-normal">良好</span>です。さらなる改善の余地があります。';
    } else {
        overallFeedback = '<span class="feedback-warning">改善が必要</span>です。いくつかの領域で課題があります。';
    }

    const sortedCategories = Object.values(categoryScores).sort((a, b) => a.percentage - b.percentage);
    const weakCategories = sortedCategories.slice(0, 3);

    const feedbackHtml = `
        <h2>📊 総合評価</h2>
        <p>あなたの総合的なエンゲージメントレベルは${overallFeedback}</p>
        
        <h3>🔍 改善が推奨される領域</h3>
        <ul>
            ${weakCategories.map(cat => `
                <li><strong>${cat.name}</strong>: ${cat.percentage}% - この領域に注力することをお勧めします</li>
            `).join('')}
        </ul>
    `;
    
    document.getElementById('feedback-section').innerHTML = feedbackHtml;
}

// ===================================
// 初期化（従業員コード別に復元）
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const currentEmployeeCode = localStorage.getItem('currentEmployeeCode');
    
    if (currentEmployeeCode) {
        // 従業員コード別に復元
        const savedAnswers = localStorage.getItem(`surveyAnswers_${currentEmployeeCode}`);
        if (savedAnswers) {
            answers = JSON.parse(savedAnswers);
        }

        const savedUserInfo = localStorage.getItem(`userInfo_${currentEmployeeCode}`);
        if (savedUserInfo) {
            userInfo = JSON.parse(savedUserInfo);
        }
    }
});
