// ========================================
// 管理者ダッシュボード - メインロジック
// ========================================

// API エンドポイント
const API_ENDPOINT = 'https://engagement-survey-api.more-up.workers.dev';

// 重要設問の定義
const CRITICAL_QUESTIONS = {
    27: { category: '成長機会', text: 'この会社で働き続けることで、自分のキャリアの将来像を描けますか?', threshold: 2 },
    54: { category: '評価・処遇', text: '会社の評価制度に納得していますか?', threshold: 2 },
    64: { category: '会社への信頼', text: 'この会社は将来性があると思いますか?', threshold: 2 },
    81: { category: '総合満足度', text: '現在の仕事に満足していますか?', threshold: 2 },
    100: { category: '組織へのつながり', text: 'この会社で長く働きたいと思いますか?', threshold: 2 }
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
    
    if (!loginTime || !loginPassword || loginPassword !== 'moreup-japan') {
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
// データ読み込み (API接続版)
// ========================================
async function loadAllData() {
    try {
        // APIからデータ取得
        const response = await fetch(`${API_ENDPOINT}/api/survey/results`);
        
        if (!response.ok) {
            throw new Error('データの取得に失敗しました');
        }
        
        const apiData = await response.json();
        
        // データが空の場合
        if (!apiData.results || apiData.results.length === 0) {
            allEmployeeData = [];
            filteredData = [];
            updateFilters();
            updateDashboard();
            return;
        }
        
        // APIデータを内部形式に変換
        allEmployeeData = apiData.results.map(record => {
            // answersをオブジェクト形式に変換
            const answersObj = {};
            if (record.answers) {
                record.answers.forEach(ans => {
                    answersObj[ans.question_id] = ans.score;
                });
            }
            
            // categoryScoresをオブジェクト形式に変換
            const categoryScoresObj = {};
            if (record.category_scores) {
                record.category_scores.forEach(cat => {
                    categoryScoresObj[cat.category_name] = parseFloat(cat.score);
                });
            }
            
            // リスクレベル計算
            const riskLevel = calculateRiskLevel(answersObj);
            
            // 重要設問アラート検出
            const criticalAlerts = detectCriticalAlerts(answersObj);
            
            return {
                employeeCode: record.employee_code,
                department: record.department || '不明',
                company: record.company_code || '不明',
                answers: answersObj,
                totalScore: parseFloat(record.total_score),
                categoryScores: categoryScoresObj,
                riskLevel: riskLevel,
                criticalAlerts: criticalAlerts,
                completedAt: record.survey_date
            };
        });
        
        // 初期表示
        filteredData = [...allEmployeeData];
        updateFilters();
        updateDashboard();
        
        // 🆕 経営ダッシュボードを初期化
        initExecutiveDashboard();
        
    } catch (error) {
        console.error('データ読み込みエラー:', error);
        alert('データの読み込みに失敗しました。ネットワーク接続を確認してください。');
        allEmployeeData = [];
        filteredData = [];
        updateFilters();
        updateDashboard();
    }
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
    // 🆕 フィルター変更時に経営ダッシュボードも更新
    updateExecutiveDashboard();
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
    const criticalAlerts = document.getElementById('criticalAlerts');
    const alertsList = document.getElementById('alertsList');
    
    if (!criticalAlerts || !alertsList) return;
    
    // 重要設問で低スコアの従業員を抽出
    const employeesWithCriticalIssues = filteredData.filter(e => e.criticalAlerts.length > 0);
    
    if (employeesWithCriticalIssues.length === 0) {
        criticalAlerts.style.display = 'none';
        return;
    }
    
    criticalAlerts.style.display = 'block';
    
    let html = '';
    employeesWithCriticalIssues.forEach(employee => {
        employee.criticalAlerts.forEach(alert => {
            html += `
                <div class="alert-item">
                    <strong>${employee.employeeCode} (${employee.department})</strong><br>
                    Q${alert.questionNum} [${alert.category}] スコア: ${alert.score}/5<br>
                    ${alert.text}
                </div>
            `;
        });
    });
    
    alertsList.innerHTML = html;
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
    const buttons = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');
    
    buttons.forEach((btn, i) => {
        if (i === index) {
            btn.classList.add('active');
            contents[i].classList.add('active');
        } else {
            btn.classList.remove('active');
            contents[i].classList.remove('active');
        }
    });
    
    // 🆕 タブ0(経営ダッシュボード)が開かれたときに初期化
    if (index === 0) {
        setTimeout(() => {
            initExecutiveDashboard();
        }, 100);
    }
    
    // タブ2（部署別比較）が開かれたときに初期化
    if (index === 2) {
        loadDepartmentComparison();
    }
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

// ================================================
// 部署別比較機能
// ================================================

let comparisonChart = null;

function loadDepartmentComparison() {
    const companySelect = document.getElementById('companySelectComparison');
    const dept1Select = document.getElementById('dept1Select');
    const dept2Select = document.getElementById('dept2Select');
    
    if (!companySelect || !dept1Select || !dept2Select) return;
    
    // 企業選択肢を生成
    const companies = [...new Set(allEmployeeData.map(e => e.company))];
    companySelect.innerHTML = '<option value="">企業を選択</option>';
    companies.forEach(company => {
        const option = document.createElement('option');
        option.value = company;
        option.textContent = company;
        companySelect.appendChild(option);
    });
}

function updateComparison() {
    const companyValue = document.getElementById('companySelectComparison').value;
    const dept1Value = document.getElementById('dept1Select').value;
    const dept2Value = document.getElementById('dept2Select').value;
    
    if (!dept1Value || !dept2Value) {
        return;
    }
    
    // 部署データを取得
    const dept1Data = allEmployeeData.filter(e => e.company === companyValue && e.department === dept1Value);
    const dept2Data = allEmployeeData.filter(e => e.company === companyValue && e.department === dept2Value);
    
    if (dept1Data.length === 0 || dept2Data.length === 0) {
        alert('選択した部署にデータがありません');
        return;
    }
    
    // カテゴリー別平均スコアを計算
    const categories = ['心身の健康', '仕事の充実感', '成長機会', '上司のサポート', 'チームとの協働', 
                       '評価・処遇', '会社への信頼', '働く環境', '総合満足度', '組織へのつながり'];
    
    const dept1Scores = categories.map(cat => {
        const scores = dept1Data.map(e => parseFloat(e.categoryScores[cat]) || 0);
        return (scores.reduce((sum, s) => sum + s, 0) / scores.length).toFixed(2);
    });
    
    const dept2Scores = categories.map(cat => {
        const scores = dept2Data.map(e => parseFloat(e.categoryScores[cat]) || 0);
        return (scores.reduce((sum, s) => sum + s, 0) / scores.length).toFixed(2);
    });
    
    // グラフを描画
    drawComparisonChart(categories, dept1Value, dept1Scores, dept2Value, dept2Scores);
    
    // AI分析を表示
    generateAIAnalysis(dept1Value, dept1Data, dept1Scores, dept2Value, dept2Data, dept2Scores);
}

function drawComparisonChart(categories, dept1Name, dept1Scores, dept2Name, dept2Scores) {
    const canvas = document.getElementById('comparisonChart');
    if (!canvas) return;
    
    if (comparisonChart) {
        comparisonChart.destroy();
    }
    
    const ctx = canvas.getContext('2d');
    
    comparisonChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: categories,
            datasets: [
                {
                    label: dept1Name,
                    data: dept1Scores,
                    borderColor: 'rgba(102, 126, 234, 1)',
                    backgroundColor: 'rgba(102, 126, 234, 0.2)',
                    borderWidth: 3
                },
                {
                    label: dept2Name,
                    data: dept2Scores,
                    borderColor: 'rgba(46, 204, 113, 1)',
                    backgroundColor: 'rgba(46, 204, 113, 0.2)',
                    borderWidth: 3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 5
                }
            }
        }
    });
}

