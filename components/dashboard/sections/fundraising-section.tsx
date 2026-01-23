"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend 
} from "recharts"
import { 
  Banknote, 
  Target, 
  Users, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  Briefcase,
  FileText,
  Presentation,
  Building2,
  Rocket,
  ArrowRight
} from "lucide-react"
import { cn } from "@/lib/utils"

const fundingRounds = [
  { 
    name: "Pre-Seed", 
    target: 150000, 
    raised: 0, 
    status: "active",
    timeline: "Q1 2025",
    description: "Validation produit & MVP"
  },
  { 
    name: "Seed", 
    target: 500000, 
    raised: 0, 
    status: "planned",
    timeline: "Q4 2025",
    description: "Scale & Expansion"
  },
]

const useOfFunds = [
  { name: "Tech & Produit", value: 40, color: "#0ea5e9" },
  { name: "Marketing & GTM", value: 25, color: "#10b981" },
  { name: "Operations", value: 20, color: "#f59e0b" },
  { name: "Legal & Admin", value: 10, color: "#8b5cf6" },
  { name: "Reserve", value: 5, color: "#64748b" },
]

const milestones = [
  { 
    title: "MVP Stable", 
    description: "Application fonctionnelle avec features core",
    status: "completed",
    date: "Dec 2024"
  },
  { 
    title: "100 Utilisateurs Beta", 
    description: "Validation du product-market fit initial",
    status: "in-progress",
    date: "Jan 2025"
  },
  { 
    title: "Premier Revenu", 
    description: "Premiere transaction monetisee",
    status: "pending",
    date: "Fev 2025"
  },
  { 
    title: "1000 MAU", 
    description: "Monthly Active Users milestone",
    status: "pending",
    date: "Mar 2025"
  },
  { 
    title: "Break-even Operations", 
    description: "Rentabilite operationnelle",
    status: "pending",
    date: "Q3 2025"
  },
]

const investorTypes = [
  { 
    type: "Business Angels", 
    tickets: "10K - 50K EUR",
    focus: "PropTech / Afrique",
    priority: "high"
  },
  { 
    type: "Family Offices", 
    tickets: "50K - 150K EUR",
    focus: "Real Estate Tech",
    priority: "medium"
  },
  { 
    type: "VC Early Stage", 
    tickets: "100K - 500K EUR",
    focus: "Seed / Series A",
    priority: "low"
  },
  { 
    type: "Accelerateurs", 
    tickets: "20K - 100K EUR + Support",
    focus: "Y Combinator, Techstars, etc.",
    priority: "high"
  },
]

const pitchDeckSections = [
  { name: "Problem", status: "done" },
  { name: "Solution", status: "done" },
  { name: "Market Size", status: "done" },
  { name: "Business Model", status: "done" },
  { name: "Traction", status: "in-progress" },
  { name: "Competition", status: "done" },
  { name: "Team", status: "done" },
  { name: "Financials", status: "in-progress" },
  { name: "Ask & Use of Funds", status: "done" },
]

const financialProjections = [
  { year: "2025", revenue: 50, costs: 0, users: 2 },
  { year: "2026", revenue: 250, costs: 150, users: 100 },
  { year: "2027", revenue: 800, costs: 200, users: 180 },
]

