// エンゲージメント診断アプリケーション

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
    { name: '離職予防・継続意向', questions: [91, 92, 93, 94, 95, 96, 97, 98, 99, 100] }
];

// 質問テキスト
const questions = {
    1: "心身ともに健康だと感じる",
    2: "仕事によるストレスは少ない",
    3: "十分な睡眠がとれている",
    4: "適度な運動ができている",
    5: "健康的な食生活を送っている",
    6: "仕事とプライベートのバランスが取れている",
    7: "休日に十分リフレッシュできている",
    8: "メンタル面で不安を感じることは少ない",
    9: "体調不良で仕事を休むことは少ない",
    10: "職場の健康支援制度は充実している",
    
    11: "今の仕事にやりがいを感じている",
    12: "自分の仕事は会社に貢献していると感じる",
    13: "仕事の目標は明確である",
    14: "自分の強みを活かせる仕事である",
    15: "仕事の成果が認められている",
    16: "業務内容に興味・関心がある",
    17: "仕事を通じて達成感を得られている",
    18: "自分の仕事に誇りを持っている",
    19: "裁量権を持って仕事ができている",
    20: "新しいチャレンジができる環境である",
    
    21: "スキルアップの機会が提供されている",
    22: "研修制度は充実している",
    23: "キャリアパスが明確である",
    24: "自己成長を実感できている",
    25: "新しいスキルを学ぶ機会がある",
    26: "昇進・昇格の機会は公平である",
    27: "メンター制度が活用できている",
    28: "資格取得の支援がある",
    29: "他部署との連携で学びがある",
    30: "将来のキャリアビジョンが描ける",
    
    31: "上司は適切な指導をしてくれる",
    32: "上司とのコミュニケーションは円滑である",
    33: "上司は私の意見を尊重してくれる",
    34: "上司からの期待が明確である",
    35: "上司は適切なフィードバックをくれる",
    36: "困った時に上司に相談しやすい",
    37: "上司は公平な評価をしてくれる",
    38: "上司は私の成長を支援してくれる",
    39: "上司のマネジメントスタイルに満足している",
    40: "上司を信頼している",
    
    41: "同僚との関係は良好である",
    42: "チーム内の雰囲気は良い",
    43: "困った時に助け合える環境である",
    44: "意見交換が活発に行われている",
    45: "部署内のコミュニケーションは円滑である",
    46: "同僚を信頼している",
    47: "チームワークが機能している",
    48: "お互いの仕事を尊重し合っている",
    49: "部署内での情報共有は適切である",
    50: "新しいメンバーを歓迎する雰囲気がある",
    
    51: "給与水準に満足している",
    52: "評価制度は公平である",
    53: "評価基準が明確である",
    54: "頑張りが評価に反映されている",
    55: "福利厚生は充実している",
    56: "昇給・賞与は適切である",
    57: "評価面談は有意義である",
    58: "報酬と仕事内容のバランスが取れている",
    59: "インセンティブ制度は魅力的である",
    60: "処遇に関する不満は少ない",
    
    61: "会社の理念・ビジョンに共感している",
    62: "会社の方針は明確である",
    63: "経営陣を信頼している",
    64: "会社の将来性に期待している",
    65: "会社の意思決定プロセスは透明である",
    66: "会社は従業員を大切にしている",
    67: "会社の社会的責任に共感している",
    68: "会社の経営状態に不安はない",
    69: "会社の情報開示は十分である",
    70: "この会社で働くことを誇りに思う",
    
    71: "職場環境は快適である",
    72: "必要な設備・ツールが揃っている",
    73: "オフィスの立地は良い",
    74: "リモートワーク環境は整っている",
    75: "労働時間は適切である",
    76: "休暇は取得しやすい",
    77: "残業時間は適正である",
    78: "職場の安全衛生管理は適切である",
    79: "通勤環境に満足している",
    80: "働き方の柔軟性がある",
    
    81: "総合的に今の仕事に満足している",
    82: "会社での勤務を継続したい",
    83: "友人にこの会社を勧めたい",
    84: "会社の一員であることに満足している",
    85: "仕事に対するモチベーションは高い",
    86: "毎日の仕事が楽しみである",
    87: "この会社でのキャリアに満足している",
    88: "会社の制度・仕組みに満足している",
    89: "職場の雰囲気に満足している",
    90: "全体として働きやすい環境である",
    
    91: "転職を考えることはほとんどない",
    92: "今の会社で長く働きたい",
    93: "他社からのオファーがあっても残りたい",
    94: "家族や友人に今の仕事を辞めたいと相談したことはない",
    95: "将来もこの会社で働いている姿が想像できる",
    96: "退職を真剣に考えたことはない",
    97: "この会社に愛着を感じている",
    98: "転職サイトを閲覧することはほとんどない",
    99: "今の仕事を辞める理由は特にない",
    100: "この会社で定年まで働きたい"
};

