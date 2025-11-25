// ==============================
// エンゲージメント診断 メインロジック
// ==============================

let currentQuestionIndex = 0;
let answers = {};
let selectedDepartment = '';
let employeeCode = '';

// ページ要素（初期化後に取得）
let pages = {};

// ==============================
// 初期化関数
// ==============================
function initPages() {
    pages = {
        home: document.getElementById('home'),
        orientation: document.getElementById('orientation'),
        departmentSelection: document.getElementById('department-selection'),
        survey: document.getElementById('survey'),
        results: document.getElementById('results'),
        history: document.getElementById('history')
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
    
    // スクロール位置を一番上にリセット
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ==============================
// オリエンテーション完了
// ==============================
function completeOrientation() {
    showPage('departmentSelection');
}

// ==============================
// 部署選択と診断開始
// ==============================
function saveDepartmentAndStart() {
    // 従業員コードの取得
    const employeeCodeInput = document.getElementById('employee-code');
    employeeCode = employeeCodeInput.value.trim();
    
    // 従業員コードの必須チェック
    if (!employeeCode) {
        alert('従業員コードを入力してください');
        employeeCodeInput.focus();
        return;
    }
    
    // 部署の取得
    const departmentSelect = document.getElementById('department-select');
    selectedDepartment = departmentSelect.value;

    // 部署の必須チェック
    if (!selectedDepartment) {
        alert('部署を選択してください');
        departmentSelect.focus();
        return;
    }

    // ローカルストレージに保存
    localStorage.setItem('employeeCode', employeeCode);
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
    
    // まず全ての選択を解除
    document.querySelectorAll('input[name="answer"]').forEach(input => {
        input.checked = false;
    });
    
    // 保存された回答がある場合のみ復元
    const savedAnswer = answers[question.id];
    if (savedAnswer) {
        document.querySelectorAll('input[name="answer"]').forEach(input => {
            if (input.value == savedAnswer) {
                input.checked = true;
            }
        });
    }
    
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
        
        // 質問切り替え時もスクロールをリセット
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
        
        // 質問切り替え時もスクロールをリセット
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
    
    // 従業員コードの表示
    const employeeCodeDisplay = document.getElementById('employee-code-display');
    if (employeeCode) {
        employeeCodeDisplay.textContent = `従業員コード: ${employeeCode}`;
    }
    
    // 部署名の表示
    const departmentDisplay = document.getElementById('department-display');
    if (selectedDepartment) {
        departmentDisplay.textContent = `所属部署: ${selectedDepartment}`;
    }
    
    // 診断日時の表示
    const now = new Date();
    const dateStr = `診断日時: ${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    const surveyDate = document.getElementById('survey-date');
    surveyDate.textContent = dateStr;
    
    // 印刷用の情報も設定
    document.getElementById('print-employee-code').textContent = `従業員コード: ${employeeCode}`;
    document.getElementById('print-department').textContent = `所属部署: ${selectedDepartment}`;
    document.getElementById('print-date').textContent = dateStr;
    
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
    
    // 診断結果をローカルストレージに保存
    saveResultToStorage(totalScore, categoryScores, dateStr);
    
    // 結果ページへ遷移
    showPage('results');
}

// ==============================
// 診断結果の保存
// ==============================
function saveResultToStorage(totalScore, categoryScores, dateStr) {
    const result = {
        employeeCode: employeeCode,
        department: selectedDepartment,
        date: dateStr,
        timestamp: new Date().getTime(),
        totalScore: totalScore,
        categoryScores: categoryScores,
        answers: answers
    };
    
    // 過去の結果を取得
    let history = JSON.parse(localStorage.getItem('surveyHistory') || '[]');
    
    // 新しい結果を追加
    history.push(result);
    
    // 最新10件のみ保持
    if (history.length > 10) {
        history = history.slice(-10);
    }
    
    // 保存
    localStorage.setItem('surveyHistory', JSON.stringify(history));
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
                backgroundColor: 'rgba(30, 122, 95, 0.2)',
                borderColor: 'rgba(30, 122, 95, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(246, 185, 59, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(246, 185, 59, 1)'
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
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
        feedback = '<p class="feedback-good">👍 良好です。多くの面で満足度が高いようです。</p>';
    } else if (totalScore >= 200) {
        feedback = '<p class="feedback-average">📊 平均的なレベルです。<br>改善の余地がいくつかあります。</p>';
    } else {
        feedback = '<p class="feedback-low">💡 改善が必要です。職場環境の見直しを検討しましょう。</p>';
    }
    
    feedbackDiv.innerHTML = feedback;
}

// ==============================
// 診断履歴の表示
// ==============================
function showHistory() {
    const history = JSON.parse(localStorage.getItem('surveyHistory') || '[]');
    const historyList = document.getElementById('history-list');
    
    if (history.length === 0) {
        historyList.innerHTML = '<p style="text-align: center; color: #636e72; padding: 40px;">まだ診断履歴がありません</p>';
    } else {
        historyList.innerHTML = '';
        
        // 新しい順に表示
        history.reverse().forEach((item, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <div class="history-date">${item.date}</div>
                <div class="history-info">
                    <div>
                        <strong>従業員コード:</strong> ${item.employeeCode}<br>
                        <strong>所属部署:</strong> ${item.department}
                    </div>
                    <div class="history-score">${item.totalScore} / 500点</div>
                </div>
            `;
            historyList.appendChild(historyItem);
        });
    }
    
    showPage('history');
}

// ==============================
// 診断を完了する
// ==============================
function completeSurvey() {
    // 確認ダイアログ
    if (confirm('診断を完了してトップページに戻りますか？')) {
        // データをクリア
        currentQuestionIndex = 0;
        answers = {};
        selectedDepartment = '';
        employeeCode = '';
        
        // トップページへ
        showPage('home');
    }
}

// ==============================
// ページ読み込み時の初期化
// ==============================
document.addEventListener('DOMContentLoaded', function() {
    initPages();
    showPage('home');
});
