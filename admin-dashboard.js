// API エンドポイント
const API_ENDPOINT = 'https://engagement-survey-api.more-up.workers.dev';

// 重要設問の定義（リスク判定に使用）
const criticalQuestions = {
    "心理的安全性": [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
    "上司のサポート": [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
    "ワークライフバランス": [50, 51, 52, 53, 54, 55, 56, 57, 58, 59]
};

// グローバル変数
let allData = [];
let filteredData = [];
let currentTrendView = 'all';
let currentTrendPeriod = 6;

// 認証
function authenticate() {
    const password = document.getElementById('passwordInput').value;
    if (password === 'moreup-japan') {
        document.getElementById('authSection').style.display = 'none';
        document.getElementById('dashboardSection').style.display = 'block';
        loadData();
    } else {
        alert('パスワードが正しくありません');
    }
}

// データの読み込み
async function loadData() {
    try {
        const response = await fetch(`${API_ENDPOINT}/api/survey/results`);
        
        // レスポンスの確認
        if (!response.ok) {
            throw new Error(`HTTPエラー: ${response.status}`);
        }
        
        const data = await response.json();
        
        // データが配列かチェック
        if (Array.isArray(data)) {
            allData = data;
            filteredData = data;
        } else if (data && Array.isArray(data.results)) {
            // APIが {results: [...]} 形式で返す場合
            allData = data.results;
            filteredData = data.results;
        } else {
            // データがない場合は空配列
            console.warn('データが配列形式ではありません:', data);
            allData = [];
            filteredData = [];
        }
        
        // データが0件の場合の処理
        if (allData.length === 0) {
            console.log('データが0件です。テストデータを作成してください。');
            alert('診断データがまだありません。\n\n30人分のテストデータを作成しますか？');
        }

        
        // フィルターの初期化
        initializeFilters();
        
        // 各タブのデータを更新
        updateAllTabs();
    } catch (error) {
        console.error('データ読み込みエラー:', error);
        alert('データの読み込みに失敗しました: ' + error.message);
    }
}

// フィルターの初期化
function initializeFilters() {
    // 企業フィルター
    const companies = [...new Set(allData.map(d => d.companyCode))];
    const companyFilter = document.getElementById('companyFilter');
    companyFilter.innerHTML = '<option value="all">全社</option>';
    companies.forEach(company => {
        const option = document.createElement('option');
        option.value = company;
        option.textContent = company;
        if (company === '株式会社テスト') {
            option.selected = true;
        }
        companyFilter.appendChild(option);
    });
    
    // 部署フィルター
    const departments = [...new Set(allData.map(d => d.department))];
    const departmentFilter = document.getElementById('departmentFilter');
    departmentFilter.innerHTML = '<option value="all">全部署</option>';
    departments.forEach(dept => {
        const option = document.createElement('option');
        option.value = dept;
        option.textContent = dept;
        departmentFilter.appendChild(option);
    });
    
    // 初期フィルター適用（株式会社テストのみ）
    applyFilters();
}

// フィルターの適用
function applyFilters() {
    const companyFilter = document.getElementById('companyFilter').value;
    const departmentFilter = document.getElementById('departmentFilter').value;
    const riskFilter = document.getElementById('riskFilter').value;
    const genderFilter = document.getElementById('genderFilter').value;
    
    filteredData = allData.filter(item => {
        // 企業フィルター
        if (companyFilter !== 'all' && item.companyCode !== companyFilter) {
            return false;
        }
        
        // 部署フィルター
        if (departmentFilter !== 'all' && item.department !== departmentFilter) {
            return false;
        }
        
        // リスクレベルフィルター
        if (riskFilter !== 'all') {
            const risk = calculateRiskLevel(item);
            if (risk !== riskFilter) {
                return false;
            }
        }
        
        // 性別フィルター
        if (genderFilter !== 'all' && item.gender !== genderFilter) {
            return false;
        }
        
        return true;
    });
    
    updateAllTabs();
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
    updateExecutiveAlerts();
    updateExecutiveRadarChart();
    drawTrendChart();
}

// 統計カードの更新
function updateStatCards() {
    let highRisk = 0, mediumRisk = 0, lowRisk = 0;
    let totalScore = 0;
    
    filteredData.forEach(item => {
        const risk = calculateRiskLevel(item);
        if (risk === 'high') highRisk++;
        else if (risk === 'medium') mediumRisk++;
        else lowRisk++;
        
        totalScore += item.totalScore;
    });
    
    // 100点満点換算
    const avgScore = filteredData.length > 0 ? (totalScore / filteredData.length) / 5 : 0;
    
    document.getElementById('highRiskCount').textContent = highRisk;
    document.getElementById('mediumRiskCount').textContent = mediumRisk;
    document.getElementById('lowRiskCount').textContent = lowRisk;
    document.getElementById('totalCount').textContent = filteredData.length;
    document.getElementById('avgScore').textContent = avgScore.toFixed(1);
}

// 男女比統計の更新
function updateGenderStats() {
    const maleData = filteredData.filter(d => d.gender === '男性');
    const femaleData = filteredData.filter(d => d.gender === '女性');
    
    const maleCount = maleData.length;
    const femaleCount = femaleData.length;
    const total = maleCount + femaleCount;
    
    // 比率計算
    const maleRatio = total > 0 ? ((maleCount / total) * 100).toFixed(1) : 0;
    const femaleRatio = total > 0 ? ((femaleCount / total) * 100).toFixed(1) : 0;
    
    // 平均スコア計算 (100点満点に変換)
    const maleAvg = maleCount > 0 
        ? ((maleData.reduce((sum, d) => sum + d.totalScore, 0) / maleCount) / 5).toFixed(1)
        : 0;
    const femaleAvg = femaleCount > 0 
        ? ((femaleData.reduce((sum, d) => sum + d.totalScore, 0) / femaleCount) / 5).toFixed(1)
        : 0;
    
    // 表示更新
    document.getElementById('maleRatio').textContent = `${maleRatio}%`;
    document.getElementById('maleCount').textContent = `${maleCount}人`;
    document.getElementById('maleAvgScore').textContent = maleAvg;
    
    document.getElementById('femaleRatio').textContent = `${femaleRatio}%`;
    document.getElementById('femaleCount').textContent = `${femaleCount}人`;
    document.getElementById('femaleAvgScore').textContent = femaleAvg;
    
    // 男女別レーダーチャート更新
    updateGenderRadarChart();
    // 男女別レーダーチャート更新関数
function updateGenderRadarChart() {
    const maleData = filteredData.filter(d => d.gender === '男性');
    const femaleData = filteredData.filter(d => d.gender === '女性');
    
    const categories = [
        '心身の健康', '仕事の充実感', '成長機会', '上司のサポート', '部署内の人間関係',
        '評価・処遇', '会社への信頼', '働く環境', '総合満足度', '組織へのつながり'
    ];
    
    // 男性カテゴリ平均
    const maleAvgScores = categories.map(cat => {
        if (maleData.length === 0) return 0;
        const scores = maleData.map(d => d.categoryScores[cat] || 0);
        return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
    });
    
    // 女性カテゴリ平均
    const femaleAvgScores = categories.map(cat => {
        if (femaleData.length === 0) return 0;
        const scores = femaleData.map(d => d.categoryScores[cat] || 0);
        return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
    });
    
    const canvas = document.getElementById('genderRadarChart');
    const ctx = canvas.getContext('2d');
    
    // 既存のチャートがあれば破棄
    if (window.genderRadarChartInstance) {
        window.genderRadarChartInstance.destroy();
    }
    
    // 新しいチャート作成
    window.genderRadarChartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: categories,
            datasets: [
                {
                    label: '男性',
                    data: maleAvgScores,
                    backgroundColor: 'rgba(102, 126, 234, 0.2)',
                    borderColor: 'rgba(102, 126, 234, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(102, 126, 234, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(102, 126, 234, 1)'
                },
                {
                    label: '女性',
                    data: femaleAvgScores,
                    backgroundColor: 'rgba(240, 147, 251, 0.2)',
                    borderColor: 'rgba(240, 147, 251, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(240, 147, 251, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(240, 147, 251, 1)'
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
                    ticks: {
                        stepSize: 20
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });
}

}

// リスクレベルの計算（100点満点換算）
function calculateRiskLevel(item) {
    const score = item.totalScore / 5; // 100点満点換算
    if (score < 50) return 'high';
    if (score < 70) return 'medium';
    return 'low';
}

// 緊急アラートの更新
function updateExecutiveAlerts() {
    const alertsContainer = document.getElementById('alertsContainer');
    alertsContainer.innerHTML = '';
    
    // 高リスク従業員の検出
    const highRiskEmployees = filteredData.filter(item => calculateRiskLevel(item) === 'high');
    
    if (highRiskEmployees.length > 0) {
        const alert = document.createElement('div');
        alert.className = 'alert-item danger';
        alert.innerHTML = `
            <strong>⚠️ 高リスク従業員: ${highRiskEmployees.length}名</strong>
            <p>総合スコア50点未満の従業員が${highRiskEmployees.length}名います。早急な面談とサポートが必要です。</p>
        `;
        alertsContainer.appendChild(alert);
    }
    
    // 上司のサポートが低い部署の検出
    const departmentSupport = {};
    filteredData.forEach(item => {
        if (!departmentSupport[item.department]) {
            departmentSupport[item.department] = [];
        }
        const supportScore = item.categoryScores['上司のサポート'] || 0;
        departmentSupport[item.department].push(supportScore);
    });
    
    Object.keys(departmentSupport).forEach(dept => {
        const avgSupport = departmentSupport[dept].reduce((a, b) => a + b, 0) / departmentSupport[dept].length;
        if (avgSupport < 60) {
            const alert = document.createElement('div');
            alert.className = 'alert-item';
            alert.innerHTML = `
                <strong>📢 ${dept}: 上司のサポート不足</strong>
                <p>平均スコア: ${avgSupport.toFixed(1)}点 - マネージャー研修の実施を推奨します。</p>
            `;
            alertsContainer.appendChild(alert);
        }
    });
    
    if (alertsContainer.children.length === 0) {
        alertsContainer.innerHTML = '<p style="color: #28a745; font-weight: bold;">✅ 現在、緊急対応が必要なアラートはありません。</p>';
    }
}

// レーダーチャートの更新
function updateExecutiveRadarChart() {
    // Chart.jsが読み込まれているか確認
    if (typeof Chart === 'undefined') {
        console.error('Chart.jsが読み込まれていません');
        return;
    }
    
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
    
    // 現在のスコア計算
    const currentScores = categories.map(cat => {
        const scores = filteredData.map(item => item.categoryScores[cat] || 0);
        return scores.length > 0 
            ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)
            : 0;
    });
    
    // 前回スコア（シミュレーションデータ - 実際はAPIから取得）
    const previousScores = currentScores.map(score => {
        const variation = (Math.random() - 0.5) * 10;
        return Math.max(0, Math.min(100, parseFloat(score) + variation)).toFixed(1);
    });
    
    const ctx = document.getElementById('executiveRadarChart');
    
    // 既存のチャートを破棄
    if (window.executiveRadarChart && typeof window.executiveRadarChart.destroy === 'function') {
        window.executiveRadarChart.destroy();
    }
    
    const showPrevious = document.getElementById('showPreviousComparison').checked;
    
    const datasets = [{
        label: '現在の診断',
        data: currentScores,
        backgroundColor: 'rgba(52, 152, 219, 0.2)',
        borderColor: 'rgba(52, 152, 219, 1)',
        pointBackgroundColor: 'rgba(52, 152, 219, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(52, 152, 219, 1)'
    }];
    
    if (showPrevious) {
        datasets.push({
            label: '前回診断',
            data: previousScores,
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            pointBackgroundColor: 'rgba(255, 159, 64, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255, 159, 64, 1)'
        });
    }
    
    window.executiveRadarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: categories,
            datasets: datasets
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
                    display: showPrevious
                }
            }
        }
    });
}

