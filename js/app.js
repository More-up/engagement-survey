// API エンドポイント
const API_ENDPOINT = 'https://engagement-survey-api.more-up.workers.dev';

// 10カテゴリーの定義
const categories = [
    "仕事の意義",
    "成長機会",
    "上司のサポート",
    "部署内の人間関係",
    "心理的安全性",
    "ワークライフバランス",
    "評価と報酬",
    "自律性",
    "組織への信頼",
    "職場環境"
];

// 100問の質問（各カテゴリー10問）
const questions = [
    // 仕事の意義 (10問)
    "自分の仕事が会社の目標達成に貢献していると感じる",
    "自分の仕事に誇りを持っている",
    "仕事を通じて社会に貢献していると実感できる",
    "自分の仕事が顧客や同僚に価値を提供していると感じる",
    "日々の業務に意味を見出せている",
    "自分の役割が組織にとって重要だと感じる",
    "仕事の目的や意義を理解している",
    "自分の仕事が会社のビジョンと結びついていると感じる",
    "仕事にやりがいを感じている",
    "自分の仕事が認められていると感じる",
    
    // 成長機会 (10問)
    "新しいスキルや知識を学ぶ機会が十分にある",
    "自分のキャリア目標に向けて成長できていると感じる",
    "チャレンジングな仕事を任せてもらえる",
    "研修やトレーニングの機会が提供されている",
    "自分の強みを活かせる仕事ができている",
    "上司は私の成長をサポートしてくれる",
    "失敗から学ぶ機会が与えられている",
    "自分のキャリアパスが明確になっている",
    "新しい責任や役割を担う機会がある",
    "自己啓発のための時間やリソースが確保されている",
    
    // 上司のサポート (10問)
    "上司は私の意見を尊重してくれる",
    "上司から適切なフィードバックを受けている",
    "上司は私の業務を理解している",
    "困ったときに上司に相談しやすい",
    "上司は公平に評価してくれる",
    "上司は私の成長を気にかけてくれる",
    "上司とのコミュニケーションは円滑である",
    "上司は明確な指示や期待を伝えてくれる",
    "上司は私の業務を適切にサポートしてくれる",
    "上司のリーダーシップを信頼している",
    
    // 部署内の人間関係 (10問)
    "同僚と協力して仕事ができている",
    "チーム内で情報共有がスムーズに行われている",
    "困ったときに同僚に助けを求めやすい",
    "チームメンバーを信頼している",
    "チーム内で対立や摩擦が少ない",
    "同僚の成功を一緒に喜べる雰囲気がある",
    "チーム全体で目標達成に向けて協力している",
    "職場の人間関係に満足している",
    "チーム内で互いに尊重し合っている",
    "職場に良好な人間関係を築けている",
    
    // 心理的安全性 (10問)
    "失敗を恐れずに新しいことに挑戦できる",
    "自分の意見を自由に発言できる",
    "ミスをしても責められるのではなく、学びの機会として捉えられる",
    "質問や相談をすることに抵抗がない",
    "異なる意見を述べても受け入れられる",
    "職場で自分らしくいられる",
    "リスクを取ることが奨励されている",
    "弱みや不安を見せても大丈夫だと感じる",
    "職場で否定的な反応を恐れることなく行動できる",
    "チーム内で率直な対話ができる",
    
    // ワークライフバランス (10問)
    "仕事と私生活のバランスが取れている",
    "休暇を取りやすい環境である",
    "残業や休日出勤が過度に多くない",
    "柔軟な働き方（リモートワーク等）ができている",
    "仕事の負担が適切である",
    "プライベートの時間を十分に確保できている",
    "仕事のストレスが manageable である",
    "家族や友人との時間を大切にできている",
    "健康を維持できる働き方ができている",
    "仕事以外の活動にも時間を使えている",
    
    // 評価と報酬 (10問)
    "自分の貢献に見合った評価を受けている",
    "給与や待遇に満足している",
    "評価基準が明確で公平である",
    "頑張りが適切に認められている",
    "昇進や昇給の機会が公平に与えられている",
    "成果が報酬に反映されている",
    "評価プロセスに透明性がある",
    "福利厚生に満足している",
    "インセンティブや報奨制度が充実している",
    "自分の市場価値に見合った待遇を受けている",
    
    // 自律性 (10問)
    "自分の仕事の進め方を自分で決められる",
    "業務において裁量権が与えられている",
    "過度な管理や監視を受けていない",
    "自分のアイデアを実行に移す機会がある",
    "仕事のスケジュールを自分でコントロールできる",
    "意思決定に参加する機会がある",
    "創造性を発揮できる環境である",
    "自分の判断で行動できる",
    "マイクロマネジメントを受けていない",
    "自分の仕事に責任と権限を持っている",
    
    // 組織への信頼 (10問)
    "会社の経営陣を信頼している",
    "会社のビジョンや方向性に共感している",
    "会社の意思決定プロセスに透明性がある",
    "会社は従業員を大切にしていると感じる",
    "会社の将来性に期待が持てる",
    "会社の価値観に共感している",
    "経営陣は適切な判断をしていると思う",
    "会社の情報が適切に共有されている",
    "会社は約束を守る組織だと思う",
    "この会社で長く働きたいと思う",
    
    // 職場環境 (10問)
    "職場の物理的環境（オフィス、設備等）は快適である",
    "必要なツールやリソースが十分に提供されている",
    "職場の安全性が確保されている",
    "ITシステムやツールが使いやすい",
    "職場の雰囲気が良い",
    "集中して仕事ができる環境である",
    "職場の清潔さや整理整頓が保たれている",
    "必要な情報やサポートにアクセスしやすい",
    "職場のコミュニケーションツールが充実している",
    "働きやすいオフィスレイアウトになっている"
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
    
    document.getElementById('questionText').textContent = questions[currentQuestion];
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
    
    sortedCategories.forEach(({ score, index }) => {
        const suggestion = document.createElement('div');
        suggestion.className = 'suggestion-item';
        
        let advice = '';
        switch(categories[index]) {
            case '仕事の意義':
                advice = '自分の仕事が組織や社会にどう貢献しているかを明確にしましょう。上司と定期的に話し合い、仕事の目的や意義を再確認することをお勧めします。';
                break;
            case '成長機会':
                advice = '新しいスキルを学ぶ機会を積極的に探しましょう。上司にキャリア開発について相談し、研修やプロジェクトへの参加を申し出てみてください。';
                break;
            case '上司のサポート':
                advice = '上司との1on1ミーティングを定期的に設定し、フィードバックやサポートを求めましょう。コミュニケーションを増やすことで関係性が改善される可能性があります。';
                break;
            case '部署内の人間関係':
                advice = 'チーム内でのコミュニケーションを積極的に取りましょう。ランチや休憩時間を利用して同僚と交流を深めることで、信頼関係が構築されます。';
                break;
            case '心理的安全性':
                advice = '小さなことから意見を述べる練習をしましょう。また、チーム内で心理的安全性を高める取り組みについて、上司やチームメンバーと話し合ってみてください。';
                break;
            case 'ワークライフバランス':
                advice = '仕事の優先順位を明確にし、効率的に働く方法を見直しましょう。必要に応じて上司に業務量について相談することも検討してください。';
                break;
            case '評価と報酬':
                advice = '自分の貢献を可視化し、定期的に上司と評価について話し合いましょう。目標設定を明確にし、達成度を記録することで適切な評価につながります。';
                break;
            case '自律性':
                advice = '自分の判断で進められる業務を増やすよう上司に提案してみましょう。小さな意思決定から始めて、徐々に裁量範囲を広げていくことをお勧めします。';
                break;
            case '組織への信頼':
                advice = '会社のビジョンや方針について理解を深めましょう。経営層とのコミュニケーション機会があれば積極的に参加し、疑問点は質問してみてください。';
                break;
            case '職場環境':
                advice = '職場環境の改善について具体的な提案をしてみましょう。小さな改善でも積み重ねることで、働きやすい環境が作られます。';
                break;
        }
        
        suggestion.innerHTML = `
            <h4>${categories[index]}（スコア: ${score}）</h4>
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
    
    const data = {
        employeeCode: employeeCode,
        department: department,
        gender: gender,
        timestamp: new Date().toISOString(),
        totalScore: parseFloat(totalScore),
        categoryScores: {
            "仕事の意義": categoryScores[0],
            "成長機会": categoryScores[1],
            "上司のサポート": categoryScores[2],
            "部署内の人間関係": categoryScores[3],
            "心理的安全性": categoryScores[4],
            "ワークライフバランス": categoryScores[5],
            "評価と報酬": categoryScores[6],
            "自律性": categoryScores[7],
            "組織への信頼": categoryScores[8],
            "職場環境": categoryScores[9]
        },
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
