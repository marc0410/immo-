"use client"

export function PartnersSection() {
  const partners = [
    { icon: "🏗️", title: "Promoteurs Immobiliers", desc: "Accès à des biens en volume et offres exclusives pour la plateforme.", color: "border-slate-600" },
    { icon: "🏦", title: "Banques / Fintechs", desc: "Faciliter paiement, pré-approbation crédit ou micro-investissement.", color: "border-sky-600" },
    { icon: "📍", title: "Agences Locales", desc: "Apport rapide de biens (Sourcing) et visibilité locale.", color: "border-orange-600" },
    { icon: "🤳", title: "Influenceurs Immo", desc: "Éducation du marché et promotion de l'app (Trafic).", color: "border-indigo-600" },
    { icon: "🛠️", title: "Services Annexes", desc: "Nettoyage, Sécurité, Rénovation. Ajoute de la valeur au bien géré.", color: "border-emerald-600" },
    { icon: "🎓", title: "Incubateurs", desc: "Accélération adoption et co-création de contenu éducatif.", color: "border-yellow-600" },
  ]

  return (
    <section className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <header>
        <h2 className="text-3xl font-bold text-foreground">Partenariats & Écosystème</h2>
        <p className="text-muted-foreground mt-2">
          Cibles prioritaires pour crédibilité et volume. Actuellement faible, à développer d'urgence.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner, idx) => (
          <div 
            key={idx} 
            className={`bg-card p-5 rounded-xl shadow-sm border-t-4 ${partner.color}`}
          >
            <h3 className="font-bold text-foreground">{partner.icon} {partner.title}</h3>
            <p className="text-xs text-muted-foreground mt-2">{partner.desc}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-muted p-4 rounded text-center text-xs text-muted-foreground italic">
        État Actuel : Partenariats stratégiques invisibles. Impact limité. Priorité pour la V2.
      </div>
    </section>
  )
}
