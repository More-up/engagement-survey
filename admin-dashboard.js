// ========================================
// 管理者ダッシュボード - メインロジック
// ========================================

// 重要設問の定義
const CRITICAL_QUESTIONS = {
    27: { category: '成長機会', text: 'この会社で働き続けることで、自分のキャリアの将来像を描けますか？', threshold: 2 },
    54: { category: '評価・処遇', text: '会社の評価制度に納得していますか？', threshold: 2 },
    64: { category: '会社への信頼', text: 'この会社は将来性があると思いますか？', threshold: 2 },
    81: { category: '総合満足度', text: '現在の仕事に満足していますか？', threshold: 2 },
    100: { category: '組織へのつながり', text: 'この会社で長く働きたいと思いますか？', threshold: 2 }
};

// グローバル変数
let allEmployeeData = [];
let filteredData = [];

// ========================================
// 初期化
// ========================================
window.onload = function() {
    checkAuthentication();
    loadAllData();
};

// ========================================
// 認証チェック
// ========================================
function checkAuthentication() {
    const loginTime = sessionStorage.getItem('adminLoginTime');
    const loginPassword = sessionStorage.getItem('adminPassword');
    
    if (!loginTime || !loginPassword || loginPassword !== 'moapp2024') {
        alert('認証が必要です');
        window.location.href = 'admin-login.html';
        return;
    }
    
    // 8時間でセッション切れ
    const elapsed = Date.now() - parseInt(loginTime);
    if (elapsed > 8 * 60 * 60 * 1000) {
        alert('セッションが切れました。再度ログインしてください。');
        logout();
    }
}

// ========================================
// ログアウト
// ========================================
function logout() {
    sessionStorage.removeItem('adminLoginTime');
    sessionStorage.removeItem('adminPassword');
    window.location.href = 'admin-login.html';
}

// ========================================
// データ読み込み
// ========================================
function loadAllData() {
    allEmployeeData = [];
    
    // LocalStorageから全従業員データを取得
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        
        // answers_ で始まるキーを探す
        if (key.startsWith('answers_')) {
            const employeeCode = key.replace('answers_', '');
            const answersData = JSON.parse(localStorage.getItem(key));
            const department = localStorage.getItem('department_' + employeeCode) || '不明';
            const company = localStorage.getItem('company_' + employeeCode) || '不明';
            const completedAt = localStorage.getItem('completedAt_' + employeeCode) || new Date().toISOString();
            
            // スコア計算
            const scores = calculateScores(answersData);
            const riskLevel = calculateRiskLevel(answersData);
            const criticalAlerts = detectCriticalAlerts(answersData);
            
            allEmployeeData.push({
                employeeCode,
                department,
                company,
                answers: answersData,
                totalScore: scores.total,
                categoryScores: scores.categories,
                riskLevel,
                criticalAlerts,
                completedAt
            });
        }
    }
    
    // 初期表示
    filteredData = [...allEmployeeData];
    updateFilters();
    updateDashboard();
}

// ========================================
// スコア計算
// ========================================
function calculateScores(answers) {
    const categories = [
        { name: '心身の健康', start: 1, end: 10 },
        { name: '仕事の充実感', start: 11, end: 20 },
        { name: '成長機会', start: 21, end: 30 },
        { name: '上司のサポート', start: 31, end: 40 },
        { name: 'チームとの協働', start: 41, end: 50 },
        { name: '評価・処遇', start: 51, end: 60 },
        { name: '会社への信頼', start: 61, end: 70 },
        { name: '働く環境', start: 71, end: 80 },
        { name: '総合満足度', start: 81, end: 90 },
        { name: '組織へのつながり', start: 91, end: 100 }
    ];
    
    let totalSum = 0;
    let totalCount = 0;
    const categoryScores = {};
    
    categories.forEach(cat => {
        let sum = 0;
        let count = 0;
        
        for (let i = cat.start; i <= cat.end; i++) {
            if (answers[i]) {
                sum += answers[i];
                count++;
            }
        }
        
        const avg = count > 0 ? (sum / count) : 0;
        categoryScores[cat.name] = parseFloat(avg.toFixed(2));
        
        totalSum += sum;
        totalCount += count;
    });
    
    const total = totalCount > 0 ? parseFloat((totalSum / totalCount).toFixed(2)) : 0;
    
    return { total, categories: categoryScores };
}

// ========================================
// リスクレベル計算
// ========================================
function calculateRiskLevel(answers) {
    const criticalScores = [];
    
    Object.keys(CRITICAL_QUESTIONS).forEach(qNum => {
        const score = answers[qNum] || 0;
        criticalScores.push(score);
    });
    
    const avgCriticalScore = criticalScores.reduce((a, b) => a + b, 0) / criticalScores.length;
    
    if (avgCriticalScore <= 2.0) return 'high';
    if (avgCriticalScore <= 3.0) return 'medium';
    return 'low';
}