function generateAIAnalysis(dept1Name, dept1Data, dept1Scores, dept2Name, dept2Data, dept2Scores) {
    const aiReport = document.getElementById('aiAnalysisReport');
    if (!aiReport) return;
    
    aiReport.style.display = 'block';
    
    // 総合評価
    const dept1Avg = (dept1Data.reduce((sum, e) => sum + e.totalScore, 0) / dept1Data.length).toFixed(2);
    const dept2Avg = (dept2Data.reduce((sum, e) => sum + e.totalScore, 0) / dept2Data.length).toFixed(2);
    
    const overallAnalysis = `${dept1Name}の平均スコア: ${dept1Avg}/5.0 (${dept1Data.length}名)<br>
                            ${dept2Name}の平均スコア: ${dept2Avg}/5.0 (${dept2Data.length}名)<br>
                            スコア差: ${Math.abs(dept1Avg - dept2Avg).toFixed(2)}点`;
    
    document.getElementById('aiOverallAnalysis').innerHTML = overallAnalysis;
    
    // 強みと課題
    const categories = ['心身の健康', '仕事の充実感', '成長機会', '上司のサポート', 'チームとの協働', 
                       '評価・処遇', '会社への信頼', '働く環境', '総合満足度', '組織へのつながり'];
    
    let strengthsWeaknesses = '';
    categories.forEach((cat, idx) => {
        const diff = (parseFloat(dept1Scores[idx]) - parseFloat(dept2Scores[idx])).toFixed(2);
        if (Math.abs(diff) > 0.5) {
            strengthsWeaknesses += `<li>${cat}: ${dept1Name}が${diff > 0 ? diff + '点高い' : Math.abs(diff) + '点低い'}</li>`;
        }
    });
    
    document.getElementById('aiStrengthsWeaknesses').innerHTML = strengthsWeaknesses || '<li>大きな差異はありません</li>';
    
    // 推奨アクション
    const recommendations = `
        <li>${dept1Avg > dept2Avg ? dept1Name : dept2Name}のベストプラクティスを共有</li>
        <li>スコアの低いカテゴリに対する改善施策の実施</li>
        <li>部署間の定期的な情報交換会の開催</li>
        <li>マネージャー研修の実施</li>
    `;
    
    document.getElementById('aiRecommendations').innerHTML = recommendations;
}

