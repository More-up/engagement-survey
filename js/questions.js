// 質問データ
const questions = [
    // カテゴリー1: 仕事の充実感（12問）
    {
        category: "仕事の充実感",
        categoryDescription: "仕事そのものに対する満足度・やりがいを測定",
        questions: [
            { id: 1, text: "今の仕事にやりがいを感じている", reverse: false },
            { id: 2, text: "自分の仕事が会社の成長に貢献していると感じる", reverse: false },
            { id: 3, text: "仕事を通じて自分の強みを活かせている", reverse: false },
            { id: 4, text: "今の仕事内容に満足している", reverse: false },
            { id: 5, text: "仕事に対して前向きな気持ちで取り組めている", reverse: false },
            { id: 6, text: "自分の仕事が顧客や社会に価値を提供していると感じる", reverse: false },
            { id: 7, text: "仕事の成果が目に見える形で現れることが多い", reverse: false },
            { id: 8, text: "今の仕事は自分の適性に合っていると思う", reverse: false },
            { id: 9, text: "毎日の業務に意義を感じている", reverse: false },
            { id: 10, text: "自分の仕事に誇りを持っている", reverse: false },
            { id: 11, text: "仕事を通じて達成感を得られている", reverse: false },
            { id: 12, text: "今の仕事を続けたいと思う", reverse: false }
        ]
    },
    // カテゴリー2: 成長機会（11問）
    {
        category: "成長機会",
        categoryDescription: "キャリア開発・スキルアップの機会を測定",
        questions: [
            { id: 13, text: "会社は社員の成長を支援する環境が整っている", reverse: false },
            { id: 14, text: "新しいスキルを学ぶ機会が定期的に提供されている", reverse: false },
            { id: 15, text: "自分のキャリアプランについて上司と話し合う機会がある", reverse: false },
            { id: 16, text: "挑戦的な仕事を任せてもらえる", reverse: false },
            { id: 17, text: "今の会社で自分の市場価値が高まっていると感じる", reverse: false },
            { id: 18, text: "研修や教育プログラムが充実している", reverse: false },
            { id: 19, text: "将来のキャリアアップの道筋が見えている", reverse: false },
            { id: 20, text: "多様な業務経験を積むことができている", reverse: false },
            { id: 21, text: "自己啓発のための支援制度が整っている", reverse: false },
            { id: 22, text: "この会社で長期的に成長できると感じる", reverse: false },
            { id: 23, text: "自分の専門性を深める機会がある", reverse: false }
        ]
    },
    // カテゴリー3: 心身の健康（10問・逆転項目あり）
    {
        category: "心身の健康",
        categoryDescription: "ストレス・疲労・健康状態を測定",
        questions: [
            { id: 24, text: "仕事によるストレスで体調を崩すことがある", reverse: true },
            { id: 25, text: "休日でも仕事のことが頭から離れない", reverse: true },
            { id: 26, text: "最近、疲労が蓄積していると感じる", reverse: true },
            { id: 27, text: "仕事とプライベートのバランスが取れている", reverse: false },
            { id: 28, text: "十分な休息を取ることができている", reverse: false },
            { id: 29, text: "心身ともに健康な状態で働けている", reverse: false },
            { id: 30, text: "仕事による精神的な負担が大きい", reverse: true },
            { id: 31, text: "会社は社員の健康管理を重視している", reverse: false },
            { id: 32, text: "業務量は適切だと感じる", reverse: false },
            { id: 33, text: "朝、仕事に行くのが憂鬱に感じることがある", reverse: true }
        ]
    },
    // カテゴリー4: 上司のサポート（11問）
    {
        category: "上司のサポート",
        categoryDescription: "直属上司のマネジメント・支援を測定",
        questions: [
            { id: 34, text: "上司は部下の意見に耳を傾けてくれる", reverse: false },
            { id: 35, text: "上司から適切なフィードバックをもらえている", reverse: false },
            { id: 36, text: "困ったときに上司に相談しやすい", reverse: false },
            { id: 37, text: "上司は公平に評価してくれる", reverse: false },
            { id: 38, text: "上司のマネジメントスタイルに満足している", reverse: false },
            { id: 39, text: "上司は部下の成長を支援してくれる", reverse: false },
            { id: 40, text: "上司から明確な指示や方向性が示される", reverse: false },
            { id: 41, text: "上司との信頼関係が築けている", reverse: false },
            { id: 42, text: "上司は部下の業務負担に配慮してくれる", reverse: false },
            { id: 43, text: "上司の判断やリーダーシップに納得している", reverse: false },
            { id: 44, text: "上司は部下の強みを理解し活かそうとしている", reverse: false }
        ]
    },
    // カテゴリー5: チームの関係性（11問）
    {
        category: "チームの関係性",
        categoryDescription: "同僚・チームメンバーとの関係性を測定",
        questions: [
            { id: 45, text: "チームメンバーと良好な関係を築けている", reverse: false },
            { id: 46, text: "困ったときに同僚が助けてくれる", reverse: false },
            { id: 47, text: "チーム内で気軽に意見を言い合える雰囲気がある", reverse: false },
            { id: 48, text: "チームメンバーを信頼している", reverse: false },
            { id: 49, text: "チームで協力して仕事を進められている", reverse: false },
            { id: 50, text: "職場に尊敬できる同僚がいる", reverse: false },
            { id: 51, text: "チーム内でお互いの強みを活かし合えている", reverse: false },
            { id: 52, text: "職場の人間関係にストレスを感じることが少ない", reverse: false },
            { id: 53, text: "チームの一体感を感じる", reverse: false },
            { id: 54, text: "同僚とのコミュニケーションは円滑だ", reverse: false },
            { id: 55, text: "職場で孤立していると感じることはない", reverse: false }
        ]
    },
    // カテゴリー6: 評価・承認（11問）
    {
        category: "評価・承認",
        categoryDescription: "評価の公正性・承認・報酬への満足度を測定",
        questions: [
            { id: 56, text: "自分の頑張りが正当に評価されていると感じる", reverse: false },
            { id: 57, text: "評価制度は公平だと思う", reverse: false },
            { id: 58, text: "上司や同僚から感謝の言葉をかけられることが多い", reverse: false },
            { id: 59, text: "自分の成果が認められていると感じる", reverse: false },
            { id: 60, text: "報酬は自分の貢献度に見合っていると思う", reverse: false },
            { id: 61, text: "評価基準が明確で納得できる", reverse: false },
            { id: 62, text: "頑張れば報われる環境だと感じる", reverse: false },
            { id: 63, text: "自分の仕事ぶりについて定期的にフィードバックがある", reverse: false },
            { id: 64, text: "昇進・昇格の機会は公平に与えられている", reverse: false },
            { id: 65, text: "自分の努力が会社に認められていると感じる", reverse: false },
            { id: 66, text: "給与・待遇に満足している", reverse: false }
        ]
    },
    // カテゴリー7: 経営方針（11問）
    {
        category: "経営方針",
        categoryDescription: "会社のミッション・ビジョン・戦略への共感を測定",
        questions: [
            { id: 67, text: "会社のビジョンに共感している", reverse: false },
            { id: 68, text: "会社の方向性は明確だと感じる", reverse: false },
            { id: 69, text: "経営陣の判断を信頼している", reverse: false },
            { id: 70, text: "会社の価値観に共感できる", reverse: false },
            { id: 71, text: "会社の将来性に期待している", reverse: false },
            { id: 72, text: "経営方針が社員に適切に共有されている", reverse: false },
            { id: 73, text: "会社の事業内容に誇りを持っている", reverse: false },
            { id: 74, text: "経営陣は社員の声に耳を傾けている", reverse: false },
            { id: 75, text: "会社の理念やミッションに共感している", reverse: false },
            { id: 76, text: "会社の意思決定プロセスは透明だと感じる", reverse: false },
            { id: 77, text: "この会社の一員であることを誇りに思う", reverse: false }
        ]
    },
    // カテゴリー8: 職場風土（12問）
    {
        category: "職場風土",
        categoryDescription: "組織の雰囲気・文化・心理的安全性を測定",
        questions: [
            { id: 78, text: "職場では失敗を恐れずに挑戦できる雰囲気がある", reverse: false },
            { id: 79, text: "意見の違いを尊重し合う文化がある", reverse: false },
            { id: 80, text: "職場で自分らしくいられる", reverse: false },
            { id: 81, text: "新しいアイデアや提案が歓迎される", reverse: false },
            { id: 82, text: "職場の雰囲気は明るく前向きだ", reverse: false },
            { id: 83, text: "部門間の連携がスムーズだ", reverse: false },
            { id: 84, text: "職場では率直なコミュニケーションが取れる", reverse: false },
            { id: 85, text: "会社は多様性を尊重している", reverse: false },
            { id: 86, text: "困難な状況でもチーム全体で乗り越えようとする風土がある", reverse: false },
            { id: 87, text: "職場では助け合いの精神が根付いている", reverse: false },
            { id: 88, text: "会社の文化や価値観に共感できる", reverse: false },
            { id: 89, text: "心理的に安全な環境で働けている", reverse: false }
        ]
    },
    // カテゴリー9: 就業環境（11問）
    {
        category: "就業環境",
        categoryDescription: "物理的環境・制度・ワークライフバランスを測定",
        questions: [
            { id: 90, text: "オフィス環境は快適だ", reverse: false },
            { id: 91, text: "必要な設備やツールが整っている", reverse: false },
            { id: 92, text: "柔軟な働き方（リモートワーク等）が可能だ", reverse: false },
            { id: 93, text: "休暇を取りやすい雰囲気がある", reverse: false },
            { id: 94, text: "労働時間は適切に管理されている", reverse: false },
            { id: 95, text: "福利厚生制度は充実している", reverse: false },
            { id: 96, text: "通勤の負担は少ない", reverse: false },
            { id: 97, text: "業務に集中できる環境が整っている", reverse: false },
            { id: 98, text: "会社の制度（休暇・手当等）に満足している", reverse: false },
            { id: 99, text: "プライベートの時間を十分に確保できている", reverse: false },
            { id: 100, text: "今の働き方に満足している", reverse: false }
        ]
    }
];

// スコア評価基準
const scoreCriteria = {
    excellent: { min: 80, label: "非常に高いエンゲージメント", color: "#10b981" },
    good: { min: 70, label: "良好なエンゲージメント", color: "#3b82f6" },
    moderate: { min: 60, label: "平均的なエンゲージメント", color: "#f59e0b" },
    low: { min: 50, label: "やや低いエンゲージメント", color: "#f97316" },
    critical: { min: 0, label: "早急な対策が必要", color: "#ef4444" }
};

// フィードバックメッセージ
const feedbackMessages = {
    excellent: "非常に高いエンゲージメントです！現在の良好な状態を維持しながら、更なる成長を目指しましょう。",
    good: "良好なエンゲージメントが保たれています。より高い水準を目指して、改善の余地がある分野に注目しましょう。",
    moderate: "エンゲージメントは平均的な水準です。スコアが低いカテゴリーを重点的に改善することで、全体の向上が期待できます。",
    low: "エンゲージメントがやや低い状態です。特に低スコアのカテゴリーについて、具体的な改善施策が必要です。",
    critical: "エンゲージメントが著しく低い状態です。早急に組織的な対策を講じることを強く推奨します。"
};
