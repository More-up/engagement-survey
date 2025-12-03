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
// ===================================
const questions = [
    // カテゴリー1: 心身の健康 (Q1-10)
    { id: 1, categoryId: 1, text: "働きながらも、心身の健康を保てていると感じる" },
    { id: 2, categoryId: 1, text: "仕事のストレスをうまく管理できている" },
    { id: 3, categoryId: 1, text: "仕事が原因で睡眠不足になることはない" },
    { id: 4, categoryId: 1, text: "仕事とプライベートの時間配分に満足している" },
    { id: 5, categoryId: 1, text: "必要な時に休暇を取得できている" },
    { id: 6, categoryId: 1, text: "休みの日は仕事の疲れをリフレッシュできている" },
    { id: 7, categoryId: 1, text: "職場で悩みや苦しみを相談できる人がいる" },
    { id: 8, categoryId: 1, text: "失敗や苦手なことを恐れず上司や同僚に相談できる" },
    { id: 9, categoryId: 1, text: "仕事の負荷が原因で、体調を崩すことがある" },
    { id: 10, categoryId: 1, text: "自分の価値観や考え方が職場で受け入れられている" },

    // カテゴリー2: 仕事の充実感 (Q11-20)
    { id: 11, categoryId: 2, text: "今の仕事にやりがいを感じている" },
    { id: 12, categoryId: 2, text: "自分の仕事が会社の目標達成に貢献していると感じる" },
    { id: 13, categoryId: 2, text: "仕事を完了した時に達成感を感じている" },
    { id: 14, categoryId: 2, text: "自分の強みを活かして仕事ができている" },
    { id: 15, categoryId: 2, text: "担当業務の内容に興味を持って取り組んでいる" },
    { id: 16, categoryId: 2, text: "担当している業務の目的や意義を理解している" },
    { id: 17, categoryId: 2, text: "自分の判断で業務を進められる環境がある" },
    { id: 18, categoryId: 2, text: "担当業務の範囲や責任が明確である" },
    { id: 19, categoryId: 2, text: "仕事の進め方について、自分なりの工夫や改善ができている" },
    { id: 20, categoryId: 2, text: "自分の仕事が社会や顧客に役立っていると感じている" },

    // カテゴリー3: 成長機会 (Q21-30)
    { id: 21, categoryId: 3, text: "この1年で、自分のスキルや知識が成長したと感じる" },
    { id: 22, categoryId: 3, text: "業務に役立つ研修や勉強会に参加できている" },
    { id: 23, categoryId: 3, text: "業務時間内に学習やスキルアップの時間を確保できている" },
    { id: 24, categoryId: 3, text: "業務を通じて実践的なスキルを身につけられている" },
    { id: 25, categoryId: 3, text: "会社は資格取得や学習を支援してくれている" },
    { id: 26, categoryId: 3, text: "会社は私が将来どのように成長できるか示してくれている" },
    { id: 27, categoryId: 3, text: "自分の希望するキャリアを会社で実現できると思う" },
    { id: 28, categoryId: 3, text: "自分の成長につながる新しい仕事を任されている" },
    { id: 29, categoryId: 3, text: "上司や先輩から業務について教えてもらえている" },
    { id: 30, categoryId: 3, text: "失敗を恐れず挑戦することを後押ししてくれる職場である" },

    // カテゴリー4: 上司のサポート (Q31-40)
    { id: 31, categoryId: 4, text: "上司は私の意見を聞いてくれている" },
    { id: 32, categoryId: 4, text: "上司から業務改善につながる具体的なフィードバックを受けている" },
    { id: 33, categoryId: 4, text: "上司は私の成長を支援してくれている" },
    { id: 34, categoryId: 4, text: "上司とのコミュニケーションは円滑である" },
    { id: 35, categoryId: 4, text: "上司は全員に公平に接している" },
    { id: 36, categoryId: 4, text: "上司に相談しやすい雰囲気がある" },
    { id: 37, categoryId: 4, text: "上司は私の仕事の進め方に自主性を認めている" },
    { id: 38, categoryId: 4, text: "上司は業務を円滑に進められるよう支援している" },
    { id: 39, categoryId: 4, text: "上司の指示は具体的で理解しやすい" },
    { id: 40, categoryId: 4, text: "上司は私に任せる仕事の範囲と責任を明確に示している" },

    // カテゴリー5: 部署内の人間関係 (Q41-50)
    { id: 41, categoryId: 5, text: "自部署のメンバーを信頼している" },
    { id: 42, categoryId: 5, text: "自部署で協力して仕事を進められている" },
    { id: 43, categoryId: 5, text: "自部署でお互いに助け合う雰囲気がある" },
    { id: 44, categoryId: 5, text: "自部署内で情報共有がスムーズである" },
    { id: 45, categoryId: 5, text: "自部署で自由に意見を述べる雰囲気がある" },
    { id: 46, categoryId: 5, text: "自部署と他部署の連携がスムーズであると感じる" },
    { id: 47, categoryId: 5, text: "自部署のメンバーの役割分担が明確である" },
    { id: 48, categoryId: 5, text: "自部署の目標がメンバー間で共有されている" },
    { id: 49, categoryId: 5, text: "自部署で意見の違いがあっても建設的に対話ができている" },
    { id: 50, categoryId: 5, text: "自部署内の人間関係は業務に支障をきたしていない" },

    // カテゴリー6: 評価・処遇 (Q51-60)
    { id: 51, categoryId: 6, text: "人事評価基準が明確である" },
    { id: 52, categoryId: 6, text: "人事評価は公平に行われている" },
    { id: 53, categoryId: 6, text: "人事評価面談で前向きな話し合いができている" },
    { id: 54, categoryId: 6, text: "自分への人事評価に納得できている" },
    { id: 55, categoryId: 6, text: "給与や待遇は自分の働きに見合っている" },
    { id: 56, categoryId: 6, text: "成果や努力が給与の決定に反映されている" },
    { id: 57, categoryId: 6, text: "昇進・昇格の機会は公平である" },
    { id: 58, categoryId: 6, text: "福利厚生制度が生活に役立っている" },
    { id: 59, categoryId: 6, text: "上司から評価について丁寧なフィードバックを受けている" },
    { id: 60, categoryId: 6, text: "自分の努力や成果が組織に認められていると感じる" },

    // カテゴリー7: 会社への信頼 (Q61-70)
    { id: 61, categoryId: 7, text: "会社のMission・Vision・Valueを理解している" },
    { id: 62, categoryId: 7, text: "会社のMission・Vision・Valueに共感している" },
    { id: 63, categoryId: 7, text: "会社は法令や倫理を守って経営していると感じる" },
    { id: 64, categoryId: 7, text: "この会社の未来に期待できる" },
    { id: 65, categoryId: 7, text: "経営層から会社方針や戦略の情報が定期的に共有されている" },
    { id: 66, categoryId: 7, text: "会社の重要な決定の背景や理由と、自部署への影響を理解している" },
    { id: 67, categoryId: 7, text: "会社は、重要な決定の背景や理由と、自部署への影響を明確に説明している" },
    { id: 68, categoryId: 7, text: "会社の仕事が社会に役立っていると感じている" },
    { id: 69, categoryId: 7, text: "会社は従業員の意見を聞く体制がある" },
    { id: 70, categoryId: 7, text: "会社の変革や改善の取り組みを信頼できる" },

    // カテゴリー8: 働く環境 (Q71-80)
    { id: 71, categoryId: 8, text: "オフィスの設備や環境は快適である" },
    { id: 72, categoryId: 8, text: "業務に必要な設備やツールが揃っている" },
    { id: 73, categoryId: 8, text: "安全で衛生的な職場環境である" },
    { id: 74, categoryId: 8, text: "在宅勤務など柔軟な働き方ができている" },
    { id: 75, categoryId: 8, text: "業務に集中できる環境が整っている" },
    { id: 76, categoryId: 8, text: "業務に必要な情報やデータにアクセスしやすい" },
    { id: 77, categoryId: 8, text: "業務で使用するITシステムやツールは使いやすい" },
    { id: 78, categoryId: 8, text: "社内の手続きは分かりやすく効率的である" },
    { id: 79, categoryId: 8, text: "会議は目的が明確で効率的に進められている" },
    { id: 80, categoryId: 8, text: "育児や介護など、ライフイベントに配慮した支援制度がある" },

    // カテゴリー9: 総合満足度 (Q81-90)
    { id: 81, categoryId: 9, text: "今の会社で働くことに満足している" },
    { id: 82, categoryId: 9, text: "仕事に取り組む時に前向きな気持ちを持てている" },
    { id: 83, categoryId: 9, text: "今の職場環境は、自分の働きやすさに配慮されている" },
    { id: 84, categoryId: 9, text: "今の業務量は適切だと思う" },
    { id: 85, categoryId: 9, text: "会社の将来性に期待を持てている" },
    { id: 86, categoryId: 9, text: "自分の能力を十分に発揮できている" },
    { id: 87, categoryId: 9, text: "今後のキャリア形成に期待できている" },
    { id: 88, categoryId: 9, text: "勤務時間は妥当な範囲に収まっている" },
    { id: 89, categoryId: 9, text: "業務の責任範囲が明確になっている" },
    { id: 90, categoryId: 9, text: "過度なプレッシャーを感じることなく働けている" },

    // カテゴリー10: 組織へのつながり (Q91-100)
    { id: 91, categoryId: 10, text: "この会社の働き方は自分に合っている" },
    { id: 92, categoryId: 10, text: "この会社で自分の居場所を持てている" },
    { id: 93, categoryId: 10, text: "この会社の文化や価値観に共感している" },
    { id: 94, categoryId: 10, text: "この会社で働くことを家族や友人に前向きに話している" },
    { id: 95, categoryId: 10, text: "この会社で働くことに安心感を持てている" },
    { id: 96, categoryId: 10, text: "この会社はこれからも存続していくと思える" },
    { id: 97, categoryId: 10, text: "この会社の一員であることに誇りを持っている" },
    { id: 98, categoryId: 10, text: "この会社を入社前の自分に勧めたいと思う" },
    { id: 99, categoryId: 10, text: "この会社では自分の個性を活かして働ける" },
    { id: 100, categoryId: 10, text: "この会社で長く働き続けたいと思う" }
];