// ========================================
// 重要設問アラート検出
// ========================================
function detectCriticalAlerts(answers) {
    const alerts = [];
    
    Object.keys(CRITICAL_QUESTIONS).forEach(qNum => {
        const question = CRITICAL_QUESTIONS[qNum];
        const score = answers[qNum] || 0;
        
        if (score <= question.threshold) {
            alerts.push({
                questionNum: qNum,
                category: question.category,
                text: question.text,
                score: score
            });
        }
    });
    
    return alerts;
}

// ========================================
// フィルター更新
// ========================================
function updateFilters() {
    const companies = [...new Set(allEmployeeData.map(e => e.company))];
    const departments = [...new Set(allEmployeeData.map(e => e.department))];
    
    const companyFilter = document.getElementById('companyFilter');
    const departmentFilter = document.getElementById('departmentFilter');
    
    // 企業フィルター
    companyFilter.innerHTML = '<option value="">すべての企業</option>';
    companies.forEach(company => {
        const option = document.createElement('option');
        option.value = company;
        option.textContent = company;
        companyFilter.appendChild(option);
    });
    
    // 部署フィルター
    departmentFilter.innerHTML = '<option value="">すべての部署</option>';
    departments.forEach(dept => {
        const option = document.createElement('option');
        option.value = dept;
        option.textContent = dept;
        departmentFilter.appendChild(option);
    });
}

// ========================================
// フィルター適用
// ========================================
function applyFilters() {
    const companyValue = document.getElementById('companyFilter').value;
    const departmentValue = document.getElementById('departmentFilter').value;
    const riskValue = document.getElementById('riskFilter').value;
    
    filteredData = allEmployeeData.filter(employee => {
        if (companyValue && employee.company !== companyValue) return false;
        if (departmentValue && employee.department !== departmentValue) return false;
        if (riskValue && employee.riskLevel !== riskValue) return false;
        return true;
    });
    
    updateDashboard();
}

// ========================================
// ダッシュボード更新
// ========================================
function updateDashboard() {
    updateStats();
    updateAlerts();
    updateDataTable();
}

// ========================================
// 統計カード更新
// ========================================
function updateStats() {
    const highRisk = filteredData.filter(e => e.riskLevel === 'high').length;
    const mediumRisk = filteredData.filter(e => e.riskLevel === 'medium').length;
    const lowRisk = filteredData.filter(e => e.riskLevel === 'low').length;
    const total = filteredData.length;
    
    const avgScore = total > 0 
        ? (filteredData.reduce((sum, e) => sum + e.totalScore, 0) / total).toFixed(2)
        : 0;
    
    document.getElementById('highRiskCount').textContent = highRisk;
    document.getElementById('mediumRiskCount').textContent = mediumRisk;
    document.getElementById('lowRiskCount').textContent = lowRisk;
    document.getElementById('totalCount').textContent = total;
    document.getElementById('avgScore').textContent = avgScore;
}