// 前回比較の切り替え
function togglePreviousComparison() {
    updateExecutiveRadarChart();
}

// トレンドチャートの描画
function drawTrendChart() {
    // Chart.jsが読み込まれているか確認
    if (typeof Chart === 'undefined') {
        console.error('Chart.jsが読み込まれていません');
        return;
    }
    
    const ctx = document.getElementById('trendChart');
    
    // 既存のチャートを破棄
    if (window.trendChart && typeof window.trendChart.destroy === 'function') {
        window.trendChart.destroy();
    }
    
    // シミュレーションデータ生成（実際はAPIから取得）
    const months = [];
    const dataPoints = [];
    
    for (let i = currentTrendPeriod - 1; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        months.push(`${date.getFullYear()}/${date.getMonth() + 1}`);
        
        // ベーススコアに変動を加える（100点満点）
        const baseScore = 65;
        const trend = (currentTrendPeriod - i) * 0.5;
        const noise = (Math.random() - 0.5) * 5;
        dataPoints.push((baseScore + trend + noise).toFixed(1));
    }
    
    window.trendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: '平均エンゲージメントスコア',
                data: dataPoints,
                borderColor: 'rgba(52, 152, 219, 1)',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            },
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });
}

// トレンドビューの変更
function changeTrendView(view) {
    currentTrendView = view;
    
    // ボタンのアクティブ状態を更新
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    drawTrendChart();
}

