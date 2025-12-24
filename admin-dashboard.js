// API設定
const API_ENDPOINT = 'https://engagement-survey-api.more-up.workers.dev';

// 10カテゴリ定義(app.jsと完全一致)
const categoryQuestions = {
    "心身の健康": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "仕事の充実感": [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    "成長機会": [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    "上司のサポート": [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    "部署内の人間関係": [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
    "評価・処遇": [51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
    "会社への信頼": [61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
    "働く環境": [71, 72, 73, 74, 75, 76, 77, 78, 79, 80],
    "総合満足度": [81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
    "組織へのつながり": [91, 92, 93, 94, 95, 96, 97, 98, 99, 100]
};

// 100問の設問定義(app.jsと完全一致)
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
let allData = [];
let filteredData = [];
let currentTrendView = 'overall';
let currentTrendPeriod = 'month';
let selectedDepartments = [];
let departmentChartType = 'radar'; // 'radar' or 'bar'

// データの読み込み
async function loadData() {
    try {
        const response = await fetch(`${API_ENDPOINT}/api/diagnostics`);
        const data = await response.json();
        
        allData = data;
        filteredData = data;
        
        initializeFilters();
        updateAllTabs();
    } catch (error) {
        console.error('データ読み込みエラー:', error);
        alert('データの読み込みに失敗しました');
    }
}

// フィルターの初期化
function initializeFilters() {
    const companies = [...new Set(allData.map(d => d.company))];
    const companyFilter = document.getElementById('companyFilter');
    companyFilter.innerHTML = '<option value="all">全社</option>';
    companies.forEach(company => {
        const option = document.createElement('option');
        option.value = company;
        option.textContent = company;
        companyFilter.appendChild(option);
    });
    companyFilter.value = 'all';
    
    const departments = [...new Set(allData.map(d => d.department))];
    const departmentFilter = document.getElementById('departmentFilter');
    departmentFilter.innerHTML = '<option value="all">全部署</option>';
    departments.forEach(dept => {
        const option = document.createElement('option');
        option.value = dept;
        option.textContent = dept;
        departmentFilter.appendChild(option);
    });
}

// フィルターの適用
function applyFilters() {
    const departmentFilter = document.getElementById('departmentFilter').value;
    const companyFilter = document.getElementById('companyFilter').value;
    const riskFilter = document.getElementById('riskFilter').value;
    const genderFilter = document.getElementById('genderFilter').value;
    
    filteredData = allData.filter(item => {
        if (companyFilter !== 'all' && item.company !== companyFilter) {
            return false;
        }

        if (departmentFilter !== 'all' && item.department !== departmentFilter) {
            return false;
        }
        
        if (riskFilter !== 'all') {
            const riskLevel = getRiskLevel(item.totalScore);
            if (riskLevel !== riskFilter) {
                return false;
            }
        }
        
        if (genderFilter !== 'all' && item.gender !== genderFilter) {
            return false;
        }
        
        return true;
    });
    
    updateAllTabs();
}

// リスクレベルの判定
function getRiskLevel(score) {
    if (score < 50) return 'high';
    if (score < 70) return 'medium';
    return 'low';
}

// 全タブの更新
function updateAllTabs() {
    updateExecutiveDashboard();
    updateDataTable();
    updateDepartmentComparison();
}

// 経営ダッシュボードの更新
function updateExecutiveDashboard() {
    updateStatCards();
    updateGenderStats();
    updateExecutiveRadarChart();
    updateAlerts();
    drawTrendChart();
}

// 統計カードの更新
function updateStatCards() {
    const highRisk = filteredData.filter(d => d.totalScore < 50).length;
    const mediumRisk = filteredData.filter(d => d.totalScore >= 50 && d.totalScore < 70).length;
    const lowRisk = filteredData.filter(d => d.totalScore >= 70).length;
    const total = filteredData.length;
    const avgScore = total > 0 ? (filteredData.reduce((sum, d) => sum + d.totalScore, 0) / total).toFixed(1) : 0;
    
    document.getElementById('highRiskCount').textContent = highRisk;
    document.getElementById('mediumRiskCount').textContent = mediumRisk;
    document.getElementById('lowRiskCount').textContent = lowRisk;
    document.getElementById('totalCount').textContent = total;
    document.getElementById('avgScore').textContent = avgScore;
}

// 男女比統計の更新
function updateGenderStats() {
    const maleData = filteredData.filter(d => d.gender === '男性');
    const femaleData = filteredData.filter(d => d.gender === '女性');
    const total = filteredData.length;
    
    const maleCount = maleData.length;
    const maleRatio = total > 0 ? ((maleCount / total) * 100).toFixed(1) : 0;
    const maleAvg = maleCount > 0 ? 
        (maleData.reduce((sum, d) => sum + d.totalScore, 0) / maleCount).toFixed(1) : 0;
    
    document.getElementById('maleCount').textContent = `${maleCount}人`;
    document.getElementById('maleRatio').textContent = `${maleRatio}%`;
    document.getElementById('maleAvgScore').textContent = `${maleAvg}点`;
    
    const femaleCount = femaleData.length;
    const femaleRatio = total > 0 ? ((femaleCount / total) * 100).toFixed(1) : 0;
    const femaleAvg = femaleCount > 0 ? 
        (femaleData.reduce((sum, d) => sum + d.totalScore, 0) / femaleCount).toFixed(1) : 0;
    
    document.getElementById('femaleCount').textContent = `${femaleCount}人`;
    document.getElementById('femaleRatio').textContent = `${femaleRatio}%`;
    document.getElementById('femaleAvgScore').textContent = `${femaleAvg}点`;
    
    updateGenderRadarChart(maleData, femaleData);
    updateGenderBarChart(maleData, femaleData);
}

// 男女別レーダーチャートの更新
function updateGenderRadarChart(maleData, femaleData) {
    const ctx = document.getElementById('genderComparisonRadarChart');
    if (!ctx) return;
    
    if (window.genderComparisonRadarChart && typeof window.genderComparisonRadarChart.destroy === 'function') {
        window.genderComparisonRadarChart.destroy();
    }
    
    const categories = [
        '心身の健康', '仕事の充実感', '成長機会', '上司のサポート', '部署内の人間関係',
        '評価・処遇', '会社への信頼', '働く環境', '総合満足度', '組織へのつながり'
    ];
    
    const maleScores = categories.map(cat => {
        if (maleData.length === 0) return 0;
        const scores = maleData
            .map(item => item.categoryScores[cat])
            .filter(score => score !== undefined && score !== null);
        return scores.length > 0 ? 
            (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : 0;
    });
    
    const femaleScores = categories.map(cat => {
        if (femaleData.length === 0) return 0;
        const scores = femaleData
            .map(item => item.categoryScores[cat])
            .filter(score => score !== undefined && score !== null);
        return scores.length > 0 ? 
            (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : 0;
    });
    
    window.genderComparisonRadarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: categories,
            datasets: [
                {
                    label: '男性',
                    data: maleScores,
                    borderColor: 'rgba(0, 123, 255, 1)',
                    backgroundColor: 'rgba(0, 123, 255, 0.2)',
                    borderWidth: 2
                },
                {
                    label: '女性',
                    data: femaleScores,
                    borderColor: 'rgba(255, 20, 147, 1)',
                    backgroundColor: 'rgba(255, 20, 147, 0.2)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: { stepSize: 20 }
                }
            },
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

// 【新機能】男女別棒グラフの更新（差分を色分け表示）
function updateGenderBarChart(maleData, femaleData) {
    const ctx = document.getElementById('genderComparisonBarChart');
    if (!ctx) return;
    
    if (window.genderComparisonBarChart && typeof window.genderComparisonBarChart.destroy === 'function') {
        window.genderComparisonBarChart.destroy();
    }
    
    const categories = Object.keys(categoryQuestions);
    
    const maleScores = categories.map(cat => {
        if (maleData.length === 0) return 0;
        const scores = maleData.map(item => item.categoryScores[cat]).filter(s => s !== undefined);
        return scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    });
    
    const femaleScores = categories.map(cat => {
        if (femaleData.length === 0) return 0;
        const scores = femaleData.map(item => item.categoryScores[cat]).filter(s => s !== undefined);
        return scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    });
    
    // 差分を計算して色分け
    const differences = maleScores.map((male, i) => male - femaleScores[i]);
    const backgroundColors = differences.map(diff => {
        if (Math.abs(diff) <= 5) return 'rgba(128, 128, 128, 0.6)'; // グレー（差が小さい）
        return diff > 0 ? 'rgba(0, 123, 255, 0.6)' : 'rgba(255, 20, 147, 0.6)'; // 青（男性高）、ピンク（女性高）
    });
    
    window.genderComparisonBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [
                {
                    label: '男性',
                    data: maleScores,
                    backgroundColor: 'rgba(0, 123, 255, 0.6)',
                    borderColor: 'rgba(0, 123, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: '女性',
                    data: femaleScores,
                    backgroundColor: 'rgba(255, 20, 147, 0.6)',
                    borderColor: 'rgba(255, 20, 147, 1)',
                    borderWidth: 1
                },
                {
                    label: '差分（男性-女性）',
                    data: differences,
                    backgroundColor: backgroundColors,
                    borderColor: backgroundColors.map(c => c.replace('0.6', '1')),
                    borderWidth: 1,
                    type: 'line',
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: { display: true, text: 'スコア' }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: { display: true, text: '差分' },
                    grid: { drawOnChartArea: false }
                }
            },
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

// 【強化】緊急アラートの更新（設問別低スコアアラート追加）
function updateAlerts() {
    const alertsContainer = document.getElementById('alertsContainer');
    alertsContainer.innerHTML = '';
    
    let alertCount = 0;
    
    // 1. 高リスク従業員アラート
    const highRiskEmployees = filteredData.filter(d => d.totalScore < 50);
    if (highRiskEmployees.length > 0) {
        highRiskEmployees.forEach(emp => {
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert-item danger';
            alertDiv.innerHTML = `
                <strong>⚠️ 高リスク従業員検出</strong>
                <p>社員コード: ${emp.employeeCode} | 部署: ${emp.department} | スコア: ${emp.totalScore.toFixed(1)}点</p>
            `;
            alertsContainer.appendChild(alertDiv);
            alertCount++;
        });
    }
    
    // 2. 部署別低スコアアラート
    const departmentSupport = {};
    filteredData.forEach(item => {
        if (!departmentSupport[item.department]) {
            departmentSupport[item.department] = [];
        }
        departmentSupport[item.department].push(item.categoryScores['上司のサポート']);
    });
    
    Object.keys(departmentSupport).forEach(dept => {
        const avgSupport = departmentSupport[dept].reduce((a, b) => a + b, 0) / departmentSupport[dept].length;
        if (avgSupport < 60) {
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert-item';
            alertDiv.innerHTML = `
                <strong>📉 部署アラート</strong>
                <p>${dept}の上司のサポート平均スコアが低下しています (${avgSupport.toFixed(1)}点)</p>
            `;
            alertsContainer.appendChild(alertDiv);
            alertCount++;
        }
    });
    
    // 3. 【新機能】設問別低スコアアラート（平均2.5以下、該当5人以上）
    const questionAlerts = detectLowScoreQuestions();
    questionAlerts.forEach(alert => {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert-item warning';
        alertDiv.innerHTML = `
            <strong>📌 設問別アラート</strong>
            <p><strong>Q${alert.questionNum}: ${alert.questionText}</strong></p>
            <p>カテゴリー: ${alert.category} | 平均スコア: ${alert.avgScore} / 5.0 | 該当従業員: ${alert.count}人</p>
        `;
        alertsContainer.appendChild(alertDiv);
        alertCount++;
    });
    
    if (alertCount === 0) {
        alertsContainer.innerHTML = '<p style="color: #28a745;">✅ 現在、緊急アラートはありません</p>';
    }
}

// 【新機能】設問別低スコア検出
function detectLowScoreQuestions() {
    const alerts = [];
    const categories = Object.keys(categoryQuestions);
    
    categories.forEach(category => {
        const questionNumbers = categoryQuestions[category];
        
        questionNumbers.forEach(qNum => {
            const answers = filteredData
                .map(item => {
                    if (item.answers && item.answers[qNum] !== undefined) {
                        return item.answers[qNum];
                    }
                    if (item[qNum] !== undefined) {
                        return item[qNum];
                    }
                    return null;
                })
                .filter(a => a !== null && a !== undefined);
            
            if (answers.length >= 5) {
                const avg = answers.reduce((a, b) => a + b, 0) / answers.length;
                if (avg <= 2.5) {
                    alerts.push({
                        questionNum: qNum,
                        questionText: questions[qNum - 1],
                        category: category,
                        avgScore: avg.toFixed(2),
                        count: answers.length
                    });
                }
            }
        });
    });
    
    return alerts;
}

// 10カテゴリー別レーダーチャートの更新
function updateExecutiveRadarChart() {
    const ctx = document.getElementById('executiveRadarChart');
    if (!ctx) return;
    
    if (window.executiveRadarChart && typeof window.executiveRadarChart.destroy === 'function') {
        window.executiveRadarChart.destroy();
    }
    
    const categories = [
        "心身の健康", "仕事の充実感", "成長機会", "上司のサポート", "部署内の人間関係",
        "評価・処遇", "会社への信頼", "働く環境", "総合満足度", "組織へのつながり"
    ];
    
    const currentScores = categories.map(cat => {
        const scores = filteredData
            .map(item => item.categoryScores[cat])
            .filter(score => score !== undefined && score !== null);
        return scores.length > 0 ? 
            (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : 0;
    });
    
    window.executiveRadarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: categories,
            datasets: [{
                label: '現在のスコア',
                data: currentScores,
                borderColor: 'rgba(0, 123, 255, 1)',
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
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

// データテーブルの更新
function updateDataTable() {
    const tbody = document.getElementById('dataTableBody');
    tbody.innerHTML = '';
    
    filteredData.forEach(item => {
        const tr = document.createElement('tr');
        const riskLevel = getRiskLevel(item.totalScore);
        const riskClass = riskLevel === 'high' ? 'risk-high' : riskLevel === 'medium' ? 'risk-medium' : 'risk-low';
        const riskLabel = riskLevel === 'high' ? '高' : riskLevel === 'medium' ? '中' : '低';
        
        tr.innerHTML = `
            <td>${item.employeeCode}</td>
            <td>${item.department}</td>
            <td>${item.gender}</td>
            <td>${new Date(item.timestamp).toLocaleString('ja-JP')}</td>
            <td>${item.totalScore.toFixed(1)}点</td>
            <td><span class="risk-badge ${riskClass}">${riskLabel}</span></td>
            <td><button class="btn btn-primary" onclick="viewDetail('${item.employeeCode}')">詳細</button></td>
        `;
        tbody.appendChild(tr);
    });
}

// 【強化】部署別比較の更新（部署選択機能追加）
function updateDepartmentComparison() {
    const departments = [...new Set(filteredData.map(d => d.department))];
    
    // 部署選択UIの生成
    const departmentSelectionContainer = document.getElementById('departmentSelection');
    if (departmentSelectionContainer) {
        departmentSelectionContainer.innerHTML = '<h4>比較する部署を選択:</h4>';
        departments.forEach(dept => {
            const label = document.createElement('label');
            label.style.marginRight = '15px';
            label.innerHTML = `
                <input type="checkbox" value="${dept}" onchange="toggleDepartmentSelection('${dept}')" ${selectedDepartments.includes(dept) ? 'checked' : ''}>
                ${dept}
            `;
            departmentSelectionContainer.appendChild(label);
        });
    }
    
    // 初期選択（全部署）
    if (selectedDepartments.length === 0) {
        selectedDepartments = departments;
    }
    
    // 部署カード表示
    const departmentCards = document.getElementById('departmentCards');
    if (departmentCards) {
        departmentCards.innerHTML = '';
        
        selectedDepartments.forEach(dept => {
            const deptData = filteredData.filter(d => d.department === dept);
            if (deptData.length > 0) {
                const avgScore = (deptData.reduce((sum, d) => sum + d.totalScore, 0) / deptData.length).toFixed(1);
                
                const card = document.createElement('div');
                card.className = 'department-card';
                card.innerHTML = `
                    <h3>${dept}</h3>
                    <div class="score">${avgScore}点</div>
                    <p>${deptData.length}人</p>
                `;
                departmentCards.appendChild(card);
            }
        });
    }
    
    updateDepartmentChart();
}

// 【新機能】部署選択トグル
function toggleDepartmentSelection(department) {
    const index = selectedDepartments.indexOf(department);
    if (index > -1) {
        selectedDepartments.splice(index, 1);
    } else {
        selectedDepartments.push(department);
    }
    updateDepartmentComparison();
}

// 【新機能】部署比較チャート表示形式切り替え
function switchDepartmentChartType(type) {
    departmentChartType = type;
    document.querySelectorAll('.chart-type-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    updateDepartmentChart();
}

// 【強化】部署別比較チャートの更新（レーダー・棒グラフ切り替え）
function updateDepartmentChart() {
    const ctx = document.getElementById('comparisonChart');
    if (!ctx) return;
    
    if (window.comparisonChart && typeof window.comparisonChart.destroy === 'function') {
        window.comparisonChart.destroy();
    }
    
    const categories = Object.keys(categoryQuestions);
    const datasets = selectedDepartments.map((dept, index) => {
        const deptData = filteredData.filter(d => d.department === dept);
        const scores = categories.map(cat => {
            const catScores = deptData.map(item => item.categoryScores[cat]).filter(s => s !== undefined);
            return catScores.length > 0 ? 
                (catScores.reduce((a, b) => a + b, 0) / catScores.length).toFixed(1) : 0;
        });
        
        const colors = [
            'rgba(102, 126, 234, 1)',
            'rgba(240, 147, 251, 1)',
            'rgba(52, 211, 153, 1)',
            'rgba(251, 191, 36, 1)',
            'rgba(239, 68, 68, 1)'
        ];
        
        return {
            label: dept,
            data: scores,
            borderColor: colors[index % colors.length],
            backgroundColor: colors[index % colors.length].replace('1)', departmentChartType === 'radar' ? '0.2)' : '0.6)'),
            borderWidth: 2
        };
    });
    
    window.comparisonChart = new Chart(ctx, {
        type: departmentChartType,
        data: {
            labels: categories,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: departmentChartType === 'radar' ? {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            } : {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// タブ切り替え
function switchTab(tabIndex) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach((tab, index) => {
        if (index === tabIndex) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach((content, index) => {
        if (index === tabIndex) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
}

// 【修正】トレンドチャート（実データから月次推移を自動計算）
function drawTrendChart() {
    const ctx = document.getElementById('trendChart');
    if (!ctx) return;
    
    if (window.trendChart && typeof window.trendChart.destroy === 'function') {
        window.trendChart.destroy();
    }
    
    // 実データから月次データを抽出
    const monthlyData = {};
    filteredData.forEach(item => {
        const date = new Date(item.timestamp);
        const yearMonth = `${date.getFullYear()}年${(date.getMonth() + 1)}月`;
        
        if (!monthlyData[yearMonth]) {
            monthlyData[yearMonth] = {
                scores: [],
                categoryScores: {},
                riskHigh: 0,
                riskMedium: 0,
                riskLow: 0
            };
        }
        
        monthlyData[yearMonth].scores.push(item.totalScore);
        
        Object.keys(categoryQuestions).forEach(cat => {
            if (!monthlyData[yearMonth].categoryScores[cat]) {
                monthlyData[yearMonth].categoryScores[cat] = [];
            }
            monthlyData[yearMonth].categoryScores[cat].push(item.categoryScores[cat]);
        });
        
        const riskLevel = getRiskLevel(item.totalScore);
        if (riskLevel === 'high') monthlyData[yearMonth].riskHigh++;
        else if (riskLevel === 'medium') monthlyData[yearMonth].riskMedium++;
        else monthlyData[yearMonth].riskLow++;
    });
    
    const labels = Object.keys(monthlyData).sort();
    
    if (currentTrendView === 'overall') {
        const overallScores = labels.map(month => {
            const avg = monthlyData[month].scores.reduce((a, b) => a + b, 0) / monthlyData[month].scores.length;
            return avg.toFixed(1);
        });
        
        window.trendChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: '平均エンゲージメントスコア',
                    data: overallScores,
                    borderColor: 'rgba(0, 123, 255, 1)',
                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: { display: true, text: 'スコア(100点満点)' }
                    }
                }
            }
        });
    } else if (currentTrendView === 'category') {
        const categories = Object.keys(categoryQuestions);
        const colors = [
            'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)',
            'rgba(201, 203, 207, 1)', 'rgba(255, 99, 255, 1)', 'rgba(0, 204, 102, 1)',
            'rgba(102, 51, 0, 1)'
        ];
        
        const datasets = categories.map((cat, i) => {
            const data = labels.map(month => {
                const scores = monthlyData[month].categoryScores[cat];
                return scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : 0;
            });
            
            return {
                label: cat,
                data: data,
                borderColor: colors[i],
                backgroundColor: colors[i].replace('1)', '0.1)'),
                tension: 0.3,
                fill: false,
                borderWidth: 2
            };
        });
        
        window.trendChart = new Chart(ctx, {
            type: 'line',
            data: { labels: labels, datasets: datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: { display: true, text: 'スコア(100点満点)' }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'right',
                        labels: { boxWidth: 12, font: { size: 10 } }
                    }
                }
            }
        });
    } else if (currentTrendView === 'risk') {
        const riskHigh = labels.map(month => monthlyData[month].riskHigh);
        const riskMedium = labels.map(month => monthlyData[month].riskMedium);
        const riskLow = labels.map(month => monthlyData[month].riskLow);
        
        window.trendChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: '高リスク(<50点)',
                        data: riskHigh,
                        backgroundColor: 'rgba(255, 99, 132, 0.8)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: '中リスク(50-70点)',
                        data: riskMedium,
                        backgroundColor: 'rgba(255, 159, 64, 0.8)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 1
                    },
                    {
                        label: '低リスク(70点以上)',
                        data: riskLow,
                        backgroundColor: 'rgba(75, 192, 192, 0.8)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { stacked: false },
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: '人数(名)' },
                        ticks: { stepSize: 5 }
                    }
                }
            }
        });
    }
}

function changeTrendView(view) {
    currentTrendView = view;
    document.querySelectorAll('.trend-view-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    drawTrendChart();
}

function togglePreviousComparison() {
    const checkbox = document.getElementById('showPreviousComparison');
    if (checkbox.checked) {
        alert('前回診断データとの比較機能は今後実装予定です');
        checkbox.checked = false;
    }
}

// CSV エクスポート
function exportCSV() {
    const headers = ['社員コード', '部署', '性別', '診断日時', '総合スコア', 'リスクレベル'];
    const rows = filteredData.map(item => [
        item.employeeCode,
        item.department,
        item.gender,
        new Date(item.timestamp).toLocaleString('ja-JP'),
        item.totalScore.toFixed(1),
        getRiskLevel(item.totalScore)
    ]);
    
    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
        csv += row.join(',') + '\n';
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `診断データ_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
}

// レポート自動生成機能（Excel形式）
function generateDetailedReport() {
    if (filteredData.length === 0) {
        alert('データがありません。フィルタを確認してください。');
        return;
    }
    
    const workbook = XLSX.utils.book_new();
    
    const summarySheet = createSummarySheet();
    XLSX.utils.book_append_sheet(workbook, summarySheet, "サマリー");
    
    const categorySheet = createCategoryScoreSheet();
    XLSX.utils.book_append_sheet(workbook, categorySheet, "カテゴリー別スコア");
    
    const departmentSheet = createDepartmentSheet();
    XLSX.utils.book_append_sheet(workbook, departmentSheet, "部署別集計");
    
    const genderSheet = createGenderComparisonSheet();
    XLSX.utils.book_append_sheet(workbook, genderSheet, "性別比較");
    
    const questionSheet = createQuestionDistributionSheet();
    XLSX.utils.book_append_sheet(workbook, questionSheet, "設問別回答分布");
    
    const detailSheet = createDetailDataSheet();
    XLSX.utils.book_append_sheet(workbook, detailSheet, "個別データ");
    
    const fileName = `エンゲージメント調査レポート_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
    
    alert(`レポート「${fileName}」を生成しました`);
}

function createSummarySheet() {
    const total = filteredData.length;
    const avgScore = (filteredData.reduce((sum, d) => sum + d.totalScore, 0) / total).toFixed(1);
    const highRisk = filteredData.filter(d => d.totalScore < 50).length;
    const mediumRisk = filteredData.filter(d => d.totalScore >= 50 && d.totalScore < 70).length;
    const lowRisk = filteredData.filter(d => d.totalScore >= 70).length;
    
    const data = [
        ['エンゲージメント調査サマリー'],
        [],
        ['生成日時', new Date().toLocaleString('ja-JP')],
        ['対象データ件数', total + '件'],
        [],
        ['全体平均スコア', avgScore + '点'],
        [],
        ['リスク分布'],
        ['高リスク（<50点）', highRisk + '人', ((highRisk/total)*100).toFixed(1) + '%'],
        ['中リスク（50-70点）', mediumRisk + '人', ((mediumRisk/total)*100).toFixed(1) + '%'],
        ['低リスク（70点以上）', lowRisk + '人', ((lowRisk/total)*100).toFixed(1) + '%']
    ];
    
    return XLSX.utils.aoa_to_sheet(data);
}

function createCategoryScoreSheet() {
    const categories = Object.keys(categoryQuestions);
    const data = [
        ['カテゴリー', '平均スコア', '最高スコア', '最低スコア']
    ];
    
    categories.forEach(cat => {
        const scores = filteredData
            .map(item => item.categoryScores[cat])
            .filter(score => score !== undefined && score !== null);
        
        if (scores.length > 0) {
            const avg = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
            const max = Math.max(...scores).toFixed(1);
            const min = Math.min(...scores).toFixed(1);
            data.push([cat, avg, max, min]);
        }
    });
    
    return XLSX.utils.aoa_to_sheet(data);
}

function createDepartmentSheet() {
    const departments = [...new Set(filteredData.map(d => d.department))];
    const categories = Object.keys(categoryQuestions);
    
    const header = ['部署', '人数', '平均スコア', ...categories];
    const data = [header];
    
    departments.forEach(dept => {
        const deptData = filteredData.filter(d => d.department === dept);
        const count = deptData.length;
        const avgTotal = (deptData.reduce((sum, d) => sum + d.totalScore, 0) / count).toFixed(1);
        
        const categoryAvgs = categories.map(cat => {
            const scores = deptData.map(item => item.categoryScores[cat]);
            return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
        });
        
        data.push([dept, count, avgTotal, ...categoryAvgs]);
    });
    
    return XLSX.utils.aoa_to_sheet(data);
}

function createGenderComparisonSheet() {
    const categories = Object.keys(categoryQuestions);
    const maleData = filteredData.filter(d => d.gender === '男性');
    const femaleData = filteredData.filter(d => d.gender === '女性');
    
    const data = [
        ['カテゴリー', '男性平均', '女性平均', '差分']
    ];
    
    categories.forEach(cat => {
        const maleScores = maleData.map(item => item.categoryScores[cat]);
        const femaleScores = femaleData.map(item => item.categoryScores[cat]);
        
        const maleAvg = maleScores.length > 0 ? 
            (maleScores.reduce((a, b) => a + b, 0) / maleScores.length).toFixed(1) : 0;
        const femaleAvg = femaleScores.length > 0 ? 
            (femaleScores.reduce((a, b) => a + b, 0) / femaleScores.length).toFixed(1) : 0;
        const diff = (maleAvg - femaleAvg).toFixed(1);
        
        data.push([cat, maleAvg, femaleAvg, diff]);
    });
    
    const maleTotalAvg = maleData.length > 0 ?
        (maleData.reduce((sum, d) => sum + d.totalScore, 0) / maleData.length).toFixed(1) : 0;
    const femaleTotalAvg = femaleData.length > 0 ?
        (femaleData.reduce((sum, d) => sum + d.totalScore, 0) / femaleData.length).toFixed(1) : 0;
    const totalDiff = (maleTotalAvg - femaleTotalAvg).toFixed(1);
    
    data.push([]);
    data.push(['総合スコア', maleTotalAvg, femaleTotalAvg, totalDiff]);
    
    return XLSX.utils.aoa_to_sheet(data);
}

function createQuestionDistributionSheet() {
    const data = [
        ['設問番号', 'カテゴリー', '回答1', '回答2', '回答3', '回答4', '回答5', '平均スコア', '回答数']
    ];
    
    const categories = Object.keys(categoryQuestions);
    
    categories.forEach(category => {
        const questionNumbers = categoryQuestions[category];
        
        questionNumbers.forEach(qNum => {
            const answers = filteredData
                .map(item => {
                    if (item.answers && item.answers[qNum] !== undefined) {
                        return item.answers[qNum];
                    }
                    if (item[qNum] !== undefined) {
                        return item[qNum];
                    }
                    return null;
                })
                .filter(a => a !== null && a !== undefined);
            
            if (answers.length > 0) {
                const count1 = answers.filter(a => a === 1).length;
                const count2 = answers.filter(a => a === 2).length;
                const count3 = answers.filter(a => a === 3).length;
                const count4 = answers.filter(a => a === 4).length;
                const count5 = answers.filter(a => a === 5).length;
                const avg = (answers.reduce((a, b) => a + b, 0) / answers.length).toFixed(2);
                
                data.push([
                    `Q${qNum}`,
                    category,
                    count1,
                    count2,
                    count3,
                    count4,
                    count5,
                    avg,
                    answers.length
                ]);
            }
        });
    });
    
    return XLSX.utils.aoa_to_sheet(data);
}

function createDetailDataSheet() {
    const categories = Object.keys(categoryQuestions);
    const header = ['社員コード', '部署', '性別', '診断日時', '総合スコア', 'リスクレベル', ...categories];
    const data = [header];
    
    filteredData.forEach(item => {
        const riskLevel = getRiskLevel(item.totalScore);
        const riskLabel = riskLevel === 'high' ? '高' : riskLevel === 'medium' ? '中' : '低';
        
        const categoryScores = categories.map(cat => 
            item.categoryScores[cat] ? item.categoryScores[cat].toFixed(1) : '0'
        );
        
        data.push([
            item.employeeCode,
            item.department,
            item.gender,
            new Date(item.timestamp).toLocaleString('ja-JP'),
            item.totalScore.toFixed(1),
            riskLabel,
            ...categoryScores
        ]);
    });
    
    return XLSX.utils.aoa_to_sheet(data);
}

function generateExecutivePDF() {
    alert('PDFレポート生成機能は今後実装予定です');
}

function viewDetail(employeeCode) {
    const employee = allData.find(d => d.employeeCode === employeeCode);
    if (!employee) return;
    
    alert(`社員コード: ${employee.employeeCode}\n部署: ${employee.department}\n総合スコア: ${employee.totalScore.toFixed(1)}点\n\n詳細表示機能は今後実装予定です`);
}
