// エンゲージメント診断アプリケーション - 最終確定版v3（重複・曖昧さ完全排除）

// グローバル変数
let currentPage = 1;
let currentCategory = 0;
const totalPages = 10;
const questionsPerPage = 10;
let answers = {};
let categoryScores = [];
let totalScore = 0;

// カテゴリー名定義（最終確定版）
const categories = [
    '心身の健康',
    '仕事の充実感',
    '成長機会',
    '上司のサポート',
    '職場の人間関係',
    '評価・承認',
    '働きやすさ',
    '仕事の負荷',
    '組織への信頼',
    '会社への愛着・帰属意識'
];

// 質問データ（最終確定版100問・重複排除・曖昧さ解消）
const questions = [
    // カテゴリー1: 心身の健康
    { id: 1, category: 0, text: '仕事によるストレスを適切にコントロールできている' },
    { id: 2, category: 0, text: '心身ともに健康な状態で働けている' },
    { id: 3, category: 0, text: '仕事とプライベートのバランスが保てている' },
    { id: 4, category: 0, text: '十分な睡眠時間を確保できている' },
    { id: 5, category: 0, text: '体調不良や疲労が溜まっていない' },
    { id: 6, category: 0, text: '休日に十分リフレッシュできている' },
    { id: 7, category: 0, text: '仕事のことを考えすぎて休めないことがない' },
    { id: 8, category: 0, text: '職場で心理的な安全性を感じている' },
    { id: 9, category: 0, text: '困ったときに相談できる人がいる' },
    { id: 10, category: 0, text: '自分の価値観や考え方が職場で受け入れられている' },

    // カテゴリー2: 仕事の充実感
    { id: 11, category: 1, text: '今の仕事にやりがいを感じている' },
    { id: 12, category: 1, text: '自分の仕事が会社の目標達成に貢献していると感じる' },
    { id: 13, category: 1, text: '仕事を通じて達成感を得られている' },
    { id: 14, category: 1, text: '自分の強みを活かせる仕事ができている' },
    { id: 15, category: 1, text: '仕事の内容に興味・関心を持てている' },
    { id: 16, category: 1, text: '担当している業務の目的や意義を理解している' },
    { id: 17, category: 1, text: '自分の仕事が顧客や社会に価値を提供していると感じる' },
    { id: 18, category: 1, text: '仕事を通じて自己実現できていると感じる' },
    { id: 19, category: 1, text: '毎日の仕事に前向きに取り組めている' },
    { id: 20, category: 1, text: '仕事を通じて自分の可能性を広げられていると感じる' },

    // カテゴリー3: 成長機会
    { id: 21, category: 2, text: '自分の成長を実感できている' },
    { id: 22, category: 2, text: '新しい知識やスキルを習得する機会がある' },
    { id: 23, category: 2, text: 'キャリアアップの道筋が明確になっている' },
    { id: 24, category: 2, text: '業務を通じて新しいスキルを習得できている' },
    { id: 25, category: 2, text: '自己啓発のための支援制度が整っている' },
    { id: 26, category: 2, text: '上司や先輩から学ぶ機会が十分にある' },
    { id: 27, category: 2, text: '自分の希望するキャリアパスを実現できる環境がある' },
    { id: 28, category: 2, text: '専門性を高めるための研修や教育機会がある' },
    { id: 29, category: 2, text: '失敗を恐れず新しい挑戦ができる環境がある' },
    { id: 30, category: 2, text: '自分の成長に必要なフィードバックを受けられている' },

    // カテゴリー4: 上司のサポート
    { id: 31, category: 3, text: '上司は部下の意見を尊重してくれる' },
    { id: 32, category: 3, text: '上司から適切なフィードバックをもらえている' },
    { id: 33, category: 3, text: '上司は部下の成長を支援してくれる' },
    { id: 34, category: 3, text: '上司とのコミュニケーションは円滑である' },
    { id: 35, category: 3, text: '上司は部下の仕事を適切に評価してくれる' },
    { id: 36, category: 3, text: '上司に相談しやすい雰囲気がある' },
    { id: 37, category: 3, text: '上司は部下の業務負荷を理解してくれている' },
    { id: 38, category: 3, text: '上司から明確な指示や方向性を示してもらえる' },
    { id: 39, category: 3, text: '上司は部下のキャリア形成を支援してくれる' },
    { id: 40, category: 3, text: '上司は部下の強みを理解し活かそうとしてくれる' },

    // カテゴリー5: 職場の人間関係
    { id: 41, category: 4, text: '職場の人間関係は良好である' },
    { id: 42, category: 4, text: '同僚と協力して仕事を進められている' },
    { id: 43, category: 4, text: '職場でお互いに助け合う文化がある' },
    { id: 44, category: 4, text: 'チーム内で情報共有が適切に行われている' },
    { id: 45, category: 4, text: '職場に信頼できる同僚がいる' },
    { id: 46, category: 4, text: '他部署との連携がスムーズである' },
    { id: 47, category: 4, text: '職場で自分の意見を率直に言える雰囲気がある' },
    { id: 48, category: 4, text: '職場に対人トラブルやハラスメントがない' },
    { id: 49, category: 4, text: 'チーム全体で同じ目標に向かって進んでいる' },
    { id: 50, category: 4, text: '職場で孤立感を感じることがない' },

    // カテゴリー6: 評価・承認
    { id: 51, category: 5, text: '自分の仕事ぶりが適切に評価されている' },
    { id: 52, category: 5, text: '頑張った成果が正当に認められている' },
    { id: 53, category: 5, text: '評価基準が明確で納得できる' },
    { id: 54, category: 5, text: '給与や待遇は自分の貢献に見合っていると感じる' },
    { id: 55, category: 5, text: '上司や同僚から感謝の言葉をもらえている' },
    { id: 56, category: 5, text: '自分の努力が周囲に認められていると感じる' },
    { id: 57, category: 5, text: '昇進や昇給の機会が公平に与えられている' },
    { id: 58, category: 5, text: '目標達成時に適切な評価や報酬が得られる' },
    { id: 59, category: 5, text: '評価面談で納得のいく説明を受けられている' },
    { id: 60, category: 5, text: '自分の貢献が組織全体で認知されている' },

    // カテゴリー7: 働きやすさ
    { id: 61, category: 6, text: '職場環境は快適である' },
    { id: 62, category: 6, text: '必要な設備やツールが整っている' },
    { id: 63, category: 6, text: '柔軟な働き方（リモートワーク等）ができる' },
    { id: 64, category: 6, text: '通勤時間や勤務時間に無理がない' },
    { id: 65, category: 6, text: '休暇を取りやすい雰囲気がある' },
    { id: 66, category: 6, text: '業務に必要な情報やデータにアクセスしやすい' },
    { id: 67, category: 6, text: '社内の制度や福利厚生が充実している' },
    { id: 68, category: 6, text: '職場の安全衛生管理が適切に行われている' },
    { id: 69, category: 6, text: '業務効率を高めるための仕組みや工夫がある' },
    { id: 70, category: 6, text: '育児や介護との両立支援制度が整っている' },

    // カテゴリー8: 仕事の負荷
    { id: 71, category: 7, text: '業務量は適切である' },
    { id: 72, category: 7, text: '残業時間は妥当な範囲に収まっている' },
    { id: 73, category: 7, text: '業務の優先順位が明確になっている' },
    { id: 74, category: 7, text: '業務の締め切りに余裕を持って取り組めている' },
    { id: 75, category: 7, text: '業務の役割分担が適切に行われている' },
    { id: 76, category: 7, text: '過度なプレッシャーを感じることなく働けている' },
    { id: 77, category: 7, text: '一人で抱え込まず業務を分担できている' },
    { id: 78, category: 7, text: '緊急対応や突発的な業務が少ない' },
    { id: 79, category: 7, text: '自分の能力に見合った業務を任されている' },
    { id: 80, category: 7, text: '業務の計画や見通しを立てやすい環境がある' },

    // カテゴリー9: 組織への信頼
    { id: 81, category: 8, text: '会社の経営方針に共感できる' },
    { id: 82, category: 8, text: '会社のビジョンや目標が明確に示されている' },
    { id: 83, category: 8, text: '会社の将来性に期待が持てる' },
    { id: 84, category: 8, text: '経営層と現場のコミュニケーションが取れている' },
    { id: 85, category: 8, text: '会社の意思決定プロセスが透明である' },
    { id: 86, category: 8, text: '会社は従業員の意見を尊重してくれる' },
    { id: 87, category: 8, text: '会社の理念や価値観に共感できる' },
    { id: 88, category: 8, text: '会社の経営状況や業績が適切に共有されている' },
    { id: 89, category: 8, text: '会社は社会的責任を果たしていると感じる' },
    { id: 90, category: 8, text: '会社の変革や改善の取り組みを信頼できる' },

    // カテゴリー10: 会社への愛着・帰属意識
    { id: 91, category: 9, text: 'この会社の働き方は自分に合っている' },
    { id: 92, category: 9, text: 'この会社で働くことを家族や友人に勧めたい' },
    { id: 93, category: 9, text: 'この会社で長く働き続けたいと思う' },
    { id: 94, category: 9, text: 'この会社の一員であることに誇りを持っている' },
    { id: 95, category: 9, text: 'この会社の成長や成功に貢献したいと思う' },
    { id: 96, category: 9, text: 'この会社はこれからも存続していくと思える' },
    { id: 97, category: 9, text: '他社からオファーがあっても今の会社に留まりたい' },
    { id: 98, category: 9, text: 'この会社の一体感を感じている' },
    { id: 99, category: 9, text: 'この会社の企業文化や雰囲気が好きである' },
    { id: 100, category: 9, text: 'この会社で自分のキャリアを築いていきたい' }
];

