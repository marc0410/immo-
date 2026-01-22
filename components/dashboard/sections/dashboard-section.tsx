"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { 
  Eye, 
  Rocket, 
  Settings2, 
  Target, 
  TrendingUp, 
  Users,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Zap
} from "lucide-react"

interface DashboardSectionProps {
  onNavigate: (section: string) => void
}

const quickLinks = [
  { 
    id: "vision", 
    label: "Vision V2", 
    description: "Immo+ comme Chef d'Orchestre. Confiance par IA et badge propriétaire.",
    icon: Eye,
    color: "from-primary to-chart-2",
    bgColor: "bg-primary/5 hover:bg-primary/10 border-primary/20"
  },
  { 
    id: "gtm", 
    label: "Stratégie Store", 
    description: "Maintenance app actuelle puis Pré-registration V2 sur les stores.",
    icon: Rocket,
    color: "from-chart-3 to-chart-4",
    bgColor: "bg-chart-3/5 hover:bg-chart-3/10 border-chart-3/20"
  },
  { 
    id: "tech", 
    label: "Plan Résilience", 
    description: "Plan Rate Limit, Audit Sécurité & Data, CI/CD avant le scale.",
    icon: Settings2,
    color: "from-destructive to-chart-3",
    bgColor: "bg-destructive/5 hover:bg-destructive/10 border-destructive/20"
  },
]

const stats = [
  { label: "Score UX actuel", value: "0%", change: "+12", trend: "up", icon: Target },
  { label: "Issues critiques", value: "3", change: "-2", trend: "down", icon: AlertTriangle },
  { label: "Partenaires actifs", value: "5", change: "+1", trend: "up", icon: Users },
  { label: "Budget utilisé", value: "45%", change: "+8", trend: "up", icon: TrendingUp },
]

export function DashboardSection({ onNavigate }: DashboardSectionProps) {
  return (
    <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero Header */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sidebar to-sidebar/80 p-8 md:p-12">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">
            <Sparkles className="w-3 h-3 mr-1" />
            Stratégie V2
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-sidebar-foreground mb-3 tracking-tight">
            Tableau de Bord Stratégique
          </h1>
          <p className="text-sidebar-foreground/70 max-w-2xl leading-relaxed">
            Synthèse pour le comité de direction. Objectif : Pivoter vers un modèle "Gestionnaire", 
            restructurer la Tech, et lancer une "Opération V2" via pré-enregistrement sur les stores.
          </p>
          
          <div className="flex flex-wrap gap-3 mt-6">
            <Button 
              onClick={() => onNavigate("ux-audit")}
              className="gap-2 bg-primary hover:bg-primary/90 shadow-glow-sm"
            >
              <AlertTriangle className="w-4 h-4" />
              Voir l'audit UX
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onNavigate("screenshots")}
              className="gap-2 border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent bg-transparent"
            >
              <Zap className="w-4 h-4" />
              Ajouter un feedback
            </Button>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card 
              key={index} 
              className="glass border-border/50 hover:shadow-glow-sm transition-smooth group cursor-default"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-smooth",
                    "bg-primary/10 group-hover:bg-primary/20"
                  )}>
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "text-[10px]",
                      stat.trend === "up" ? "text-success border-success/30" : "text-destructive border-destructive/30"
                    )}
                  >
                    {stat.change}%
                  </Badge>
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickLinks.map((link) => {
          const Icon = link.icon
          return (
            <Card 
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={cn(
                "cursor-pointer transition-smooth border group overflow-hidden",
                link.bgColor
              )}
            >
              <CardContent className="p-6">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center mb-4",
                  "bg-gradient-to-br shadow-lg",
                  link.color
                )}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-smooth">
                  {link.label}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {link.description}
                </p>
                <div className="flex items-center gap-1 mt-4 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-smooth">
                  En savoir plus
                  <ArrowRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="glass border-primary/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="w-5 h-5 text-primary" />
              Narrative Produit
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <blockquote className="text-foreground/80 italic border-l-4 border-primary pl-4">
              "Immo+ permet à chacun d'investir dans l'immobilier, même avec un petit budget, 
              et de toucher des revenus réels."
            </blockquote>
          </CardContent>
        </Card>
        
        <Card className="glass border-success/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent" />
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckCircle2 className="w-5 h-5 text-success" />
              Moteur de Croissance
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <p className="text-foreground/80">
              Démarcheurs = Apporteurs d'affaires (pas vendeurs). Commission 0% tactique "Blitz" 
              pour acquérir la liquidité.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
