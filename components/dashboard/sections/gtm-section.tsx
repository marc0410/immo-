"use client"

export function GtmSection() {
  const marketingTactics = [
    { icon: "🏆", title: "Récompenses Pré-reg", desc: "Badge Early Access", color: "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-100 dark:border-yellow-900 text-yellow-800 dark:text-yellow-200" },
    { icon: "👥", title: "Parrainage Simple", desc: "1 ami = avantage pour les deux", color: "bg-sky-50 dark:bg-sky-950/30 border-sky-100 dark:border-sky-900 text-sky-800 dark:text-sky-200" },
    { icon: "🎥", title: "Viral Content", desc: "TikTok/Shorts Visites rapides", color: "bg-pink-50 dark:bg-pink-950/30 border-pink-100 dark:border-pink-900 text-pink-800 dark:text-pink-200" },
    { icon: "💬", title: "Community", desc: "Groupe WhatsApp Investisseurs", color: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900 text-emerald-800 dark:text-emerald-200" },
  ]

  return (
    <section className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <header>
        <h2 className="text-3xl font-bold text-foreground">Lancement : Opération Phénix (1.5 Mois)</h2>
        <p className="text-muted-foreground mt-2">
          Stratégie de "Pré-registration" sur les stores et communication de relance.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Store Strategy */}
        <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
          <h3 className="font-bold text-lg mb-4 text-indigo-700 dark:text-indigo-400">
            Stratégie Stores : "Pré-commande"
          </h3>
          <div className="space-y-4 text-sm">
            <div className="bg-indigo-50 dark:bg-indigo-950/30 p-4 rounded border border-indigo-100 dark:border-indigo-900">
              <h4 className="font-bold text-indigo-900 dark:text-indigo-100">Le Setup Technique</h4>
              <ul className="list-disc list-inside mt-2 text-indigo-800 dark:text-indigo-200 text-xs space-y-1">
                <li><strong>Google Play :</strong> Pre-registration activée.</li>
                <li><strong>Apple App Store :</strong> Pre-order activée.</li>
                <li><strong>Résultat :</strong> Installation <u>automatique</u> le jour J.</li>
              </ul>
            </div>
            
            <div className="bg-muted p-4 rounded border border-border">
              <h4 className="font-bold text-foreground">Option Recommandée : Nouvelle Version Majeure</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Annoncer une V2 / Relaunch. Mettre la version actuelle en maintenance/accès limité.
              </p>
              <div className="mt-3 p-2 bg-card border border-border rounded text-center italic text-muted-foreground text-xs">
                <span className="text-red-500 font-bold">❌ PAS :</span> "L'app est en retard"<br />
                <span className="text-emerald-500 font-bold">✅ OUI :</span> "Une nouvelle façon de réserver et d'investir arrive"
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
          <h3 className="font-bold text-lg mb-4 text-foreground">Timeline Réaliste (1.5 Mois)</h3>
          <div className="space-y-6 relative border-l-2 border-muted ml-3 pl-6">
            {[
              { week: "Semaine 1", title: "Annonce & Maintenance", desc: "Mise en place Pre-reg. Landing page 'Book a demo'.", color: "bg-sky-500" },
              { week: "Semaine 2-3", title: "Améliorations Critiques", desc: "Fix UX bugs, Optimisation images, Rate Limit. Communication continue (Podcast/Shorts).", color: "bg-indigo-500" },
              { week: "Semaine 4-5", title: "Lancement V2", desc: "Install auto, Push notifs, Bonus démarcheurs activé.", color: "bg-emerald-500" },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className={`absolute -left-[31px] ${item.color} h-4 w-4 rounded-full border-2 border-card`} />
                <h4 className="font-bold text-sm text-foreground">{item.week} : {item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Marketing Tactics */}
        <div className="bg-card p-6 rounded-xl shadow-sm border border-border lg:col-span-2">
          <h3 className="font-bold text-lg mb-4 text-foreground">Tactiques Marketing Rapides</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {marketingTactics.map((tactic, idx) => (
              <div key={idx} className={`p-3 rounded border ${tactic.color}`}>
                <div className="text-xl">{tactic.icon}</div>
                <div className="text-xs font-bold mt-1">{tactic.title}</div>
                <div className="text-[10px] opacity-75">{tactic.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
