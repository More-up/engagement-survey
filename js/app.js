// ===================================
// カテゴリー定義
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
    { id: 10, name: "組織へのつながり" }
];

// ===================================
// 質問データ（全100問）- 最終確定版
const questions = [
    // カテゴリー1: 心身の健康 (Q1-10)
  { id: 1, categoryId: 1, text: '働きながらも、心身の健康を保てていると感じる' },
  { id: 2, categoryId: 1, text: '仕事のストレスをうまく管理できている' },
  { id: 3, categoryId: 1, text: '仕事が原因で睡眠不足になることはない' },
  { id: 4, categoryId: 1, text: '仕事とプライベートの時間配分に満足している' },
  { id: 5, categoryId: 1, text: '必要な時に休暇を取得できている' },
  { id: 6, categoryId: 1, text: '休みの日は仕事の疲れをリフレッシュできている' },
  { id: 7, categoryId: 1, text: '職場で悩みや苦しみを相談できる人がいる' },
  { id: 8, categoryId: 1, text: '失敗や苦手なことを恐れず上司や同僚に相談できる' },
  { id: 9, categoryId: 1, text: '仕事の負荷が原因で、体調を崩すことがある' },
  { id: 10, categoryId: 1, text: '自分の価値観や考え方が職場で受け入れられている' },

  // カテゴリー2: 仕事の充実感 (Q11-20)
  { id: 11, categoryId: 2, text: '今の仕事にやりがいを感じている' },
  { id: 12, categoryId: 2, text: '自分の仕事が会社の目標達成に貢献していると感じる' },
  { id: 13, categoryId: 2, text: '仕事を完了した時に達成感を感じている' },
  { id: 14, categoryId: 2, text: '自分の強みを活かして仕事ができている' },
  { id: 15, categoryId: 2, text: '担当業務の内容に興味を持って取り組んでいる' },
  { id: 16, categoryId: 2, text: '担当している業務の目的や意義を理解している' },
  { id: 17, categoryId: 2, text: '自分の判断で業務を進められる環境がある' },
  { id: 18, categoryId: 2, text: '担当業務の範囲や責任が明確である' },
  { id: 19, categoryId: 2, text: '仕事の進め方について、自分なりの工夫や改善ができている' },
  { id: 20, categoryId: 2, text: '自分の仕事が社会や顧客に役立っていると感じている' },

  // カテゴリー3: 成長機会 (Q21-30)
  { id: 21, categoryId: 3, text: 'この1年で、自分のスキルや知識が成長したと感じる' },
  { id: 22, categoryId: 3, text: '業務に役立つ研修や勉強会に参加できている' },
  { id: 23, categoryId: 3, text: '業務時間内に学習やスキルアップの時間を確保できている' },
  { id: 24, categoryId: 3, text: '業務を通じて実践的なスキルを身につけられている' },
  { id: 25, categoryId: 3, text: '会社は資格取得や学習を支援してくれている' },
  { id: 26, categoryId: 3, text: '会社は私が将来どのように成長できるか示してくれている' },
  { id: 27, categoryId: 3, text: '自分の希望するキャリアを会社で実現できると思う' },
  { id: 28, categoryId: 3, text: '自分の成長につながる新しい仕事を任されている' },
  { id: 29, categoryId: 3, text: '上司や先輩から業務について教えてもらえている' },
  { id: 30, categoryId: 3, text: '失敗を恐れず挑戦することを後押ししてくれる職場である' },

  // カテゴリー4: 上司のサポート (Q31-40)
  { id: 31, categoryId: 4, text: '上司は私の意見を聞いてくれている' },
  { id: 32, categoryId: 4, text: '上司から業務改善につながる具体的なフィードバックを受けている' },
  { id: 33, categoryId: 4, text: '上司は私の成長を支援してくれている' },
  { id: 34, categoryId: 4, text: '上司とのコミュニケーションは円滑である' },
  { id: 35, categoryId: 4, text: '上司は全員に公平に接している' },
  { id: 36, categoryId: 4, text: '上司に相談しやすい雰囲気がある' },
  { id: 37, categoryId: 4, text: '上司は私の仕事の進め方に自主性を認めている' },
  { id: 38, categoryId: 4, text: '上司は業務を円滑に進められるよう支援している' },
  { id: 39, categoryId: 4, text: '上司の指示は具体的で理解しやすい' },
  { id: 40, categoryId: 4, text: '上司は私に任せる仕事の範囲と責任を明確に示している' },

  // カテゴリー5: 部署内の人間関係 (Q41-50)
  { id: 41, categoryId: 5, text: '自部署のメンバーを信頼している' },
  { id: 42, categoryId: 5, text: '自部署で協力して仕事を進められている' },
  { id: 43, categoryId: 5, text: '自部署でお互いに助け合う雰囲気がある' },
  { id: 44, categoryId: 5, text: '自部署内で情報共有がスムーズである' },
  { id: 45, categoryId: 5, text: '自部署で自由に意見を述べる雰囲気がある' },
  { id: 46, categoryId: 5, text: '自部署と他部署の連携がスムーズであると感じる' },
  { id: 47, categoryId: 5, text: '自部署のメンバーの役割分担が明確である' },
  { id: 48, categoryId: 5, text: '自部署の目標がメンバー間で共有されている' },
  { id: 49, categoryId: 5, text: '自部署で意見の違いがあっても建設的に対話ができている' },
  { id: 50, categoryId: 5, text: '自部署内の人間関係は業務に支障をきたしていない' },

  // カテゴリー6: 評価・処遇 (Q51-60)
  { id: 51, categoryId: 6, text: '人事評価基準が明確である' },
  { id: 52, categoryId: 6, text: '人事評価は公平に行われている' },
  { id: 53, categoryId: 6, text: '人事評価面談で前向きな話し合いができている' },
  { id: 54, categoryId: 6, text: '自分への人事評価に納得できている' },
  { id: 55, categoryId: 6, text: '給与や待遇は自分の働きに見合っている' },
  { id: 56, categoryId: 6, text: '成果や努力が給与の決定に反映されている' },
  { id: 57, categoryId: 6, text: '昇進・昇格の機会は公平である' },
  { id: 58, categoryId: 6, text: '福利厚生制度が生活に役立っている' },
  { id: 59, categoryId: 6, text: '上司から評価について丁寧なフィードバックを受けている' },
  { id: 60, categoryId: 6, text: '自分の努力や成果が組織に認められていると感じる' },

  // カテゴリー7: 会社への信頼 (Q61-70)
  { id: 61, categoryId: 7, text: '会社のMission・Vision・Valueを理解している' },
  { id: 62, categoryId: 7, text: '会社のMission・Vision・Valueに共感している' },
  { id: 63, categoryId: 7, text: '会社は法令や倫理を守って経営していると感じる' },
  { id: 64, categoryId: 7, text: 'この会社の未来に期待できる' },
  { id: 65, categoryId: 7, text: '経営層から会社方針や戦略の情報が定期的に共有されている' },
  { id: 66, categoryId: 7, text: '会社の重要な決定の背景・理由と自部署への影響を理解している' },
  { id: 67, categoryId: 7, text: '会社の重要な決定について、その背景や理由を理解できている' },
  { id: 68, categoryId: 7, text: '会社の仕事が社会に役立っていると感じている' },
  { id: 69, categoryId: 7, text: '会社は従業員の意見を聞く体制がある' },
  { id: 70, categoryId: 7, text: '会社の変革や改善の取り組みを信頼できる' },

  // カテゴリー8: 働く環境 (Q71-80)
  { id: 71, categoryId: 8, text: 'オフィスの設備や環境は快適である' },
  { id: 72, categoryId: 8, text: '業務に必要な設備やツールが揃っている' },
  { id: 73, categoryId: 8, text: '安全で衛生的な職場環境である' },
  { id: 74, categoryId: 8, text: '在宅勤務など柔軟な働き方ができている' },
  { id: 75, categoryId: 8, text: '業務に集中できる環境が整っている' },
  { id: 76, categoryId: 8, text: '業務に必要な情報やデータにアクセスしやすい' },
  { id: 77, categoryId: 8, text: '業務で使用するITシステムやツールは使いやすい' },
  { id: 78, categoryId: 8, text: '社内の手続きは分かりやすく効率的である' },
  { id: 79, categoryId: 8, text: '会議は目的が明確で効率的に進められている' },
  { id: 80, categoryId: 8, text: '育児や介護など、ライフイベントに配慮した支援制度がある' },

  // カテゴリー9: 総合満足度 (Q81-90)
  { id: 81, categoryId: 9, text: '今の会社で働くことに満足している' },
  { id: 82, categoryId: 9, text: '仕事に取り組む時に前向きな気持ちを持てている' },
  { id: 83, categoryId: 9, text: '今の職場環境は、自分の働きやすさに配慮されている' },
  { id: 84, categoryId: 9, text: '今の業務量は適切だと思う' },
  { id: 85, categoryId: 9, text: '会社の将来性に期待を持てている' },
  { id: 86, categoryId: 9, text: '自分の能力を十分に発揮できている' },
  { id: 87, categoryId: 9, text: '今後のキャリア形成に期待できている' },
  { id: 88, categoryId: 9, text: '勤務時間は妥当な範囲に収まっている' },
  { id: 89, categoryId: 9, text: '業務の責任範囲が明確になっている' },
  { id: 90, categoryId: 9, text: '過度なプレッシャーを感じることなく働けている' },

  // カテゴリー10: 組織へのつながり (Q91-100)
  { id: 91, categoryId: 10, text: 'この会社の働き方は自分に合っている' },
  { id: 92, categoryId: 10, text: 'この会社で自分の居場所を持てている' },
  { id: 93, categoryId: 10, text: 'この会社の文化や価値観に共感している' },
  { id: 94, categoryId: 10, text: 'この会社で働くことを家族や友人に前向きに話している' },
  { id: 95, categoryId: 10, text: 'この会社で働くことに安心感を持てている' },
  { id: 96, categoryId: 10, text: 'この会社はこれからも存続していくと思える' },
  { id: 97, categoryId: 10, text: 'この会社の一員であることに誇りを持っている' },
  { id: 98, categoryId: 10, text: 'この会社を入社前の自分に勧めたいと思う' },
  { id: 99, categoryId: 10, text: 'この会社では自分の個性を活かして働ける' },
  { id: 100, categoryId: 10, text: 'この会社で長く働き続けたいと思う' }


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
// セクション描画（固定カテゴリータイトルを更新）
// ===================================
function renderSection() {
    const startIdx = currentSection * 10;
    const endIdx = startIdx + 10;
    const sectionQuestions = questions.slice(startIdx, endIdx);

    const container = document.getElementById('questions-container');
    container.innerHTML = '';

    // 🔥 固定カテゴリータイトルを更新（質問番号なし）
    const categoryId = sectionQuestions[0].category;
    const category = categories.find(cat => cat.id === categoryId);
    
    const fixedCategoryHeader = document.getElementById('category-header-fixed');
    fixedCategoryHeader.innerHTML = `<h2>カテゴリー${categoryId}: ${category.name}</h2>`;

    // カテゴリー5の場合は「自部署」説明文を追加
    if (categoryId === 5) {
        const categoryNote = document.createElement('div');
        categoryNote.className = 'category-note';
        categoryNote.innerHTML = `<p>※以下の設問における「自部署」とは、あなたが普段一緒に仕事をしているメンバー(チーム・部署)を指します。</p>`;
        container.appendChild(categoryNote);
    }

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
        } else {
            const nextSectionButton = document.getElementById('next-btn');
            if (nextSectionButton) {
                nextSectionButton.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
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
// 結果表示（🔥 100点満点に換算）
// ===================================
function displayResults(totalScore, maxScore, categoryScores) {
    // 🔥 100点満点に換算
    const score100 = Math.round((totalScore / maxScore) * 100);
    document.getElementById('total-score').textContent = score100;

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