// ページ表示制御
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

// オリエンテーション完了
function completeOrientation() {
    showPage('department-selection');
}

// 従業員コード・部署を保存して診断開始
function saveDepartmentAndStart() {
    const employeeCode = document.getElementById('employee-code').value.trim();
    const department = document.getElementById('department').value;
    
    if (!employeeCode) {
        alert('従業員コードを入力してください。');
        return;
    }
    
    if (!department) {
        alert('所属部署を選択してください。');
        return;
    }
    
    // ローカルストレージに保存
    localStorage.setItem('employeeCode', employeeCode);
    localStorage.setItem('department', department);
    
    // 診断ページへ遷移
    startSurvey();
}

// 診断開始
function startSurvey() {
    currentCategory = 0;
    answers = {};
    
    // 以前の回答を復元
    const savedAnswers = localStorage.getItem('surveyAnswers');
    if (savedAnswers) {
        answers = JSON.parse(savedAnswers);
    }
    
    showPage('survey');
    renderCategory();
    updateProgress();
}

// カテゴリー表示
function renderCategory() {
    const container = document.getElementById('questions-container');
    const categoryQuestions = questions.filter(q => q.category === currentCategory);
    
    container.innerHTML = '';
    
    categoryQuestions.forEach(question => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-item';
        
        questionDiv.innerHTML = `
            <p class="question-text">${question.text}</p>
            <div class="options">
                <label class="option-label">
                    <input type="radio" name="q${question.id}" value="5" ${answers[question.id] == 5 ? 'checked' : ''}>
                    <span>強くそう思う</span>
                </label>
                <label class="option-label">
                    <input type="radio" name="q${question.id}" value="4" ${answers[question.id] == 4 ? 'checked' : ''}>
                    <span>そう思う</span>
                </label>
                <label class="option-label">
                    <input type="radio" name="q${question.id}" value="3" ${answers[question.id] == 3 ? 'checked' : ''}>
                    <span>どちらでもない</span>
                </label>
                <label class="option-label">
                    <input type="radio" name="q${question.id}" value="2" ${answers[question.id] == 2 ? 'checked' : ''}>
                    <span>そう思わない</span>
                </label>
                <label class="option-label">
                    <input type="radio" name="q${question.id}" value="1" ${answers[question.id] == 1 ? 'checked' : ''}>
                    <span>全くそう思わない</span>
                </label>
            </div>
        `;
        
        // 回答変更時に保存
        const radios = questionDiv.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.addEventListener('change', () => {
                answers[question.id] = parseInt(radio.value);
                localStorage.setItem('surveyAnswers', JSON.stringify(answers));
                updateProgress();
            });
        });
        
        container.appendChild(questionDiv);
    });
    
    // ナビゲーションボタン制御
    document.getElementById('prev-btn').style.display = currentCategory === 0 ? 'none' : 'inline-block';
    document.getElementById('next-btn').textContent = currentCategory === totalPages - 1 ? '結果を見る' : '次のセクションへ';
}