// ===================================
// グローバル変数
// ===================================
let currentSectionIndex = 0;
let answers = {};
let employeeCode = '';

// ===================================
// ページ切り替え
// ===================================
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

// ===================================
// 従業員コード保存と診断開始
// ===================================
function saveDepartmentAndStart() {
    const code = document.getElementById('employee-code').value.trim();
    const dept = document.getElementById('department').value;
    
    if (!code) {
        alert('従業員コードを入力してください');
        return;
    }
    if (!dept) {
        alert('部署を選択してください');
        return;
    }
    
    employeeCode = code;
    localStorage.setItem('employeeCode', code);
    localStorage.setItem('department', dept);
    
    // 前回の回答を復元
    const saved = localStorage.getItem(`answers_${employeeCode}`);
    if (saved) {
        answers = JSON.parse(saved);
    }
    
    showPage('survey-page');
    renderSection();
}

// ===================================
// セクション描画（10問ずつ）
// ===================================
function renderSection() {
    const container = document.getElementById('questions-container');
    container.innerHTML = '';
    
    const startIdx = currentSectionIndex * 10;
    const endIdx = startIdx + 10;
    const sectionQuestions = questions.slice(startIdx, endIdx);
    
    if (sectionQuestions.length === 0) {
        calculateResults();
        return;
    }
    
    const categoryId = sectionQuestions[0].categoryId;
    const category = categories.find(c => c.id === categoryId);
    
    // 🔥 固定ヘッダーのカテゴリータイトルを更新
    document.querySelector('#category-header-fixed h2').textContent = 
        `カテゴリー${categoryId}: ${category.name}`;
    
    // カテゴリー5の場合、説明文を表示
    if (categoryId === 5) {
        const note = document.createElement('div');
        note.className = 'category-note';
        note.innerHTML = '<p>※「自部署」とは、あなたが普段一緒に業務を行うメンバーを指します</p>';
        container.appendChild(note);
    }
    
        sectionQuestions.forEach(q => {
        const block = document.createElement('div');
        block.className = 'question-block';
        block.innerHTML = `
            <div class="question-text">Q${q.id}. ${q.text}</div>
            <div class="answer-options">
                ${[1,2,3,4,5].map(val => `
                    <label class="answer-option">
                        <input type="radio" name="q${q.id}" value="${val}" 
                               ${answers[q.id] == val ? 'checked' : ''}>
                        <span>${val}</span>
                    </label>
                `).join('')}
            </div>
        `;
        container.appendChild(block);
        
        // 🔥 イベントリスナーを追加
        const radios = block.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.addEventListener('change', function() {
                saveAnswer(q.id, parseInt(this.value));
            });
        });
    });

    
    updateNavButtons();
    updateProgressBar();
    window.scrollTo(0, 0);
}

