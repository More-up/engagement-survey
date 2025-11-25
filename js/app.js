// アプリケーション状態管理
let currentQuestionIndex = 0;
let answers = [];
let currentPage = 'home';

// ページ要素（DOMContentLoaded後に初期化）
let pages = {};

// ページ要素を初期化
function initPages() {
    pages = {
        home: document.getElementById('homePage'),
        orientation: document.getElementById('orientationPage'),
        survey: document.getElementById('surveyPage'),
        results: document.getElementById('resultsPage')
    };
}

// ページ遷移
function showPage(pageName) {
    Object.keys(pages).forEach(page => {
        if (pages[page]) {
            pages[page].classList.remove('active');
        }
    });
    if (pages[pageName]) {
        pages[pageName].classList.add('active');
    }
    currentPage = pageName;
    
    if (pageName === 'survey') {
        renderQuestion();
    } else if (pageName === 'results') {
        displayResults();
    }
}

// 診断開始
function startSurvey() {
    currentQuestionIndex = 0;
    answers = new Array(100).fill(null);
    showPage('orientation');
}

// オリエンテーション完了
function completeOrientation() {
    showPage('survey');
}

// 質問を描画
function renderQuestion() {
    const container = document.getElementById('questionContainer');
    const progressInfo = document.getElementById('progressInfo');
    const progressFill = document.getElementById('progressFill');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    if (!container) return;
    
    // 進捗情報更新
    const progress = ((currentQuestionIndex + 1) / 100) * 100;
    if (progressInfo) {
        progressInfo.innerHTML = `
            <span>質問 ${currentQuestionIndex + 1} / 100</span>
            <span>${Math.round(progress)}% 完了</span>
        `;
    }
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
    
    // 現在の質問を取得
    let questionData = null;
    let questionInCategory = 0;
    let cumulativeCount = 0;
    
    for (const category of questions) {
        if (currentQuestionIndex < cumulativeCount + category.questions.length) {
            questionData = category.questions[currentQuestionIndex - cumulativeCount];
            questionInCategory = currentQuestionIndex - cumulativeCount;
            break;
        }
        cumulativeCount += category.questions.length;
    }
    
    // カテゴリーが変わったかチェック
    const currentCategory = getCurrentCategory();
    const isNewCategory = questionInCategory === 0;
    
    // 質問カードを描画
    container.innerHTML = '';
    
    // 新しいカテゴリーの開始時にヘッダーを表示
    if (isNewCategory) {
        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'category-header';
        categoryHeader.innerHTML = `
            <h3>${currentCategory.category}</h3>
            <p>${currentCategory.categoryDescription}</p>
        `;
        container.appendChild(categoryHeader);
    }
    
    // 質問カード
    const questionCard = document.createElement('div');
    questionCard.className = 'question-card';
    questionCard.innerHTML = `
        <div class="question-header">
            <div class="question-number">${currentQuestionIndex + 1}</div>
            <div class="question-text">${questionData.text}</div>
        </div>
        <div class="options">
            <button class="option-btn" onclick="selectAnswer(1)" data-value="1">
                全くそう思わない<br><small>1点</small>
            </button>
            <button class="option-btn" onclick="selectAnswer(2)" data-value="2">
                そう思わない<br><small>2点</small>
            </button>
            <button class="option-btn" onclick="selectAnswer(3)" data-value="3">
                どちらでもない<br><small>3点</small>
            </button>
            <button class="option-btn" onclick="selectAnswer(4)" data-value="4">
                そう思う<br><small>4点</small>
            </button>
            <button class="option-btn" onclick="selectAnswer(5)" data-value="5">
                非常にそう思う<br><small>5点</small>
            </button>
        </div>
    `;
    container.appendChild(questionCard);
    
    // 既存の回答をハイライト
    if (answers[currentQuestionIndex] !== null) {
        const selectedBtn = questionCard.querySelector(`[data-value="${answers[currentQuestionIndex]}"]`);
        if (selectedBtn) {
            selectedBtn.classList.add('selected');
        }
    }
    
    // ボタンの表示制御
    if (prevBtn) {
        prevBtn.style.display = currentQuestionIndex > 0 ? 'inline-block' : 'none';
    }
    if (nextBtn) {
        nextBtn.style.display = currentQuestionIndex < 99 ? 'inline-block' : 'none';
    }
    if (submitBtn) {
        submitBtn.style.display = currentQuestionIndex === 99 ? 'inline-block' : 'none';
    }
    
    // ボタンの有効/無効
    if (currentQuestionIndex < 99 && nextBtn) {
        nextBtn.disabled = answers[currentQuestionIndex] === null;
    }
    if (currentQuestionIndex === 99 && submitBtn) {
        submitBtn.disabled = answers[currentQuestionIndex] === null;
    }
}