// ページ表示切り替え
function showPage(pageName) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageName + '-page').classList.add('active');
}

// 入力ページの初期化
function initInputPage() {
    const savedData = localStorage.getItem('surveyTempData');
    if (savedData) {
        const data = JSON.parse(savedData);
        document.getElementById('employee-code').value = data.employeeCode || '';
        document.getElementById('department').value = data.department || '';
    }
    displayHistory();
}

// 診断開始
function startSurvey() {
    employeeCode = document.getElementById('employee-code').value.trim();
    department = document.getElementById('department').value.trim();
    
    if (!employeeCode || !department) {
        alert('従業員コードと所属部署を入力してください');
        return;
    }
    
    answers = {};
    localStorage.setItem('surveyTempData', JSON.stringify({
        employeeCode: employeeCode,
        department: department
    }));
    
    currentPage = 1;
    currentCategory = 0;
    displayQuestions();
    updateProgress();
    showPage('survey');
}

// 質問表示
function displayQuestions() {
    const startQ = (currentPage - 1) * questionsPerPage + 1;
    const endQ = Math.min(startQ + questionsPerPage - 1, 100);
    
    document.getElementById('category-name').textContent = categories[currentCategory].name;
    
    const questionsContainer = document.getElementById('questions-container');
    questionsContainer.innerHTML = '';
    
    for (let i = startQ; i <= endQ; i++) {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        
        const questionText = document.createElement('p');
        questionText.className = 'question-text';
        questionText.textContent = `Q${i}. ${questions[i]}`;
        questionDiv.appendChild(questionText);
        
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';
        
        const options = [
            { value: 5, label: 'とてもそう思う' },
            { value: 4, label: 'そう思う' },
            { value: 3, label: 'どちらでもない' },
            { value: 2, label: 'そう思わない' },
            { value: 1, label: '全くそう思わない' }
        ];
        
        options.forEach(option => {
            const label = document.createElement('label');
            label.className = 'option';
            
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `q${i}`;
            input.value = option.value;
            input.required = true;
            
            if (answers[i] && answers[i] === option.value) {
                input.checked = true;
            }
            
            input.addEventListener('change', () => {
                answers[i] = option.value;
                saveProgress();
            });
            
            const span = document.createElement('span');
            span.textContent = option.label;
            
            label.appendChild(input);
            label.appendChild(span);
            optionsDiv.appendChild(label);
        });
        
        questionDiv.appendChild(optionsDiv);
        questionsContainer.appendChild(questionDiv);
    }
    
    document.getElementById('prev-btn').style.display = currentPage > 1 ? 'inline-block' : 'none';
    document.getElementById('next-btn').style.display = currentPage < totalPages ? 'inline-block' : 'none';
    document.getElementById('submit-btn').style.display = currentPage === totalPages ? 'inline-block' : 'none';
}

// 進捗表示の更新
function updateProgress() {
    const progress = (currentPage / totalPages) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
    document.getElementById('progress-text').textContent = `${currentPage} / ${totalPages}`;
}