// ===================================
// 回答保存
// ===================================
function saveAnswer(questionId, value) {
    answers[questionId] = value;
    localStorage.setItem(`answers_${employeeCode}`, JSON.stringify(answers));
    
    // 🔥 ボタン状態を更新
    updateNavButtons();
    updateProgressBar();
    
    // 自動的に次の質問へスクロール
    const allQuestions = Array.from(document.querySelectorAll('.question-block'));
    const currentIndex = allQuestions.findIndex(block => 
        block.querySelector(`input[name="q${questionId}"]`)
    );
    
    if (currentIndex < allQuestions.length - 1) {
        allQuestions[currentIndex + 1].scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }
}

// ===================================
// 進捗バー更新
// ===================================
function updateProgressBar() {
    const answeredCount = Object.keys(answers).length;
    const progress = (answeredCount / questions.length) * 100;
    
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-percentage').textContent = `${Math.round(progress)}%`;
}

// ===================================
// ナビゲーションボタン制御
// ===================================
function updateNavButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    prevBtn.style.display = currentSectionIndex > 0 ? 'inline-block' : 'none';
    
    const startIdx = currentSectionIndex * 10;
    const endIdx = startIdx + 10;
    const sectionQuestions = questions.slice(startIdx, endIdx);
    const allAnswered = sectionQuestions.every(q => answers[q.id] !== undefined);
    
    if (allAnswered) {
        nextBtn.disabled = false;
        nextBtn.style.opacity = '1';
        nextBtn.style.cursor = 'pointer';
    } else {
        nextBtn.disabled = true;
        nextBtn.style.opacity = '0.5';
        nextBtn.style.cursor = 'not-allowed';
    }
    
    nextBtn.textContent = currentSectionIndex >= 9 ? '結果を見る' : '次のセクション';
}

