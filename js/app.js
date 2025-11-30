// グローバル変数
let currentCategory = 0;
let answers = {};
let employeeCode = '';
let department = '';

// カテゴリー定義（10カテゴリー）
const categories = [
    { id: 1, name: '心身の健康' },
    { id: 2, name: '仕事の充実感' },
    { id: 3, name: '成長機会' },
    { id: 4, name: '上司のサポート' },
    { id: 5, name: '部署内の人間関係' },
    { id: 6, name: '評価・処遇' },
    { id: 7, name: '会社への信頼' },
    { id: 8, name: '働く環境' },
    { id: 9, name: '総合満足度' },
    { id: 10, name: '会社への愛着・帰属意識' }
];

// 質問データ（最終確定版100問）
const questions = [
    // カテゴリー1: 心身の健康 (Q1-10)
    { id: 1, category: 1, text: '毎日、疲れが少ない気持ちで働けている' },
    { id: 2, category: 1, text: '仕事のストレスをうまく管理できている' },
    { id: 3, category: 1, text: '毎日、十分な睡眠をとれている' },
    { id: 4, category: 1, text: '仕事とプライベートの時間配分に満足している' },
    { id: 5, category: 1, text: '必要な時に休暇を取得できている' },
    { id: 6, category: 1, text: '休日にしっかりリフレッシュできている' },
    { id: 7, category: 1, text: '職場で悩みや苦しみを相談できる人がいる' },
    { id: 8, category: 1, text: '失敗や苦手なことを恐れず上司や同僚に相談できる' },
    { id: 9, category: 1, text: '体調不良や疲労が蓄積していない' },
    { id: 10, category: 1, text: '自分の価値観や考え方が職場で受け入れられている' },

    // カテゴリー2: 仕事の充実感 (Q11-20)
    { id: 11, category: 2, text: '今の仕事にやりがいを感じている' },
    { id: 12, category: 2, text: '自分の仕事が会社の目標達成に貢献していると感じる' },
    { id: 13, category: 2, text: '達成をやり終えた時に達成感を感じている' },
    { id: 14, category: 2, text: '自分の強みを活かして仕事ができている' },
    { id: 15, category: 2, text: '担当業務の内容に興味を持って取り組んでいる' },
    { id: 16, category: 2, text: '担当している業務の目的や意義を理解している' },
    { id: 17, category: 2, text: '自分の判断で業務を進められる環境がある' },
    { id: 18, category: 2, text: '担当業務の範囲や責任が明確である' },
    { id: 19, category: 2, text: '毎日の仕事に前向きに取り組んでいる' },
    { id: 20, category: 2, text: '自分の仕事が社会や顧客に役立っていると感じている' },

    // カテゴリー3: 成長機会 (Q21-30)
    { id: 21, category: 3, text: '昨年と比べて、自分のスキルや知識が向上していると感じる' },
    { id: 22, category: 3, text: '業務に役立つ研修や勉強会に参加できている' },
    { id: 23, category: 3, text: '業務時間内に学習やスキルアップの時間を確保できている' },
    { id: 24, category: 3, text: '業務を通じて実践的なスキルを身につけられている' },
    { id: 25, category: 3, text: '会社は資格取得や学習を支援してくれている' },
    { id: 26, category: 3, text: '会社は将来どのように成長できるか示してくれている' },
    { id: 27, category: 3, text: '自分の希望するキャリアを会社で実現できると思う' },
    { id: 28, category: 3, text: '自分の成長につながる新しい仕事を任されている' },
    { id: 29, category: 3, text: '上司や先輩から業務について教えてもらえている' },
    { id: 30, category: 3, text: '失敗を恐れず挑戦することを後押ししてくれる職場である' },

    // カテゴリー4: 上司のサポート (Q31-40)
    { id: 31, category: 4, text: '上司は私の意見を聞いてくれている' },
    { id: 32, category: 4, text: '上司から業務改善につながる具体的なフィードバックを受けている' },
    { id: 33, category: 4, text: '上司は私の成長を支援してくれている' },
    { id: 34, category: 4, text: '上司とのコミュニケーションは円滑である' },
    { id: 35, category: 4, text: '上司は全員に公平に接している' },
    { id: 36, category: 4, text: '上司に相談しやすい雰囲気がある' },
    { id: 37, category: 4, text: '上司は私の仕事の進め方に自主性を認めている' },
    { id: 38, category: 4, text: '上司から期待される役割や責任が明確に伝えられている' },
    { id: 39, category: 4, text: '上司の指示は具体的で理解しやすい' },
    { id: 40, category: 4, text: '上司は私の業務遂行を理解してくれている' },

    // カテゴリー5: 部署内の人間関係 (Q41-50)
    { id: 41, category: 5, text: '自部署のメンバーを信頼している' },
    { id: 42, category: 5, text: '自部署で協力して仕事を進められている' },
    { id: 43, category: 5, text: '自部署でお互いに助け合う雰囲気がある' },
    { id: 44, category: 5, text: '自部署内で情報共有がスムーズである' },
    { id: 45, category: 5, text: '自部署で自由に意見を述べる雰囲気がある' },
    { id: 46, category: 5, text: '他部署との連携がスムーズである' },
    { id: 47, category: 5, text: '自部署のメンバーの役割分担が明確である' },
    { id: 48, category: 5, text: '自部署の目標がメンバー間で共有されている' },
    { id: 49, category: 5, text: '自部署内では、お互いの意見や人格を尊重し合えている' },
    { id: 50, category: 5, text: '自部署で対人問題を感じることがない' },

    // カテゴリー6: 評価・処遇 (Q51-60)
    { id: 51, category: 6, text: '人事評価基準が明確である' },
    { id: 52, category: 6, text: '人事評価は公平に行われている' },
    { id: 53, category: 6, text: '人事評価面談で前向きな話し合いができている' },
    { id: 54, category: 6, text: '自分への人事評価に納得できている' },
    { id: 55, category: 6, text: '給与や待遇は自分の働きに見合っている' },
    { id: 56, category: 6, text: '成果や努力が給与の決定に反映されている' },
    { id: 57, category: 6, text: '昇進・昇格の機会は公平である' },
    { id: 58, category: 6, text: '福利厚生制度が充実に役立っている' },
    { id: 59, category: 6, text: '上司や同僚から評価の説明をもらえている' },
    { id: 60, category: 6, text: '自分の努力や成果が組織に認められていると感じる' },

    // カテゴリー7: 会社への信頼 (Q61-70)
    { id: 61, category: 7, text: '会社のMission・Vision・Valueを理解している' },
    { id: 62, category: 7, text: '会社のMission・Vision・Valueに共感している' },
    { id: 63, category: 7, text: '会社は法令や倫理を守って経営していると感じる' },
    { id: 64, category: 7, text: 'この会社の未来に期待できる' },
    { id: 65, category: 7, text: '経営層から会社方針や戦略の情報が定期的に共有されている' },
    { id: 66, category: 7, text: '会社の意思決定や決断を理解できている' },
    { id: 67, category: 7, text: '会社の意思決定のプロセスが透明である' },
    { id: 68, category: 7, text: '会社の仕事が社会に役立っていると感じている' },
    { id: 69, category: 7, text: '会社は従業員の意見を聞く体制がある' },
    { id: 70, category: 7, text: '会社の変革や改善の取り組みを信頼できる' },

    // カテゴリー8: 働く環境 (Q71-80)
    { id: 71, category: 8, text: 'オフィスの設備や環境は快適である' },
    { id: 72, category: 8, text: '業務に必要な設備やツールが揃っている' },
    { id: 73, category: 8, text: '安全で衛生的な職場環境である' },
    { id: 74, category: 8, text: '在宅勤務など柔軟な働き方ができている' },
    { id: 75, category: 8, text: '業務に集中できる環境が整っている' },
    { id: 76, category: 8, text: '業務に必要な情報やデータにアクセスしやすい' },
    { id: 77, category: 8, text: '業務で使用するITシステムやツールは使いやすい' },
    { id: 78, category: 8, text: '社内の手続きは分かりやすく効率的である' },
    { id: 79, category: 8, text: '会議は目的が明確で効率的に進められている' },
    { id: 80, category: 8, text: '育児や介護など、ライフイベントに配慮した支援制度がある' },

    // カテゴリー9: 総合満足度 (Q81-90)
    { id: 81, category: 9, text: '今の会社で働くことに満足している' },
    { id: 82, category: 9, text: '仕事に取り組む時に前向きな気持ちを持てている' },
    { id: 83, category: 9, text: '仕事を通じて充実感を得られている' },
    { id: 84, category: 9, text: '今の業務量は適切だと思う' },
    { id: 85, category: 9, text: '会社の方針に納得できている' },
    { id: 86, category: 9, text: '自分の能力を十分に発揮できている' },
    { id: 87, category: 9, text: '今後のキャリア形成に期待できている' },
    { id: 88, category: 9, text: '勤務時間は妥当な範囲に収まっている' },
    { id: 89, category: 9, text: '業務の責任範囲が明確になっている' },
    { id: 90, category: 9, text: '過度なプレッシャーを感じることなく働けている' },

    // カテゴリー10: 会社への愛着・帰属意識 (Q91-100)
    { id: 91, category: 10, text: 'この会社の働き方は自分に合っている' },
    { id: 92, category: 10, text: 'この会社で自分の居場所を持てている' },
    { id: 93, category: 10, text: 'この会社の文化や価値観に共感している' },
    { id: 94, category: 10, text: 'この会社で働くことを家族や友人に前向きに話している' },
    { id: 95, category: 10, text: 'この会社で働くことに安心感を持てている' },
    { id: 96, category: 10, text: 'この会社はこれからも存続していくと思える' },
    { id: 97, category: 10, text: 'この会社の一員であることに誇りを持っている' },
    { id: 98, category: 10, text: 'この会社を入社前の自分に勧めたいと思う' },
    { id: 99, category: 10, text: 'この会社では自分の個性を活かして働ける' },
    { id: 100, category: 10, text: 'この会社で長く働き続けたいと思う' }
];

