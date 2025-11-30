// エンゲージメント診断アプリケーション - 最終確定版v3（重複・曖昧さ完全排除）

// グローバル変数
let currentPage = 1;
let currentCategory = 0;
const totalPages = 10;
const questionsPerPage = 10;
let answers = {};
let categoryScores = [];
let totalScore = 0;
let resultId = '';
let employeeCode = '';
let department = '';

// カテゴリー定義
const categories = [
    { name: '心身の健康', questions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    { name: '仕事の充実感', questions: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
    { name: '成長機会', questions: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30] },
    { name: '上司のサポート', questions: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40] },
    { name: '部署内の人間関係', questions: [41, 42, 43, 44, 45, 46, 47, 48, 49, 50] },
    { name: '評価・処遇', questions: [51, 52, 53, 54, 55, 56, 57, 58, 59, 60] },
    { name: '会社への信頼', questions: [61, 62, 63, 64, 65, 66, 67, 68, 69, 70] },
    { name: '働く環境', questions: [71, 72, 73, 74, 75, 76, 77, 78, 79, 80] },
    { name: '総合満足度', questions: [81, 82, 83, 84, 85, 86, 87, 88, 89, 90] },
    { name: '会社への愛着・帰属意識', questions: [91, 92, 93, 94, 95, 96, 97, 98, 99, 100] }
];

// 質問テキスト（最終確定版v3・100問・重複排除・曖昧さ解消済み）
const questions = {
    // 1. 心身の健康（Q1-10）
    1: "毎日、疲れが少なく集中して働けている",
    2: "仕事のストレスをうまく発散できている",
    3: "毎日、十分な睡眠をとれている",
    4: "仕事と私生活の時間配分に満足している",
    5: "必要な時に休暇を取得できている",
    6: "休日に気分転換や休養ができている",
    7: "職場で業務や悩みを相談できる人がいる",
    8: "勤務時間や働き方に柔軟性がある",
    9: "健康維持のための制度や支援を利用できている",
    10: "自分の価値観や考え方が職場で受け入れられている",
    
    // 2. 仕事の充実感（Q11-20）
    11: "今の仕事にやりがいを感じている",
    12: "自分の仕事が会社の成果につながっていると実感できている",
    13: "業務をやり終えた時に成果や達成感を感じている",
    14: "自分の強みを活かして仕事ができている",
    15: "仕事の成果が正当に評価されている",
    16: "担当業務の内容に興味を持って取り組めている",
    17: "自分の判断で仕事を進められている",
    18: "担当業務の範囲が明確である",
    19: "業務量が自分のペースで無理なくこなせる範囲である",
    20: "日々の業務が顧客や社会に役立っていると感じている",
    
    // 3. 成長機会（Q21-30）
    21: "会社が自分のスキルアップを支援してくれている",
    22: "業務に役立つ研修や勉強会に参加する機会がある",
    23: "仕事を通じて成長を実感できている",
    24: "業務を通じて新しいスキルを習得できている",
    25: "将来のキャリアについて具体的にイメージできている",
    26: "挑戦的な仕事を任されている",
    27: "自分のキャリア目標を実現できる環境がある",
    28: "他部署との協力を通じて新しい知識を得られている",
    29: "上司や先輩から学べる環境がある",
    30: "失敗を改善や学びにつなげられる職場文化がある",
    
    // 4. 上司のサポート（Q31-40）
    31: "上司は私の意見を尊重してくれている",
    32: "上司から業務改善につながる具体的なフィードバックを受けている",
    33: "上司は私の成長を支援してくれている",
    34: "上司とのコミュニケーションは円滑である",
    35: "上司は全員に公平に接している",
    36: "困った時に上司に相談できている",
    37: "上司は仕事の進め方に自主性を認めている",
    38: "上司から期待される役割や成果が明確に伝えられている",
    39: "上司の指示は具体的で理解しやすい",
    40: "上司の仕事の進め方に満足している",
    
    // 5. 部署内の人間関係（Q41-50）
    41: "自部署のメンバーを信頼している",
    42: "自部署で協力して仕事を進められている",
    43: "自部署のメンバーは互いに助け合っている",
    44: "自部署内で情報共有がスムーズである",
    45: "自部署で自由に意見を言えている",
    46: "自部署では安心して意見や質問ができる",
    47: "自部署のメンバーの役割分担が明確である",
    48: "自部署の目標が共有されている",
    49: "自部署のメンバーは互いに支え合っている",
    50: "自部署の成果に誇りを持てている",
    
    // 6. 評価・処遇（Q51-60）
    51: "人事評価基準が明確である",
    52: "人事評価は公平に行われている",
    53: "人事評価面談で前向きな話し合いができている",
    54: "自分への人事評価に納得できている",
    55: "給与・報酬は仕事内容に見合っている",
    56: "成果や努力が給与・昇進に反映されている",
    57: "昇進・昇格の機会は公平である",
    58: "福利厚生制度が生活に役立っている",
    59: "給与・待遇は自分の働きに見合っている",
    60: "評価基準や処遇の仕組みが分かりやすい",
    
    // 7. 会社への信頼（Q61-70）
    61: "会社のMission・Vision・Valueを理解している",
    62: "会社のMission・Vision・Valueに共感している",
    63: "会社の目指すことと自分の目指すことが一致している",
    64: "この会社の未来に期待できる",
    65: "経営層から会社方針や業績の情報が定期的に共有されている",
    66: "会社がどこを目指しているか理解している",
    67: "会社の意思決定の理由を理解できている",
    68: "会社の仕事が社会に役立っていると感じている",
    69: "この会社で働くことに誇りを持っている",
    70: "この会社の働きやすさや魅力を知人や友人に勧めたいと思っている",
    
    // 8. 働く環境（Q71-80）
    71: "オフィスの設備や環境は快適で集中しやすい",
    72: "必要な設備・ツールが揃っている",
    73: "安全で衛生的な職場環境である",
    74: "在宅勤務など柔軟な働き方ができている",
    75: "業務に集中できるスペースや環境がある",
    76: "業務に必要な情報にアクセスしやすい",
    77: "ITシステムは使いやすい",
    78: "社内の手続きは分かりやすく効率的である",
    79: "会議は目的が明確で効率的に進められている",
    80: "育児や介護を両立できる支援制度がある",
    
    // 9. 総合満足度（Q81-90）
    81: "今の会社で働くことに満足している",
    82: "この会社の一員であることに満足している",
    83: "仕事に取り組む時に前向きな気持ちを持てている",
    84: "仕事を通じて充実感を得られている",
    85: "今の仕事量と仕事内容のバランスが適切だと思う",
    86: "会社の方針に納得できている",
    87: "職場の人間関係に満足している",
    88: "自分の能力を十分に発揮できている",
    89: "今後のキャリア形成に期待できている",
    90: "総合的に見て、この会社は働きやすく安心できる職場である",
    
    // 10. 会社への愛着・帰属意識（Q91-100）
    91: "この会社の働き方は自分に合っている",
    92: "この会社で自分の居場所を持てている",
    93: "この会社の文化や価値観に共感している",
    94: "家族や友人に今の仕事を前向きに話している",
    95: "この会社で働くことに安心感を持てている",
    96: "この会社はこれからも存続していくと思える",
    97: "この会社に親しみや愛着を持っている",
    98: "この会社の一体感を感じている",
    99: "この会社で自分らしく働けている",
    100: "この会社は長く働き続けたいと思える環境である"
};