// トレンド期間の変更
function changeTrendPeriod(period) {
    currentTrendPeriod = period;
    
    // ボタンのアクティブ状態を更新
    const buttons = document.querySelectorAll('.trend-section .btn-secondary');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    drawTrendChart();
}

// データテーブルの更新
function updateDataTable() {
    const tbody = document.getElementById('dataTableBody');
    tbody.innerHTML = '';
    
    // 従業員コードでソート（若い順）
    const sortedData = [...filteredData].sort((a, b) => {
        const codeA = a.employeeCode.replace(/[^0-9]/g, '');
        const codeB = b.employeeCode.replace(/[^0-9]/g, '');
        return parseInt(codeA) - parseInt(codeB);
    });
    
    sortedData.forEach(item => {
        const row = document.createElement('tr');
        const risk = calculateRiskLevel(item);
        const riskClass = risk === 'high' ? 'risk-high' : risk === 'medium' ? 'risk-medium' : 'risk-low';
        const riskText = risk === 'high' ? '高' : risk === 'medium' ? '中' : '低';
        
        // 100点満点換算
        const score100 = (item.totalScore / 5).toFixed(1);
        
        // 日本時間に変換
        const timestamp = new Date(item.timestamp + 'Z'); // UTCとして扱う
        const jpTime = new Date(timestamp.getTime() + (9 * 60 * 60 * 1000)); // +9時間
        
        row.innerHTML = `
            <td>${item.employeeCode}</td>
            <td>${item.department}</td>
            <td>${item.gender || '-'}</td>
            <td>${jpTime.toLocaleString('ja-JP')}</td>
            <td>${score100}</td>
            <td><span class="risk-badge ${riskClass}">${riskText}</span></td>
            <td><button class="btn btn-primary" onclick="viewDetail('${item.employeeCode}')">詳細</button></td>
        `;
        tbody.appendChild(row);
    });
}