// ページ制御
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId + '-page').classList.add('active');
}

// オリエンテーション完了
function completeOrientation() {
    showPage('department-selection');
}

// 社員コードと部署を保存して診断開始
function saveDepartmentAndStart() {
    employeeCode = document.getElementById('employee-code').value;
    department = document.getElementById('department').value;
    
    if (!employeeCode || !department) {
        alert('社員コードと部署を入力してください');
        return;
    }
    
    showPage('survey');
    renderCategory(0);
}

// カテゴリー描画
function renderCategory(catIndex) {
    currentCategory = catIndex;
    const cat = categories[catIndex];
    const questionList = questions.filter(q => q.category === cat.id);
    
    let instructionHTML = '';
    if (cat.id === 5) {
        instructionHTML = `
            <div class="category-instruction">
                <div class="instruction-header">📌 重要な注意事項</div>
                <div class="instruction-body">
                    ここでいう「自部署」とは、<strong>普段一緒に仕事をしているメンバー</strong>を指します。<br>
                    （例: 同じ部署・チーム・プロジェクトグループなど）
                </div>
            </div>
        `;
    }
    
    let html = `<h2>${cat.name}</h2>${instructionHTML}<div class="question-list">`;
    
    questionList.forEach(q => {
        html += `
            <div class="question-item">
                <p class="question-text">${q.text}</p>
                <div class="answer-options">
                    ${[5,4,3,2,1].map(val => `
                        <label class="answer-option">
                            <input type="radio" name="q${q.id}" value="${val}" ${answers[q.id] == val ? 'checked' : ''}>
                            <span>${['とてもそう思う','そう思う','どちらともいえない','そう思わない','全くそう思わない'][5-val]}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    html += `</div><div class="nav-buttons">`;
    if (catIndex > 0) html += `<button onclick="prevCategory()" class="btn-secondary">前のセクションへ</button>`;
    html += `<button onclick="nextCategory()" class="btn-primary">${catIndex < 9 ? '次のセクションへ' : '結果を見る'}</button>`;
    html += `</div>`;
    
    document.getElementById('survey-content').innerHTML = html;
    
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const qid = parseInt(e.target.name.substring(1));
            answers[qid] = parseInt(e.target.value);
            updateProgress();
        });
    });
    
    updateProgress();
}