// ================================================
// 🆕 経営ダッシュボード機能
// ================================================

let executiveRadarChart = null;
let trendLineChart = null;
let currentPeriod = 6; // デフォルト6ヶ月
let currentTrendView = 'company'; // デフォルト全社表示

// ========================================
// 経営ダッシュボードの初期化
// ========================================
function initExecutiveDashboard() {
    updateExecutiveAlerts();
    updateExecutiveRadarChart();
    updateTrendSelectors();
    updateTrendChart();
}

// ========================================
// 経営ダッシュボードの更新(フィルター変更時)
// ========================================
function updateExecutiveDashboard() {
    updateExecutiveAlerts();
    updateExecutiveRadarChart();
    updateTrendChart();
}

// ========================================
// 緊急アラートの更新
// ========================================
function updateExecutiveAlerts() {
    const highRiskAlertsDiv = document.getElementById('highRiskAlerts');
    const managerAlertsDiv = document.getElementById('managerAlerts');
    
    if (!highRiskAlertsDiv || !managerAlertsDiv) return;
    
    // 高リスク従業員
    const highRiskEmployees = filteredData.filter(e => e.riskLevel === 'high');
    
    if (highRiskEmployees.length === 0) {
        highRiskAlertsDiv.innerHTML = '<p style="color: #2ecc71;">✅ 現在、高リスク従業員はいません</p>';
    } else {
        let html = '<ul style="list-style: none; padding: 0;">';
        highRiskEmployees.slice(0, 5).forEach(emp => {
            html += `<li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                        👤 ${emp.employeeCode} (${emp.department}) - スコア: ${emp.totalScore.toFixed(2)}
                     </li>`;
        });
        if (highRiskEmployees.length > 5) {
            html += `<li style="padding: 8px 0; color: #999;">...他${highRiskEmployees.length - 5}名</li>`;
        }
        html += '</ul>';
        highRiskAlertsDiv.innerHTML = html;
    }
    
    // 要支援マネージャー(上司のサポートスコアが低い部署)
    const deptManagerScores = {};
    
    filteredData.forEach(emp => {
        if (!deptManagerScores[emp.department]) {
            deptManagerScores[emp.department] = [];
        }
        const managerScore = emp.categoryScores['上司のサポート'] || 0;
        deptManagerScores[emp.department].push(managerScore);
    });
    
    const deptAvgScores = Object.keys(deptManagerScores).map(dept => {
        const scores = deptManagerScores[dept];
        const avg = scores.reduce((sum, s) => sum + s, 0) / scores.length;
        return { dept, avg: avg.toFixed(2) };
    }).sort((a, b) => a.avg - b.avg);
    
    const lowManagerDepts = deptAvgScores.filter(d => d.avg < 3.0).slice(0, 3);
    
    if (lowManagerDepts.length === 0) {
        managerAlertsDiv.innerHTML = '<p style="color: #2ecc71;">✅ 全部署でマネジメントは良好です</p>';
    } else {
        let html = '<ul style="list-style: none; padding: 0;">';
        lowManagerDepts.forEach(dept => {
            html += `<li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                        👨‍💼 ${dept.dept} - 上司サポート: ${dept.avg}点
                     </li>`;
        });
        html += '</ul>';
        managerAlertsDiv.innerHTML = html;
    }
}

