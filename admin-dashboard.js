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
let currentTrendView = 'all';
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
    const companyFilter = document.getElementById('companyFilter');
    companyFilter.innerHTML = '<option value="all">全社</option>';
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
    const riskFilter = document.getElementById('riskFilter').value;
    const genderFilter = document.getElementById('genderFilter').value;
    
    filteredData = allData.filter(item => {
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
                    borderColor: 'rgba(102, 126, 234, 1)',
                    backgroundColor: 'rgba(102, 126, 234, 0.2)',
                    borderWidth: 2
                },
                {
                    label: '女性',
                    data: femaleScores,
                    borderColor: 'rgba(240, 147, 251, 1)',
                    backgroundColor: 'rgba(240, 147, 251, 0.2)',
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
                borderColor: 'rgba(102, 126, 234, 1)',
                backgroundColor: 'rgba(102, 126, 234, 0.2)',
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
function changeTrendView(view) {
    currentTrendView = view;
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    drawTrendChart();
}

// トレンド期間の変更
function changeTrendPeriod(months) {
    currentTrendPeriod = months;
    drawTrendChart();
}

// トレンドチャートの描画
function drawTrendChart() {
    const ctx = document.getElementById('trendChart');
    if (!ctx) return;
    
    if (window.trendChart) {
        window.trendChart.destroy();
    }
    
    window.trendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
            datasets: [{
                label: '平均スコア',
                data: [65, 67, 70, 68, 72, 75],
                borderColor: 'rgba(102, 126, 234, 1)',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
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