// 進捗更新
function updateProgress() {
    const answered = Object.keys(answers).length;
    const percent = (answered / 100) * 100;
    document.getElementById('progress-fill').style.width = percent + '%';
    document.getElementById('progress-text').textContent = `セクション ${currentCategory + 1}/10 | 質問 ${answered}/100`;
}

// 次へ
function nextCategory() {
    const catQuestions = questions.filter(q => q.category === categories[currentCategory].id);
    const unanswered = catQuestions.filter(q => !answers[q.id]);
    
    if (unanswered.length > 0) {
        alert('このセクションの全ての質問に回答してください');
        return;
    }
    
    if (currentCategory < 9) {
        renderCategory(currentCategory + 1);
        window.scrollTo(0, 0);
    } else {
        showResults();
    }
}

// 前へ
function prevCategory() {
    if (currentCategory > 0) {
        renderCategory(currentCategory - 1);
        window.scrollTo(0, 0);
    }
}

// 結果表示
function showResults() {
    let totalScore = 0;
    const categoryScores = categories.map(cat => {
        const catQuestions = questions.filter(q => q.category === cat.id);
        const score = catQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
        const maxScore = catQuestions.length * 5;
        const percentage = Math.round((score / maxScore) * 100);
        totalScore += score;
        return { name: cat.name, score: percentage };
    });
    
    const totalPercentage = Math.round((totalScore / 500) * 100);
    
    showPage('result');
    document.getElementById('total-score').textContent = totalPercentage + '点';
    
    let scoresHTML = '';
    categoryScores.forEach(cs => {
        scoresHTML += `<div class="category-score-item"><strong>${cs.name}:</strong> ${cs.score}点</div>`;
    });
    document.getElementById('category-scores').innerHTML = scoresHTML;
    
    let feedback = '';
    if (totalPercentage >= 80) feedback = '非常に良好な状態です！';
    else if (totalPercentage >= 60) feedback = '概ね良好です。';
    else if (totalPercentage >= 40) feedback = '改善の余地があります。';
    else feedback = '早急な改善が必要です。';
    
    document.getElementById('feedback').innerHTML = `<h3>総合評価</h3><p>${feedback}</p>`;
    
    renderChart(categoryScores);
}

// チャート描画
function renderChart(scores) {
    const ctx = document.getElementById('result-chart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: scores.map(s => s.name),
            datasets: [{
                label: 'スコア',
                data: scores.map(s => s.score),
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
