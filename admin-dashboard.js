// API設定
const API_ENDPOINT = 'https://engagement-survey-api.more-up.workers.dev';

// 10カテゴリ定義（app.jsと完全一致）
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

// グローバル変数
let allData = [];
let filteredData = [];
let currentTrendView = 'overall'; // 'overall', 'category', 'risk'
let currentTrendPeriod = 6;

// データの読み込み
async function loadData() {
    try {
        const response = await fetch(`${API_ENDPOINT}/api/diagnostics`);
        const data = await response.json();
        
        // APIから返ってきたデータをそのまま使用（既にcategoryScoresとtotalScoreが100点満点で含まれている）
        allData = data;
        filteredData = data;
        
        // フィルターの初期化
        initializeFilters();
        
        // 各タブのデータを更新
        updateAllTabs();
    } catch (error) {
        console.error('データ読み込みエラー:', error);
        alert('データの読み込みに失敗しました');
    }
}

// フィルターの初期化
function initializeFilters() {
    // 企業フィルターの初期化
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
    
    // 部署フィルターの初期化
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
}

// 男女別レーダーチャートの更新
function updateGenderRadarChart(maleData, femaleData) {
    const ctx = document.getElementById('genderComparisonRadarChart');
    if (!ctx) return;
    
    if (window.genderComparisonRadarChart && typeof window.genderComparisonRadarChart.destroy === 'function') {
        window.genderComparisonRadarChart.destroy();
    }
    
    // レーダーチャート用の短縮ラベル（正しい表記）
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

// 緊急アラートの更新
function updateAlerts() {
    const alertsContainer = document.getElementById('alertsContainer');
    alertsContainer.innerHTML = '';
    
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
        });
    }
    
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
        }
    });
    
    if (alertsContainer.innerHTML === '') {
        alertsContainer.innerHTML = '<p style="color: #28a745;">✅ 現在、緊急アラートはありません</p>';
    }
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

// 部署別比較の更新
function updateDepartmentComparison() {
    const departments = [...new Set(filteredData.map(d => d.department))];
    const departmentCards = document.getElementById('departmentCards');
    departmentCards.innerHTML = '';
    
    departments.forEach(dept => {
        const deptData = filteredData.filter(d => d.department === dept);
        const avgScore = (deptData.reduce((sum, d) => sum + d.totalScore, 0) / deptData.length).toFixed(1);
        
        const card = document.createElement('div');
        card.className = 'department-card';
        card.innerHTML = `
            <h3>${dept}</h3>
            <div class="score">${avgScore}点</div>
            <p>${deptData.length}人</p>
        `;
        departmentCards.appendChild(card);
    });
    
    updateDepartmentChart(departments);
}