// ========================================
// 経営ダッシュボード用レーダーチャート
// ========================================
function updateExecutiveRadarChart() {
    const canvas = document.getElementById('executiveRadarChart');
    if (!canvas) return;

    // 既存のチャートを破棄
    if (executiveRadarChart) {
        executiveRadarChart.destroy();
    }

    if (filteredData.length === 0) {
        return;
    }

    const ctx = canvas.getContext('2d');

    // カテゴリー別平均スコア計算
    const categories = ['心身の健康', '仕事の充実感', '成長機会', '上司のサポート', 'チームとの協働', 
                       '評価・処遇', '会社への信頼', '働く環境', '総合満足度', '組織へのつながり'];

    const currentScores = categories.map(cat => {
        const scores = filteredData.map(e => parseFloat(e.categoryScores[cat]) || 0);
        const avg = scores.reduce((sum, s) => sum + s, 0) / scores.length;
        return parseFloat(avg.toFixed(2));
    });

    // 前回比較表示が有効か確認
    const showPrevious = document.getElementById('showPreviousRadar')?.checked || false;

    const datasets = [{
        label: '今回診断',
        data: currentScores,
        borderColor: 'rgba(102, 126, 234, 1)',
        backgroundColor: 'rgba(102, 126, 234, 0.2)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(102, 126, 234, 1)',
        pointBorderColor: '#fff',
        pointRadius: 5
    }];

    // 前回データを表示する場合(模擬データ)
    if (showPrevious) {
        const previousScores = currentScores.map(score => {
            const variation = (Math.random() - 0.5) * 0.4;
            return Math.max(0, Math.min(5, parseFloat(score) + variation)).toFixed(2);
        });
        
        datasets.push({
            label: '前回診断',
            data: previousScores,
            borderColor: 'rgba(149, 165, 166, 0.6)',
            backgroundColor: 'rgba(149, 165, 166, 0.1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(149, 165, 166, 0.6)',
            pointBorderColor: '#fff',
            pointRadius: 4
        });
    }

    executiveRadarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: categories,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 5,
                    ticks: {
                        stepSize: 1,
                        font: { size: 12 }
                    },
                    pointLabels: {
                        font: { size: 11 }
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: { font: { size: 14 } }
                }
            }
        }
    });
}

// ========================================
// トレンド表示の切り替えボタン更新
// ========================================
function updateTrendSelectors() {
    const deptSelect = document.getElementById('trendDeptSelect');
    const personSelect = document.getElementById('trendPersonSelect');
    
    if (!deptSelect || !personSelect) return;
    
    // 部署選択肢を生成
    const departments = [...new Set(filteredData.map(e => e.department))].filter(d => d !== '不明');
    deptSelect.innerHTML = '<option value="">部署を選択</option>';
    departments.forEach(dept => {
        const option = document.createElement('option');
        option.value = dept;
        option.textContent = dept;
        deptSelect.appendChild(option);
    });
    
    // 個人選択肢を生成
    personSelect.innerHTML = '<option value="">従業員を選択</option>';
    filteredData.forEach(emp => {
        const option = document.createElement('option');
        option.value = emp.employeeCode;
        option.textContent = `${emp.employeeCode} (${emp.department})`;
        personSelect.appendChild(option);
    });
}

