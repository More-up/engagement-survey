// エンゲージメント診断アプリケーション - 最終確定版v4（100問完全版）

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
    '部署内の人間関係',
    '評価・処遇',
    '会社への信頼',
    '働く環境',
    '総合満足度',
    '会社への愛着・帰属意識'
];

// 質問データ（最終確定版100問）
const questions = [
    // カテゴリー1: 心身の健康
    { id: 1, category: 0, text: '毎日、疲れが少なく集中して働けている' },
    { id: 2, category: 0, text: '仕事のストレスをうまく発散できている' },
    { id: 3, category: 0, text: '毎日、十分な睡眠をとれている' },
    { id: 4, category: 0, text: '仕事とプライベートの時間配分に満足している' },
    { id: 5, category: 0, text: '必要な時に休暇を取得できている' },
    { id: 6, category: 0, text: '休日にしっかりリフレッシュできている' },
    { id: 7, category: 0, text: '職場で業務や悩みを相談できる人がいる' },
    { id: 8, category: 0, text: '失敗や苦手なことを恐れず上司や同僚に相談できる' },
    { id: 9, category: 0, text: '体調不良や疲労が蓄積していない' },
    { id: 10, category: 0, text: '自分の価値観や考え方が職場で受け入れられている' },

    // カテゴリー2: 仕事の充実感
    { id: 11, category: 1, text: '今の仕事にやりがいを感じている' },
    { id: 12, category: 1, text: '自分の仕事が会社の目標達成に貢献していると感じる' },
    { id: 13, category: 1, text: '業務をやり終えた時に達成感を感じている' },
    { id: 14, category: 1, text: '自分の強みを活かして仕事ができている' },
    { id: 15, category: 1, text: '担当業務の内容に興味を持って取り組めている' },
    { id: 16, category: 1, text: '担当している業務の目的や意義を理解している' },
    { id: 17, category: 1, text: '自分の判断で業務を進められる範囲がある' },
    { id: 18, category: 1, text: '担当業務の範囲や責任が明確である' },
    { id: 19, category: 1, text: '毎日の仕事に前向きに取り組めている' },
    { id: 20, category: 1, text: '自分の仕事が顧客や社会に役立っていると感じている' },

    // カテゴリー3: 成長機会
    { id: 21, category: 2, text: '昨年と比べて、自分のスキルや知識が向上していると感じる' },
    { id: 22, category: 2, text: '業務に役立つ研修や勉強会に参加できている' },
    { id: 23, category: 2, text: '業務時間内に学習やスキルアップの時間を確保できている' },
    { id: 24, category: 2, text: '業務を通じて実践的なスキルを身につけられている' },
    { id: 25, category: 2, text: '会社は資格取得や学習を支援してくれている' },
    { id: 26, category: 2, text: '会社は将来どのように成長できるか示してくれている' },
    { id: 27, category: 2, text: '自分の希望するキャリアを会社で実現できると思う' },
    { id: 28, category: 2, text: '自分の成長につながる新しい仕事を任されている' },
    { id: 29, category: 2, text: '上司や先輩から業務について教えてもらえている' },
    { id: 30, category: 2, text: '失敗を恐れず挑戦することを後押ししてくれる職場である' },

    // カテゴリー4: 上司のサポート
    { id: 31, category: 3, text: '上司は私の意見を聞いてくれている' },
    { id: 32, category: 3, text: '上司から業務改善につながる具体的なフィードバックを受けている' },
    { id: 33, category: 3, text: '上司は私の成長を支援してくれている' },
    { id: 34, category: 3, text: '上司とのコミュニケーションは円滑である' },
    { id: 35, category: 3, text: '上司は全員に公平に接している' },
    { id: 36, category: 3, text: '上司に相談しやすい雰囲気がある' },
    { id: 37, category: 3, text: '上司は私の仕事の進め方に自主性を認めている' },
    { id: 38, category: 3, text: '上司から期待される役割や成果が明確に伝えられている' },
    { id: 39, category: 3, text: '上司の指示は具体的で理解しやすい' },
    { id: 40, category: 3, text: '上司は私の業務負荷を理解してくれている' },

    // カテゴリー5: 部署内の人間関係
    { id: 41, category: 4, text: '自部署のメンバーを信頼している' },
    { id: 42, category: 4, text: '自部署で協力して仕事を進められている' },
    { id: 43, category: 4, text: '自部署でお互いに助け合う文化がある' },
    { id: 44, category: 4, text: '自部署内で情報共有がスムーズである' },
    { id: 45, category: 4, text: '自部署で自由に意見を言える雰囲気がある' },
    { id: 46, category: 4, text: '他部署との連携がスムーズである' },
    { id: 47, category: 4, text: '自部署のメンバーの役割分担が明確である' },
    { id: 48, category: 4, text: '自部署の目標がメンバー間で共有されている' },
    { id: 49, category: 4, text: '自部署内では、お互いの意見や人格を尊重し合えている' },
    { id: 50, category: 4, text: '自部署で孤立感を感じることがない' },

    // カテゴリー6: 評価・処遇
    { id: 51, category: 5, text: '人事評価基準が明確である' },
    { id: 52, category: 5, text: '人事評価は公平に行われている' },
    { id: 53, category: 5, text: '人事評価面談で前向きな話し合いができている' },
    { id: 54, category: 5, text: '自分への人事評価に納得できている' },
    { id: 55, category: 5, text: '給与や待遇は自分の働きに見合っている' },
    { id: 56, category: 5, text: '成果や努力が給与・昇進に反映されている' },
    { id: 57, category: 5, text: '昇進・昇格の機会は公平である' },
    { id: 58, category: 5, text: '福利厚生制度が生活に役立っている' },
    { id: 59, category: 5, text: '上司や同僚から感謝の言葉をもらえている' },
    { id: 60, category: 5, text: '自分の努力や成果が周囲に認められていると感じる' },

    // カテゴリー7: 会社への信頼
    { id: 61, category: 6, text: '会社のMission・Vision・Valueを理解している' },
    { id: 62, category: 6, text: '会社のMission・Vision・Valueに共感している' },
    { id: 63, category: 6, text: '会社は法令や倫理を守って経営していると感じる' },
    { id: 64, category: 6, text: 'この会社の未来に期待できる' },
    { id: 65, category: 6, text: '経営層から会社方針や業績の情報が定期的に共有されている' },
    { id: 66, category: 6, text: '会社の意思決定の理由を理解できている' },
    { id: 67, category: 6, text: '会社の意思決定プロセスが透明である' },
    { id: 68, category: 6, text: '会社の仕事が社会に役立っていると感じている' },
    { id: 69, category: 6, text: '会社は従業員の意見を聞く体制がある' },
    { id: 70, category: 6, text: '会社の変革や改善の取り組みを信頼できる' },

    // カテゴリー8: 働く環境
    { id: 71, category: 7, text: 'オフィスの設備や環境は快適である' },
    { id: 72, category: 7, text: '業務に必要な設備・ツールが揃っている' },
    { id: 73, category: 7, text: '安全で衛生的な職場環境である' },
    { id: 74, category: 7, text: '在宅勤務など柔軟な働き方ができている' },
    { id: 75, category: 7, text: '業務に集中できる環境が整っている' },
    { id: 76, category: 7, text: '業務に必要な情報やデータにアクセスしやすい' },
    { id: 77, category: 7, text: '業務で使用するITシステムやツールは使いやすい' },
    { id: 78, category: 7, text: '社内の手続きは分かりやすく効率的である' },
    { id: 79, category: 7, text: '会議は目的が明確で効率的に進められている' },
    { id: 80, category: 7, text: '育児や介護など、ライフイベントに配慮した支援制度がある' },

    // カテゴリー9: 総合満足度
    { id: 81, category: 8, text: '今の会社で働くことに満足している' },
    { id: 82, category: 8, text: '仕事に取り組む時に前向きな気持ちを持てている' },
    { id: 83, category: 8, text: '仕事を通じて充実感を得られている' },
    { id: 84, category: 8, text: '今の業務量は適切だと思う' },
    { id: 85, category: 8, text: '会社の方針に納得できている' },
    { id: 86, category: 8, text: '自分の能力を十分に発揮できている' },
    { id: 87, category: 8, text: '今後のキャリア形成に期待できている' },
    { id: 88, category: 8, text: '残業時間は妥当な範囲に収まっている' },
    { id: 89, category: 8, text: '業務の優先順位が明確になっている' },
    { id: 90, category: 8, text: '過度なプレッシャーを感じることなく働けている' },

    // カテゴリー10: 会社への愛着・帰属意識
    { id: 91, category: 9, text: 'この会社の働き方は自分に合っている' },
    { id: 92, category: 9, text: 'この会社で自分の居場所を持てている' },
    { id: 93, category: 9, text: 'この会社の文化や価値観に共感している' },
    { id: 94, category: 9, text: 'この会社で働くことを家族や友人に前向きに話している' },
    { id: 95, category: 9, text: 'この会社で働くことに安心感を持てている' },
    { id: 96, category: 9, text: 'この会社はこれからも存続していくと思える' },
    { id: 97, category: 9, text: 'この会社の一員であることに誇りを持っている' },
    { id: 98, category: 9, text: 'この会社を入社前の自分に勧めたいと思う' },
    { id: 99, category: 9, text: 'この会社では自分の個性を活かして働ける' },
    { id: 100, category: 9, text: 'この会社で長く働き続けたいと思う' }
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
    
    // カテゴリー5の場合、注意書きを表示
    if (currentCategory === 4) {
        const instructionBox = document.createElement('div');
        instructionBox.className = 'category-instruction';
        instructionBox.innerHTML = `
            <div class="instruction-header">
                <span class="instruction-icon">📌</span>
                <strong>重要な注意事項</strong>
            </div>
            <p class="instruction-text">
                ※以下の設問における「自部署」とは、あなたが普段一緒に<br>
                　仕事をしているメンバー(チーム・部署)を指します。
            </p>
        `;
        container.appendChild(instructionBox);
    }
    
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