// 部署別比較チャートの更新
function updateDepartmentChart(departments) {
    const ctx = document.getElementById('comparisonChart');
    if (!ctx) return;
    
    if (window.comparisonChart && typeof window.comparisonChart.destroy === 'function') {
        window.comparisonChart.destroy();
    }
    
    const categories = Object.keys(categoryQuestions);
    const datasets = departments.map((dept, index) => {
        const deptData = filteredData.filter(d => d.department === dept);
        const scores = categories.map(cat => {
            const catScores = deptData.map(item => item.categoryScores[cat]);
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
            backgroundColor: colors[index % colors.length].replace('1)', '0.2)'),
            borderWidth: 2
        };
    });
    
    window.comparisonChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: categories,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
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

// トレンドビューの変更
// グローバル変数として現在の表示モードを保持

// 改善トレンド表示の切り替え
function changeTrendView(view) {
    currentTrendView = view;
    
    // ボタンのアクティブ状態を更新
    document.querySelectorAll('.trend-view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // グラフを再描画
    drawTrendChart();
}

// 期間変更(まだダミーデータなので未実装)
function changeTrendPeriod(period) {
    // 期間ボタンのアクティブ状態を更新
    document.querySelectorAll('.trend-period-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // グラフを再描画
    drawTrendChart();
}

// トレンドチャートの描画(メイン関数)
function drawTrendChart() {
    const ctx = document.getElementById('trendChart');
    if (!ctx) return;
    
    // 既存のチャートを破棄
    if (window.trendChart && typeof window.trendChart.destroy === 'function') {
        window.trendChart.destroy();
    }
    
    // 表示モードに応じてチャートタイプとデータを切り替え
    if (currentTrendView === 'overall') {
        drawOverallTrend(ctx);
    } else if (currentTrendView === 'category') {
        drawCategoryTrend(ctx);
    } else if (currentTrendView === 'risk') {
        drawRiskTrend(ctx);
    }
}

// ① 総合スコア推移(折れ線グラフ・1本)
function drawOverallTrend(ctx) {
    window.trendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2024年10月', '2024年11月', '2024年12月', '2025年1月', '2025年2月', '2025年3月'],
            datasets: [{
                label: '平均エンゲージメントスコア',
                data: [58, 61, 65, 68, 71, 74],
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
                    title: {
                        display: true,
                        text: 'スコア(100点満点)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
}

// ② カテゴリー別推移(折れ線グラフ・10本)
function drawCategoryTrend(ctx) {
    const categories = [
        { name: '心身の健康', color: 'rgba(255, 99, 132, 1)', data: [55, 58, 62, 65, 68, 71] },
        { name: '仕事の充実感', color: 'rgba(54, 162, 235, 1)', data: [60, 62, 64, 66, 69, 72] },
        { name: '成長機会', color: 'rgba(255, 206, 86, 1)', data: [52, 55, 58, 61, 65, 68] },
        { name: '上司のサポート', color: 'rgba(75, 192, 192, 1)', data: [58, 60, 63, 66, 70, 73] },
        { name: '部署内の人間関係', color: 'rgba(153, 102, 255, 1)', data: [62, 64, 66, 68, 71, 74] },
        { name: '評価・処遇', color: 'rgba(255, 159, 64, 1)', data: [50, 53, 56, 59, 63, 67] },
        { name: '会社への信頼', color: 'rgba(201, 203, 207, 1)', data: [57, 59, 62, 65, 68, 71] },
        { name: '働く環境', color: 'rgba(255, 99, 255, 1)', data: [61, 63, 65, 68, 71, 74] },
        { name: '総合満足度', color: 'rgba(0, 204, 102, 1)', data: [56, 59, 62, 66, 69, 72] },
        { name: '組織へのつながり', color: 'rgba(102, 51, 0, 1)', data: [54, 57, 60, 64, 67, 70] }
    ];
    
    const datasets = categories.map(cat => ({
        label: cat.name,
        data: cat.data,
        borderColor: cat.color,
        backgroundColor: cat.color.replace('1)', '0.1)'),
        tension: 0.3,
        fill: false,
        borderWidth: 2
    }));
    
    window.trendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2024年10月', '2024年11月', '2024年12月', '2025年1月', '2025年2月', '2025年3月'],
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'スコア(100点満点)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        boxWidth: 12,
                        font: {
                            size: 10
                        }
                    }
                }
            }
        }
    });
}

// ③ リスク人数推移(縦棒グラフ・3色×月)
function drawRiskTrend(ctx) {
    window.trendChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['2024年10月', '2024年11月', '2024年12月', '2025年1月', '2025年2月', '2025年3月'],
            datasets: [
                {
                    label: '高リスク(<50点)',
                    data: [20, 18, 15, 12, 10, 8],
                    backgroundColor: 'rgba(255, 99, 132, 0.8)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: '中リスク(50-70点)',
                    data: [25, 24, 26, 25, 23, 22],
                    backgroundColor: 'rgba(255, 159, 64, 0.8)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1
                },
                {
                    label: '低リスク(70点以上)',
                    data: [15, 18, 19, 23, 27, 30],
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
                x: {
                    stacked: false
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '人数(名)'
                    },
                    ticks: {
                        stepSize: 5
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
}
// 前回診断との比較切り替え
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

// 詳細レポート生成
function generateDetailedReport() {
    alert('詳細レポート生成機能は今後実装予定です');
}

// 役員会用PDFレポート生成
function generateExecutivePDF() {
    alert('PDFレポート生成機能は今後実装予定です');
}

// 個別従業員の詳細表示
function viewDetail(employeeCode) {
    const employee = allData.find(d => d.employeeCode === employeeCode);
    if (!employee) return;
    
    alert(`社員コード: ${employee.employeeCode}\n部署: ${employee.department}\n総合スコア: ${employee.totalScore.toFixed(1)}点\n\n詳細表示機能は今後実装予定です`);
}