function previousSection() {
    if (currentSectionIndex > 0) {
        currentSectionIndex--;
        renderSection();
    }
}

function nextSection() {
    const startIdx = currentSectionIndex * 10;
    const endIdx = startIdx + 10;
    const sectionQuestions = questions.slice(startIdx, endIdx);
    const allAnswered = sectionQuestions.every(q => answers[q.id] !== undefined);
    
    if (!allAnswered) {
        alert('すべての質問に回答してください');
        return;
    }
    
    if (currentSectionIndex < 9) {
        currentSectionIndex++;
        renderSection();
    } else {
        calculateResults();
    }
}

// ===================================
// 結果計算と表示
// ===================================
function calculateResults() {
    // 100点満点に換算
    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const maxScore = questions.length * 5; // 500点満点
    const normalizedScore = Math.round((totalScore / maxScore) * 100);
    
    // カテゴリー別スコア
    const categoryScores = categories.map(cat => {
        const catQuestions = questions.filter(q => q.categoryId === cat.id);
        const catAnswers = catQuestions.map(q => answers[q.id] || 0);
        const catTotal = catAnswers.reduce((sum, val) => sum + val, 0);
        const catMax = catQuestions.length * 5;
        const catNormalized = Math.round((catTotal / catMax) * 100);
        
        return {
            name: cat.name,
            score: catNormalized,
            maxScore: 100
        };
    });
    
    displayResults(normalizedScore, categoryScores);
}