// 詳細表示
function viewDetail(employeeCode) {
    const item = allData.find(d => d.employeeCode === employeeCode);
    if (item) {
        const score100 = (item.totalScore / 5).toFixed(1);
        alert(`社員コード: ${item.employeeCode}\n部署: ${item.department}\n性別: ${item.gender || '-'}\n総合スコア: ${score100}点\n\n詳細機能は今後実装予定です。`);
    }
}

// 部署別比較の更新
function updateDepartmentComparison() {
    const departments = [...new Set(filteredData.map(d => d.department))];
    const departmentCards = document.getElementById('departmentCards');
    departmentCards.innerHTML = '';
    
    const departmentScores = {};
    
    departments.forEach(dept => {
        const deptData = filteredData.filter(d => d.department === dept);
        // 平均スコア（100点満点換算）
        const avgScore = (deptData.reduce((sum, d) => sum + d.totalScore, 0) / deptData.length) / 5;
        departmentScores[dept] = avgScore.toFixed(1);
        
        const card = document.createElement('div');
        card.className = 'department-card';
        card.innerHTML = `
            <h3>${dept}</h3>
            <div class="score">${avgScore.toFixed(1)}点</div>
            <div>${deptData.length}名</div>
        `;
        card.onclick = () => showDepartmentDetail(dept);
        departmentCards.appendChild(card);
    });
    
    // 比較チャートの描画
    drawComparisonChart(departmentScores);
}

