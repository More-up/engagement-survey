// ============================
// グローバル変数
// ============================
let currentPage = 'home';
let currentCategoryIndex = 0;
let answers = {};
let employeeCode = '';
let selectedDepartment = '';
let radarChart = null;
let categories = [];

// ============================
// 従業員コード正規化関数
// ============================
function normalizeEmployeeCode(code) {
    if (!code) return '';
    
    return code
        .replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
        })
        .replace(/　/g, ' ')
        .replace(/\s+/g, '')
        .toUpperCase()
        .trim();
}

// ============================
// ページ管理
// ============================
function initPages() {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
}

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ============================
// URL管理（結果保持用）
// ============================
function getResultIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('result');
}

function setResultIdToURL(resultId) {
    const url = new URL(window.location);
    url.searchParams.set('result', resultId);
    window.history.pushState({}, '', url);
}

function loadResultFromURL() {
    const resultId = getResultIdFromURL();
    if (!resultId) return false;
    
    const allResults = JSON.parse(localStorage.getItem('surveyResults')) || [];
    const result = allResults.find(r => r.resultId === resultId);
    
    if (!result) return false;
    
    // 結果データを復元
    employeeCode = result.employeeCode;
    selectedDepartment = result.department;
    answers = result.answers;
    
    // カテゴリーを準備
    prepareCategories();
    
    // 結果ページを表示
    showResults();
    
    return true;
}

// ============================
// オリエンテーション完了
// ============================
function completeOrientation() {
    showPage('department-selection');
}

// ============================
// 部署選択・従業員コード保存
// ============================
function saveDepartmentAndStart() {
    const codeInput = document.getElementById('employee-code');
    const rawCode = codeInput ? codeInput.value.trim() : '';
    employeeCode = normalizeEmployeeCode(rawCode);
    
    if (!employeeCode) {
        alert('従業員コードを入力してください。');
        return;
    }
    
    const deptSelect = document.getElementById('department');
    selectedDepartment = deptSelect ? deptSelect.value : '';
    
    if (!selectedDepartment) {
        alert('部署を選択してください。');
        return;
    }
    
    localStorage.setItem('employeeCode', employeeCode);
    localStorage.setItem('selectedDepartment', selectedDepartment);
    
    // カテゴリーを準備
    prepareCategories();
    
    // 一時保存データを読み込み
    loadTemporaryAnswers();
    
    showPage('survey');
    renderCategoryQuestions();
}

// ============================
// カテゴリー準備
// ============================
function prepareCategories() {
    const categoryMap = {};
    
    questions.forEach((q, index) => {
        if (!categoryMap[q.category]) {
            categoryMap[q.category] = [];
        }
        categoryMap[q.category].push({
            ...q,
            questionNumber: index + 1
        });
    });
    
    categories = Object.keys(categoryMap).map(cat => ({
        name: cat,
        questions: categoryMap[cat]
    }));
}