// ========================================
// トレンド表示切替
// ========================================
function changeTrendView(viewType) {
    currentTrendView = viewType;
    
    // ボタンのアクティブ状態を更新
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // 選択UIの表示/非表示
    const deptSelect = document.getElementById('trendDeptSelect');
    const personSelect = document.getElementById('trendPersonSelect');
    
    if (deptSelect && personSelect) {
        deptSelect.style.display = viewType === 'department' ? 'block' : 'none';
        personSelect.style.display = viewType === 'individual' ? 'block' : 'none';
    }
    
    // グラフを更新
    updateTrendChart();
}

// ========================================
// 改善トレンドグラフ
// ========================================
function updateTrendChart() {
    const canvas = document.getElementById('trendChart');
    const messageDiv = document.getElementById('trendMessage');
    
    if (!canvas) return;

    // 既存のチャートを破棄
    if (trendLineChart) {
        trendLineChart.destroy();
        trendLineChart = null;
    }

    // データがない場合
    if (filteredData.length === 0) {
        if (messageDiv) {
            messageDiv.textContent = 'データがありません';
            messageDiv.style.display = 'block';
        }
        canvas.style.display = 'none';
        return;
    }

    const ctx = canvas.getContext('2d');

    // 期間に応じたラベル生成
    const labels = [];
    const dataPoints = [];
    
    for (let i = currentPeriod - 1; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        labels.push(`${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}`);
        
        // 模擬データ: 55〜75の範囲
        dataPoints.push((Math.random() * 20 + 55).toFixed(1));
    }

    // 最新月のデータを実際の平均スコアに置き換え
    let targetData = filteredData;
    
    // 表示タイプに応じてデータをフィルタリング
    if (currentTrendView === 'department') {
        const selectedDept = document.getElementById('trendDeptSelect')?.value;
        if (selectedDept) {
            targetData = filteredData.filter(e => e.department === selectedDept);
        }
    } else if (currentTrendView === 'individual') {
        const selectedPerson = document.getElementById('trendPersonSelect')?.value;
        if (selectedPerson) {
            targetData = filteredData.filter(e => e.employeeCode === selectedPerson);
        }
    }
    
    if (targetData.length > 0) {
        const currentAvg = targetData.reduce((sum, e) => sum + e.totalScore, 0) / targetData.length;
        dataPoints[dataPoints.length - 1] = ((currentAvg / 5) * 100).toFixed(1);
    }

    // グラフを表示
    canvas.style.display = 'block';
    if (messageDiv) {
        messageDiv.style.display = 'none';
    }

    trendLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '総合スコア推移 (100点満点)',
                data: dataPoints,
                borderColor: 'rgba(102, 126, 234, 1)',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointBackgroundColor: 'rgba(102, 126, 234, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
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
                        text: 'スコア (100点満点)',
                        font: { size: 14 }
                    },
                    ticks: { font: { size: 12 } }
                },
                x: {
                    title: {
                        display: true,
                        text: '診断実施月',
                        font: { size: 14 }
                    },
                    ticks: { font: { size: 12 } }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: { font: { size: 14 } }
                }
            }
        }
    });
}

// ========================================
// 期間変更
// ========================================
function changePeriod(period) {
    currentPeriod = period;
    
    // ボタンのアクティブ状態を更新
    document.querySelectorAll('.period-buttons button').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // グラフを再描画
    updateTrendChart();
}

// ========================================
// PDF自動生成(プレースホルダー)
// ========================================
function generateExecutivePDF() {
    alert('📄 PDF生成機能は現在開発中です。\n\n【実装予定】\n✓ 8〜12ページの役員会用レポート\n✓ レーダーチャート、トレンドグラフの自動挿入\n✓ 緊急アラート、部署別分析\n✓ AI分析レポート\n\n次のフェーズで詳細実装を行います。');
}
