"use client"

import { useState } from "react"

export function VisionSection() {
  const [feedback, setFeedback] = useState<string | null>(null)

  const handleAction = (action: "search" | "action") => {
    if (action === "search") {
      setFeedback("search")
    } else {
      setFeedback("action")
    }
  }

  return (
    <section className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <header>
        <h2 className="text-3xl font-bold text-foreground">Vision & Produit</h2>
        <p className="text-muted-foreground mt-2">
          Redéfinition de la promesse de valeur : Immo+ garantit la performance du bien.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Concept Column */}
        <div className="bg-card p-6 rounded-xl shadow-sm border border-border space-y-6">
          <div>
            <h3 className="font-bold text-lg mb-4 text-sky-700 dark:text-sky-400 border-b border-border pb-2">
              Modèle Recommandé : Gestion par la Plateforme
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Dès qu'un bien est fractionné, sa gestion passe sous contrôle Immo+.
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <span className="text-sky-500 font-bold mr-2">1.</span>
                <span><strong className="text-foreground">Propriétaire :</strong> <span className="text-muted-foreground">Apporte terrain/maison, accepte division, devient copropriétaire passif.</span></span>
              </li>
              <li className="flex items-start">
                <span className="text-sky-500 font-bold mr-2">2.</span>
                <span><strong className="text-foreground">Immo+ :</strong> <span className="text-muted-foreground">Gère locations (courte/longue), trouve locataires, fixe prix, encaisse, redistribue.</span></span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 font-bold mr-2">✓</span>
                <span><strong className="text-foreground">Avantages :</strong> <span className="text-muted-foreground">Revenus prévisibles, Qualité contrôlée, Confiance investisseurs.</span></span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-indigo-700 dark:text-indigo-400 border-b border-border pb-2">
              La Confiance comme Pilier
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Badge Vérifié", desc: "Certification stricte des propriétaires." },
                { title: "Conseiller IA", desc: "Suggestions intelligentes dans les notifications." },
                { title: "Alertes Prix", desc: "Notifications d'opportunités selon budget." },
                { title: "Recommandations", desc: "Basées sur budget et zone." },
              ].map((item, idx) => (
                <div key={idx} className="bg-muted p-3 rounded">
                  <h4 className="font-bold text-sm text-foreground">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* UX Interactive Demo */}
        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl">📱</div>
          <h3 className="font-bold text-lg mb-6 z-10 relative">Le Parcours Décisionnel (Toggle Avatar)</h3>
          
          <div className="bg-white text-slate-800 rounded-2xl p-4 max-w-sm mx-auto shadow-2xl z-10 relative border-4 border-slate-800">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-sky-100 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl">
                🤖
              </div>
              <h4 className="font-bold">Bonjour Alex !</h4>
              <p className="text-xs text-gray-500">Que veux-tu faire aujourd'hui ?</p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => handleAction("search")}
                className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center transition-colors border border-gray-200"
              >
                <span className="bg-white p-2 rounded-full mr-3 shadow-sm">🔍</span>
                <div className="text-left">
                  <div className="font-bold text-sm">Recherche Immédiate</div>
                  <div className="text-[10px] text-gray-500">Parcourir les biens</div>
                </div>
              </button>
              <button
                onClick={() => handleAction("action")}
                className="w-full py-3 px-4 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-xl flex items-center transition-colors shadow-sm"
              >
                <span className="bg-white p-2 rounded-full mr-3 shadow-sm text-sky-600">⚡</span>
                <div className="text-left">
                  <div className="font-bold text-sm text-sky-900">Résultat Actionnable</div>
                  <div className="text-[10px] text-sky-600">J'ai un budget, trouvez pour moi</div>
                </div>
              </button>
            </div>
            
            <div className={`mt-4 p-3 rounded text-xs text-center min-h-[3rem] flex items-center justify-center transition-all ${
              feedback === "search"
                ? "bg-sky-50 text-slate-700 border border-sky-100"
                : feedback === "action"
                ? "bg-orange-50 text-slate-700 border border-orange-100"
                : "bg-slate-50 italic text-slate-500"
            }`}>
              {feedback === "search" ? (
                <>
                  <span className="text-sky-600 font-bold">Recherche Immédiate :</span><br />
                  L'utilisateur explore le catalogue. Filtres "Statut Actif" améliorés.
                </>
              ) : feedback === "action" ? (
                <>
                  <span className="text-orange-600 font-bold">Résultat Actionnable :</span><br />
                  Recommandations intelligentes selon budget et zone. Alerte prix activée.
                </>
              ) : (
                "Cliquez sur une option..."
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