function displayResults(totalScore, categoryScores) {
    showPage('result-page');
    window.scrollTo(0, 0);
    // 総合スコア表示
    document.getElementById('total-score').textContent = totalScore;
    
    // ゲージアニメーション
    const gaugeFill = document.getElementById('gauge-fill');
    setTimeout(() => {
        gaugeFill.style.width = `${totalScore}%`;
    }, 300);
    
    // レーダーチャート描画
    drawRadarChart(categoryScores);
    
    // フィードバック生成
    generateFeedback(totalScore, categoryScores);
}

// ===================================
// レーダーチャート描画（WEVOX風・スコア表示付き）
// ===================================
function drawRadarChart(categoryScores) {
    const canvas = document.getElementById('radar-chart');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 200;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 背景の円（WEVOX風カラー）
    for (let i = 1; i <= 5; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (radius / 5) * i, 0, Math.PI * 2);
        ctx.strokeStyle = i === 5 ? '#e1bee7' : '#f3e5f5';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    
    // 軸の描画
    const angleStep = (Math.PI * 2) / categoryScores.length;
    categoryScores.forEach((cat, i) => {
        const angle = angleStep * i - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = '#f3e5f5';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // ラベル(カテゴリー名)
        const labelDistance = radius + 50;
        const labelX = centerX + labelDistance * Math.cos(angle);
        const labelY = centerY + labelDistance * Math.sin(angle);
        ctx.fillStyle = '#4a148c';
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(cat.name, labelX, labelY);
        
        // スコア表示（ピンク色の円形バッジ）
        const scoreDistance = radius + 75;
        const scoreX = centerX + scoreDistance * Math.cos(angle);
        const scoreY = centerY + scoreDistance * Math.sin(angle);
        
        // スコアの背景円
        ctx.fillStyle = '#e91e63';
        ctx.beginPath();
        ctx.arc(scoreX, scoreY, 14, 0, Math.PI * 2);
        ctx.fill();
        
        // スコアテキスト
        ctx.fillStyle = 'white';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${cat.score}`, scoreX, scoreY);
    });
    
    // データのプロット（WEVOX風カラー）
    ctx.beginPath();
    categoryScores.forEach((cat, i) => {
        const angle = angleStep * i - Math.PI / 2;
        const distance = (cat.score / 100) * radius;
        const x = centerX + distance * Math.cos(angle);
        const y = centerY + distance * Math.sin(angle);
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.closePath();
    
    // グラデーション塗りつぶし(濃くする)
    const fillGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    fillGradient.addColorStop(0, 'rgba(233, 30, 99, 0.5)');
    fillGradient.addColorStop(1, 'rgba(156, 39, 176, 0.3)');
    ctx.fillStyle = fillGradient;
    ctx.fill();
    
    // 線のグラデーション
    const lineGradient = ctx.createLinearGradient(centerX - radius, centerY, centerX + radius, centerY);
    lineGradient.addColorStop(0, '#e91e63');
    lineGradient.addColorStop(1, '#9c27b0');
    ctx.strokeStyle = lineGradient;
    ctx.lineWidth = 4;
    ctx.stroke();
    
        // プロット点を描画(すべて同じサイズ)
    categoryScores.forEach((cat, i) => {
        const angle = angleStep * i - Math.PI / 2;
        const distance = (cat.score / 100) * radius;
        const pointX = centerX + distance * Math.cos(angle);
        const pointY = centerY + distance * Math.sin(angle);
        
        // ポイントのグラデーション
        const gradient = ctx.createRadialGradient(pointX, pointY, 0, pointX, pointY, 10);
        gradient.addColorStop(0, '#ff4081');
        gradient.addColorStop(1, '#e91e63');
        
        // 🔥 ポイント本体(塗りつぶし)
        ctx.beginPath();
        ctx.arc(pointX, pointY, 8, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // 🔥 ポイントの白い縁取り(別パスで描画)
        ctx.beginPath();
        ctx.arc(pointX, pointY, 8, 0, Math.PI * 2);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.stroke();
    });
}  // ← drawRadarChart() 関数の閉じ括弧

// ===================================
// フィードバック生成(詳細版)
// ===================================
function generateFeedback(totalScore, categoryScores) {
    const feedbackDiv = document.getElementById('feedback-content');
    
    // 総合評価
    let overallMessage = '';
    let messageClass = '';
    
    if (totalScore >= 80) {
        overallMessage = '素晴らしいエンゲージメント状態です!組織全体が非常に良好な状態にあり、従業員の満足度が高いレベルで維持されています。この状態を継続しながら、さらなる高みを目指しましょう。';
        messageClass = 'excellent';
    } else if (totalScore >= 60) {
        overallMessage = '概ね良好な状態ですが、さらなる改善の余地があります。特定の領域に焦点を当てた取り組みにより、さらに高いエンゲージメントを実現できる可能性があります。';
        messageClass = 'good';
    } else {
        overallMessage = '改善が必要な領域が複数見られます。優先的に取り組むべき課題を明確にし、具体的なアクションプランを立てることをお勧めします。組織全体で改善に取り組むことで、エンゲージメント向上が期待できます。';
        messageClass = 'warning';
    }
    
    // 最高/最低カテゴリー
    const highest = categoryScores.reduce((max, cat) => cat.score > max.score ? cat : max);
    const lowest = categoryScores.reduce((min, cat) => cat.score < min.score ? cat : min);
    
    // 改善提案生成
    const suggestions = generateDetailedSuggestions(lowest, totalScore);
    
    feedbackDiv.innerHTML = `
        <div class="feedback-overall">
            <div class="feedback-score-text">総合評価: ${totalScore}点 / 100点</div>
            <div class="feedback-message ${messageClass}">${overallMessage}</div>
        </div>
        
        <div class="category-highlights">
            <div class="highlight-card best">
                <div class="highlight-label">
                    <span class="highlight-icon">🌟</span>
                    <span>最も高い項目</span>
                </div>
                <div class="highlight-category">${highest.name}</div>
                <div class="highlight-score">${highest.score}点</div>
            </div>
            
            <div class="highlight-card worst">
                <div class="highlight-label">
                    <span class="highlight-icon">⚠️</span>
                    <span>最も低い項目</span>
                </div>
                <div class="highlight-category">${lowest.name}</div>
                <div class="highlight-score">${lowest.score}点</div>
            </div>
        </div>
        
        <div class="improvement-suggestions">
            <div class="improvement-title">
                <span>💡</span>
                <span>「${lowest.name}」改善のための具体的アクション</span>
            </div>
            <ul class="improvement-list">
                ${suggestions.map(s => `<li>${s}</li>`).join('')}
            </ul>
        </div>
    `;
}  // ← generateFeedback() 関数の閉じ括弧(これが抜けていた!)

// ===================================
// 詳細な改善提案生成
// ===================================
function generateDetailedSuggestions(lowestCategory, totalScore) {
    const suggestions = {
        '心身の健康': [
            '定期的な1on1ミーティングを実施し、従業員の心身の状態を丁寧に把握する仕組みを構築しましょう。管理職は傾聴のスキルを磨き、早期に課題を発見できる体制を整えることが重要です。',
            'フレックスタイム制度や在宅勤務制度の導入を検討し、個人のライフスタイルに合わせた柔軟な働き方を実現しましょう。ワークライフバランスの改善は、長期的な生産性向上にもつながります。',
            'メンタルヘルス相談窓口の設置や、ストレスチェックの定期実施を行い、従業員が安心して相談できる環境を整備しましょう。外部の専門家との連携も効果的です。',
            '休暇取得を推奨する文化を醸成し、管理職が率先して休暇を取得する姿勢を示すことで、組織全体に休息の重要性を浸透させましょう。計画的な休暇取得を促進する制度設計も有効です。'
        ],
        '仕事の充実感': [
            '従業員一人ひとりに対して、担当業務が会社の目標達成にどのように貢献しているかを具体的に説明し、仕事の意義を実感できるようにしましょう。定期的なキックオフミーティングで全体像を共有することが効果的です。',
            '定期的なキャリア面談を実施し、個人の強みや興味関心を深く理解した上で、それを活かせる業務アサインを心がけましょう。適材適所の配置は、個人と組織の双方にメリットをもたらします。',
            '業務プロセスの改善提案制度を導入し、現場の声を積極的に取り入れる仕組みを作りましょう。従業員の創意工夫を評価・表彰することで、主体的な業務改善を促進できます。',
            '成功事例の共有会や顧客からの感謝の声を伝える機会を定期的に設け、業務の社会的意義や顧客への貢献を実感できる場を提供しましょう。モチベーション向上に大きく寄与します。'
        ],
        '成長機会': [
            '年間の研修計画を体系的に策定し、階層別・職種別に必要なスキルを習得できる機会を提供しましょう。オンライン研修と対面研修を組み合わせることで、学習効果を最大化できます。',
            'メンター制度を導入し、経験豊富な社員が若手や中堅社員の成長をサポートする体制を整えましょう。定期的な面談を通じて、キャリア形成を支援することが重要です。',
            '資格取得支援制度や書籍購入補助制度を整備し、従業員の自己啓発を積極的に支援しましょう。学習する組織文化の醸成は、長期的な競争力強化につながります。',
            'キャリアパスを明確に示し、各ステージで求められるスキルや経験を可視化することで、従業員が自身の成長目標を描けるようにしましょう。定期的なキャリア面談で進捗を確認し、必要な支援を提供することが大切です。'
        ],
        '上司のサポート': [
            '管理職向けのマネジメント研修を定期的に実施し、コーチングスキルやフィードバックスキルの向上を図りましょう。実践的なロールプレイを取り入れることで、即座に現場で活用できるスキルを習得できます。',
            '定期的な1on1ミーティングを制度化し、部下との対話の質を高めましょう。単なる業務報告ではなく、キャリアや悩みについて深く話し合える場にすることが重要です。',
            '360度評価を導入し、管理職の行動を多面的に評価・改善する仕組みを作りましょう。フィードバックを基に、具体的な行動改善計画を立てることで、マネジメント品質が向上します。',
            'オープンドアポリシーを推進し、上司への相談がしやすい雰囲気を組織全体で醸成しましょう。管理職自身が積極的にコミュニケーションを取る姿勢を示すことが、心理的安全性の向上につながります。'
        ],
        '部署内の人間関係': [
            'チームビルディング活動を定期的に実施し、業務以外の場面でも相互理解を深める機会を作りましょう。オンラインとオフラインを組み合わせた活動により、多様な働き方に対応できます。',
            '情報共有ツール(Slack、Teams等)を効果的に活用し、部署内のコミュニケーションを円滑化しましょう。重要な情報が確実に伝わる仕組みを整えることが、チームワーク向上の基盤となります。',
            '役割分担を明確化し、各メンバーの責任範囲と期待される成果を可視化しましょう。役割の重複や抜け漏れを防ぐことで、効率的な協働が可能になります。',
            '部署の目標を共有するミーティングを定期開催し、チーム全体で同じ方向を目指す意識を醸成しましょう。個人の業務が全体目標にどう貢献するかを理解することで、一体感が生まれます。'
        ],
        '評価・処遇': [
            '評価基準を明文化し、全従業員に周知することで透明性を高めましょう。評価基準説明会を開催し、質疑応答の機会を設けることで、納得感を高めることができます。',
            '評価面談の質を向上させるため、評価者トレーニングを実施しましょう。具体的な事例を基にしたフィードバックの方法を学ぶことで、建設的な評価面談が実現できます。',
            '成果だけでなく、プロセスや行動も評価に反映する仕組みを導入しましょう。バリューに沿った行動を評価することで、組織文化の浸透を促進できます。',
            '昇進・昇格の基準を明確にし、必要なスキルや経験を具体的に示すことで、キャリアアップの道筋を可視化しましょう。定期的なキャリア面談で進捗を確認し、成長をサポートすることが重要です。'
        ],
        '会社への信頼': [
            '経営層からの情報発信を定期的に行い、会社の方針や戦略をタイムリーに共有しましょう。全社ミーティングやタウンホールミーティングを通じて、経営層と従業員の距離を縮めることが信頼構築につながります。',
            '重要な経営判断について、従業員向けの説明会を開催し、決定の背景や理由を丁寧に説明しましょう。質疑応答の時間を十分に設けることで、理解と納得を深めることができます。',
            '従業員の意見を経営に反映させる仕組み(従業員サーベイ、提案制度等)を導入し、その結果や対応状況を定期的にフィードバックしましょう。意見が実際に活かされることで、エンゲージメントが向上します。',
            'コンプライアンス研修を徹底し、倫理的な経営を実践する姿勢を組織全体で共有しましょう。経営層が率先して高い倫理観を示すことが、組織の信頼性を高めます。'
        ],
        '働く環境': [
            'オフィス環境の改善(照明、空調、デスク、椅子等)を従業員の意見を聞きながら段階的に実施しましょう。快適な環境は、生産性と満足度の向上に直結します。',
            '業務効率化ツールやシステムを積極的に導入し、無駄な作業や手作業を削減しましょう。デジタル化により、従業員がより付加価値の高い業務に集中できる環境を整えることが重要です。',
            'テレワーク環境の整備や、フリーアドレス制の導入を検討し、柔軟な働き方をサポートしましょう。個人の働き方の選択肢を増やすことで、多様な人材が活躍できる環境を実現できます。',
            '育児・介護支援制度を充実させ、ライフステージの変化に応じた働き方を支援しましょう。短時間勤務制度や復職支援プログラムの整備により、長期的なキャリア形成を可能にします。'
        ],
        '総合満足度': [
            '従業員満足度調査を定期的に実施し、組織の課題を早期に発見・対応する仕組みを作りましょう。調査結果を基にした具体的な改善アクションを示すことで、従業員の信頼を獲得できます。',
            '業務量の適正化を図り、過度な負担がかからないよう定期的に見直しを行いましょう。業務の棚卸しを実施し、不要な業務を削減することで、生産性と満足度の両立が可能になります。',
            'キャリア開発支援を強化し、従業員の将来への期待を高めましょう。個別のキャリアプランを作成し、必要なスキル習得の機会を提供することで、長期的な成長を支援できます。',
            '柔軟な働き方を推進し、個人のライフスタイルに合わせた勤務形態を提供しましょう。リモートワーク、フレックスタイム、短時間勤務など、多様な選択肢を用意することが重要です。'
        ],
        '組織へのつながり': [
            '企業文化や価値観(ミッション・ビジョン・バリュー)を明確にし、全従業員に浸透させる取り組みを継続的に行いましょう。朝礼やミーティングでバリューを共有する習慣を作ることが効果的です。',
            '社内コミュニケーションの機会を意識的に増やし、部署を越えた交流を促進しましょう。社内イベントやオンラインコミュニティの活用により、帰属意識を高めることができます。',
            '従業員の多様性を尊重し、個性を活かせる職場環境を作りましょう。ダイバーシティ&インクルージョンの推進は、イノベーションと組織の成長を促進します。',
            '長期的なキャリア形成を支援し、従業員が安心して働き続けられる環境を整えましょう。定期的なキャリア面談や、ライフステージに応じた柔軟な制度設計が、定着率向上につながります。'
        ]
    };
    
    return suggestions[lowestCategory.name] || [
        '定期的な従業員との対話を通じて、現場の声を丁寧に聞き取り、課題の本質を理解しましょう。',
        '専門家のアドバイスを受けながら、組織的な改善施策を計画的に実施しましょう。',
        '小さな改善から始め、PDCAサイクルを回しながら継続的に取り組むことで、着実に成果を上げましょう。',
        '改善の進捗を定期的に測定し、効果を可視化することで、組織全体のモチベーション向上につなげましょう。'
    ];
}

// ===================================
// 初期化
// ===================================
window.onload = function() {
    // 毎回空欄で開始
};