// 進捗更新
function updateProgress() {
    const totalQuestions = questions.length;
    const answeredCount = Object.keys(answers).length;
    const percentage = (answeredCount / totalQuestions) * 100;
    
    document.getElementById('progress-fill').style.width = percentage + '%';
    document.getElementById('progress-text').textContent = `セクション ${currentCategory + 1} / ${totalPages}`;
    
    const categoryQuestions = questions.filter(q => q.category === currentCategory);
    const categoryAnswered = categoryQuestions.filter(q => answers[q.id]).length;
    document.getElementById('category-progress-text').textContent = `${categoryAnswered} / ${categoryQuestions.length} 問回答済み`;
}

// 次のカテゴリー
function nextCategory() {
    const categoryQuestions = questions.filter(q => q.category === currentCategory);
    const unanswered = categoryQuestions.filter(q => !answers[q.id]);
    
    if (unanswered.length > 0) {
        alert(`このセクションの未回答の質問が ${unanswered.length} 問あります。`);
        return;
    }
    
    if (currentCategory < totalPages - 1) {
        currentCategory++;
        renderCategory();
        updateProgress();
        window.scrollTo(0, 0);
    } else {
        calculateResults();
    }
}

// 前のカテゴリー
function previousCategory() {
    if (currentCategory > 0) {
        currentCategory--;
        renderCategory();
        updateProgress();
        window.scrollTo(0, 0);
    }
}