// 一時保存
function saveProgress() {
    const tempData = {
        employeeCode: employeeCode,
        department: department,
        currentPage: currentPage,
        currentCategory: currentCategory,
        answers: answers
    };
    localStorage.setItem('surveyTempData', JSON.stringify(tempData));
}

// 前のページ
function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        if ((currentPage - 1) % 1 === 0 && currentPage > 1) {
            currentCategory--;
        }
        displayQuestions();
        updateProgress();
        window.scrollTo(0, 0);
    }
}

// 次のページ
function nextPage() {
    const startQ = (currentPage - 1) * questionsPerPage + 1;
    const endQ = Math.min(startQ + questionsPerPage - 1, 100);
    
    let allAnswered = true;
    for (let i = startQ; i <= endQ; i++) {
        if (!answers[i]) {
            allAnswered = false;
            break;
        }
    }
    
    if (!allAnswered) {
        alert('すべての質問に回答してください');
        return;
    }
    
    if (currentPage < totalPages) {
        currentPage++;
        if ((currentPage - 1) % 1 === 0) {
            currentCategory++;
        }
        displayQuestions();
        updateProgress();
        window.scrollTo(0, 0);
    }
}

// 診断提出
function submitSurvey() {
    for (let i = 1; i <= 100; i++) {
        if (!answers[i]) {
            alert('すべての質問に回答してください');
            return;
        }
    }
    
    calculateScores();
    resultId = Date.now() + '-' + employeeCode;
    
    const url = new URL(window.location.href);
    url.searchParams.set('result', resultId);
    window.history.pushState({}, '', url);
    
    showResults();
}

// スコア計算
function calculateScores() {
    categoryScores = [];
    totalScore = 0;
    
    categories.forEach(category => {
        let categoryTotal = 0;
        category.questions.forEach(q => {
            categoryTotal += parseInt(answers[q]);
        });
        const categoryAverage = Math.round(categoryTotal / category.questions.length);
        categoryScores.push({
            name: category.name,
            score: categoryAverage
        });
        totalScore += categoryAverage;
    });
    
    totalScore = Math.round(totalScore / categories.length);
}

