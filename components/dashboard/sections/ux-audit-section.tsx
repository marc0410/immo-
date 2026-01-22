"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Smartphone, 
  Globe, 
  User, 
  Bell, 
  Mail,
  ImageIcon,
  Languages,
  Navigation,
  Lock,
  MessageSquare,
  Zap,
  ChevronRight,
  ArrowRight,
  Lightbulb,
  Target
} from "lucide-react"

interface UXIssue {
  id: string
  category: string
  title: string
  description: string
  severity: "critical" | "high" | "medium" | "low"
  status: "open" | "in-progress" | "resolved"
  recommendation: string
  icon: React.ElementType
}

const uxIssues: UXIssue[] = [
  {
    id: "1",
    category: "Navigation",
    title: "Navigation peu fluide",
    description: "Manque de clarté sur certaines actions. Boutons mal positionnés (réservations, visiter, explorer).",
    severity: "critical",
    status: "open",
    recommendation: "Restructurer la navbar avec une hiérarchie visuelle claire. Utiliser des icônes cohérentes et des labels explicites.",
    icon: Navigation
  },
  {
    id: "2",
    category: "Inscription",
    title: "Processus d'inscription lourd",
    description: "Trop de champs requis (numéro, email, nom, prénom, mot de passe). Pas de social login disponible.",
    severity: "critical",
    status: "open",
    recommendation: "Implémenter OAuth (Google, Apple, Facebook). Réduire les champs obligatoires au minimum. Ajouter un indicateur de progression.",
    icon: Lock
  },
  {
    id: "3",
    category: "Médias",
    title: "Chargement des médias lent",
    description: "Téléchargement des images lent, vidéos trop longues. Choix de médias limité. Erreurs non claires.",
    severity: "high",
    status: "open",
    recommendation: "Implémenter le lazy loading, utiliser des formats optimisés (WebP), ajouter des skeletons de chargement et des messages d'erreur explicites.",
    icon: ImageIcon
  },
  {
    id: "4",
    category: "Localisation",
    title: "Support multilingue absent",
    description: "Pas de support pour l'anglais et le français. I18n manquant dans l'application.",
    severity: "high",
    status: "open",
    recommendation: "Implémenter next-intl ou react-i18next. Prioriser français et anglais. Ajouter un sélecteur de langue visible.",
    icon: Languages
  },
  {
    id: "5",
    category: "Géolocalisation",
    title: "Biens autour de soi invisibles",
    description: "Impossible de voir les biens immobiliers autour de sa propre localisation.",
    severity: "high",
    status: "open",
    recommendation: "Intégrer une carte interactive avec géolocalisation. Ajouter un filtre 'Autour de moi' avec rayon configurable.",
    icon: Globe
  },
  {
    id: "6",
    category: "Favoris",
    title: "Bouton favoris peu clair",
    description: "L'action d'ajout aux favoris n'est pas intuitive pour les utilisateurs.",
    severity: "medium",
    status: "open",
    recommendation: "Utiliser une icône coeur standard avec animation au clic. Ajouter un feedback visuel et un toast de confirmation.",
    icon: Target
  },
  {
    id: "7",
    category: "Compte",
    title: "Gestion du compte peu intuitive",
    description: "Changement photo, mot de passe, T&C, notifications : interface confuse. Retour arrière non fluide.",
    severity: "medium",
    status: "open",
    recommendation: "Créer une page profil structurée avec sections claires. Ajouter des transitions fluides et un système de sauvegarde auto.",
    icon: User
  },
  {
    id: "8",
    category: "Notifications",
    title: "Notifications non fonctionnelles",
    description: "Les notifications semblent ne pas fonctionner ou ne sont pas mesurées correctement.",
    severity: "medium",
    status: "open",
    recommendation: "Implémenter un système de push notifications robuste. Ajouter un centre de notifications avec historique.",
    icon: Bell
  },
  {
    id: "9",
    category: "Email",
    title: "Design newsletter neutre",
    description: "Pas de branding, ni visuel engageant, ni liens interactifs dans les emails marketing.",
    severity: "low",
    status: "open",
    recommendation: "Créer des templates email brandés avec CTAs clairs. Utiliser des images et une hiérarchie visuelle attractive.",
    icon: Mail
  },
  {
    id: "10",
    category: "Landing",
    title: "Landing page peu engageante",
    description: "Site web pas assez engageant, manque de mise en valeur des services. Page d'inscription lourde.",
    severity: "critical",
    status: "open",
    recommendation: "Refonte complète avec hero section impactante, témoignages, et CTA clairs. Simplifier le parcours d'inscription.",
    icon: Smartphone
  },
  {
    id: "11",
    category: "Feedback",
    title: "Messages d'erreur insuffisants",
    description: "Les messages d'erreurs côté utilisateur sont insuffisants ou peu clairs.",
    severity: "high",
    status: "open",
    recommendation: "Créer un système de toast notifications avec messages explicites. Guider l'utilisateur vers la résolution.",
    icon: MessageSquare
  },
  {
    id: "12",
    category: "UI",
    title: "Toggles peu esthétiques",
    description: "Les toggles actuels ne respectent pas les standards UI modernes. Pas de mascotte engageante.",
    severity: "low",
    status: "open",
    recommendation: "Utiliser des composants switch modernes avec animations. Créer une mascotte pour humaniser la communication.",
    icon: Zap
  }
]