// ========================================
// アラート表示更新
// ========================================
function updateAlerts() {
    const alertContainer = document.getElementById('alertContainer');
    
    // 高リスク従業員のみ表示
    const highRiskEmployees = filteredData.filter(e => e.riskLevel === 'high');
    
    if (highRiskEmployees.length === 0) {
        alertContainer.innerHTML = `
            <div class="no-data">
                <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                </svg>
                <p>🎉 高リスク従業員はいません</p>
            </div>
        `;
        return;
    }
    
    let html = '<div class="alert-list">';
    html += '<h3 style="color: #e74c3c; margin-bottom: 20px;">🚨 緊急対応が必要な従業員</h3>';
    
    highRiskEmployees.forEach(employee => {
        html += `
            <div class="alert-item high-risk">
                <h4>👤 従業員コード: ${employee.employeeCode}</h4>
                <div class="alert-details">
                    <p><strong>部署:</strong> ${employee.department} | <strong>企業:</strong> ${employee.company}</p>
                    <p><strong>総合スコア:</strong> ${employee.totalScore} / 5.0</p>
                    <p><strong>危険な回答:</strong></p>
                    <ul style="margin-left: 20px; color: #555;">
        `;
        
        employee.criticalAlerts.forEach(alert => {
            html += `<li>Q${alert.questionNum} [${alert.category}] - スコア: ${alert.score}/5 → ${alert.text}</li>`;
        });
        
        html += `
                    </ul>
                </div>
                <div class="alert-actions">
                    <strong>📋 推奨アクション:</strong>
                    <ul>
                        <li>🔹 緊急1on1面談の実施（1週間以内）</li>
                        <li>🔹 キャリアパス再提示と成長機会の具体化</li>
                        <li>🔹 評価制度の詳細説明と納得感の醸成</li>
                        <li>🔹 業務負荷の見直しと配置転換の検討</li>
                    </ul>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    alertContainer.innerHTML = html;
}

// ========================================
// データテーブル更新
// ========================================
function updateDataTable() {
    const tbody = document.getElementById('dataTableBody');
    
    if (filteredData.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 40px; color: #999;">
                    データがありません
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = '';
    
    filteredData.forEach(employee => {
        const riskText = employee.riskLevel === 'high' ? '高リスク' 
            : employee.riskLevel === 'medium' ? '中リスク' 
            : '低リスク';
        
        const date = new Date(employee.completedAt).toLocaleString('ja-JP');
        
        const row = `
            <tr>
                <td>${employee.employeeCode}</td>
                <td>${employee.department}</td>
                <td>${employee.company}</td>
                <td>${employee.totalScore}</td>
                <td><span class="risk-badge ${employee.riskLevel}">${riskText}</span></td>
                <td>${date}</td>
            </tr>
        `;
        
        tbody.innerHTML += row;
    });
}

// ========================================
// タブ切り替え
// ========================================
function switchTab(index) {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach((tab, i) => {
        if (i === index) {
            tab.classList.add('active');
            contents[i].classList.add('active');
        } else {
            tab.classList.remove('active');
            contents[i].classList.remove('active');
        }
    });
}

// ========================================
// CSV出力
// ========================================
function exportCSV() {
    if (filteredData.length === 0) {
        alert('出力するデータがありません');
        return;
    }
    
    let csv = '従業員コード,部署,企業,総合スコア,リスクレベル,診断日時';
    
    // カテゴリー列を追加
    const firstEmployee = filteredData[0];
    Object.keys(firstEmployee.categoryScores).forEach(category => {
        csv += ',' + category;
    });
    
    // 重要設問列を追加
    Object.keys(CRITICAL_QUESTIONS).forEach(qNum => {
        csv += ',Q' + qNum;
    });
    
    csv += '\n';
    
    // データ行
    filteredData.forEach(employee => {
        const riskText = employee.riskLevel === 'high' ? '高リスク' 
            : employee.riskLevel === 'medium' ? '中リスク' 
            : '低リスク';
        
        const date = new Date(employee.completedAt).toLocaleString('ja-JP');
        
        csv += `${employee.employeeCode},${employee.department},${employee.company},${employee.totalScore},${riskText},${date}`;
        
        // カテゴリースコア
        Object.values(employee.categoryScores).forEach(score => {
            csv += ',' + score;
        });
        
        // 重要設問スコア
        Object.keys(CRITICAL_QUESTIONS).forEach(qNum => {
            csv += ',' + (employee.answers[qNum] || 0);
        });
        
        csv += '\n';
    });
    
    // BOM付きでダウンロード
    const bom = '\uFEFF';
    const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `engagement_data_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    
    alert('CSV出力が完了しました！');
}

// ========================================
// 詳細レポート出力
// ========================================
function exportDetailedReport() {
    if (filteredData.length === 0) {
        alert('出力するデータがありません');
        return;
    }
    
    let report = '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    report += '  エンゲージメント診断 詳細レポート\n';
    report += '  生成日時: ' + new Date().toLocaleString('ja-JP') + '\n';
    report += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
    
    // サマリー
    const highRisk = filteredData.filter(e => e.riskLevel === 'high').length;
    const mediumRisk = filteredData.filter(e => e.riskLevel === 'medium').length;
    const lowRisk = filteredData.filter(e => e.riskLevel === 'low').length;
    const avgScore = (filteredData.reduce((sum, e) => sum + e.totalScore, 0) / filteredData.length).toFixed(2);
    
    report += '【全体サマリー】\n';
    report += `診断完了者: ${filteredData.length}名\n`;
    report += `平均スコア: ${avgScore} / 5.0\n`;
    report += `高リスク: ${highRisk}名 | 中リスク: ${mediumRisk}名 | 低リスク: ${lowRisk}名\n\n`;
    
    // 高リスク従業員詳細
    const highRiskEmployees = filteredData.filter(e => e.riskLevel === 'high');
    
    if (highRiskEmployees.length > 0) {
        report += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
        report += '🚨 緊急対応が必要な従業員（高リスク）\n';
        report += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
        
        highRiskEmployees.forEach((employee, index) => {
            report += `【${index + 1}】従業員コード: ${employee.employeeCode}\n`;
            report += `部署: ${employee.department} | 企業: ${employee.company}\n`;
            report += `総合スコア: ${employee.totalScore} / 5.0\n\n`;
            
            report += '⚠️ 危険な回答:\n';
            employee.criticalAlerts.forEach(alert => {
                report += `  Q${alert.questionNum} [${alert.category}] スコア: ${alert.score}/5\n`;
                report += `  → ${alert.text}\n`;
            });
            
            report += '\n📋 推奨アクション:\n';
            report += '  ✓ 緊急1on1面談の実施（1週間以内）\n';
            report += '  ✓ キャリアパス再提示と成長機会の具体化\n';
            report += '  ✓ 評価制度の詳細説明と納得感の醸成\n';
            report += '  ✓ 業務負荷の見直しと配置転換の検討\n\n';
            report += '─────────────────────────\n\n';
        });
    }
    
    // ダウンロード
    const blob = new Blob([report], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `engagement_report_${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    
    alert('詳細レポート出力が完了しました！');
}
