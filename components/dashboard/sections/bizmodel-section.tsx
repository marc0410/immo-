"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const revenueData = [
  { name: "Court Séjour (Fréquence)", value: 45, color: "#0ea5e9" },
  { name: "Longue Durée (Fixe)", value: 20, color: "#6366f1" },
  { name: "Vente (Marge)", value: 35, color: "#f97316" },
]

export function BizModelSection() {
  return (
    <section className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <header>
        <h2 className="text-3xl font-bold text-foreground">Business Model & Croissance</h2>
        <p className="text-muted-foreground mt-2">
          Clarté radicale sur les commissions et acquisition agressive de l'offre (Liquidité).
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Revenue Model */}
        <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
          <h3 className="font-bold text-lg mb-4 text-foreground">1. Modèle de Commission Simplifié</h3>
          <p className="text-sm text-muted-foreground mb-4">Pas de frais cachés. Transparence totale.</p>
          
          <ul className="space-y-4">
            <li className="flex justify-between items-center p-3 bg-muted rounded border border-border">
              <span className="font-bold text-sm text-foreground">🏠 Court Séjour</span>
              <span className="text-xs bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 px-2 py-1 rounded">
                % sur chaque réservation
              </span>
            </li>
            <li className="flex justify-between items-center p-3 bg-muted rounded border border-border">
              <span className="font-bold text-sm text-foreground">📅 Longue Durée</span>
              <span className="text-xs bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded">
                Commission unique à la signature
              </span>
            </li>
            <li className="flex justify-between items-center p-3 bg-muted rounded border border-border">
              <span className="font-bold text-sm text-foreground">🤝 Vente</span>
              <span className="text-xs bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 px-2 py-1 rounded">
                % Vendeur uniquement
              </span>
            </li>
          </ul>
          
          <div className="mt-6 h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend 
                  formatter={(value) => <span className="text-xs text-foreground">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Growth Strategy */}
        <div className="bg-card p-6 rounded-xl shadow-sm border border-border flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">2. Les Démarcheurs (Moteur de Croissance)</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Objectif : Faire rentrer le maximum de biens en moins d'un mois. 
              Sans offre massive, conversion impossible.
            </p>
            
            <div className="space-y-4">
              <div className="bg-orange-50 dark:bg-orange-950/30 border-l-4 border-orange-500 p-4">
                <h4 className="font-bold text-orange-900 dark:text-orange-100 text-sm">Tactique "Blitz" (Mois 1-2)</h4>
                <ul className="list-disc list-inside text-xs text-orange-800 dark:text-orange-200 mt-1 space-y-1">
                  <li>Commission plateforme très basse ou nulle</li>
                  <li>Publication gratuite pour propriétaires</li>
                  <li>Bonus pour les premiers démarcheurs</li>
                  <li><strong>But :</strong> Acheter la liquidité du marché pour récupérer la valeur plus tard.</li>
                </ul>
              </div>

              <div className="bg-muted p-4 rounded border border-border">
                <h4 className="font-bold text-foreground text-sm">Le Rôle du Démarcheur</h4>
                <ul className="list-disc list-inside text-xs text-muted-foreground mt-1 space-y-1">
                  <li>Apporteur d'offres (pas vendeur final)</li>
                  <li>Commission via lien/code unique</li>
                  <li>Paiement auto backend (Pas de salaire fixe)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
