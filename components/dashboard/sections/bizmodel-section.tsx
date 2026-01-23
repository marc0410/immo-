"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const revenueData = [
  { name: "Ventes (10%)", value: 40, color: "#f97316" },
  { name: "Location Saisonnière (5%)", value: 20, color: "#0ea5e9" },
  { name: "Séjour (7%)", value: 28, color: "#06b6d4" },
  { name: "Gestion Location (1000FCFA/visite)", value: 12, color: "#6366f1" },
]

export function BizModelSection() {
  return (
    <section className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <header>
        <h2 className="text-3xl font-bold text-foreground">Business Model & Tarification</h2>
        <p className="text-muted-foreground mt-2">
          Modèle de commission clair et transparent : revenus passifs du propriétaire.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Revenue Model */}
        <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
          <h3 className="font-bold text-lg mb-4 text-foreground">1. Structure de Commission</h3>
          <p className="text-sm text-muted-foreground mb-4">Commission Immo+ sur les transactions.</p>
          
          <ul className="space-y-4">
            <li className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-950/20 rounded border border-orange-200 dark:border-orange-800">
              <span className="font-bold text-sm text-foreground">🏠 Ventes</span>
              <span className="text-sm font-semibold bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 px-3 py-1 rounded">
                10%
              </span>
            </li>
            <li className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded border border-blue-200 dark:border-blue-800">
              <span className="font-bold text-sm text-foreground">📅 Location Saisonnière</span>
              <span className="text-sm font-semibold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-3 py-1 rounded">
                5%
              </span>
            </li>
            <li className="flex justify-between items-center p-3 bg-cyan-50 dark:bg-cyan-950/20 rounded border border-cyan-200 dark:border-cyan-800">
              <span className="font-bold text-sm text-foreground">🛏️ Séjour</span>
              <span className="text-sm font-semibold bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 px-3 py-1 rounded">
                7%
              </span>
            </li>
            <li className="flex justify-between items-center p-3 bg-indigo-50 dark:bg-indigo-950/20 rounded border border-indigo-200 dark:border-indigo-800">
              <span className="font-bold text-sm text-foreground">🔑 Gestion Location</span>
              <span className="text-sm font-semibold bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded">
                1000FCFA /visite
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

        {/* Autres revenus */}
        <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
          <h3 className="font-bold text-lg mb-4 text-foreground">2. Gestion de Location & Partenaires</h3>
          
          <div className="space-y-4">
            <div className="bg-indigo-50 dark:bg-indigo-950/20 border-l-4 border-indigo-500 p-4 rounded">
              <h4 className="font-bold text-indigo-900 dark:text-indigo-100 text-sm">🔑 Gestion de Location</h4>
              <ul className="text-sm text-indigo-800 dark:text-indigo-200 mt-2 space-y-1">
                <li>✓ <strong>1000FCFA / visite</strong> (frais fixes)</li>
                <li>✓ <strong>35% de commission</strong> sur 3 mois d'agence</li>
                <li>✓ Gestion complète des cautions et documents</li>
              </ul>
            </div>

            <div className="bg-purple-50 dark:bg-purple-950/20 border-l-4 border-purple-500 p-4 rounded">
              <h4 className="font-bold text-purple-900 dark:text-purple-100 text-sm">🤝 Commission Agences</h4>
              <ul className="text-sm text-purple-800 dark:text-purple-200 mt-2 space-y-1">
                <li>✓ <strong>35% sur les frais d'agence</strong> pour les 3 premiers mois</li>
                <li>✓ Automatisé via backend (pas de facturation manuelle)</li>
                <li>✓ Support clients dédié pour agents</li>
              </ul>
            </div>

            <div className="bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 p-4 rounded">
              <h4 className="font-bold text-green-900 dark:text-green-100 text-sm">💡 Modèle de Valeur</h4>
              <p className="text-sm text-green-800 dark:text-green-200 mt-2">
                Les propriétaires reçoivent <strong>revenus passifs</strong> sans gérer les locataires. Immo+ prend 100% de la gestion.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Growth Strategy */}
      <div className="bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 rounded-xl p-6">
        <h3 className="font-bold text-lg mb-4 text-foreground">3. Moteur de Croissance : Démarcheurs & Liquidité(À discuter et à peaufiner)</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-orange-50 dark:bg-orange-950/30 border-l-4 border-orange-500 p-4">
            <h4 className="font-bold text-orange-900 dark:text-orange-100">Tactique "Blitz" (Mois 1-2)</h4>
            <ul className="list-disc list-inside text-sm text-orange-800 dark:text-orange-200 mt-2 space-y-1">
              <li>Commission démarcheurs très basse ou nulle</li>
              <li>Publication gratuite pour premiers propriétaires</li>
              <li>Bonus pour les meilleurs sources</li>
              <li><strong>But :</strong> Maximiser l'offre rapidement</li>
            </ul>
          </div>

          <div className="bg-muted p-4 rounded border border-border">
            <h4 className="font-bold text-foreground">Le Rôle du Démarcheur</h4>
            <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
              <li>Apporteur de biens qualifiés</li>
              <li>Commission via lien/code unique</li>
              <li>Paiement automatisé backend</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
