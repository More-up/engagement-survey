const questions = [
    // ============================
    // 1. 仕事の充実感（11問）
    // ============================
    { category: "仕事の充実感", question: "今の仕事にやりがいを感じている" },
    { category: "仕事の充実感", question: "自分の仕事が会社の目標達成に貢献していると感じる" },
    { category: "仕事の充実感", question: "仕事を通じて達成感を得られている" },
    { category: "仕事の充実感", question: "自分の強みを活かせる仕事ができている" },
    { category: "仕事の充実感", question: "日々の業務に意味を感じている" },
    { category: "仕事の充実感", question: "仕事の内容に興味を持てている" },
    { category: "仕事の充実感", question: "自分の判断で仕事を進められている" },
    { category: "仕事の充実感", question: "仕事の成果が適切に評価されている" },
    { category: "仕事の充実感", question: "担当業務の範囲が明確である" },
    { category: "仕事の充実感", question: "業務量は適切である" },
    { category: "仕事の充実感", question: "仕事とプライベートのバランスが取れている" },

    // ============================
    // 2. 成長機会（11問）
    // ============================
    { category: "成長機会", question: "自分のスキルアップを会社が支援してくれる" },
    { category: "成長機会", question: "将来のキャリアの道筋が見えている" },
    { category: "成長機会", question: "新しいスキルを学ぶ機会がある" },
    { category: "成長機会", question: "仕事を通じて成長を実感できている" },
    { category: "成長機会", question: "挑戦的な仕事を任されている" },
    { category: "成長機会", question: "自分の希望するキャリアパスが実現可能である" },
    { category: "成長機会", question: "仕事を通じて自分が何を目指すべきかが明確である" },
    { category: "成長機会", question: "研修や勉強会に参加する機会がある" },
    { category: "成長機会", question: "他部署との連携で学べることがある" },
    { category: "成長機会", question: "上司や先輩から学べる環境がある" },
    { category: "成長機会", question: "失敗を成長の機会として捉える文化がある" },

    // ============================
    // 3. 健康とウェルビーイング（11問）
    // ============================
    { category: "健康とウェルビーイング", question: "仕事のストレスは許容できる範囲内である" },
    { category: "健康とウェルビーイング", question: "十分な休息が取れている" },
    { category: "健康とウェルビーイング", question: "心身の健康について相談できる環境がある" },
    { category: "健康とウェルビーイング", question: "健康維持のためのサポートが充実している" },
    { category: "健康とウェルビーイング", question: "働く時間を自分でコントロールできている" },
    { category: "健康とウェルビーイング", question: "休暇を取りやすい環境である" },
    { category: "健康とウェルビーイング", question: "長時間労働を強いられることはない" },
    { category: "健康とウェルビーイング", question: "仕事で心身が過度に疲弊することはない" },
    { category: "健康とウェルビーイング", question: "安心して意見を言える職場である" },
    { category: "健康とウェルビーイング", question: "職場の人間関係は良好である" },
    { category: "健康とウェルビーイング", question: "自分らしく働ける職場である" },

    // ============================
    // 4. 上司のサポート（11問）
    // ============================
    { category: "上司のサポート", question: "上司は私の意見を尊重してくれる" },
    { category: "上司のサポート", question: "上司から適切なフィードバックを受けている" },
    { category: "上司のサポート", question: "上司は私の成長を支援してくれる" },
    { category: "上司のサポート", question: "上司とのコミュニケーションは円滑である" },
    { category: "上司のサポート", question: "上司は公平に接してくれる" },
    { category: "上司のサポート", question: "困ったときに上司に相談できる" },
    { category: "上司のサポート", question: "上司から適切な権限委譲がされている" },
    { category: "上司のサポート", question: "上司からの期待が明確である" },
    { category: "上司のサポート", question: "上司の指示は明確で分かりやすい" },
    { category: "上司のサポート", question: "上司は部下の状況を把握している" },
    { category: "上司のサポート", question: "上司のマネジメントスタイルに満足している" },

    // ============================
    // 5. 部署内の関係（11問）
    // ============================
    { category: "部署内の関係", question: "自部署の目標が共有されている" },
    { category: "部署内の関係", question: "自部署のメンバーを信頼している" },
    { category: "部署内の関係", question: "自部署での協働がうまくいっている" },
    { category: "部署内の関係", question: "自部署内で情報共有がスムーズである" },
    { category: "部署内の関係", question: "自部署のメンバーは互いに助け合っている" },
    { category: "部署内の関係", question: "自部署の雰囲気は良好である" },
    { category: "部署内の関係", question: "自部署で自由に意見を言える" },
    { category: "部署内の関係", question: "自部署のメンバーの役割分担は明確である" },
    { category: "部署内の関係", question: "自部署での仕事の進め方に満足している" },
    { category: "部署内の関係", question: "自部署は一体感がある" },
    { category: "部署内の関係", question: "自部署の成果に誇りを持っている" },

    // ============================
    // 6. 評価と報酬（11問）
    // ============================
    { category: "評価と報酬", question: "評価基準が明確である" },
    { category: "評価と報酬", question: "評価は公平に行われている" },
    { category: "評価と報酬", question: "評価面談で前向きな話し合いができている" },
    { category: "評価と報酬", question: "自分の評価に納得している" },
    { category: "評価と報酬", question: "給与・報酬は仕事内容に見合っている" },
    { category: "評価と報酬", question: "昇進・昇格の機会は公平である" },
    { category: "評価と報酬", question: "頑張りが報われる会社だと感じる" },
    { category: "評価と報酬", question: "成果が適切に認められている" },
    { category: "評価と報酬", question: "福利厚生に満足している" },
    { category: "評価と報酬", question: "働きに応じた処遇を受けている" },
    { category: "評価と報酬", question: "評価制度に透明性がある" },

    // ============================
    // 7. 会社への信頼（11問）
    // ============================
    { category: "会社への信頼", question: "会社のMission・Vision・Valueを理解している" },
    { category: "会社への信頼", question: "会社のMission・Vision・Valueに共感している" },
    { category: "会社への信頼", question: "会社が目指していることと自分が目指していることがリンクしている" },
    { category: "会社への信頼", question: "この会社の未来に期待が持てる" },
    { category: "会社への信頼", question: "経営層からの情報が適切に届いている" },
    { category: "会社への信頼", question: "会社の進む方向性を理解している" },
    { category: "会社への信頼", question: "会社の意思決定の背景が理解できる" },
    { category: "会社への信頼", question: "会社の仕事が社会に役立っていると感じる" },
    { category: "会社への信頼", question: "会社の変化を前向きに受け止めている" },
    { category: "会社への信頼", question: "この会社で働くことに誇りを持っている" },
    { category: "会社への信頼", question: "この会社を他の人に勧めたい" },

    // ============================
    // 8. 働く環境（11問）
    // ============================
    { category: "働く環境", question: "オフィスは快適である" },
    { category: "働く環境", question: "必要な設備・ツールが揃っている" },
    { category: "働く環境", question: "安全で衛生的な職場環境である" },
    { category: "働く環境", question: "コミュニケーションしやすいレイアウトである" },
    { category: "働く環境", question: "リモートワークの環境が整っている" },
    { category: "働く環境", question: "働く場所の選択肢がある" },
    { category: "働く環境", question: "業務に必要な情報にアクセスしやすい" },
    { category: "働く環境", question: "ITシステムは使いやすい" },
    { category: "働く環境", question: "社内の手続きは効率的である" },
    { category: "働く環境", question: "無駄な業務や会議は少ない" },
    { category: "働く環境", question: "育児・介護との両立支援がある" },

    // ============================
    // 9. 総合的な満足度（12問）
    // ============================
    { category: "総合的な満足度", question: "今の会社で働けて満足している" },
    { category: "総合的な満足度", question: "この会社で長く働きたいと思う" },
    { category: "総合的な満足度", question: "この会社の一員であることを誇りに思う" },
    { category: "総合的な満足度", question: "朝、仕事に行くのが楽しみである" },
    { category: "総合的な満足度", question: "仕事を通じて充実感を得られている" },
    { category: "総合的な満足度", question: "今の仕事に満足している" },
    { category: "総合的な満足度", question: "会社の方針に納得している" },
    { category: "総合的な満足度", question: "職場の人間関係に満足している" },
    { category: "総合的な満足度", question: "自分の能力が発揮できている" },
    { category: "総合的な満足度", question: "今後のキャリアに期待が持てる" },
    { category: "総合的な満足度", question: "仕事とプライベートの両立ができている" },
    { category: "総合的な満足度", question: "総合的に見て、この会社は良い職場である" }
];
