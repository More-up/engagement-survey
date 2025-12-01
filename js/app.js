// ===================================
// カテゴリー定義と質問データ
// ===================================
const categories = [
    { id: 1, name: "心身の健康" },
    { id: 2, name: "仕事の充実感" },
    { id: 3, name: "成長機会" },
    { id: 4, name: "上司のサポート" },
    { id: 5, name: "部署内の人間関係" },
    { id: 6, name: "評価・処遇" },
    { id: 7, name: "会社への信頼" },
    { id: 8, name: "働く環境" },
    { id: 9, name: "総合満足度" },
    { id: 10, name: "会社への愛着・帰属意識" }
];

const questions = [
    // カテゴリー1: 心身の健康 (Q1-10)
    { id: 1, category: 1, text: "毎日、疲れが少ない気持ちで働けている" },
    { id: 2, category: 1, text: "仕事のストレスをうまく管理できている" },
    { id: 3, category: 1, text: "毎日、十分な睡眠をとれている" },
    { id: 4, category: 1, text: "仕事とプライベートの時間配分に満足している" },
    { id: 5, category: 1, text: "必要な時に休暇を取得できている" },
    { id: 6, category: 1, text: "休日にしっかりリフレッシュできている" },
    { id: 7, category: 1, text: "職場で悩みや苦しみを相談できる人がいる" },
    { id: 8, category: 1, text: "失敗や苦手なことを恐れず上司や同僚に相談できる" },
    { id: 9, category: 1, text: "体調不良や疲労が蓄積していない" },
    { id: 10, category: 1, text: "自分の価値観や考え方が職場で受け入れられている" },

    // カテゴリー2: 仕事の充実感 (Q11-20)
    { id: 11, category: 2, text: "今の仕事にやりがいを感じている" },
    { id: 12, category: 2, text: "自分の仕事が会社の目標達成に貢献していると感じる" },
    { id: 13, category: 2, text: "達成をやり終えた時に達成感を感じている" },
    { id: 14, category: 2, text: "自分の強みを活かして仕事ができている" },
    { id: 15, category: 2, text: "担当業務の内容に興味を持って取り組んでいる" },
    { id: 16, category: 2, text: "担当している業務の目的や意義を理解している" },
    { id: 17, category: 2, text: "自分の判断で業務を進められる環境がある" },
    { id: 18, category: 2, text: "担当業務の範囲や責任が明確である" },
    { id: 19, category: 2, text: "毎日の仕事に前向きに取り組んでいる" },
    { id: 20, category: 2, text: "自分の仕事が社会や顧客に役立っていると感じている" },

    // カテゴリー3: 成長機会 (Q21-30)
    { id: 21, category: 3, text: "昨年と比べて、自分のスキルや知識が向上していると感じる" },
    { id: 22, category: 3, text: "業務に役立つ研修や勉強会に参加できている" },
    { id: 23, category: 3, text: "業務時間内に学習やスキルアップの時間を確保できている" },
    { id: 24, category: 3, text: "業務を通じて実践的なスキルを身につけられている" },
    { id: 25, category: 3, text: "会社は資格取得や学習を支援してくれている" },
    { id: 26, category: 3, text: "会社は将来どのように成長できるか示してくれている" },
    { id: 27, category: 3, text: "自分の希望するキャリアを会社で実現できると思う" },
    { id: 28, category: 3, text: "自分の成長につながる新しい仕事を任されている" },
    { id: 29, category: 3, text: "上司や先輩から業務について教えてもらえている" },
    { id: 30, category: 3, text: "失敗を恐れず挑戦することを後押ししてくれる職場である" },

    // カテゴリー4: 上司のサポート (Q31-40)
    { id: 31, category: 4, text: "上司は私の意見を聞いてくれている" },
    { id: 32, category: 4, text: "上司から業務改善につながる具体的なフィードバックを受けている" },
    { id: 33, category: 4, text: "上司は私の成長を支援してくれている" },
    { id: 34, category: 4, text: "上司とのコミュニケーションは円滑である" },
    { id: 35, category: 4, text: "上司は全員に公平に接している" },
    { id: 36, category: 4, text: "上司に相談しやすい雰囲気がある" },
    { id: 37, category: 4, text: "上司は私の仕事の進め方に自主性を認めている" },
    { id: 38, category: 4, text: "上司から期待される役割や責任が明確に伝えられている" },
    { id: 39, category: 4, text: "上司の指示は具体的で理解しやすい" },
    { id: 40, category: 4, text: "上司は私の業務遂行を理解してくれている" },

    // カテゴリー5: 部署内の人間関係 (Q41-50)
    { id: 41, category: 5, text: "自部署のメンバーを信頼している" },
    { id: 42, category: 5, text: "自部署で協力して仕事を進められている" },
    { id: 43, category: 5, text: "自部署でお互いに助け合う雰囲気がある" },
    { id: 44, category: 5, text: "自部署内で情報共有がスムーズである" },
    { id: 45, category: 5, text: "自部署で自由に意見を述べる雰囲気がある" },
    { id: 46, category: 5, text: "他部署との連携がスムーズである" },
    { id: 47, category: 5, text: "自部署のメンバーの役割分担が明確である" },
    { id: 48, category: 5, text: "自部署の目標がメンバー間で共有されている" },
    { id: 49, category: 5, text: "自部署内では、お互いの意見や人格を尊重し合えている" },
    { id: 50, category: 5, text: "自部署で対人問題を感じることがない" },

    // カテゴリー6: 評価・処遇 (Q51-60)
    { id: 51, category: 6, text: "人事評価基準が明確である" },
    { id: 52, category: 6, text: "人事評価は公平に行われている" },
    { id: 53, category: 6, text: "人事評価面談で前向きな話し合いができている" },
    { id: 54, category: 6, text: "自分への人事評価に納得できている" },
    { id: 55, category: 6, text: "給与や待遇は自分の働きに見合っている" },
    { id: 56, category: 6, text: "成果や努力が給与の決定に反映されている" },
    { id: 57, category: 6, text: "昇進・昇格の機会は公平である" },
    { id: 58, category: 6, text: "福利厚生制度が充実に役立っている" },
    { id: 59, category: 6, text: "上司や同僚から評価の説明をもらえている" },
    { id: 60, category: 6, text: "自分の努力や成果が組織に認められていると感じる" },

    // カテゴリー7: 会社への信頼 (Q61-70)
    { id: 61, category: 7, text: "会社のMission・Vision・Valueを理解している" },
    { id: 62, category: 7, text: "会社のMission・Vision・Valueに共感している" },
    { id: 63, category: 7, text: "会社は法令や倫理を守って経営していると感じる" },
    { id: 64, category: 7, text: "この会社の未来に期待できる" },
    { id: 65, category: 7, text: "経営層から会社方針や戦略の情報が定期的に共有されている" },
    { id: 66, category: 7, text: "会社の意思決定や決断を理解できている" },
    { id: 67, category: 7, text: "会社の意思決定のプロセスが透明である" },
    { id: 68, category: 7, text: "会社の仕事が社会に役立っていると感じている" },
    { id: 69, category: 7, text: "会社は従業員の意見を聞く体制がある" },
    { id: 70, category: 7, text: "会社の変革や改善の取り組みを信頼できる" },

    // カテゴリー8: 働く環境 (Q71-80)
    { id: 71, category: 8, text: "オフィスの設備や環境は快適である" },
    { id: 72, category: 8, text: "業務に必要な設備やツールが揃っている" },
    { id: 73, category: 8, text: "安全で衛生的な職場環境である" },
    { id: 74, category: 8, text: "在宅勤務など柔軟な働き方ができている" },
    { id: 75, category: 8, text: "業務に集中できる環境が整っている" },
    { id: 76, category: 8, text: "業務に必要な情報やデータにアクセスしやすい" },
    { id: 77, category: 8, text: "業務で使用するITシステムやツールは使いやすい" },
    { id: 78, category: 8, text: "社内の手続きは分かりやすく効率的である" },
    { id: 79, category: 8, text: "会議は目的が明確で効率的に進められている" },
    { id: 80, category: 8, text: "育児や介護など、ライフイベントに配慮した支援制度がある" },

    // カテゴリー9: 総合満足度 (Q81-90)
    { id: 81, category: 9, text: "今の会社で働くことに満足している" },
    { id: 82, category: 9, text: "仕事に取り組む時に前向きな気持ちを持てている" },
    { id: 83, category: 9, text: "仕事を通じて充実感を得られている" },
    { id: 84, category: 9, text: "今の業務量は適切だと思う" },
    { id: 85, category: 9, text: "会社の方針に納得できている" },
    { id: 86, category: 9, text: "自分の能力を十分に発揮できている" },
    { id: 87, category: 9, text: "今後のキャリア形成に期待できている" },
    { id: 88, category: 9, text: "勤務時間は妥当な範囲に収まっている" },
    { id: 89, category: 9, text: "業務の責任範囲が明確になっている" },
    { id: 90, category: 9, text: "過度なプレッシャーを感じることなく働けている" },

    // カテゴリー10: 会社への愛着・帰属意識 (Q91-100)
    { id: 91, category: 10, text: "この会社の働き方は自分に合っている" },
    { id: 92, category: 10, text: "この会社で自分の居場所を持てている" },
    { id: 93, category: 10, text: "この会社の文化や価値観に共感している" },
    { id: 94, category: 10, text: "この会社で働くことを家族や友人に前向きに話している" },
    { id: 95, category: 10, text: "この会社で働くことに安心感を持てている" },
    { id: 96, category: 10, text: "この会社はこれからも存続していくと思える" },
    { id: 97, category: 10, text: "この会社の一員であることに誇りを持っている" },
    { id: 98, category: 10, text: "この会社を入社前の自分に勧めたいと思う" },
    { id: 99, category: 10, text: "この会社では自分の個性を活かして働ける" },
    { id: 100, category: 10, text: "この会社で長く働き続けたいと思う" }
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