const severityConfig = {
  critical: { 
    label: "Critique", 
    color: "bg-destructive text-destructive-foreground",
    bgLight: "bg-destructive/10 border-destructive/20",
    icon: XCircle,
    iconColor: "text-destructive"
  },
  high: { 
    label: "Élevée", 
    color: "bg-chart-3 text-white",
    bgLight: "bg-chart-3/10 border-chart-3/20",
    icon: AlertTriangle,
    iconColor: "text-chart-3"
  },
  medium: { 
    label: "Moyenne", 
    color: "bg-warning text-warning-foreground",
    bgLight: "bg-warning/10 border-warning/20",
    icon: AlertTriangle,
    iconColor: "text-warning"
  },
  low: { 
    label: "Faible", 
    color: "bg-chart-2 text-white",
    bgLight: "bg-chart-2/10 border-chart-2/20",
    icon: CheckCircle2,
    iconColor: "text-chart-2"
  }
}

const statusConfig = {
  open: { label: "Ouvert", color: "bg-muted text-muted-foreground" },
  "in-progress": { label: "En cours", color: "bg-primary/20 text-primary" },
  resolved: { label: "Résolu", color: "bg-success/20 text-success" }
}

export function UxAuditSection() {
  const [selectedIssue, setSelectedIssue] = useState<UXIssue | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  const filteredIssues = activeTab === "all" 
    ? uxIssues 
    : uxIssues.filter(issue => issue.severity === activeTab)

  const issuesByCategory = uxIssues.reduce((acc, issue) => {
    acc[issue.category] = (acc[issue.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const criticalCount = uxIssues.filter(i => i.severity === "critical").length
  const highCount = uxIssues.filter(i => i.severity === "high").length
  const resolvedCount = uxIssues.filter(i => i.status === "resolved").length
  const totalScore = Math.round((resolvedCount / uxIssues.length) * 100)

  return (
    <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-destructive/20 to-chart-3/20 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-destructive" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground tracking-tight">Audit UX/UI Immo+</h2>
            <p className="text-muted-foreground">
              Analyse complète des faiblesses identifiées et recommandations d'amélioration
            </p>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass border-destructive/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critiques</p>
                <p className="text-3xl font-bold text-destructive">{criticalCount}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-chart-3/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Priorité haute</p>
                <p className="text-3xl font-bold text-chart-3">{highCount}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-chart-3/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-chart-3" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total issues</p>
                <p className="text-3xl font-bold text-primary">{uxIssues.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-success/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Score UX</p>
                <p className="text-3xl font-bold text-success">{totalScore}%</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-success" />
              </div>
            </div>
            <Progress value={totalScore} className="mt-2 h-1.5" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Issues List */}
        <Card className="lg:col-span-2 glass">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Problèmes identifiés
            </CardTitle>
            <CardDescription>
              Cliquez sur un problème pour voir les détails et recommandations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-5 mb-4">
                <TabsTrigger value="all" className="text-xs">Tous</TabsTrigger>
                <TabsTrigger value="critical" className="text-xs">Critiques</TabsTrigger>
                <TabsTrigger value="high" className="text-xs">Élevées</TabsTrigger>
                <TabsTrigger value="medium" className="text-xs">Moyennes</TabsTrigger>
                <TabsTrigger value="low" className="text-xs">Faibles</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-0">
                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                  {filteredIssues.map((issue) => {
                    const Icon = issue.icon
                    const severity = severityConfig[issue.severity]
                    const isSelected = selectedIssue?.id === issue.id

                    return (
                      <div
                        key={issue.id}
                        onClick={() => setSelectedIssue(issue)}
                        className={cn(
                          "group p-4 rounded-xl border cursor-pointer transition-smooth",
                          isSelected 
                            ? "bg-primary/5 border-primary/30 shadow-glow-sm" 
                            : "bg-card hover:bg-muted/50 border-border hover:border-primary/20"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-smooth",
                            severity.bgLight
                          )}>
                            <Icon className={cn("w-5 h-5", severity.iconColor)} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-foreground truncate">
                                {issue.title}
                              </h4>
                              <Badge className={cn("text-[10px] shrink-0", severity.color)}>
                                {severity.label}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {issue.description}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-[10px]">
                                {issue.category}
                              </Badge>
                              <Badge className={cn("text-[10px]", statusConfig[issue.status].color)}>
                                {statusConfig[issue.status].label}
                              </Badge>
                            </div>
                          </div>
                          <ChevronRight className={cn(
                            "w-5 h-5 text-muted-foreground transition-smooth shrink-0",
                            isSelected ? "text-primary rotate-90" : "group-hover:text-foreground"
                          )} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Detail Panel */}
        <Card className="glass sticky top-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-warning" />
              Recommandation
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedIssue ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className={cn(
                  "p-4 rounded-xl border",
                  severityConfig[selectedIssue.severity].bgLight
                )}>
                  <div className="flex items-center gap-2 mb-2">
                    {(() => {
                      const Icon = selectedIssue.icon
                      return <Icon className={cn("w-5 h-5", severityConfig[selectedIssue.severity].iconColor)} />
                    })()}
                    <h4 className="font-semibold text-foreground">{selectedIssue.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedIssue.description}</p>
                </div>

                <div className="space-y-3">
                  <h5 className="font-medium text-foreground flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-primary" />
                    Solution recommandée
                  </h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedIssue.recommendation}
                  </p>
                </div>

                <div className="pt-4 border-t border-border">
                  <Button className="w-full gap-2" size="sm">
                    <CheckCircle2 className="w-4 h-4" />
                    Marquer comme résolu
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-center">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                  <Target className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Sélectionnez un problème pour voir les recommandations détaillées
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Categories Overview */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Répartition par catégorie</CardTitle>
          <CardDescription>
            Vue d'ensemble des problèmes UX/UI par domaine fonctionnel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {Object.entries(issuesByCategory).map(([category, count]) => (
              <div 
                key={category}
                className="p-4 rounded-xl bg-muted/50 border border-border hover:border-primary/30 transition-smooth cursor-pointer group"
              >
                <p className="text-2xl font-bold text-foreground group-hover:text-primary transition-smooth">
                  {count}
                </p>
                <p className="text-xs text-muted-foreground">{category}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
