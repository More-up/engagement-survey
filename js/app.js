// URLパラメータから会社名を取得
const urlParams = new URLSearchParams(window.location.search);
const companyName = urlParams.get('company') || '未設定';

// API エンドポイント
const API_ENDPOINT = 'https://engagement-survey-api.more-up.workers.dev';

// 10カテゴリーの定義
const categories = [
    "心身の健康",
    "仕事の充実感",
    "成長機会",
    "上司のサポート",
    "部署内の人間関係",
    "評価・処遇",
    "会社への信頼",
    "働く環境",
    "総合満足度",
    "組織へのつながり"
];

// 100問の質問（各カテゴリー10問）
const questions = [
    // カテゴリー1: 心身の健康 (Q1-10)
    "働きながらも、心身の健康を保てていると感じる",
    "仕事のストレスをうまく管理できている",
    "仕事が原因で睡眠不足になることはない",
    "仕事とプライベートの時間配分に満足している",
    "必要な時に休暇を取得できている",
    "休みの日は仕事の疲れをリフレッシュできている",
    "職場で悩みや苦しみを相談できる人がいる",
    "失敗や苦手なことを恐れず上司や同僚に相談できる",
    "仕事の負荷が原因で、体調を崩すことがある",
    "自分の価値観や考え方が職場で受け入れられている",
    
    // カテゴリー2: 仕事の充実感 (Q11-20)
    "今の仕事にやりがいを感じている",
    "自分の仕事が会社の目標達成に貢献していると感じる",
    "仕事を完了した時に達成感を感じている",
    "自分の強みを活かして仕事ができている",
    "担当業務の内容に興味を持って取り組んでいる",
    "担当している業務の目的や意義を理解している",
    "自分の判断で業務を進められる環境がある",
    "担当業務の範囲や責任が明確である",
    "仕事の進め方について、自分なりの工夫や改善ができている",
    "自分の仕事が社会や顧客に役立っていると感じている",
    
    // カテゴリー3: 成長機会 (Q21-30)
    "この1年で、自分のスキルや知識が成長したと感じる",
    "業務に役立つ研修や勉強会に参加できている",
    "業務時間内に学習やスキルアップの時間を確保できている",
    "業務を通じて実践的なスキルを身につけられている",
    "会社は資格取得や学習を支援してくれている",
    "会社は私が将来どのように成長できるか示してくれている",
    "自分の希望するキャリアを会社で実現できると思う",
    "自分の成長につながる新しい仕事を任されている",
    "上司や先輩から業務について教えてもらえている",
    "失敗を恐れず挑戦することを後押ししてくれる職場である",
    
    // カテゴリー4: 上司のサポート (Q31-40)
    "上司は私の意見を聞いてくれている",
    "上司から業務改善につながる具体的なフィードバックを受けている",
    "上司は私の成長を支援してくれている",
    "上司とのコミュニケーションは円滑である",
    "上司は全員に公平に接している",
    "上司に相談しやすい雰囲気がある",
    "上司は私の仕事の進め方に自主性を認めている",
    "上司は業務を円滑に進められるよう支援している",
    "上司の指示は具体的で理解しやすい",
    "上司は私に任せる仕事の範囲と責任を明確に示している",
    
    // カテゴリー5: 部署内の人間関係 (Q41-50)
    "自部署のメンバーを信頼している",
    "自部署で協力して仕事を進められている",
    "自部署でお互いに助け合う雰囲気がある",
    "自部署内で情報共有がスムーズである",
    "自部署で自由に意見を述べる雰囲気がある",
    "自部署と他部署の連携がスムーズであると感じる",
    "自部署のメンバーの役割分担が明確である",
    "自部署の目標がメンバー間で共有されている",
    "自部署で意見の違いがあっても建設的に対話ができている",
    "自部署内の人間関係は業務に支障をきたしていない",
    
    // カテゴリー6: 評価・処遇 (Q51-60)
    "人事評価基準が明確である",
    "人事評価は公平に行われている",
    "人事評価面談で前向きな話し合いができている",
    "自分への人事評価に納得できている",
    "給与や待遇は自分の働きに見合っている",
    "成果や努力が給与の決定に反映されている",
    "昇進・昇格の機会は公平である",
    "福利厚生制度が生活に役立っている",
    "上司から評価について丁寧なフィードバックを受けている",
    "自分の努力や成果が組織に認められていると感じる",
    
    // カテゴリー7: 会社への信頼 (Q61-70)
    "会社のMission・Vision・Valueを理解している",
    "会社のMission・Vision・Valueに共感している",
    "会社は法令や倫理を守って経営していると感じる",
    "この会社の未来に期待できる",
    "経営層から会社方針や戦略の情報が定期的に共有されている",
    "会社の重要な決定の背景や理由と、自部署への影響を理解している",
    "会社は、重要な決定の背景や理由と、自部署への影響を明確に説明している",
    "会社の仕事が社会に役立っていると感じている",
    "会社は従業員の意見を聞く体制がある",
    "会社の変革や改善の取り組みを信頼できる",
    
    // カテゴリー8: 働く環境 (Q71-80)
    "オフィスの設備や環境は快適である",
    "業務に必要な設備やツールが揃っている",
    "安全で衛生的な職場環境である",
    "在宅勤務など柔軟な働き方ができている",
    "業務に集中できる環境が整っている",
    "業務に必要な情報やデータにアクセスしやすい",
    "業務で使用するITシステムやツールは使いやすい",
    "社内の手続きは分かりやすく効率的である",
    "会議は目的が明確で効率的に進められている",
    "育児や介護など、ライフイベントに配慮した支援制度がある",
    
    // カテゴリー9: 総合満足度 (Q81-90)
    "今の会社で働くことに満足している",
    "仕事に取り組む時に前向きな気持ちを持てている",
    "今の職場環境は、自分の働きやすさに配慮されている",
    "今の業務量は適切だと思う",
    "会社の将来性に期待を持てている",
    "自分の能力を十分に発揮できている",
    "今後のキャリア形成に期待できている",
    "勤務時間は妥当な範囲に収まっている",
    "業務の責任範囲が明確になっている",
    "過度なプレッシャーを感じることなく働けている",
    
    // カテゴリー10: 組織へのつながり (Q91-100)
    "この会社の働き方は自分に合っている",
    "この会社で自分の居場所を持てている",
    "この会社の文化や価値観に共感している",
    "この会社で働くことを家族や友人に前向きに話している",
    "この会社で働くことに安心感を持てている",
    "この会社はこれからも存続していくと思える",
    "この会社の一員であることに誇りを持っている",
    "この会社を入社前の自分に勧めたいと思う",
    "この会社では自分の個性を活かして働ける",
    "この会社で長く働き続けたいと思う"
];