// 結果計算
function calculateResults() {
    categoryScores = [];
    totalScore = 0;
    
    for (let i = 0; i < totalPages; i++) {
        const categoryQuestions = questions.filter(q => q.category === i);
        const categoryTotal = categoryQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
        const categoryMax = categoryQuestions.length * 5;
        const categoryScore = Math.round((categoryTotal / categoryMax) * 100);
        
        categoryScores.push({
            name: categories[i],
            score: categoryScore
        });
        
        totalScore += categoryTotal;
    }
    
    totalScore = Math.round((totalScore / (questions.length * 5)) * 100);
    
    displayResults();
}

// 結果表示
function displayResults() {
    showPage('results');
    
    // 基本情報表示
    document.getElementById('employee-code-display').textContent = localStorage.getItem('employeeCode') || '-';
    document.getElementById('department-display').textContent = localStorage.getItem('department') || '-';
    document.getElementById('survey-date-display').textContent = new Date().toLocaleDateString('ja-JP');
    
    // 総合スコア
    document.getElementById('total-score').textContent = totalScore;
    
    // カテゴリー別スコア
    const scoresContainer = document.getElementById('category-scores');
    scoresContainer.innerHTML = '';
    
    categoryScores.forEach(cat => {
        const scoreDiv = document.createElement('div');
        scoreDiv.className = 'category-score-item';
        scoreDiv.innerHTML = `
            <span class="category-name">${cat.name}</span>
            <span class="category-score">${cat.score}点</span>
        `;
        scoresContainer.appendChild(scoreDiv);
    });
    
    // レーダーチャート
    renderRadarChart();
    
    // フィードバック
    generateFeedback();
    
    // 結果を保存
    saveResults();
}