// ============================
// 一時保存機能
// ============================
function saveTemporaryAnswers() {
    const tempData = {
        employeeCode: employeeCode,
        department: selectedDepartment,
        currentCategoryIndex: currentCategoryIndex,
        answers: answers,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('tempSurveyData', JSON.stringify(tempData));
}

function loadTemporaryAnswers() {
    const tempDataStr = localStorage.getItem('tempSurveyData');
    if (!tempDataStr) return;
    
    const tempData = JSON.parse(tempDataStr);
    
    // 同じ従業員コードの一時データのみ復元
    if (normalizeEmployeeCode(tempData.employeeCode) === employeeCode) {
        answers = tempData.answers || {};
        currentCategoryIndex = tempData.currentCategoryIndex || 0;
    }
}

function clearTemporaryAnswers() {
    localStorage.removeItem('tempSurveyData');
}

// ============================
// カテゴリー単位の質問表示（カテゴリー名非表示）
// ============================
function renderCategoryQuestions() {
    if (currentCategoryIndex >= categories.length) {
        showResults();
        return;
    }
    
    const category = categories[currentCategoryIndex];
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const sectionHeader = document.getElementById('section-header');
    const categoryProgressText = document.getElementById('category-progress-text');
    const questionsContainer = document.getElementById('questions-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // 全体進捗バー
    const overallProgress = ((currentCategoryIndex + 1) / categories.length) * 100;
    if (progressFill) {
        progressFill.style.width = `${overallProgress}%`;
    }
    if (progressText) {
        progressText.textContent = `セクション ${currentCategoryIndex + 1} / ${categories.length}`;
    }
    
    // セクションヘッダー（カテゴリー名を表示しない）
    if (sectionHeader) {
        sectionHeader.textContent = `セクション ${currentCategoryIndex + 1} / ${categories.length}`;
    }
    
    // カテゴリー内進捗
    const answeredCount = category.questions.filter(q => answers[q.questionNumber] !== undefined).length;
    if (categoryProgressText) {
        categoryProgressText.textContent = `${answeredCount} / ${category.questions.length} 問回答済み`;
    }
    
    // 質問を表示
    if (questionsContainer) {
        questionsContainer.innerHTML = '';
        
        category.questions.forEach(q => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question-item';
            
            const questionTitle = document.createElement('div');
            questionTitle.className = 'question-item-title';
            questionTitle.textContent = `Q${q.questionNumber}. ${q.question}`;
            
            const optionsDiv = document.createElement('div');
            optionsDiv.className = 'question-item-options';
            
            const options = [
                { value: 5, label: '強くそう思う' },
                { value: 4, label: 'そう思う' },
                { value: 3, label: 'どちらでもない' },
                { value: 2, label: 'そう思わない' },
                { value: 1, label: '全くそう思わない' }
            ];
            
            options.forEach(opt => {
                const optionLabel = document.createElement('label');
                optionLabel.className = 'radio-option';
                
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = `question-${q.questionNumber}`;
                radio.value = opt.value;
                
                if (answers[q.questionNumber] == opt.value) {
                    radio.checked = true;
                }
                
                radio.addEventListener('change', () => {
                    answers[q.questionNumber] = parseInt(opt.value);
                    saveTemporaryAnswers();
                    updateCategoryProgress();
                });
                
                const span = document.createElement('span');
                span.textContent = opt.label;
                
                optionLabel.appendChild(radio);
                optionLabel.appendChild(span);
                optionsDiv.appendChild(optionLabel);
            });
            
            questionDiv.appendChild(questionTitle);
            questionDiv.appendChild(optionsDiv);
            questionsContainer.appendChild(questionDiv);
        });
    }
    
    // ボタン表示制御
    if (prevBtn) {
        if (currentCategoryIndex === 0) {
            prevBtn.style.visibility = 'hidden';
        } else {
            prevBtn.style.visibility = 'visible';
        }
    }
    
    if (nextBtn) {
        if (currentCategoryIndex === categories.length - 1) {
            nextBtn.textContent = '結果を見る';
        } else {
            nextBtn.textContent = '次のセクションへ';
        }
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateCategoryProgress() {
    const category = categories[currentCategoryIndex];
    const answeredCount = category.questions.filter(q => answers[q.questionNumber] !== undefined).length;
    const categoryProgressText = document.getElementById('category-progress-text');
    
    if (categoryProgressText) {
        categoryProgressText.textContent = `${answeredCount} / ${category.questions.length} 問回答済み`;
    }
}

function nextCategory() {
    const category = categories[currentCategoryIndex];
    const unansweredQuestions = category.questions.filter(q => answers[q.questionNumber] === undefined);
    
    if (unansweredQuestions.length > 0) {
        const firstUnanswered = unansweredQuestions[0].questionNumber;
        if (!confirm(`未回答の質問が ${unansweredQuestions.length} 問あります。\nスキップして次に進みますか？\n（後で戻って回答できます）`)) {
            // 最初の未回答質問までスクロール
            const questionElement = document.querySelector(`.question-item:nth-child(${category.questions.findIndex(q => q.questionNumber === firstUnanswered) + 1})`);
            if (questionElement) {
                questionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
    }
    
    currentCategoryIndex++;
    saveTemporaryAnswers();
    
    if (currentCategoryIndex >= categories.length) {
        showResults();
    } else {
        renderCategoryQuestions();
    }
}

function previousCategory() {
    if (currentCategoryIndex > 0) {
        currentCategoryIndex--;
        saveTemporaryAnswers();
        renderCategoryQuestions();
    }
}

// ============================
// 結果表示
// ============================
function showResults() {
    // 一時保存データをクリア
    clearTemporaryAnswers();
    
    showPage('results');
    
    const employeeCodeDisplay = document.getElementById('employee-code-display');
    const departmentDisplay = document.getElementById('department-display');
    const surveyDateDisplay = document.getElementById('survey-date-display');
    
    if (employeeCodeDisplay) {
        employeeCodeDisplay.textContent = employeeCode || '未入力';
    }
    if (departmentDisplay) {
        departmentDisplay.textContent = selectedDepartment || '未選択';
    }
    if (surveyDateDisplay) {
        const now = new Date();
        surveyDateDisplay.textContent = `${now.getFullYear()}年${now.getMonth()+1}月${now.getDate()}日`;
    }
    
    const categoryScores = calculateCategoryScores();
    const totalScore = calculateTotalScore(categoryScores);
    
    const totalScoreElement = document.getElementById('total-score');
    if (totalScoreElement) {
        totalScoreElement.textContent = totalScore;
    }
    
    displayCategoryScores(categoryScores);
    drawRadarChart(categoryScores);
    displayFeedback(totalScore, categoryScores);
    
    // 結果を保存してURLに反映
    const resultId = saveResultToStorage(totalScore, categoryScores);
    setResultIdToURL(resultId);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function calculateCategoryScores() {
    const categoryScoreMap = {};
    
    categories.forEach(cat => {
        let total = 0;
        let count = 0;
        
        cat.questions.forEach(q => {
            if (answers[q.questionNumber] !== undefined) {
                total += answers[q.questionNumber];
                count++;
            }
        });
        
        if (count > 0) {
            const avg = total / count;
            categoryScoreMap[cat.name] = Math.round(avg * 20);
        } else {
            categoryScoreMap[cat.name] = 0;
        }
    });
    
    return categoryScoreMap;
}

function calculateTotalScore(categoryScores) {
    const values = Object.values(categoryScores);
    if (values.length === 0) return 0;
    const sum = values.reduce((a, b) => a + b, 0);
    return Math.round(sum / values.length);
}

function displayCategoryScores(categoryScores) {
    const container = document.getElementById('category-scores');
    if (!container) return;
    
    container.innerHTML = '';
    
    for (let category in categoryScores) {
        const score = categoryScores[category];
        
        const scoreItem = document.createElement('div');
        scoreItem.className = 'score-item';
        
        scoreItem.innerHTML = `
            <div class="score-row">
                <span class="score-label">${category}</span>
                <span class="score-value">${score}点</span>
            </div>
            <div class="score-bar">
                <div class="score-bar-fill" style="width: ${score}%"></div>
            </div>
        `;
        
        container.appendChild(scoreItem);
    }
}

function drawRadarChart(categoryScores) {
    const canvas = document.getElementById('radar-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    if (radarChart) {
        radarChart.destroy();
    }
    
    const labels = Object.keys(categoryScores);
    const data = Object.values(categoryScores);
    
    radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'スコア',
                data: data,
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                borderColor: 'rgba(16, 185, 129, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(245, 158, 11, 1)',
                pointBorderColor: '#fff',
                pointRadius: 4
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

function displayFeedback(totalScore, categoryScores) {
    const feedbackElement = document.getElementById('feedback-text');
    if (!feedbackElement) return;
    
    let feedbackClass = '';
    let feedbackTitle = '';
    let feedbackDetail = '';
    let suggestions = '';
    
    if (totalScore >= 80) {
        feedbackClass = 'feedback-excellent';
        feedbackTitle = '🎉 素晴らしいです！';
        feedbackDetail = 'あなたのエンゲージメントは非常に高い水準にあります。<br>現在の働き方や環境に高い満足度を感じており、<br>モチベーション高く業務に取り組めている状態です。';
        suggestions = 'この良好な状態を維持しながら、<br>さらなる成長やチャレンジの機会を模索してみましょう。';
    } else if (totalScore >= 70) {
        feedbackClass = 'feedback-good';
        feedbackTitle = '👍 良好です';
        feedbackDetail = '多くの面で満足度が高く、<br>前向きに業務に取り組めている状態です。<br>全体としてバランスの取れた働き方ができています。';
        
        const lowCategories = Object.entries(categoryScores)
            .filter(([cat, score]) => score < 70)
            .map(([cat, score]) => cat);
        
        if (lowCategories.length > 0) {
            suggestions = `特に「${lowCategories.join('」「')}」の分野で<br>さらなる向上の機会があるかもしれません。`;
        } else {
            suggestions = '現在の良好な状態を維持しつつ、<br>さらに充実した働き方を目指しましょう。';
        }
    } else if (totalScore >= 60) {
        feedbackClass = 'feedback-average';
        feedbackTitle = '📊 平均的です';
        feedbackDetail = 'エンゲージメントレベルは平均的な水準です。<br>特に問題はありませんが、<br>より充実した働き方を目指す余地があります。';
        
        const lowCategories = Object.entries(categoryScores)
            .filter(([cat, score]) => score < 60)
            .map(([cat, score]) => cat)
            .slice(0, 3);
        
        if (lowCategories.length > 0) {
            suggestions = `「${lowCategories.join('」「')}」などの分野で<br>改善の機会を探してみることをお勧めします。`;
        } else {
            suggestions = '現状を維持しつつ、<br>さらに満足度を高められる点を探してみましょう。';
        }
    } else if (totalScore >= 50) {
        feedbackClass = 'feedback-caution';
        feedbackTitle = '📊 改善の余地があります';
        feedbackDetail = 'エンゲージメントレベルがやや低めです。<br>いくつかの分野で改善が必要かもしれません。<br>現状に不満を感じている点があるかもしれません。';
        
        const lowCategories = Object.entries(categoryScores)
            .filter(([cat, score]) => score < 55)
            .map(([cat, score]) => cat)
            .slice(0, 3);
        
        if (lowCategories.length > 0) {
            suggestions = `特に「${lowCategories.join('」「')}」について、<br>具体的な改善策を検討することをお勧めします。<br>上司や人事部門に相談してみましょう。`;
        } else {
            suggestions = '職場環境や働き方について、<br>改善できる点を一緒に考えていきましょう。';
        }
    } else {
        feedbackClass = 'feedback-low';
        feedbackTitle = '⚠️ 早急な対応が必要です';
        feedbackDetail = 'エンゲージメントレベルが低い状態にあります。<br>現在の働き方や環境に大きな課題を感じており、<br>モチベーションの維持が難しい状況かもしれません。';
        
        const criticalCategories = Object.entries(categoryScores)
            .filter(([cat, score]) => score < 50)
            .map(([cat, score]) => cat)
            .slice(0, 3);
        
        if (criticalCategories.length > 0) {
            suggestions = `「${criticalCategories.join('」「')}」など、<br>複数の分野で深刻な課題が見られます。<br><strong>できるだけ早く上司や人事部門に相談し、<br>具体的なサポートを受けることを強くお勧めします。</strong>`;
        } else {
            suggestions = '<strong>早急に上司や人事部門に相談し、<br>働き方の改善について話し合うことをお勧めします。</strong>';
        }
    }
    
    feedbackElement.className = feedbackClass;
    feedbackElement.innerHTML = `
        <div style="font-size: 1.3em; font-weight: bold; margin-bottom: 15px;">${feedbackTitle}</div>
        <div style="line-height: 1.8; margin-bottom: 20px;">${feedbackDetail}</div>
        <div style="padding: 20px; background: #f8f9fa; border-radius: 10px; line-height: 1.8;">
            <strong>💡 次のステップ:</strong><br>
            ${suggestions}
        </div>
    `;
}

function saveResultToStorage(totalScore, categoryScores) {
    const results = JSON.parse(localStorage.getItem('surveyResults')) || [];
    
    // ユニークなIDを生成
    const resultId = `${new Date().getTime()}-${employeeCode}`;
    
    const newResult = {
        resultId: resultId,
        date: new Date().toISOString(),
        employeeCode: employeeCode,
        department: selectedDepartment,
        totalScore: totalScore,
        categoryScores: categoryScores,
        answers: { ...answers }
    };
    
    results.push(newResult);
    localStorage.setItem('surveyResults', JSON.stringify(results));
    
    return resultId;
}

// ============================
// 履歴表示
// ============================
function showHistory() {
    showPage('history');
    
    const historyContainer = document.getElementById('history-list');
    if (!historyContainer) return;
    
    const currentCode = normalizeEmployeeCode(localStorage.getItem('employeeCode') || '');
    
    if (!currentCode) {
        historyContainer.innerHTML = '<p style="text-align:center; color:#666;">従業員コードが設定されていません。</p>';
        return;
    }
    
    const allResults = JSON.parse(localStorage.getItem('surveyResults')) || [];
    
    const myResults = allResults.filter(result => {
        const resultCode = normalizeEmployeeCode(result.employeeCode || '');
        return resultCode === currentCode;
    });
    
    if (myResults.length === 0) {
        historyContainer.innerHTML = '<p style="text-align:center; color:#666;">診断履歴がありません。</p>';
        return;
    }
    
    myResults.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    historyContainer.innerHTML = '';
    
    myResults.forEach((result, index) => {
        const date = new Date(result.date);
        const dateStr = `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`;
        
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="history-header">
                <span class="history-date">📅 ${dateStr}</span>
                <span class="history-score">総合スコア: ${result.totalScore}点</span>
            </div>
            <div class="history-detail">
                <span>従業員コード: ${result.employeeCode}</span>
                <span>部署: ${result.department}</span>
            </div>
        `;
        
        // クリックで結果を再表示
        historyItem.addEventListener('click', () => {
            setResultIdToURL(result.resultId);
            loadResultFromURL();
        });
        
        historyContainer.appendChild(historyItem);
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================
// その他の機能
// ============================
function printResults() {
    window.print();
}

function completeSurvey() {
    if (confirm('診断を完了してトップページに戻りますか？')) {
        currentCategoryIndex = 0;
        answers = {};
        employeeCode = '';
        selectedDepartment = '';
        clearTemporaryAnswers();
        
        // URLパラメータをクリア
        window.history.pushState({}, '', window.location.pathname);
        
        showPage('home');
    }
}

// ============================
// 初期化
// ============================
document.addEventListener('DOMContentLoaded', function() {
    initPages();
    
    // URLパラメータから結果を復元
    const loaded = loadResultFromURL();
    
    if (!loaded) {
        showPage('home');
    }
});
