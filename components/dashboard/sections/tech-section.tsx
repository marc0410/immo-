"use client"

export function TechSection() {
  return (
    <section className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <header>
        <h2 className="text-3xl font-bold text-foreground">Tech, Audit & Performance(En un coup D'oeil à peaufiner après avoir checker le code source)</h2>
        <p className="text-muted-foreground mt-2">
          État des lieux critique et plan de correction pour supporter la charge V2.
        </p>
      </header>

      {/* Detailed Audit Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
        <div className="bg-card p-4 rounded border border-red-200 dark:border-red-900 shadow-sm">
          <h3 className="font-bold text-red-700 dark:text-red-400 mb-2">Architecture & Cloud</h3>
          <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
            <li>Arch existante non documentée</li>
            <li>Problèmes chargement médias (Lenteur)</li>
            <li>Pas de CI/CD clair (Risque déploiement)</li>
          </ul>
        </div>
        
        <div className="bg-card p-4 rounded border border-border shadow-sm">
          <h3 className="font-bold text-foreground mb-2">Données & IA</h3>
          <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
            <li>Analytics basiques uniquement</li>
            <li>Pas d'analyse comportementale</li>
            <li>IA inexistante à ce stade</li>
          </ul>
        </div>
        
        <div className="bg-card p-4 rounded border border-border shadow-sm">
          <h3 className="font-bold text-foreground mb-2">Sécurité</h3>
          <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
            <li>Auth classique (Pwd/Email)</li>
            <li>Verif propriétaires non claire</li>
            <li>Conformité légale non visible</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Critical Urgencies */}
        <div className="bg-card p-6 rounded-xl border-l-4 border-red-500 shadow-sm">
          <h3 className="font-bold text-red-800 dark:text-red-300 mb-4 flex items-center">
            <span className="text-xl mr-2">⭐⭐⭐⭐⭐</span> Urgent / Critique
          </h3>
          <ul className="space-y-4">
            <li className="border-b border-border pb-2">
              <span className="font-bold text-foreground block text-sm">Gestion des Erreurs</span>
              <span className="text-xs text-muted-foreground">
                Chaque action (login, paiement) doit avoir un retour précis. Finis les crashs silencieux.
              </span>
            </li>
            <li className="border-b border-border pb-2">
              <span className="font-bold text-foreground block text-sm">Performance Médias</span>
              <span className="text-xs text-muted-foreground">
                Optimiser stockage/livraison. Support streaming vidéo léger pour visites digitales.
              </span>
            </li>
          </ul>
          
          <h3 className="font-bold text-orange-800 dark:text-orange-300 mt-6 mb-4 flex items-center">
            <span className="text-xl mr-2">⭐⭐⭐⭐</span> Moyen / Prioritaire
          </h3>
          <ul className="space-y-2">
            <li className="text-xs text-muted-foreground">
              <strong className="text-foreground">Gestion Utilisateurs :</strong> Simplifier rôles (clients, propriétaires, démarcheurs). Social Login.
            </li>
          </ul>
        </div>

        {/* Rate Limit Plan */}
        <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 p-6 rounded-xl">
          <h3 className="font-bold text-indigo-900 dark:text-indigo-100 mb-4 flex items-center">
            <span className="text-xl mr-2">🛡️</span> Plan Gestion Rate Limit
          </h3>
          <p className="text-xs text-indigo-700 dark:text-indigo-300 mb-4">
            But : Éviter blocage si 10 000+ utilisateurs arrivent simultanément.
          </p>
          
          <div className="grid grid-cols-1 gap-3">
            {[
              { step: "1. Mesurer", desc: "Identifier APIs critiques et logger les requêtes." },
              { step: "2. Limiter", desc: "Rate limit par IP/User avec messages clairs." },
              { step: "3. Optimiser", desc: "Caching, compression, lazy loading." },
              { step: "4. Scaler", desc: "Load balancing et auto-scaling cloud." },
            ].map((item, idx) => (
              <div key={idx} className="bg-card p-3 rounded shadow-sm">
                <h4 className="font-bold text-sm text-foreground">{item.step}</h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
