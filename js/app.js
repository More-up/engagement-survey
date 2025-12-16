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
let currentQuestion = 0;
let answers = [];
let employeeCode = '';
let department = '';
let gender = '';

// ページ遷移関数
function showOrientation() {
    document.getElementById('topPage').classList.remove('active');
    document.getElementById('orientationPage').classList.add('active');
}

function showBasicInfo() {
    document.getElementById('orientationPage').classList.remove('active');
    document.getElementById('basicInfoPage').classList.add('active');
}

// 基本情報の保存と診断開始
document.getElementById('basicInfoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    saveDepartmentAndStart();
});

function saveDepartmentAndStart() {
    employeeCode = document.getElementById('employeeCode').value;
    department = document.getElementById('department').value;
    gender = document.getElementById('gender').value;
    
    if (!employeeCode || !department || !gender) {
        alert('全ての項目を入力してください');
        return;
    }
    
    // ローカルストレージに保存
    localStorage.setItem('employeeCode', employeeCode);
    localStorage.setItem('department', department);
    localStorage.setItem('gender', gender);
    
    document.getElementById('basicInfoPage').classList.remove('active');
    document.getElementById('surveyPage').classList.add('active');
    loadQuestion();
}

// 質問の読み込み
function loadQuestion() {
    if (currentQuestion >= questions.length) {
        calculateResults();
        return;
    }
    
    const categoryIndex = Math.floor(currentQuestion / 10);
    const questionInCategory = (currentQuestion % 10) + 1;
    
    // 質問テキストを設定
    const questionTextElement = document.getElementById('questionText');
    questionTextElement.textContent = questions[currentQuestion];
    
    // カテゴリー5 (Q41-50) の場合、注釈を表示
    const existingNote = document.querySelector('.category-note');
    if (existingNote) {
        existingNote.remove();
    }
    
    if (currentQuestion === 40) { // Q41は配列インデックス40
        const noteDiv = document.createElement('div');
        noteDiv.className = 'category-note';
        noteDiv.style.fontSize = '0.9em';
        noteDiv.style.color = '#666';
        noteDiv.style.marginTop = '10px';
        noteDiv.style.fontStyle = 'italic';
        noteDiv.textContent = '※以下の設問における「自部署」とは、あなたが普段一緒に仕事をしているメンバー(チーム・部署)を指します。';
        questionTextElement.parentNode.insertBefore(noteDiv, questionTextElement.nextSibling);
    }
    
    document.getElementById('categoryBadge').textContent = `${categories[categoryIndex]} (${questionInCategory}/10)`;
    document.getElementById('progressText').textContent = `質問 ${currentQuestion + 1} / 100`;
    document.getElementById('progressBar').style.width = ((currentQuestion + 1) / 100 * 100) + '%';
    
    // 前の質問ボタンの表示制御
    document.getElementById('prevBtn').style.display = currentQuestion > 0 ? 'block' : 'none';
    
    // 暫定レーダーチャートの更新
    updatePreviewRadar();
}

// 回答の選択
function selectAnswer(score) {
    answers[currentQuestion] = score;
    localStorage.setItem('answers', JSON.stringify(answers));
    currentQuestion++;
    loadQuestion();
}

// 前の質問に戻る
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