// 現在のカテゴリーを取得
function getCurrentCategory() {
    let cumulativeCount = 0;
    for (const category of questions) {
        if (currentQuestionIndex < cumulativeCount + category.questions.length) {
            return category;
        }
        cumulativeCount += category.questions.length;
    }
    return questions[questions.length - 1];
}

// 回答を選択
function selectAnswer(value) {
    answers[currentQuestionIndex] = value;
    
    // 選択状態を更新
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => {
        btn.classList.remove('selected');
        if (parseInt(btn.dataset.value) === value) {
            btn.classList.add('selected');
        }
    });
    
    // 次へボタンを有効化
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    if (currentQuestionIndex < 99 && nextBtn) {
        nextBtn.disabled = false;
    } else if (submitBtn) {
        submitBtn.disabled = false;
    }
}

// 前の質問へ
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
}

// 次の質問へ
function nextQuestion() {
    if (currentQuestionIndex < 99 && answers[currentQuestionIndex] !== null) {
        currentQuestionIndex++;
        renderQuestion();
    }
}

// 診断を完了
function completeSurvey() {
    // 全ての質問に回答されているか確認
    if (answers.includes(null)) {
        alert('全ての質問に回答してください。');
        return;
    }
    
    showPage('results');
}

// 結果を表示
function displayResults() {
    const scores = calculateScores();
    
    // 総合スコア表示
    displayTotalScore(scores.total);
    
    // カテゴリー別スコア表示
    displayCategoryScores(scores.categories);
    
    // レーダーチャート表示
    displayRadarChart(scores.categories);
    
    // フィードバック表示
    displayFeedback(scores.total, scores.categories);
}

// スコア計算
function calculateScores() {
    const categoryScores = [];
    let totalScore = 0;
    let questionCount = 0;
    
    for (const category of questions) {
        let categorySum = 0;
        let categoryQuestionCount = category.questions.length;
        
        for (const question of category.questions) {
            const answer = answers[question.id - 1];
            // 逆転項目の処理
            const score = question.reverse ? (6 - answer) : answer;
            categorySum += score;
            totalScore += score;
            questionCount++;
        }
        
        // カテゴリースコアを100点満点に正規化
        const categoryScore = (categorySum / (categoryQuestionCount * 5)) * 100;
        categoryScores.push({
            name: category.category,
            score: Math.round(categoryScore)
        });
    }
    
    // 総合スコアを100点満点に正規化
    const normalizedTotal = (totalScore / (questionCount * 5)) * 100;
    
    return {
        total: Math.round(normalizedTotal),
        categories: categoryScores
    };
}

// 総合スコア表示
function displayTotalScore(score) {
    const container = document.getElementById('totalScoreContainer');
    if (!container) return;
    
    const level = getScoreLevel(score);
    
    container.innerHTML = `
        <div class="total-score" style="background: linear-gradient(135deg, ${level.color} 0%, ${level.color}dd 100%);">
            <h3>総合スコア</h3>
            <div class="score-value">${score}</div>
            <div class="score-label">${level.label}</div>
        </div>
    `;
}

// スコアレベルを取得
function getScoreLevel(score) {
    for (const [key, criteria] of Object.entries(scoreCriteria)) {
        if (score >= criteria.min) {
            return criteria;
        }
    }
    return scoreCriteria.critical;
}