export function FundraisingSection() {
  const preSeedProgress = (fundingRounds[0].raised / fundingRounds[0].target) * 100

  return (
    <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <header className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-chart-1 via-primary to-chart-2 p-8 text-white">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg%20width%3D%2230%22%20height%3D%2230%22%20viewBox%3D%220%200%2030%2030%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M1.22676%200C1.91374%200%202.45351%200.539773%202.45351%201.22676C2.45351%201.91374%201.91374%202.45351%201.22676%202.45351C0.539773%202.45351%200%201.91374%200%201.22676C0%200.539773%200.539773%200%201.22676%200Z%22%20fill%3D%22rgba(255,255,255,0.07)%22%2F%3E%3C%2Fsvg%3E')",
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Banknote className="w-8 h-8" />
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Pre-Seed Active
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Levee de Fonds</h2>
          <p className="text-white/80 max-w-2xl">
            Strategie de financement Pre-Seed pour accelerer le developpement d'Immo+ V2 
            et atteindre le product-market fit sur le marche immobilier africain.
          </p>
        </div>
      </header>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Objectif Pre-Seed</p>
                <p className="text-2xl font-bold text-foreground mt-1">150K EUR</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Valorisation</p>
                <p className="text-2xl font-bold text-foreground mt-1">1.2M EUR</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-chart-2/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-chart-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Equity Offerte</p>
                <p className="text-2xl font-bold text-foreground mt-1">12.5%</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-chart-3/10 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-chart-3" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Runway Cible</p>
                <p className="text-2xl font-bold text-foreground mt-1">18 mois</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-chart-4/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-chart-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Funding Progress & Use of Funds */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Funding Rounds */}
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="w-5 h-5 text-primary" />
              Rounds de Financement
            </CardTitle>
            <CardDescription>Progression et objectifs par phase</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {fundingRounds.map((round, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-foreground">{round.name}</h4>
                    <Badge 
                      variant={round.status === "active" ? "default" : "secondary"}
                      className={cn(
                        round.status === "active" && "bg-chart-2 text-white"
                      )}
                    >
                      {round.status === "active" ? "En cours" : "Planifie"}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">{round.timeline}</span>
                </div>
                <p className="text-sm text-muted-foreground">{round.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {round.raised.toLocaleString()} EUR leves
                    </span>
                    <span className="font-medium text-foreground">
                      {round.target.toLocaleString()} EUR
                    </span>
                  </div>
                  <Progress 
                    value={(round.raised / round.target) * 100} 
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Use of Funds */}
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Banknote className="w-5 h-5 text-chart-2" />
              Utilisation des Fonds
            </CardTitle>
            <CardDescription>Repartition du budget Pre-Seed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="w-40 h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={useOfFunds}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {useOfFunds.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, '']}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2">
                {useOfFunds.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-foreground">{item.name}</span>
                    </div>
                    <span className="font-medium text-foreground">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Milestones & Investor Targets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Milestones */}
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-chart-4" />
              Milestones Pre-Seed
            </CardTitle>
            <CardDescription>Objectifs a atteindre pour la levee</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "flex items-start gap-4 p-3 rounded-xl transition-smooth",
                    milestone.status === "completed" && "bg-chart-4/5",
                    milestone.status === "in-progress" && "bg-primary/5",
                    milestone.status === "pending" && "bg-muted/50"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                    milestone.status === "completed" && "bg-chart-4/20 text-chart-4",
                    milestone.status === "in-progress" && "bg-primary/20 text-primary",
                    milestone.status === "pending" && "bg-muted text-muted-foreground"
                  )}>
                    {milestone.status === "completed" ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : milestone.status === "in-progress" ? (
                      <Clock className="w-4 h-4" />
                    ) : (
                      <span className="text-xs font-medium">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-medium text-foreground">{milestone.title}</h4>
                      <span className="text-xs text-muted-foreground shrink-0">{milestone.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Investor Targets */}
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-chart-1" />
              Cibles Investisseurs
            </CardTitle>
            <CardDescription>Profils d'investisseurs vises</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {investorTypes.map((investor, index) => (
                <div 
                  key={index}
                  className={cn(
                    "p-4 rounded-xl border transition-smooth hover:shadow-md",
                    investor.priority === "high" && "border-chart-4/30 bg-chart-4/5",
                    investor.priority === "medium" && "border-primary/30 bg-primary/5",
                    investor.priority === "low" && "border-border bg-muted/30"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{investor.type}</h4>
                    <Badge 
                      variant="outline"
                      className={cn(
                        "text-xs",
                        investor.priority === "high" && "border-chart-4 text-chart-4",
                        investor.priority === "medium" && "border-primary text-primary",
                        investor.priority === "low" && "border-muted-foreground text-muted-foreground"
                      )}
                    >
                      {investor.priority === "high" ? "Prioritaire" : investor.priority === "medium" ? "Secondaire" : "Optionnel"}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Tickets: </span>
                      <span className="text-foreground font-medium">{investor.tickets}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Focus: </span>
                      <span className="text-foreground">{investor.focus}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pitch Deck & Financial Projections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pitch Deck Status */}
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Presentation className="w-5 h-5 text-chart-3" />
              Pitch Deck
            </CardTitle>
            <CardDescription>Statut des sections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pitchDeckSections.map((section, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                >
                  <span className="text-sm text-foreground">{section.name}</span>
                  <Badge 
                    variant="outline"
                    className={cn(
                      "text-xs",
                      section.status === "done" && "border-chart-4 text-chart-4 bg-chart-4/10",
                      section.status === "in-progress" && "border-chart-3 text-chart-3 bg-chart-3/10"
                    )}
                  >
                    {section.status === "done" ? "Fait" : "En cours"}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Completion</span>
                <span className="font-semibold text-foreground">
                  {Math.round((pitchDeckSections.filter(s => s.status === "done").length / pitchDeckSections.length) * 100)}%
                </span>
              </div>
              <Progress 
                value={(pitchDeckSections.filter(s => s.status === "done").length / pitchDeckSections.length) * 100}
                className="h-2 mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Financial Projections */}
        <Card className="glass border-border/50 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Projections Financieres
            </CardTitle>
            <CardDescription>Revenus vs Couts (en milliers EUR)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={financialProjections} barGap={8}>
                  <XAxis 
                    dataKey="year" 
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value, name) => [
                      `${value}K EUR`,
                      name === "revenue" ? "Revenus" : "Couts"
                    ]}
                  />
                  <Legend 
                    formatter={(value) => (
                      <span className="text-xs text-foreground">
                        {value === "revenue" ? "Revenus" : "Couts"}
                      </span>
                    )}
                  />
                  <Bar dataKey="revenue" name="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="costs" name="costs" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
              {financialProjections.map((proj, index) => (
                <div key={index} className="text-center">
                  <p className="text-xs text-muted-foreground">{proj.year}</p>
                  <p className="text-lg font-bold text-foreground">{proj.users}K</p>
                  <p className="text-xs text-muted-foreground">Utilisateurs</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <Card className="glass border-chart-2/30 bg-chart-2/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-chart-2/20 flex items-center justify-center shrink-0">
              <ArrowRight className="w-6 h-6 text-chart-2" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground mb-2">Prochaines Etapes</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-chart-4" />
                  Finaliser le pitch deck avec les projections financieres
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-chart-3" />
                  Identifier et contacter 20 Business Angels PropTech/Afrique
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-chart-3" />
                  Preparer le data room (documents legaux, metriques, roadmap)
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-chart-3" />
                  Soumettre aux accelerateurs (Y Combinator, Techstars, etc.)
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