// グローバル変数
let currentSection = 0; // 現在のセクション (0-9)
let answers = {}; // {questionIndex: score} の形式で保存
let employeeCode = '';
let department = '';
let gender = '';

// ページ遷移関数
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0, 0);
}

// 基本情報の保存と診断開始
function saveDepartmentAndStart() {
    employeeCode = document.getElementById('employee-code').value.trim();
    department = document.getElementById('department').value;
    gender = document.getElementById('gender').value;
    
    if (!employeeCode || !department || !gender) {
        alert('全ての項目を入力してください');
        return;
    }
    
    showPage('survey-page');
    loadSection(0);
}

// セクションの読み込み (10問ずつ表示)
function loadSection(sectionIndex) {
    currentSection = sectionIndex;
    const startQ = sectionIndex * 10;
    const endQ = startQ + 10;
    
    const container = document.getElementById('questions-container');
    container.innerHTML = '';
    
    // カテゴリーヘッダーを更新
    const categoryHeader = document.querySelector('#category-header-fixed h2');
    categoryHeader.textContent = `カテゴリー${sectionIndex + 1}: ${categories[sectionIndex]}`;
    
    // カテゴリー5 (Q41-50) の注釈表示
    let categoryNote = document.querySelector('.category-note');
    if (categoryNote) categoryNote.remove();
    
    if (sectionIndex === 4) { // カテゴリー5
        const noteDiv = document.createElement('div');
        noteDiv.className = 'category-note';
        noteDiv.innerHTML = '<p>※以下の設問における「自部署」とは、あなたが普段一緒に仕事をしているメンバー(チーム・部署)を指します。</p>';
        container.before(noteDiv);
    }
    
    // 各質問をレンダリング
    for (let i = startQ; i < endQ; i++) {
        const questionBlock = document.createElement('div');
        questionBlock.className = 'question-block';
        questionBlock.id = `question-${i}`;
        
        const questionNum = i + 1;
        const questionText = document.createElement('div');
        questionText.className = 'question-text';
        questionText.textContent = `Q${questionNum}. ${questions[i]}`;
        
        const answerOptions = document.createElement('div');
        answerOptions.className = 'answer-options';
        
        for (let score = 1; score <= 5; score++) {
            const label = document.createElement('label');
            label.className = 'answer-option';
            
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question${i}`;
            input.value = score;
            if (answers[i] === score) {
                input.checked = true;
            }
            input.addEventListener('change', () => {
                answers[i] = parseInt(score);
                updateProgressBar();
                autoScrollToNext(i);
            });
            
            const span = document.createElement('span');
            span.textContent = `${score}`;
            
            label.appendChild(input);
            label.appendChild(span);
            answerOptions.appendChild(label);
        }
        
        questionBlock.appendChild(questionText);
        questionBlock.appendChild(answerOptions);
        container.appendChild(questionBlock);
    }
    
    // 進捗バーの更新
    updateProgressBar();
    
    // ボタンの表示制御
    document.getElementById('prev-btn').style.display = sectionIndex > 0 ? 'inline-block' : 'none';
    document.getElementById('next-btn').textContent = sectionIndex < 9 ? '次のセクション' : '結果を見る';
    
    // ページトップにスクロール
    window.scrollTo(0, 0);
}

// 自動スクロール機能
function autoScrollToNext(currentQuestionIndex) {
    const startQ = currentSection * 10;
    const endQ = startQ + 10;
    const nextQuestionIndex = currentQuestionIndex + 1;
    
    // 現在のセクション内に次の質問がある場合
    if (nextQuestionIndex < endQ) {
        setTimeout(() => {
            const nextQuestion = document.getElementById(`question-${nextQuestionIndex}`);
            if (nextQuestion) {
                const headerHeight = 230; // 固定ヘッダーの高さ
                const elementPosition = nextQuestion.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerHeight - 20; // 20pxの余白
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 300);
    }
}

// 進捗バーの更新
function updateProgressBar() {
    const answeredCount = Object.keys(answers).filter(key => key >= 0 && key < 100).length;
    const progressPercentage = Math.min(100, Math.round((answeredCount / 100) * 100));
    document.getElementById('progress-fill').style.width = progressPercentage + '%';
    document.getElementById('progress-percentage').textContent = progressPercentage + '%';
}

// 次のセクション
function nextSection() {
    // 現在のセクションの回答チェック
    const startQ = currentSection * 10;
    const endQ = startQ + 10;
    
    for (let i = startQ; i < endQ; i++) {
        if (!answers[i]) {
            alert('全ての質問に回答してください');
            return;
        }
    }
    
    if (currentSection < 9) {
        loadSection(currentSection + 1);
    } else {
        showResult();
    }
}

// 前のセクション
function previousSection() {
    if (currentSection > 0) {
        loadSection(currentSection - 1);
    }
}

// 結果の表示
function showResult() {
    // カテゴリー別スコアの計算 (50点満点 → 100点満点に変換)
    const categoryScores = [];
    for (let i = 0; i < 10; i++) {
        const startQ = i * 10;
        const endQ = startQ + 10;
        let sum = 0;
        for (let j = startQ; j < endQ; j++) {
            sum += answers[j];
        }
        const score = Math.round((sum / 50) * 100); // 50点満点を100点満点に変換
        categoryScores.push(score);
    }
    
    // 総合スコアの計算 (500点満点)
    const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
    
    showPage('result-page');
    
    document.getElementById('total-score').textContent = totalScore;
    
    // レーダーチャートの描画
    drawRadarChart(categoryScores);
    
    // カテゴリー別結果の表示
    displayCategoryResults(categoryScores);
    
    // フィードバックの表示
    displayFeedback(categoryScores);
    
    // API送信
    submitResults(totalScore, categoryScores);
}

// レーダーチャートの描画
function drawRadarChart(scores) {
    const ctx = document.getElementById('radarChart');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: categories,
            datasets: [{
                label: 'あなたのスコア',
                data: scores,
                backgroundColor: 'rgba(93, 173, 226, 0.2)',
                borderColor: 'rgba(93, 173, 226, 1)',
                pointBackgroundColor: 'rgba(93, 173, 226, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(93, 173, 226, 1)'
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: { stepSize: 20 }
                }
            }
        }
    });
}

// カテゴリー別結果の表示
function displayCategoryResults(scores) {
    const container = document.getElementById('category-results');
    container.innerHTML = '<h2>カテゴリー別スコア</h2>';
    
    scores.forEach((score, index) => {
        const item = document.createElement('div');
        item.className = 'category-score-item';
        item.innerHTML = `
            <h3>${categories[index]}</h3>
            <div class="score-bar">
                <div class="score-fill" style="width: ${score}%"></div>
            </div>
            <p>${score} / 100点</p>
        `;
        container.appendChild(item);
    });
}

// フィードバックの表示
function displayFeedback(scores) {
    const container = document.getElementById('feedback-section');
    container.innerHTML = '<h2>改善提案</h2>';
    
    const sortedCategories = scores.map((score, index) => ({score, index}))
        .sort((a, b) => a.score - b.score)
        .slice(0, 3);
    
    sortedCategories.forEach(({score, index}) => {
        const level = score >= 70 ? '良好' : score >= 50 ? '普通' : '要改善';
        const levelClass = score >= 70 ? 'feedback-good' : score >= 50 ? 'feedback-normal' : 'feedback-warning';
        
        const item = document.createElement('div');
        item.innerHTML = `
            <h3 class="${levelClass}">${categories[index]}（${score}点）- ${level}</h3>
            <p>このカテゴリーのスコア向上に向けて、上司や人事部門と具体的な改善策を検討しましょう。</p>
        `;
        container.appendChild(item);
    });
}

// APIに結果を送信
function submitResults(totalScore, categoryScores) {
    const categoryScoresObj = {};
    categories.forEach((cat, index) => {
        categoryScoresObj[cat] = categoryScores[index];
    });
    
    const now = new Date();
    const yearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const surveyDate = now.toISOString().split('T')[0];
    
    const data = {
        companyCode: companyName,
        employeeCode: employeeCode,
        department: department,
        gender: gender,
        yearMonth: yearMonth,
        surveyDate: surveyDate,
        totalScore: totalScore,
        categoryScores: categoryScoresObj,
        answers: answers
    };
    
    fetch(`${API_ENDPOINT}/api/survey/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => console.log('診断結果を送信しました:', result))
    .catch(error => console.error('送信エラー:', error));
}
