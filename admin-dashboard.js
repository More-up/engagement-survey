// ========================================
// 管理者ダッシュボード - メインロジック
// ========================================

// API エンドポイント
const API_ENDPOINT = 'https://engagement-survey-api.more-up.workers.dev';

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
    
    // タブ3（部署別比較）が開かれたときに部署チェックボックスを生成
    if (index === 2) {
        generateDeptCheckboxes();
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

// タブ3が開かれたときに部署チェックボックスを生成
let deptComparisonChart = null;

function generateDeptCheckboxes() {
    const container = document.getElementById('deptCheckboxes');
    if (!container) return;
    
    container.innerHTML = '';
    
    // 現在フィルタされている企業の部署を取得
    const currentCompany = document.getElementById('companyFilter').value;
    const relevantEmployees = currentCompany ? 
        allEmployeeData.filter(e => e.company === currentCompany) : 
        allEmployeeData;
    
    const departments = [...new Set(relevantEmployees.map(e => e.department))].filter(d => d !== '不明');
    
    if (departments.length === 0) {
        container.innerHTML = '<p style="color: #999;">比較可能な部署がありません</p>';
        return;
    }
    
    departments.forEach(dept => {
        const label = document.createElement('label');
        label.style.cssText = 'display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 10px; background: white; border-radius: 8px; transition: all 0.3s;';
        label.innerHTML = `<input type="checkbox" value="${dept}" style="width: 18px; height: 18px; cursor: pointer;"> ${dept}`;
        label.onmouseover = () => label.style.background = '#e8f0fe';
        label.onmouseout = () => label.style.background = 'white';
        container.appendChild(label);
    });
}

function generateDeptComparison() {
    const checkboxes = document.querySelectorAll('#deptCheckboxes input[type="checkbox"]:checked');
    
    if (checkboxes.length < 2) {
        alert('比較する部署を2つ以上選択してください');
        return;
    }
    
    const selectedDepts = Array.from(checkboxes).map(cb => cb.value);
    const currentCompany = document.getElementById('companyFilter').value;
    const relevantEmployees = currentCompany ? 
        allEmployeeData.filter(e => e.company === currentCompany) : 
        allEmployeeData;
    
    // 部署別データを集計
    const deptData = [];
    
    selectedDepts.forEach(dept => {
        const deptEmployees = relevantEmployees.filter(e => e.department === dept);
        
        if (deptEmployees.length > 0) {
            // 総合スコア平均
            const avgTotalScore = (deptEmployees.reduce((sum, e) => sum + e.totalScore, 0) / deptEmployees.length).toFixed(2);
            
            // カテゴリ別スコア平均
            const categories = ['心身の健康', '仕事の充実感', '成長機会', '上司のサポート', 'チームとの協働', 
                               '評価・処遇', '会社への信頼', '働く環境', '総合満足度', '組織へのつながり'];
            
            const categoryAvgs = {};
            categories.forEach(cat => {
                const scores = deptEmployees.map(e => e.categoryScores[cat]);
                categoryAvgs[cat] = (scores.reduce((sum, s) => sum + parseFloat(s), 0) / scores.length).toFixed(2);
            });
            
            // リスクレベル集計
            const highRisk = deptEmployees.filter(e => e.riskLevel === 'high').length;
            const mediumRisk = deptEmployees.filter(e => e.riskLevel === 'medium').length;
            const lowRisk = deptEmployees.filter(e => e.riskLevel === 'low').length;
            
            // マネージャー評価スコア (上司のサポート)
            const managerScore = parseFloat(categoryAvgs['上司のサポート']);
            
            deptData.push({
                dept,
                count: deptEmployees.length,
                avgTotalScore: parseFloat(avgTotalScore),
                categoryAvgs,
                highRisk,
                mediumRisk,
                lowRisk,
                managerScore
            });
        }
    });
    
    // 結果を表示
    displayDeptComparisonResult(deptData, currentCompany);
}

function displayDeptComparisonResult(deptData, companyName) {
    const resultContainer = document.getElementById('deptComparisonResult');
    
    // サマリーテーブル
    const sortedByScore = [...deptData].sort((a, b) => b.avgTotalScore - a.avgTotalScore);
    const sortedByManager = [...deptData].sort((a, b) => b.managerScore - a.managerScore);
    const bestDept = sortedByScore[0];
    const worstDept = sortedByScore[sortedByScore.length - 1];
    const bestManager = sortedByManager[0];
    const worstManager = sortedByManager[sortedByManager.length - 1];
    
    let html = `
        <div style="background: white; padding: 30px; border-radius: 15px; margin-bottom: 30px; box-shadow: 0 5px 20px rgba(0,0,0,0.1);">
            <h3 style="color: #667eea; margin-bottom: 20px;">📈 部署別サマリー${companyName ? ' - ' + companyName : ''}</h3>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>部署</th>
                        <th>人数</th>
                        <th>総合スコア</th>
                        <th>マネージャー評価</th>
                        <th>高リスク</th>
                        <th>中リスク</th>
                        <th>低リスク</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    sortedByScore.forEach(dept => {
        html += `
            <tr>
                <td><strong>${dept.dept}</strong></td>
                <td>${dept.count}名</td>
                <td>${dept.avgTotalScore.toFixed(2)}</td>
                <td>${dept.managerScore.toFixed(2)}</td>
                <td>${dept.highRisk}名</td>
                <td>${dept.mediumRisk}名</td>
                <td>${dept.lowRisk}名</td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 15px; margin-bottom: 30px; box-shadow: 0 5px 20px rgba(0,0,0,0.1);">
            <h3 style="color: #667eea; text-align: center; margin-bottom: 20px;">📊 カテゴリ別スコア比較</h3>
            <canvas id="deptComparisonChart" width="800" height="400"></canvas>
        </div>
    `;
    
    // AI分析レポート
    const categories = ['心身の健康', '仕事の充実感', '成長機会', '上司のサポート', 'チームとの協働', 
                       '評価・処遇', '会社への信頼', '働く環境', '総合満足度', '組織へのつながり'];
    
    const categoryGaps = [];
    categories.forEach(cat => {
        const scores = deptData.map(d => parseFloat(d.categoryAvgs[cat]));
        const max = Math.max(...scores);
        const min = Math.min(...scores);
        const gap = (max - min).toFixed(2);
        
        if (parseFloat(gap) > 0) {
            const maxDept = deptData.find(d => parseFloat(d.categoryAvgs[cat]) === max);
            const minDept = deptData.find(d => parseFloat(d.categoryAvgs[cat]) === min);
            
            categoryGaps.push({
                category: cat,
                gap: parseFloat(gap),
                max: max.toFixed(2),
                min: min.toFixed(2),
                maxDept: maxDept.dept,
                minDept: minDept.dept
            });
        }
    });
    
    categoryGaps.sort((a, b) => b.gap - a.gap);
    const topGap = categoryGaps[0];
    
    // 最高部署の強みカテゴリ（上位2つ）
    const bestDeptCategories = Object.entries(bestDept.categoryAvgs)
        .map(([cat, score]) => ({ cat, score: parseFloat(score) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 2);
    
    // 最低部署の弱みカテゴリ（下位2つ）
    const worstDeptCategories = Object.entries(worstDept.categoryAvgs)
        .map(([cat, score]) => ({ cat, score: parseFloat(score) }))
        .sort((a, b) => a.score - b.score)
        .slice(0, 2);
    
    html += `
        <div style="background: #f8f9fa; padding: 30px; border-radius: 15px; box-shadow: 0 5px 20px rgba(0,0,0,0.1);">
            <h3 style="color: #667eea; margin-bottom: 20px;">🤖 AI分析レポート</h3>
            
            <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 5px solid #667eea;">
                <p style="margin-bottom: 10px;"><strong>🏆 最も高スコアの部署:</strong> ${bestDept.dept} (平均 ${bestDept.avgTotalScore.toFixed(2)}点、${bestDept.count}名)</p>
                <p style="margin-bottom: 10px;"><strong>⚠️ 最も低スコアの部署:</strong> ${worstDept.dept} (平均 ${worstDept.avgTotalScore.toFixed(2)}点、${worstDept.count}名)</p>
                <p style="margin-bottom: 10px;"><strong>👨‍💼 最優秀マネージャー:</strong> ${bestManager.dept} (上司サポート ${bestManager.managerScore.toFixed(2)}点)</p>
                <p style="margin-bottom: 10px;"><strong>🔧 改善が必要なマネージャー:</strong> ${worstManager.dept} (上司サポート ${worstManager.managerScore.toFixed(2)}点)</p>
                <p><strong>📈 最大カテゴリ差:</strong> ${topGap.category} (差分 ${topGap.gap.toFixed(2)}点)</p>
                <p style="margin-top: 10px; color: #666; font-size: 0.9em;">
                    └ 最高: ${topGap.maxDept} (${topGap.max}点) / 最低: ${topGap.minDept} (${topGap.min}点)
                </p>
            </div>
            
            <h4 style="color: #555; margin-top: 25px; margin-bottom: 15px;">💡 詳細分析</h4>
            <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 15px;">
                <ul style="line-height: 1.8; color: #555;">
                    <li><strong>${bestDept.dept}の強み:</strong> ${bestDeptCategories.map(c => `${c.cat}(${c.score.toFixed(2)}点)`).join('、')}</li>
                    <li><strong>${worstDept.dept}の課題:</strong> ${worstDeptCategories.map(c => `${c.cat}(${c.score.toFixed(2)}点)`).join('、')}</li>
                    <li><strong>マネージャー評価差:</strong> ${(bestManager.managerScore - worstManager.managerScore).toFixed(2)}点 (${bestManager.dept} vs ${worstManager.dept})</li>
                </ul>
            </div>
            
            <h4 style="color: #555; margin-top: 25px; margin-bottom: 15px;">📌 推奨アクション</h4>
            <div style="background: white; padding: 20px; border-radius: 10px;">
                <ul style="line-height: 1.8; color: #555;">
                    <li>${worstDept.dept}に対する ${worstDeptCategories[0].cat} 改善施策の実施</li>
                    <li>${bestDept.dept}のベストプラクティスの他部署への共有</li>
                    <li>${bestManager.dept}のマネジメント手法を ${worstManager.dept} へ横展開</li>
                    <li>${topGap.category}に関する部署間の情報交換会の実施</li>
                    <li>定期的なエンゲージメント調査の継続実施</li>
                    <li>マネージャー研修の実施 (特に${worstManager.dept}管理職を優先)</li>
                </ul>
            </div>
        </div>
    `;
    
    resultContainer.innerHTML = html;
    
    // グラフを描画
    drawDeptComparisonChart(deptData);
}

function drawDeptComparisonChart(deptData) {
    const canvas = document.getElementById('deptComparisonChart');
    if (!canvas) return;
    
    // 既存のチャートを破棄
    if (deptComparisonChart) {
        deptComparisonChart.destroy();
    }
    
    const ctx = canvas.getContext('2d');
    
    const categories = ['心身の健康', '仕事の充実感', '成長機会', '上司のサポート', 'チームとの協働', 
                       '評価・処遇', '会社への信頼', '働く環境', '総合満足度', '組織へのつながり'];
    
    const colors = [
        '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', 
        '#858796', '#5a5c69', '#2e59d9', '#17a673', '#2c9faf'
    ];
    
    const datasets = deptData.map((dept, index) => {
        const data = categories.map(cat => parseFloat(dept.categoryAvgs[cat]));
        return {
            label: dept.dept + ' (' + dept.count + '名)',
            data: data,
            backgroundColor: colors[index % colors.length] + '80',
            borderColor: colors[index % colors.length],
            borderWidth: 2
        };
    });
    
    deptComparisonChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5,
                    title: {
                        display: true,
                        text: 'スコア (5点満点)',
                        font: { size: 14 }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'カテゴリ',
                        font: { size: 14 }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: '部署別カテゴリスコア比較',
                    font: { size: 18 }
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
}
