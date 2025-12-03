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
                   ${answers[q.id] == val ? 'checked' : ''} 
                   onchange="saveAnswer(${q.id}, ${val})">
            <span>${val}</span>
        </label>
    `).join('')}
</div>

        `;
        container.appendChild(block);
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
    
    document.getElementById('total-score').textContent = totalScore;
    
    // カテゴリー別スコア表示
    const categoryContainer = document.getElementById('category-scores');
    categoryContainer.innerHTML = categoryScores.map(cat => `
        <div class="category-score-item">
            <h3>${cat.name}</h3>
            <div class="score-bar">
                <div class="score-fill" style="width: ${cat.score}%"></div>
            </div>
            <p>${cat.score}点 / 100点</p>
        </div>
    `).join('');
    
    // レーダーチャート描画
    drawRadarChart(categoryScores);
    
    // フィードバック生成
    generateFeedback(totalScore, categoryScores);
}

// ===================================
// レーダーチャート描画
// ===================================
function drawRadarChart(categoryScores) {
    const canvas = document.getElementById('radar-chart');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 150;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 背景の円
    for (let i = 1; i <= 5; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (radius / 5) * i, 0, Math.PI * 2);
        ctx.strokeStyle = '#e0e0e0';
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
        ctx.strokeStyle = '#e0e0e0';
        ctx.stroke();
        
        // ラベル
        const labelX = centerX + (radius + 30) * Math.cos(angle);
        const labelY = centerY + (radius + 30) * Math.sin(angle);
        ctx.fillStyle = '#2c3e50';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(cat.name, labelX, labelY);
    });
    
    // データのプロット
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
    ctx.fillStyle = 'rgba(93, 173, 226, 0.3)';
    ctx.fill();
    ctx.strokeStyle = '#5DADE2';
    ctx.lineWidth = 2;
    ctx.stroke();
}

// ===================================
// フィードバック生成
// ===================================
function generateFeedback(totalScore, categoryScores) {
    const feedbackDiv = document.getElementById('feedback-text');
    
    let feedback = `<h3>総合評価: ${totalScore}点</h3>`;
    
    if (totalScore >= 80) {
        feedback += '<p class="feedback-good">素晴らしいエンゲージメント状態です！</p>';
    } else if (totalScore >= 60) {
        feedback += '<p class="feedback-normal">良好な状態ですが、改善の余地があります。</p>';
    } else {
        feedback += '<p class="feedback-warning">改善が必要な項目が多く見られます。</p>';
    }
    
    feedback += '<h3>カテゴリー別コメント</h3>';
    
    const lowest = categoryScores.reduce((min, cat) => 
        cat.score < min.score ? cat : min
    );
    const highest = categoryScores.reduce((max, cat) => 
        cat.score > max.score ? cat : max
    );
    
    feedback += `<p><strong>最も高い項目:</strong> ${highest.name} (${highest.score}点)</p>`;
    feedback += `<p><strong>最も低い項目:</strong> ${lowest.name} (${lowest.score}点)</p>`;
    feedback += `<p>「${lowest.name}」の改善に取り組むことをお勧めします。</p>`;
    
    feedbackDiv.innerHTML = feedback;
}

// ===================================
// 初期化
// ===================================
window.onload = function() {
    // 毎回空欄で開始
};