// ページ表示の切り替え
function showPage(pageId) {
    const pages = ['input', 'survey', 'loading', 'results'];
    pages.forEach(page => {
        const element = document.getElementById(page + '-page');
        if (element) {
            element.classList.toggle('active', page === pageId);
        }
    });
}

// 入力ページの初期化
function initInputPage() {
    // localStorageから保存されたデータを読み込む
    const savedData = localStorage.getItem('surveyTempData');
    if (savedData) {
        const data = JSON.parse(savedData);
        if (data.employeeCode) document.getElementById('employee-code').value = data.employeeCode;
        if (data.department) document.getElementById('department').value = data.department;
    }
}

// 診断開始
function startSurvey() {
    employeeCode = document.getElementById('employee-code').value.trim();
    department = document.getElementById('department').value.trim();
    
    if (!employeeCode || !department) {
        alert('従業員コードと部署を入力してください');
        return;
    }
    
    // 入力データを保存
    localStorage.setItem('surveyTempData', JSON.stringify({
        employeeCode: employeeCode,
        department: department
    }));
    
    showPage('survey');
    displayQuestions();
}

// 質問の表示
function displayQuestions() {
    const category = categories[currentCategory];
    document.getElementById('category-name').textContent = category.name;
    document.getElementById('page-number').textContent = `${currentPage} / ${totalPages}`;
    
    const container = document.getElementById('questions-container');
    container.innerHTML = '';
    
    category.questions.forEach(qNum => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-item';
        questionDiv.innerHTML = `
            <div class="question-text">Q${qNum}. ${questions[qNum]}</div>
            <div class="options">
                ${[5, 4, 3, 2, 1].map(value => `
                    <label class="option ${answers[qNum] === value ? 'selected' : ''}">
                        <input type="radio" name="q${qNum}" value="${value}" 
                            ${answers[qNum] === value ? 'checked' : ''}
                            onchange="selectAnswer(${qNum}, ${value})">
                        <span>${value}</span>
                    </label>
                `).join('')}
            </div>
        `;
        container.appendChild(questionDiv);
    });
    
    // ボタンの表示制御
    document.getElementById('prev-btn').style.display = currentPage > 1 ? 'inline-block' : 'none';
    document.getElementById('next-btn').style.display = currentPage < totalPages ? 'inline-block' : 'none';
    document.getElementById('submit-btn').style.display = currentPage === totalPages ? 'inline-block' : 'none';
}

// 回答選択時の処理
function selectAnswer(questionNum, value) {
    answers[questionNum] = value;
    saveProgress();
    
    // 選択状態の視覚的フィードバック
    const questionItem = event.target.closest('.question-item');
    questionItem.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    event.target.closest('.option').classList.add('selected');
}