// カテゴリー別スコア表示
function displayCategoryScores(categories) {
    const container = document.getElementById('categoryScoresContainer');
    if (!container) return;
    
    const html = categories.map(cat => `
        <div class="category-score-item">
            <span class="category-name">${cat.name}</span>
            <span class="category-score-value">${cat.score}点</span>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

// レーダーチャート表示
function displayRadarChart(categories) {
    const canvas = document.getElementById('radarChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // キャンバスサイズ設定
    const size = 400;
    canvas.width = size;
    canvas.height = size;
    
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 60;
    
    // 背景をクリア
    ctx.clearRect(0, 0, size, size);
    
    // グリッド線を描画
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    
    for (let i = 1; i <= 5; i++) {
        ctx.beginPath();
        const r = (radius / 5) * i;
        
        for (let j = 0; j < categories.length; j++) {
            const angle = (Math.PI * 2 / categories.length) * j - Math.PI / 2;
            const x = centerX + r * Math.cos(angle);
            const y = centerY + r * Math.sin(angle);
            
            if (j === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
        ctx.stroke();
    }
    
    // 軸を描画
    ctx.strokeStyle = '#cbd5e1';
    categories.forEach((cat, i) => {
        const angle = (Math.PI * 2 / categories.length) * i - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.stroke();
    });
    
    // データを描画
    ctx.fillStyle = 'rgba(37, 99, 235, 0.2)';
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    categories.forEach((cat, i) => {
        const angle = (Math.PI * 2 / categories.length) * i - Math.PI / 2;
        const r = (radius * cat.score) / 100;
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // ラベルを描画
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    categories.forEach((cat, i) => {
        const angle = (Math.PI * 2 / categories.length) * i - Math.PI / 2;
        const labelRadius = radius + 30;
        const x = centerX + labelRadius * Math.cos(angle);
        const y = centerY + labelRadius * Math.sin(angle);
        
        // テキストを複数行に分割
        const words = cat.name.split('');
        const maxWidth = 40;
        let line = '';
        let lines = [];
        
        for (let word of words) {
            const testLine = line + word;
            const metrics = ctx.measureText(testLine);
            if (metrics.width > maxWidth && line !== '') {
                lines.push(line);
                line = word;
            } else {
                line = testLine;
            }
        }
        lines.push(line);
        
        // 複数行テキストを描画
        const lineHeight = 14;
        const startY = y - ((lines.length - 1) * lineHeight) / 2;
        lines.forEach((textLine, idx) => {
            ctx.fillText(textLine, x, startY + idx * lineHeight);
        });
    });
}

// フィードバック表示
function displayFeedback(totalScore, categories) {
    const container = document.getElementById('feedbackContainer');
    if (!container) return;
    
    const level = getScoreLevel(totalScore);
    
    // 総合フィードバック
    let feedback = `<div class="feedback-message">
        <p><strong>総合評価：</strong>${level.label}</p>
        <p>${getFeedbackMessage(totalScore)}</p>
    </div>`;
    
    // 低スコアカテゴリーへの提言
    const lowScoreCategories = categories.filter(cat => cat.score < 60).sort((a, b) => a.score - b.score);
    
    if (lowScoreCategories.length > 0) {
        feedback += `<div class="feedback-message">
            <p><strong>重点改善項目：</strong></p>
            <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">`;
        
        lowScoreCategories.forEach(cat => {
            feedback += `<li><strong>${cat.name}</strong>（${cat.score}点）：改善が推奨されます</li>`;
        });
        
        feedback += `</ul></div>`;
    }
    
    // 高スコアカテゴリーの称賛
    const highScoreCategories = categories.filter(cat => cat.score >= 80).sort((a, b) => b.score - a.score);
    
    if (highScoreCategories.length > 0) {
        feedback += `<div class="feedback-message">
            <p><strong>優れている項目：</strong></p>
            <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">`;
        
        highScoreCategories.forEach(cat => {
            feedback += `<li><strong>${cat.name}</strong>（${cat.score}点）：非常に良好です</li>`;
        });
        
        feedback += `</ul></div>`;
    }
    
    container.innerHTML = feedback;
}

// フィードバックメッセージ取得
function getFeedbackMessage(score) {
    if (score >= 80) return feedbackMessages.excellent;
    if (score >= 70) return feedbackMessages.good;
    if (score >= 60) return feedbackMessages.moderate;
    if (score >= 50) return feedbackMessages.low;
    return feedbackMessages.critical;
}

// 最初からやり直す
function restartSurvey() {
    currentQuestionIndex = 0;
    answers = [];
    showPage('home');
}

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    initPages();
    showPage('home');
});
