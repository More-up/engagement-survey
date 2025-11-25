// ==============================
// エンゲージメント診断 メインロジック
// ==============================

let currentQuestionIndex = 0;
let answers = {};
let selectedDepartment = ''; // 部署情報を保存

// ページ要素（初期化後に取得）
let pages = {};

// ==============================
// 初期化関数
// ==============================
function initPages() {
    pages = {
        home: document.getElementById('home'),
        orientation: document.getElementById('orientation'),
        departmentSelection: document.getElementById('department-selection'), // 部署選択ページ
        survey: document.getElementById('survey'),
        results: document.getElementById('results')
    };
}

// ==============================
// ページ遷移
// ==============================
function showPage(pageId) {
    if (!pages || !pages.home) {
        console.error('Pages not initialized');
        return;
    }
    
    // 全ページを非表示
    Object.values(pages).forEach(page => {
        if (page) page.classList.remove('active');
    });
    
    // 指定ページを表示
    if (pages[pageId]) {
        pages[pageId].classList.add('active');
    }
    
    // ★ スクロール位置を一番上にリセット
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // スムーズにスクロール
    });
}

// ==============================
// オリエンテーション完了
// ==============================
function completeOrientation() {
    showPage('departmentSelection'); // 部署選択ページへ遷移
}

// ==============================
// 部署選択と診断開始
// ==============================
function saveDepartmentAndStart() {
    const departmentSelect = document.getElementById('department-select');
    selectedDepartment = departmentSelect.value;

    if (!selectedDepartment) {
        alert('部署を選択してください');
        return;
    }

    // 部署情報をローカルストレージに保存
    localStorage.setItem('selectedDepartment', selectedDepartment);

    // 診断開始
    currentQuestionIndex = 0;
    answers = {};
    showPage('survey');
    renderQuestion();
}

// ==============================
// 質問の描画
// ==============================
function renderQuestion() {
    const question = questions[currentQuestionIndex];
    
    // 質問文、カテゴリー、進捗を表示
    document.getElementById('question-text').textContent = question.text;
    document.getElementById('category-name').textContent = question.category;
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
    document.getElementById('total-questions').textContent = questions.length;
    
    // 進捗バーの更新
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
    
    // 前回の回答を復元
    const savedAnswer = answers[question.id];
    document.querySelectorAll('input[name="answer"]').forEach(input => {
        input.checked = (input.value == savedAnswer);
    });
    
    // ボタンの表示制御
    document.getElementById('prev-btn').style.display = currentQuestionIndex === 0 ? 'none' : 'inline-block';
    
    const nextBtn = document.getElementById('next-btn');
    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.textContent = '結果を見る';
    } else {
        nextBtn.textContent = '次の質問 →';
    }
}

// ==============================
// 回答の保存
// ==============================
function saveAnswer() {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) {
        alert('回答を選択してください');
        return false;
    }
    
    const question = questions[currentQuestionIndex];
    answers[question.id] = parseInt(selected.value);
    return true;
}

// ==============================
// 次の質問へ
// ==============================
function nextQuestion() {
    if (!saveAnswer()) return;
    
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
        
        // ★ 質問切り替え時もスクロールをリセット
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        showResults();
    }
}

// ==============================
// 前の質問へ
// ==============================
function previousQuestion() {
    saveAnswer();
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
        
        // ★ 質問切り替え時もスクロールをリセット
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// ==============================
// 結果の表示
// ==============================
function showResults() {
    // 総合スコアの計算
    let totalScore = 0;
    Object.values(answers).forEach(score => {
        totalScore += score;
    });
    
    // カテゴリー別スコアの計算
    const categoryScores = {};
    questions.forEach(q => {
        if (!categoryScores[q.category]) {
            categoryScores[q.category] = 0;
        }
        categoryScores[q.category] += answers[q.id] || 0;
    });
    
    // 総合スコア表示
    document.getElementById('total-score').textContent = totalScore;
    
    // 部署名の表示
    const departmentDisplay = document.getElementById('department-display');
    if (selectedDepartment) {
        departmentDisplay.textContent = `所属部署: ${selectedDepartment}`;
    }
    
    // カテゴリー別スコア表示
    const categoryScoresDiv = document.getElementById('category-scores');
    categoryScoresDiv.innerHTML = '';
    Object.entries(categoryScores).forEach(([category, score]) => {
        const maxScore = questions.filter(q => q.category === category).length * 5;
        const percentage = Math.round((score / maxScore) * 100);
        
        const scoreItem = document.createElement('div');
        scoreItem.className = 'score-item';
        scoreItem.innerHTML = `
            <div class="score-row">
                <span class="score-label">${category}</span>
                <span class="score-value">${score} / ${maxScore} (${percentage}%)</span>
            </div>
            <div class="score-bar">
                <div class="score-bar-fill" style="width: ${percentage}%;"></div>
            </div>
        `;
        categoryScoresDiv.appendChild(scoreItem);
    });
    
    // レーダーチャートの描画
    drawRadarChart(categoryScores);
    
    // フィードバック表示
    displayFeedback(totalScore);
    
    // 結果ページへ遷移
    showPage('results');
}

// ==============================
// レーダーチャートの描画
// ==============================
function drawRadarChart(categoryScores) {
    const ctx = document.getElementById('radar-chart').getContext('2d');
    
    const labels = Object.keys(categoryScores);
    const data = labels.map(category => {
        const maxScore = questions.filter(q => q.category === category).length * 5;
        return Math.round((categoryScores[category] / maxScore) * 100);
    });
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'エンゲージメントスコア（%）',
                data: data,
                backgroundColor: 'rgba(102, 126, 234, 0.2)',
                borderColor: 'rgba(102, 126, 234, 1)',
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

// ==============================
// フィードバック表示
// ==============================
function displayFeedback(totalScore) {
    const feedbackDiv = document.getElementById('feedback');
    let feedback = '';
    
    if (totalScore >= 400) {
        feedback = '<p class="feedback-excellent">🌟 素晴らしい！あなたの職場エンゲージメントは非常に高い水準です。</p>';
    } else if (totalScore >= 300) {
        feedback = '<p class="feedback-good">👍 良好です。多