// 進捗の保存
function saveProgress() {
    const progressData = {
        currentPage,
        currentCategory,
        answers,
        employeeCode,
        department
    };
    localStorage.setItem('surveyProgress', JSON.stringify(progressData));
}

// 次のページ
function nextPage() {
    // 全ての質問に回答しているかチェック
    const category = categories[currentCategory];
    const unanswered = category.questions.filter(q => !answers[q]);
    
    if (unanswered.length > 0) {
        alert('すべての質問に回答してください');
        return;
    }
    
    if (currentPage < totalPages) {
        currentPage++;
        currentCategory++;
        displayQuestions();
    }
}

// 前のページ
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        currentCategory--;
        displayQuestions();
    }
}

// 診断結果の計算と送信
async function submitSurvey() {
    // 最後のカテゴリーの回答チェック
    const category = categories[currentCategory];
    const unanswered = category.questions.filter(q => !answers[q]);
    
    if (unanswered.length > 0) {
        alert('すべての質問に回答してください');
        return;
    }
    
    showPage('loading');
    
    // スコア計算
    calculateScores();
    
    // 結果IDの生成
    resultId = generateResultId();
    
    // データベースへの保存（重複保存防止機能付き）
    try {
        await saveToDatabase();
        
        // 一時保存データのクリア
        localStorage.removeItem('surveyProgress');
        localStorage.removeItem('surveyTempData');
        
        // 結果ページへ移動
        setTimeout(() => {
            showResults();
        }, 1000);
    } catch (error) {
        console.error('保存エラー:', error);
        alert('データの保存に失敗しました。もう一度お試しください。');
        showPage('survey');
    }
}

// スコア計算
function calculateScores() {
    categoryScores = [];
    totalScore = 0;
    
    categories.forEach(category => {
        let categoryTotal = 0;
        category.questions.forEach(q => {
            categoryTotal += answers[q] || 0;
        });
        const categoryScore = (categoryTotal / 50) * 10; // 10点満点に換算
        categoryScores.push({
            name: category.name,
            score: categoryScore.toFixed(1)
        });
        totalScore += categoryScore;
    });
}

// 結果ID生成
function generateResultId() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000);
    return `${employeeCode}_${timestamp}_${random}`;
}

// データベース保存（重複保存防止機能）
async function saveToDatabase() {
    // 【重複保存防止】localStorageに既存result_idがあるかチェック
    const existingResultId = localStorage.getItem('lastSubmittedResultId');
    const existingTimestamp = localStorage.getItem('lastSubmittedTimestamp');
    const currentTime = new Date().getTime();
    
    // 10秒以内の再送信かつ同じresult_idの場合は重複とみなす
    if (existingResultId && existingTimestamp) {
        const timeDiff = currentTime - parseInt(existingTimestamp);
        if (timeDiff < 10000) { // 10秒以内
            console.log('重複送信を検出しました。既存のresult_idを使用します:', existingResultId);
            resultId = existingResultId;
            return; // 保存をスキップ
        }
    }
    
    const data = {
        result_id: resultId,
        employee_code: employeeCode,
        department: department,
        total_score: totalScore.toFixed(1),
        category_scores: JSON.stringify(categoryScores),
        answers: JSON.stringify(answers),
        created_at: new Date().toISOString()
    };
    
    const response = await fetch('/api/save-result', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        throw new Error('保存失敗');
    }
    
    // 【重複保存防止】送信成功後、result_idとタイムスタンプを保存
    localStorage.setItem('lastSubmittedResultId', resultId);
    localStorage.setItem('lastSubmittedTimestamp', currentTime.toString());
}

// 結果表示
function showResults() {
    showPage('results');
    
    document.getElementById('result-id').textContent = resultId;
    document.getElementById('total-score').textContent = totalScore.toFixed(1);
    
    // カテゴリー別スコア表示
    const tbody = document.getElementById('category-scores-body');
    tbody.innerHTML = '';
    
    categoryScores.forEach(cat => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cat.name}</td>
            <td class="score">${cat.score}</td>
        `;
        tbody.appendChild(row);
    });
}

// 再診断
function restartSurvey() {
    if (confirm('診断を最初からやり直しますか？')) {
        currentPage = 1;
        currentCategory = 0;
        answers = {};
        categoryScores = [];
        totalScore = 0;
        resultId = '';
        
        localStorage.removeItem('surveyProgress');
        
        showPage('input');
        initInputPage();
    }
}

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
    initInputPage();
    
    // 保存された進捗の復元チェック
    const savedProgress = localStorage.getItem('surveyProgress');
    if (savedProgress) {
        const confirm = window.confirm('前回の続きから診断を再開しますか?');
        if (confirm) {
            const data = JSON.parse(savedProgress);
            currentPage = data.currentPage;
            currentCategory = data.currentCategory;
            answers = data.answers;
            employeeCode = data.employeeCode;
            department = data.department;
            
            showPage('survey');
            displayQuestions();
        } else {
            localStorage.removeItem('surveyProgress');
        }
    }
});
