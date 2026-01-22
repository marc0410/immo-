"use client"

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend, Tooltip } from "recharts"

const kpiData = [
  { name: "Actuel", vanity: 80, business: 20 },
  { name: "Cible V2", vanity: 30, business: 90 },
]

export function KpiSection() {
  return (
    <section className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <header>
        <h2 className="text-3xl font-bold text-foreground">KPIs & Finance</h2>
        <p className="text-muted-foreground mt-2">
          Passage des "Vanity Metrics" aux vrais indicateurs de performance business.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Metrics Chart */}
        <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
          <h3 className="font-bold text-lg mb-4 text-foreground">Focus Métriques</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={kpiData}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis hide />
                <Tooltip />
                <Legend 
                  formatter={(value) => (
                    <span className="text-xs text-foreground">
                      {value === "vanity" ? "Vanity (Téléchargements)" : "Business (Conversion/€)"}
                    </span>
                  )}
                />
                <Bar dataKey="vanity" name="vanity" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="business" name="business" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Strategic Metrics List */}
        <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
          <h3 className="font-bold text-lg mb-4 text-foreground">Indicateurs Manquants à Implémenter</h3>
          <div className="space-y-4">
            {[
              { title: "Conversion", desc: "Visiteur → Investisseur. Le vrai moteur de revenus.", color: "border-sky-500 bg-sky-50 dark:bg-sky-950/30 text-sky-900 dark:text-sky-100" },
              { title: "Taux de Rétention", desc: "Fréquence de retour sur l'app (Stickiness).", color: "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-900 dark:text-indigo-100" },
              { title: "Taux de Réservation/Remplissage", desc: "Vital pour le modèle 'Gestionnaire'.", color: "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-100" },
              { title: "Pilotage Financier", desc: "Tableau de bord financier actuellement peu lisible.", color: "border-slate-500 bg-muted text-foreground" },
            ].map((metric, idx) => (
              <div key={idx} className={`p-3 border-l-4 ${metric.color} rounded`}>
                <h4 className="font-bold text-sm">{metric.title}</h4>
                <p className="text-xs opacity-75">{metric.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