// 暫定レーダーチャートの更新
function updatePreviewRadar() {
    const categoryScores = Array(10).fill(0);
    const categoryCount = Array(10).fill(0);
    
    answers.forEach((answer, index) => {
        const categoryIndex = Math.floor(index / 10);
        categoryScores[categoryIndex] += answer;
        categoryCount[categoryIndex]++;
    });
    
    const normalizedScores = categoryScores.map((score, index) => {
        return categoryCount[index] > 0 ? (score / categoryCount[index] / 5 * 100).toFixed(1) : 0;
    });
    
    const ctx = document.getElementById('previewRadarChart');
    if (window.previewChart) {
        window.previewChart.destroy();
    }
    
    window.previewChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: categories,
            datasets: [{
                label: '現在のスコア',
                data: normalizedScores,
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: 'rgba(52, 152, 219, 1)',
                pointBackgroundColor: 'rgba(52, 152, 219, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(52, 152, 219, 1)'
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

// 結果の計算
function calculateResults() {
    // カテゴリー別スコアの計算（100点満点）
    const categoryScores = [];
    for (let i = 0; i < 10; i++) {
        const categoryAnswers = answers.slice(i * 10, (i + 1) * 10);
        const sum = categoryAnswers.reduce((a, b) => a + b, 0);
        const score = (sum / 50 * 100).toFixed(1); // 50点満点を100点満点に変換
        categoryScores.push(parseFloat(score));
    }
    
    // 総合スコアの計算（100点満点）
    const totalScore = (categoryScores.reduce((a, b) => a + b, 0) / 10).toFixed(1);
    
    // 結果ページの表示
    document.getElementById('surveyPage').classList.remove('active');
    document.getElementById('resultPage').classList.add('active');
    document.getElementById('totalScore').textContent = totalScore;
    
    // レーダーチャートの描画
    drawResultRadar(categoryScores);
    
    // カテゴリー別詳細の表示
    displayCategoryDetails(categoryScores);
    
    // 総合フィードバックの表示
    displayOverallFeedback(parseFloat(totalScore));
    
    // 改善提案の表示
    displayImprovementSuggestions(categoryScores);
    
    // APIに結果を送信
    submitResults(totalScore, categoryScores);
}

// レーダーチャートの描画
function drawResultRadar(scores) {
    const ctx = document.getElementById('resultRadarChart');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: categories,
            datasets: [{
                label: 'あなたのスコア',
                data: scores,
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: 'rgba(52, 152, 219, 1)',
                pointBackgroundColor: 'rgba(52, 152, 219, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(52, 152, 219, 1)'
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
            }
        }
    });
}

// カテゴリー別詳細の表示
function displayCategoryDetails(scores) {
    const container = document.getElementById('categoryDetails');
    container.innerHTML = '';
    
    scores.forEach((score, index) => {
        const level = score >= 70 ? '良好' : score >= 50 ? '普通' : '要改善';
        const levelClass = score >= 70 ? 'level-good' : score >= 50 ? 'level-normal' : 'level-poor';
        
        const detail = document.createElement('div');
        detail.className = 'category-detail';
        detail.innerHTML = `
            <div class="category-name">${categories[index]}</div>
            <div class="category-score">${score} / 100</div>
            <div class="category-level ${levelClass}">${level}</div>
        `;
        container.appendChild(detail);
    });
}

// 総合フィードバックの表示
function displayOverallFeedback(totalScore) {
    const container = document.getElementById('overallFeedback');
    let feedback = '';
    
    if (totalScore >= 70) {
        feedback = '素晴らしい結果です！あなたは現在の職場環境に高い満足度を感じており、エンゲージメントも高い状態にあります。この良好な状態を維持しつつ、さらなる成長を目指しましょう。';
    } else if (totalScore >= 50) {
        feedback = 'まずまずの結果です。いくつかの分野では良好な状態ですが、改善の余地がある領域も見られます。特にスコアの低いカテゴリーに注目し、具体的な改善策を検討しましょう。';
    } else {
        feedback = '改善が必要な状態です。複数の領域で課題が見られます。まずは最もスコアの低いカテゴリーから優先的に取り組み、上司や人事部門と相談しながら改善策を検討することをお勧めします。';
    }
    
    container.innerHTML = `<p>${feedback}</p>`;
}

// 改善提案の表示
function displayImprovementSuggestions(scores) {
    const container = document.getElementById('improvementSuggestions');
    container.innerHTML = '';
    
    // スコアが低い順にソート
    const sortedCategories = scores.map((score, index) => ({ score, index }))
        .sort((a, b) => a.score - b.score)
        .slice(0, 3); // 上位3つの改善点
    
    const adviceMap = {
        '心身の健康': '健康管理を優先し、適切な休息を取りましょう。必要に応じて上司に業務負荷について相談し、心身のバランスを保つことが重要です。',
        '仕事の充実感': '自分の仕事が組織や社会にどう貢献しているかを明確にしましょう。上司と定期的に話し合い、仕事の目的や意義を再確認することをお勧めします。',
        '成長機会': '新しいスキルを学ぶ機会を積極的に探しましょう。上司にキャリア開発について相談し、研修やプロジェクトへの参加を申し出てみてください。',
        '上司のサポート': '上司との1on1ミーティングを定期的に設定し、フィードバックやサポートを求めましょう。コミュニケーションを増やすことで関係性が改善される可能性があります。',
        '部署内の人間関係': 'チーム内でのコミュニケーションを積極的に取りましょう。ランチや休憩時間を利用して同僚と交流を深めることで、信頼関係が構築されます。',
        '評価・処遇': '自分の貢献を可視化し、定期的に上司と評価について話し合いましょう。目標設定を明確にし、達成度を記録することで適切な評価につながります。',
        '会社への信頼': '会社のビジョンや方針について理解を深めましょう。経営層とのコミュニケーション機会があれば積極的に参加し、疑問点は質問してみてください。',
        '働く環境': '職場環境の改善について具体的な提案をしてみましょう。小さな改善でも積み重ねることで、働きやすい環境が作られます。',
        '総合満足度': '現在の満足度を高めるため、特にスコアの低いカテゴリーから優先的に改善に取り組みましょう。小さな変化の積み重ねが全体の満足度向上につながります。',
        '組織へのつながり': '会社の文化や価値観を理解し、自分なりの形で組織に貢献する方法を見つけましょう。社内イベントへの参加も帰属意識を高める一助となります。'
    };
    
    sortedCategories.forEach(({ score, index }) => {
        const categoryName = categories[index];
        const advice = adviceMap[categoryName] || '上司や人事部門と相談しながら、改善策を検討することをお勧めします。';
        
        const suggestion = document.createElement('div');
        suggestion.className = 'suggestion-item';
        suggestion.innerHTML = `
            <h4>${categoryName}（スコア: ${score}）</h4>
            <p>${advice}</p>
        `;
        container.appendChild(suggestion);
    });
}

// APIに結果を送信
function submitResults(totalScore, categoryScores) {
    const employeeCode = localStorage.getItem('employeeCode');
    const department = localStorage.getItem('department');
    const gender = localStorage.getItem('gender');
    
    const categoryScoresObj = {};
    categories.forEach((cat, index) => {
        categoryScoresObj[cat] = categoryScores[index];
    });
    
    const data = {
        employeeCode: employeeCode,
        department: department,
        gender: gender,
        timestamp: new Date().toISOString(),
        totalScore: parseFloat(totalScore),
        categoryScores: categoryScoresObj,
        answers: answers
    };
    
    fetch(`${API_ENDPOINT}/api/diagnostics`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('診断結果を送信しました:', result);
    })
    .catch(error => {
        console.error('送信エラー:', error);
    });
}

// ページ読み込み時の初期化
window.addEventListener('load', function() {
    // ローカルストレージから前回の回答を復元（オプション）
    const savedAnswers = localStorage.getItem('answers');
    if (savedAnswers) {
        // answers = JSON.parse(savedAnswers);
        // 復元機能は必要に応じて実装
    }
});