// レーダーチャート描画
function renderRadarChart() {
    const ctx = document.getElementById('radar-chart').getContext('2d');
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: categoryScores.map(c => c.name),
            datasets: [{
                label: 'スコア',
                data: categoryScores.map(c => c.score),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
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

// フィードバック生成
function generateFeedback() {
    const feedbackDiv = document.getElementById('feedback-text');
    let feedback = '';
    
    if (totalScore >= 80) {
        feedback = '<p>素晴らしい結果です！現在の職場環境に高い満足度を示しています。この状態を維持しながら、さらなる成長を目指しましょう。</p>';
    } else if (totalScore >= 60) {
        feedback = '<p>概ね良好な状態です。いくつかの改善点はありますが、全体的には前向きに働けている環境にあります。</p>';
    } else if (totalScore >= 40) {
        feedback = '<p>改善の余地がある状態です。特にスコアの低いカテゴリーについて、上司や人事と相談することをお勧めします。</p>';
    } else {
        feedback = '<p>早急な改善が必要な状態です。上司や人事担当者に相談し、働く環境の改善について話し合うことを強くお勧めします。</p>';
    }
    
    // 最低スコアのカテゴリーを特定
    const lowestCategory = categoryScores.reduce((min, cat) => cat.score < min.score ? cat : min);
    feedback += `<p><strong>特に注目すべきカテゴリー:</strong> 「${lowestCategory.name}」(${lowestCategory.score}点)</p>`;
    
    feedbackDiv.innerHTML = feedback;
}

// 結果を保存
function saveResults() {
    const result = {
        employeeCode: localStorage.getItem('employeeCode'),
        department: localStorage.getItem('department'),
        date: new Date().toISOString(),
        totalScore: totalScore,
        categoryScores: categoryScores,
        answers: answers
    };
    
    // 履歴に追加
    let history = JSON.parse(localStorage.getItem('surveyHistory') || '[]');
    history.push(result);
    localStorage.setItem('surveyHistory', JSON.stringify(history));
    
    // 回答をクリア
    localStorage.removeItem('surveyAnswers');
    
    // サーバーに送信（重複防止）
    const resultId = `${result.employeeCode}_${result.date}`;
    const submittedResults = JSON.parse(localStorage.getItem('submittedResults') || '[]');
    
    if (!submittedResults.includes(resultId)) {
        submitToServer(result).then(() => {
            submittedResults.push(resultId);
            localStorage.setItem('submittedResults', JSON.stringify(submittedResults));
        });
    }
}

// サーバーに結果送信
async function submitToServer(result) {
    try {
        const response = await fetch('/api/save-result', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result)
        });
        
        if (!response.ok) {
            console.error('結果の送信に失敗しました');
        }
    } catch (error) {
        console.error('サーバーエラー:', error);
    }
}

// 履歴表示
function showHistory() {
    showPage('history');
    
    const history = JSON.parse(localStorage.getItem('surveyHistory') || '[]');
    const historyList = document.getElementById('history-list');
    
    if (history.length === 0) {
        historyList.innerHTML = '<p>診断履歴はありません。</p>';
        return;
    }
    
    historyList.innerHTML = '';
    history.reverse().forEach((record, index) => {
        const recordDiv = document.createElement('div');
        recordDiv.className = 'history-item';
        recordDiv.innerHTML = `
            <h4>診断 ${history.length - index}</h4>
            <p>日付: ${new Date(record.date).toLocaleDateString('ja-JP')}</p>
            <p>総合スコア: ${record.totalScore}点</p>
        `;
        historyList.appendChild(recordDiv);
    });
}

// 印刷
function printResults() {
    window.print();
}

// 診断完了
function completeSurvey() {
    if (confirm('トップページに戻ります。よろしいですか?')) {
        showPage('home');
    }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    showPage('home');
});