// 結果表示
function showResults() {
    const urlParams = new URLSearchParams(window.location.search);
    const resultId = urlParams.get('result');
    
    if (!resultId) {
        alert('結果が見つかりません');
        showPage('input');
        return;
    }

    const savedResults = JSON.parse(localStorage.getItem('surveyResults') || '[]');
    const result = savedResults.find(r => r.resultId === resultId);
    
    if (!result) {
        alert('指定された結果が見つかりません');
        showPage('input');
        return;
    }

    document.getElementById('result-date').textContent = result.surveyDate;
    document.getElementById('result-employee-code').textContent = result.employeeCode;
    document.getElementById('result-department').textContent = result.department;
    document.getElementById('total-score').textContent = result.totalScore;

    const evaluation = document.getElementById('evaluation');
    if (result.totalScore >= 70) {
        evaluation.textContent = '非常に高いエンゲージメント状態です';
        evaluation.className = 'high';
    } else if (result.totalScore >= 50) {
        evaluation.textContent = '標準的なエンゲージメント状態です';
        evaluation.className = 'medium';
    } else {
        evaluation.textContent = '改善が必要なエンゲージメント状態です';
        evaluation.className = 'low';
    }

    const categoryList = document.getElementById('category-scores');
    categoryList.innerHTML = '';
    
    result.categoryScores.forEach(category => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="category-name">${category.name}</span>
            <span class="category-score">${category.score}点</span>
        `;
        categoryList.appendChild(li);
    });

    drawRadarChart(result.categoryScores);
    displaySuggestions(result.categoryScores);

    const alreadySaved = savedResults.some(r => r.resultId === resultId);
    
    if (!alreadySaved) {
        saveResultToStorage(
            resultId,
            result.employeeCode,
            result.department,
            result.totalScore,
            result.categoryScores,
            result.answers
        );
        console.log('✅ 新規データをD1データベースに保存しました');
    } else {
        console.log('ℹ️ 既に保存済みのデータです（重複保存を防止）');
    }

    showPage('results');
}

// レーダーチャート描画
function drawRadarChart(scores) {
    const canvas = document.getElementById('radar-chart');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 60;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 5; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (radius / 5) * i, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    const angleStep = (Math.PI * 2) / scores.length;
    scores.forEach((score, i) => {
        const angle = angleStep * i - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = '#e0e0e0';
        ctx.stroke();
        
        const labelX = centerX + (radius + 40) * Math.cos(angle);
        const labelY = centerY + (radius + 40) * Math.sin(angle);
        
        ctx.fillStyle = '#333';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const words = score.name.split('・');
        if (words.length > 1) {
            ctx.fillText(words[0], labelX, labelY - 8);
            ctx.fillText(words[1], labelX, labelY + 8);
        } else {
            ctx.fillText(score.name, labelX, labelY);
        }
    });
    
    ctx.beginPath();
    scores.forEach((score, i) => {
        const angle = angleStep * i - Math.PI / 2;
        const value = score.score / 5;
        const x = centerX + radius * value * Math.cos(angle);
        const y = centerY + radius * value * Math.sin(angle);
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.closePath();
    
    ctx.fillStyle = 'rgba(74, 144, 226, 0.3)';
    ctx.fill();
    ctx.strokeStyle = '#4a90e2';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    scores.forEach((score, i) => {
        const angle = angleStep * i - Math.PI / 2;
        const value = score.score / 5;
        const x = centerX + radius * value * Math.cos(angle);
        const y = centerY + radius * value * Math.sin(angle);
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#4a90e2';
        ctx.fill();
    });
}

// 改善提案の表示
function displaySuggestions(scores) {
    const suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = '';
    
    const sortedScores = [...scores].sort((a, b) => a.score - b.score);
    
    sortedScores.slice(0, 3).forEach((category, index) => {
        const suggestionDiv = document.createElement('div');
        suggestionDiv.className = 'suggestion-item';
        
        const title = document.createElement('h4');
        title.textContent = `${index + 1}. ${category.name}（${category.score}点）`;
        suggestionDiv.appendChild(title);
        
        const text = document.createElement('p');
        text.textContent = getSuggestionText(category.name);
        suggestionDiv.appendChild(text);
        
        suggestionsContainer.appendChild(suggestionDiv);
    });
}

// 改善提案テキスト
function getSuggestionText(categoryName) {
    const suggestions = {
        '心身の健康': 'ワークライフバランスの改善や、健康管理プログラムの活用をお勧めします。定期的な休息とストレス管理を心がけましょう。',
        '仕事の充実感': '自身の強みを活かせる業務への挑戦や、新しいプロジェクトへの参加を検討してみてください。上司との対話を通じて、やりがいのある仕事の機会を探りましょう。',
        '成長機会': '研修制度の活用やスキルアップの機会を積極的に求めましょう。メンターとの対話やキャリア面談を通じて、成長の道筋を明確にすることが重要です。',
        '上司のサポート': '上司との定期的な1on1ミーティングを提案し、期待値や目標を明確にすることをお勧めします。フィードバックを求め、コミュニケーションを強化しましょう。',
        '部署内の人間関係': 'チームビルディング活動への参加や、同僚との積極的なコミュニケーションを心がけましょう。信頼関係の構築には時間と effort が必要です。',
        '評価・処遇': '評価基準の理解を深め、目標達成に向けた具体的なアクションプランを作成しましょう。評価面談での積極的な対話が重要です。',
        '会社への信頼': '会社の理念やビジョンへの理解を深め、経営陣との対話の機会があれば積極的に参加しましょう。会社の方向性と自身のキャリアの整合性を確認することが大切です。',
        '働く環境': '働き方の改善提案や、必要なリソースについて上司に相談することをお勧めします。快適な職場環境の実現には、積極的な発信が重要です。',
        '総合満足度': '各カテゴリーの改善提案を参考に、優先順位をつけて取り組むことをお勧めします。小さな改善の積み重ねが、全体的な満足度向上につながります。',
        '離職予防・継続意向': 'キャリアの方向性について、上司やメンターと率直に話し合うことをお勧めします。会社での将来像を明確にし、具体的なキャリアプランを立てることが重要です。'
    };
    
    return suggestions[categoryName] || '継続的な改善と成長を目指しましょう。';
}

// 結果保存
async function saveResultToStorage(resultId, employeeCode, department, totalScore, categoryScores, answers) {
    const surveyDate = new Date().toLocaleDateString('ja-JP');
    
    const result = {
        resultId: resultId,
        employeeCode: employeeCode,
        department: department,
        totalScore: totalScore,
        surveyDate: surveyDate,
        categoryScores: categoryScores,
        answers: answers
    };
    
    const savedResults = JSON.parse(localStorage.getItem('surveyResults') || '[]');
    savedResults.push(result);
    localStorage.setItem('surveyResults', JSON.stringify(savedResults));
    
    try {
        const response = await fetch('https://engagement-api.more-up.workers.dev/api/save-result', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(result)
        });
        
        if (!response.ok) {
            console.error('データ保存エラー:', response.statusText);
        }
    } catch (error) {
        console.error('API接続エラー:', error);
    }
    
    localStorage.removeItem('surveyTempData');
}

// 診断履歴の表示
function displayHistory() {
    const historyContainer = document.getElementById('history-list');
    const savedResults = JSON.parse(localStorage.getItem('surveyResults') || '[]');
    
    if (savedResults.length === 0) {
        historyContainer.innerHTML = '<p class="no-history">診断履歴はありません</p>';
        return;
    }
    
    historyContainer.innerHTML = '';
    
    savedResults.sort((a, b) => {
        return new Date(b.surveyDate) - new Date(a.surveyDate);
    });
    
    savedResults.forEach(result => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        let scoreClass = '';
        if (result.totalScore >= 70) {
            scoreClass = 'high';
        } else if (result.totalScore >= 50) {
            scoreClass = 'medium';
        } else {
            scoreClass = 'low';
        }
        
        historyItem.innerHTML = `
            <div class="history-info">
                <div class="history-date">${result.surveyDate}</div>
                <div class="history-details">
                    <span>従業員コード: ${result.employeeCode}</span>
                    <span>部署: ${result.department}</span>
                </div>
            </div>
            <div class="history-score ${scoreClass}">${result.totalScore}点</div>
            <button onclick="viewResult('${result.resultId}')" class="view-result-btn">結果を見る</button>
        `;
        
        historyContainer.appendChild(historyItem);
    });
}

// 結果表示（履歴から）
function viewResult(resultId) {
    const url = new URL(window.location.href);
    url.searchParams.set('result', resultId);
    window.location.href = url.toString();
}

// 新しい診断を開始
function startNewSurvey() {
    const url = new URL(window.location.href);
    url.searchParams.delete('result');
    window.history.pushState({}, '', url);
    
    document.getElementById('employee-code').value = '';
    document.getElementById('department').value = '';
    
    showPage('input');
}

// 印刷
function printResults() {
    window.print();
}

// ページ読み込み時の処理
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const resultId = urlParams.get('result');
    
    if (resultId) {
        showResults();
    } else {
        const savedData = localStorage.getItem('surveyTempData');
        if (savedData) {
            const data = JSON.parse(savedData);
            if (data.currentPage && data.answers && Object.keys(data.answers).length > 0) {
                if (confirm('前回の診断が途中です。続きから始めますか？')) {
                    employeeCode = data.employeeCode;
                    department = data.department;
                    currentPage = data.currentPage;
                    currentCategory = data.currentCategory;
                    answers = data.answers;
                    
                    displayQuestions();
                    updateProgress();
                    showPage('survey');
                    return;
                }
            }
        }
        
        initInputPage();
        showPage('input');
    }
});