// 比較チャートの描画
function drawComparisonChart(departmentScores) {
    // Chart.jsが読み込まれているか確認
    if (typeof Chart === 'undefined') {
        console.error('Chart.jsが読み込まれていません');
        return;
    }
    
    const ctx = document.getElementById('comparisonChart');
    
    // 既存のチャートを破棄
    if (window.comparisonChart && typeof window.comparisonChart.destroy === 'function') {
        window.comparisonChart.destroy();
    }
    
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
    
    const datasets = Object.keys(departmentScores).map((dept, index) => {
        const deptData = filteredData.filter(d => d.department === dept);
        const scores = categories.map(cat => {
            const catScores = deptData.map(item => item.categoryScores[cat] || 0);
            return catScores.length > 0 
                ? (catScores.reduce((a, b) => a + b, 0) / catScores.length).toFixed(1)
                : 0;
        });
        
        const colors = [
            { bg: 'rgba(52, 152, 219, 0.3)', border: 'rgba(52, 152, 219, 1)' },
            { bg: 'rgba(46, 204, 113, 0.3)', border: 'rgba(46, 204, 113, 1)' },
            { bg: 'rgba(155, 89, 182, 0.3)', border: 'rgba(155, 89, 182, 1)' },
            { bg: 'rgba(241, 196, 15, 0.3)', border: 'rgba(241, 196, 15, 1)' },
            { bg: 'rgba(231, 76, 60, 0.3)', border: 'rgba(231, 76, 60, 1)' }
        ];
        
        const color = colors[index % colors.length];
        
        return {
            label: dept,
            data: scores,
            backgroundColor: color.bg,
            borderColor: color.border,
            borderWidth: 3,
            pointRadius: 4,
            pointHoverRadius: 6
        };
    });
    
    window.comparisonChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: categories,
            datasets: datasets
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
                    display: true,
                    position: 'top'
                }
            }
        }
    });
}

// 部署詳細表示
function showDepartmentDetail(department) {
    alert(`${department}の詳細分析\n\nこの機能は今後実装予定です。`);
}

// CSVエクスポート
function exportCSV() {
    let csv = '社員コード,部署,性別,診断日時,総合スコア,リスクレベル\n';
    
    // 従業員コードでソート（若い順）
    const sortedData = [...filteredData].sort((a, b) => {
        const codeA = a.employeeCode.replace(/[^0-9]/g, '');
        const codeB = b.employeeCode.replace(/[^0-9]/g, '');
        return parseInt(codeA) - parseInt(codeB);
    });
    
    sortedData.forEach(item => {
        const risk = calculateRiskLevel(item);
        const riskText = risk === 'high' ? '高' : risk === 'medium' ? '中' : '低';
        const score100 = (item.totalScore / 5).toFixed(1);
        
        // 日本時間に変換
        const timestamp = new Date(item.timestamp + 'Z');
        const jpTime = new Date(timestamp.getTime() + (9 * 60 * 60 * 1000));
        
        csv += `${item.employeeCode},${item.department},${item.gender || '-'},${jpTime.toLocaleString('ja-JP')},${score100},${riskText}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `engagement-data-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
}

// 詳細レポート生成
function generateDetailedReport() {
    alert('詳細レポート生成機能は今後実装予定です。');
}

// 役員会用PDF生成（プレースホルダー）
function generateExecutivePDF() {
    alert('PDF生成機能は今後実装予定です。\n\n予定される内容:\n- エグゼクティブサマリー\n- 組織全体のトレンド分析\n- 部署別比較\n- リスク分析\n- 改善提案\n等、8-12ページのレポートを生成します。');
}

// タブ切り替え
function switchTab(tabIndex) {
    // 全てのタブとコンテンツを非アクティブに
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // 選択されたタブとコンテンツをアクティブに
    document.querySelectorAll('.tab')[tabIndex].classList.add('active');
    document.getElementById(`tab${tabIndex}`).classList.add('active');
}
