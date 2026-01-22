"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { 
  CheckCircle2, 
  Circle, 
  AlertCircle, 
  Trash2, 
  Plus, 
  Calendar,
  Target,
  TrendingUp,
  Zap,
  ChevronDown,
  ChevronUp,
  Edit2,
  Save,
  X
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Task {
  id: string
  title: string
  status: "todo" | "in-progress" | "completed"
  priority: "low" | "medium" | "high"
}

interface Month {
  id: string
  name: string
  month: number
  objectives: string[]
  actions: string[]
  kpis: string[]
  tasks: Task[]
}

interface RoadmapData {
  months: Month[]
}

const initialRoadmapData: RoadmapData = {
  months: [
    {
      id: "month-1",
      name: "Mois 1 – Stabilisation, UX & marketing initial",
      month: 1,
      objectives: [
        "Stabiliser l'application (mobile & web)",
        "Corriger bugs critiques et UX/UI majeurs",
        "Mettre en place landing page animée avec : Book a Demo, Join Community, Liste d'attente",
        "Créer SaaS Video Explainer pour expliquer la valeur du produit"
      ],
      actions: [
        "Audit complet UX/UI et bugs → Tech & UX (Deadline : Semaine 1)",
        "Correctifs critiques UI (formulaire, navigation, chargement médias) → Dev (Semaine 1-2)",
        "Optimisation performance images/vidéos + lazy loading → Dev (Semaine 1-2)",
        "Création landing page animée Framer Motion → UI/UX Designer (Semaine 2)",
        "Production SaaS Video Explainer → Marketing (Semaine 2-3)",
        "Documenter architecture existante + plan CI/CD initial → Tech Lead (Semaine 3-4)",
        "Mise en place Badge Propriétaire Vérifié → Produit & Backend (Semaine 3-4)"
      ],
      kpis: [
        "Bugs critiques corrigés > 90%",
        "Temps de chargement médias < 3s",
        "Landing page active et fonctionnelle",
        "Video Explainer prête et publiée",
        "Vidéo Explainer publiée et fonctionnelle"
      ],
      tasks: [
        { id: "t1-1", title: "Audit complet UX/UI et bugs", status: "completed", priority: "high" },
        { id: "t1-2", title: "Correctifs critiques UI", status: "completed", priority: "high" },
        { id: "t1-3", title: "Optimisation performance images/vidéos + lazy loading", status: "in-progress", priority: "high" },
        { id: "t1-4", title: "Landing page animée (Framer Motion) : Book a Demo, Join Community, Liste attente", status: "todo", priority: "high" },
        { id: "t1-5", title: "SaaS Video Explainer production (explique valeur du produit)", status: "todo", priority: "high" },
        { id: "t1-6", title: "Documentation architecture existante", status: "todo", priority: "medium" },
        { id: "t1-7", title: "Plan CI/CD initial", status: "todo", priority: "medium" },
        { id: "t1-8", title: "Badge Propriétaire Vérifié - backend/UI", status: "todo", priority: "high" },
        { id: "t1-9", title: "Intégration landing page → inscription funnel", status: "todo", priority: "medium" },
        { id: "t1-10", title: "Tests A/B CTA principal", status: "todo", priority: "medium" }
      ]
    },
    {
      id: "month-2",
      name: "Mois 2 – Accélération Growth & Engagement",
      month: 2,
      objectives: [
        "Augmenter la traction utilisateurs vers 15–18k téléchargements",
        "Déployer programme Refer & Earn",
        "Contenu viral et engagement réseaux sociaux",
        "Préparer stratégie levée de fonds Pre-seed MVP"
      ],
      actions: [
        "Lancer programme Refer & Earn → Growth & Produit (Semaine 1-2)",
        "Lancer programme Refer & Earn → Growth & Produit (Semaine 1-2)",
        "Contenu viral TikTok/Shorts & Instagram sur immobilier fractionné → Marketing (Semaine 1-4)",
        "Stratégie dédiée TikTok/Shorts/Reels + plan de production (format court) → Marketing (Semaine 1-4)",
        "Podcasts 'Investir jeune' → Marketing (Semaine 2-4)",
        "Récompenses premiers inscrits (Badge Early Access, notifications push) → Growth (Semaine 2-3)",
        "Analyse feedback utilisateurs et ajustements UX/UI → Produit & UX (Semaine 3-4)",
        "Stratégie pré-seed / levée de fonds → Produit & CEO (Semaine 3-4)"
      ],
      kpis: [
        "Téléchargements cumulés 15–18k",
        "Taux conversion landing page → inscription > 50%",
        "Engagement social media (> 2k vues par vidéo)",
        "Nombre de referrals actifs"
      ],
      tasks: [
        { id: "t2-1", title: "Programme Refer & Earn backend (commission auto)", status: "todo", priority: "high" },
        { id: "t2-2", title: "UI rewards & badges (Early Access, notifications push)", status: "todo", priority: "high" },
        { id: "t2-3", title: "Contenu viral TikTok/Shorts/Reels - immobilier fractionné", status: "todo", priority: "high" },
        { id: "t2-4", title: "Podcast 'Investir jeune' - production & distribution", status: "todo", priority: "high" },
        { id: "t2-5", title: "Newsletter & emails brandés engageants", status: "todo", priority: "medium" },
        { id: "t2-6", title: "Analyse feedback utilisateurs & ajustements UX/UI", status: "todo", priority: "medium" },
        { id: "t2-7", title: "Stratégie pré-seed & deck levée de fonds (Pre-seed) - deck prêt", status: "todo", priority: "high" },
        { id: "t2-8", title: "Dashboard KPI temps réel (bugs, downloads, conversions)", status: "todo", priority: "medium" },
        { id: "t2-9", title: "Campaign récompenses premiers inscrits", status: "todo", priority: "medium" }
      ]
    },
    {
      id: "month-3",
      name: "Mois 3 – Scale, confiance & optimisation",
      month: 3,
      objectives: [
        "Atteindre 25 000 téléchargements cumulés",
        "Consolider confiance et fiabilité produit",
        "Optimiser backend et préparer montée en charge",
        "Affiner stratégie Pre-seed pour investisseurs"
      ],
      actions: [
        "Correctifs UX/UI finaux → Dev & UX (Semaine 1-2)",
        "Badge Propriétaire Vérifié complet et support client optimisé → Produit (Semaine 1-2)",
        "Activer Armée des Démarcheurs : Rôle sourcing, système de commission backend automatique pour apporteurs d'affaires, Blitz 0% ou bonus 1er mois → Growth & Backend (Semaine 2-3)",
        "Plan de Résilience : Rate limiting API, Caching agressif, Lazy Loading, CI/CD complet → Tech Lead (Semaine 2-3)",
        "Partenariats stratégiques avec agences, propriétaires et fintech → Growth & CEO (Semaine 2-4)",
        "Préparer rapport traction et MVP pour investisseurs → Produit & Marketing (Semaine 3-4)",
        "Intégration IA (chatbot d'aide, suggestions personnalisées) → R&D (Semaine 3-4)"
      ],
      kpis: [
        "Téléchargements cumulés = 25 000+",
        "Taux de conversion > 60%",
        "Volume de transactions/réservations > 500",
        "Score NPS > 70%"
      ],
      tasks: [
        { id: "t3-1", title: "Correctifs UX/UI finaux & tests utilisateurs", status: "todo", priority: "high" },
        { id: "t3-2", title: "Badge Propriétaire Vérifié complet + support client optimisé", status: "todo", priority: "high" },
        { id: "t3-3", title: "Armée Démarcheurs : contrat 50+ sourcing", status: "todo", priority: "high" },
        { id: "t3-4", title: "Système commission backend automatique (démarcheurs)", status: "todo", priority: "high" },
        { id: "t3-5", title: "Rate limiting API (par IP/User)", status: "todo", priority: "high" },
        { id: "t3-6", title: "Caching agressif + Lazy Loading optimisé", status: "todo", priority: "high" },
        { id: "t3-7", title: "CI/CD complet & infra auto-scaling", status: "todo", priority: "high" },
        { id: "t3-8", title: "Chatbot IA (aide utilisateurs)", status: "todo", priority: "medium" },
        { id: "t3-9", title: "IA suggestions personnalisées (prix, zone, budget)", status: "todo", priority: "medium" },
        { id: "t3-10", title: "Partenariats stratégiques (agences, fintech, propriétaires)", status: "todo", priority: "medium" },
        { id: "t3-11", title: "Rapport traction & MVP pour investisseurs", status: "todo", priority: "high" },
        { id: "t3-12", title: "Blitz 0% ou bonus 1er mois (démarcheurs)", status: "todo", priority: "medium" }
      ]
    }
  ]
}

export function RoadmapSection() {
  const [roadmapData, setRoadmapData] = useState<RoadmapData>(() => {
    try {
      if (typeof window === "undefined") return initialRoadmapData
      const saved = localStorage.getItem("immo_roadmap_data")
      return saved ? JSON.parse(saved) : initialRoadmapData
    } catch (e) {
      console.error("Erreur chargement localStorage:", e)
      return initialRoadmapData
    }
  })

  const [expandedMonth, setExpandedMonth] = useState<string | null>("month-1")
  const [editingTask, setEditingTask] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState<string>("")
  
  // États pour éditer objectifs, actions, KPIs
  const [editingType, setEditingType] = useState<string | null>(null) // "objective", "action", "kpi"
  const [editingMonthId, setEditingMonthId] = useState<string | null>(null)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingValue, setEditingValue] = useState<string>("")

  const [isSaved, setIsSaved] = useState(false)
  const saveTimeoutRef = useRef<number | null>(null)

  // Sauvegarde débouncée
  useEffect(() => {
    if (typeof window === "undefined") return

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }

    saveTimeoutRef.current = window.setTimeout(() => {
      try {
        localStorage.setItem("immo_roadmap_data", JSON.stringify(roadmapData))
        setIsSaved(true)
        window.setTimeout(() => setIsSaved(false), 1400)
      } catch (e) {
        console.error("Erreur sauvegarde localStorage:", e)
      }
    }, 500)

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
        saveTimeoutRef.current = null
      }
    }
  }, [roadmapData])
        const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)

  const calculateProgress = () => {
    const allTasks = roadmapData.months.flatMap(m => m.tasks)
    const completed = allTasks.filter(t => t.status === "completed").length
    return (completed / allTasks.length) * 100
  }

  const toggleMonth = (monthId: string) => {
    setExpandedMonth(expandedMonth === monthId ? null : monthId)
  }

  const startEditItem = (type: "objective" | "action" | "kpi", monthId: string, index: number, value: string) => {
    setEditingType(type)
    setEditingMonthId(monthId)
    setEditingIndex(index)
    setEditingValue(value)
  }

  const saveItem = () => {
    if (!editingType || !editingMonthId || editingIndex === null) return

    setRoadmapData(prev => ({
      months: prev.months.map(month => {
        if (month.id === editingMonthId) {
          const updated = { ...month }
          if (editingType === "objective") {
            updated.objectives = updated.objectives.map((obj, i) => i === editingIndex ? editingValue : obj)
          } else if (editingType === "action") {
            updated.actions = updated.actions.map((act, i) => i === editingIndex ? editingValue : act)
          } else if (editingType === "kpi") {
            updated.kpis = updated.kpis.map((kpi, i) => i === editingIndex ? editingValue : kpi)
          }
          return updated
        }
        return month
      })
    }))

          setIsGeneratingPdf(true)
    setEditingType(null)
    setEditingMonthId(null)
    setEditingIndex(null)
    setEditingValue("")
  }

  const deleteItem = (type: "objective" | "action" | "kpi", monthId: string, index: number) => {
    setRoadmapData(prev => ({
      months: prev.months.map(month => {
        if (month.id === monthId) {
          const updated = { ...month }
          if (type === "objective") {
            updated.objectives = updated.objectives.filter((_, i) => i !== index)
          } else if (type === "action") {
            updated.actions = updated.actions.filter((_, i) => i !== index)
          } else if (type === "kpi") {
            updated.kpis = updated.kpis.filter((_, i) => i !== index)
          }
          return updated
        }
        return month
      })
    }))
  }

  const addItem = (type: "objective" | "action" | "kpi", monthId: string) => {
    setRoadmapData(prev => ({
      months: prev.months.map(month => {
        if (month.id === monthId) {
          const updated = { ...month }
          if (type === "objective") {
            updated.objectives = [...updated.objectives, "Nouvel objectif"]
          } else if (type === "action") {
            updated.actions = [...updated.actions, "Nouvelle action"]
          } else if (type === "kpi") {
            updated.kpis = [...updated.kpis, "Nouveau KPI"]
          }
          return updated
        }
        return month
      })
    }))
  }

  const toggleTaskStatus = (monthId: string, taskId: string) => {
    setRoadmapData(prev => ({
      months: prev.months.map(month => {
        if (month.id === monthId) {
          return {
            ...month,
            tasks: month.tasks.map(task => {
              if (task.id === taskId) {
                const statuses: Array<"todo" | "in-progress" | "completed"> = ["todo", "in-progress", "completed"]
                const currentIndex = statuses.indexOf(task.status)
                return {
                  ...task,
                  status: statuses[(currentIndex + 1) % statuses.length]
                }
              }
              return task
            })
          }
        }
        return month
      })
    }))
  }

  const updateTaskTitle = (monthId: string, taskId: string, newTitle: string) => {
    setRoadmapData(prev => ({
      months: prev.months.map(month => {
        if (month.id === monthId) {
          return {
            ...month,
            tasks: month.tasks.map(task => 
              task.id === taskId ? { ...task, title: newTitle } : task
            )
          }
        }
        return month
      })
    }))
    setEditingTask(null)
  }

  const deleteTask = (monthId: string, taskId: string) => {
    setRoadmapData(prev => ({
      months: prev.months.map(month => {
        if (month.id === monthId) {
          return {
            ...month,
            tasks: month.tasks.filter(task => task.id !== taskId)
          }
        }
        return month
      })
    }))
  }

  const addTask = (monthId: string) => {
    setRoadmapData(prev => ({
      months: prev.months.map(month => {
        if (month.id === monthId) {
          const newTask: Task = {
            id: `task-${Date.now()}`,
            title: "Nouvelle tâche",
            status: "todo",
            priority: "medium"
          }
          return {
            ...month,
            tasks: [...month.tasks, newTask]
          }
        }
        return month
      })
    }))
  }

  const exportRoadmapPdf = () => {
    if (typeof window === "undefined") return

    // Préparer contenu HTML pour export
    const wrapper = document.createElement("div")
    wrapper.style.background = "#fff"
    wrapper.style.padding = "12px"
    wrapper.innerHTML = (() => {
      let html = `<div class=\"roadmap-export\">`
      html += `<h1>Roadmap Immo+ – 3 Mois (Objectif 25 000 téléchargements)</h1>`
      html += `<p class=\"meta\">Date de départ : 22 janvier 2026</p>`
      roadmapData.months.forEach(month => {
        html += `<div class=\"month\">`
        html += `<h2>${month.name}</h2>`
        html += `<p class=\"section-title\"><strong>Objectifs</strong></p><ul>`
        month.objectives.forEach(o => (html += `<li>${o}</li>`))
        html += `</ul>`
        html += `<p class=\"section-title\"><strong>Actions / Tâches</strong></p><ul>`
        month.actions.forEach(a => (html += `<li>${a}</li>`))
        html += `</ul>`
        html += `<p class=\"section-title\"><strong>KPIs</strong></p><ul>`
        month.kpis.forEach(k => (html += `<li class=\"kpi\">${k}</li>`))
        html += `</ul>`
        if (month.tasks && month.tasks.length) {
          html += `<p class=\"section-title\"><strong>Jalons & Tâches</strong></p><ul>`
          month.tasks.forEach(t => (html += `<li>${t.title} — <span class=\"task-status\">${t.status}</span></li>`))
          html += `</ul>`
        }
        html += `</div>`
      })
      html += `</div>`
      return html
    })()

    // CSS d'impression pour html2pdf ou fallback
    const printStyle = document.createElement("style")
    printStyle.innerHTML = `
      @page { size: A4; margin: 18mm }
      .roadmap-export h1{font-size:18px;margin:0 0 6px 0}
      .roadmap-export h2{font-size:14px;margin:10px 0 6px 0}
      .roadmap-export p, .roadmap-export li{font-size:12px;line-height:1.25;color:#0f172a}
      .roadmap-export ul{margin:6px 0 12px 18px}
      .roadmap-export .month{margin-bottom:12px;padding-bottom:8px;page-break-inside:avoid}
      .roadmap-export .meta{color:#475569;font-size:11px;margin-bottom:8px}
      .roadmap-export .section-title{font-weight:600;margin-top:6px;margin-bottom:4px}
      .roadmap-export .kpi{color:#0b74de}
    `

    wrapper.appendChild(printStyle)
    document.body.appendChild(wrapper)

    // Essayer html2pdf (import dynamique), sinon fallback vers print window
    import("html2pdf.js").then((module) => {
      const html2pdf = (module && (module as any).default) || module
      const opt = {
        margin: [12, 12, 12, 12],
        filename: `roadmap-immo-${Date.now()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, logging: false, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }
      html2pdf().set(opt).from(wrapper).save().finally(() => {
        document.body.removeChild(wrapper)
      })
    }).catch(() => {
      // fallback : ouvrir fenêtre d'impression
      const printWindow = window.open("", "_blank", "noopener,noreferrer")
      if (!printWindow) {
        alert("Impossible d'ouvrir la fenêtre d'impression")
        document.body.removeChild(wrapper)
        return
      }
      printWindow.document.open()
      printWindow.document.write(`<!doctype html><html><head><meta charset=\"utf-8\"><title>Roadmap Immo+</title><style>@page{size:A4;margin:18mm} body{font-family:Inter,system-ui,Arial;padding:12px}</style></head><body>${wrapper.innerHTML}</body></html>`)
      printWindow.document.close()
      printWindow.focus()
      setTimeout(() => {
        printWindow.print()
        document.body.removeChild(wrapper)
      }, 500)
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-chart-2" />
      case "in-progress":
        return <Circle className="w-5 h-5 text-warning fill-warning" />
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-chart-2/10 border-chart-2/20 text-chart-2"
      case "in-progress":
        return "bg-warning/10 border-warning/20 text-warning"
      default:
        return "bg-muted/5 border-border text-muted-foreground"
    }
  }

  const progress = calculateProgress()

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="bg-gradient-to-br from-primary/5 via-chart-2/5 to-transparent border-primary/10">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 mb-2">
                  <Calendar className="w-6 h-6 text-primary" />
                  Roadmap Immo+ – 3 Mois (Objectif 25 000 téléchargements)
                </CardTitle>
                <CardDescription>
                  Date de départ : 22 janvier 2026
                  <span className="ml-2 text-xs text-chart-2 font-semibold">💾 Auto-save activé</span>
                  {isSaved && (
                    <span className="ml-3 text-xs text-emerald-600 font-medium">Sauvegardé ✓</span>
                  )}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    if (confirm("Réinitialiser la roadmap aux valeurs par défaut?")) {
                      localStorage.removeItem("immo_roadmap_data")
                      setRoadmapData(initialRoadmapData)
                    }
                  }}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  ↻ Réinit
                </Button>
                <Badge variant="outline" className="bg-chart-2/10 border-chart-2/20 text-chart-2">
                  90J Sprint
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Progression globale</span>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Roadmap Months */}
      <div className="space-y-4">
        <AnimatePresence>
          {roadmapData.months.map((month, index) => (
            <motion.div
              key={month.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="border-border/50 hover:border-border/80 transition-colors overflow-hidden">
                <motion.div
                  onClick={() => toggleMonth(month.id)}
                  className="p-6 cursor-pointer hover:bg-accent/30 transition-colors"
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <motion.div
                        animate={{ rotate: expandedMonth === month.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {expandedMonth === month.id ? (
                          <ChevronUp className="w-5 h-5 text-primary" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </motion.div>
                      <div>
                        <h3 className="font-semibold text-base flex items-center gap-2">
                          {month.name}
                          <Badge 
                            variant="secondary"
                            className="text-xs"
                          >
                            {month.tasks.filter(t => t.status === "completed").length}/{month.tasks.length} tâches
                          </Badge>
                        </h3>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="bg-primary/10 border-primary/20">
                        {month.objectives.length} objectifs
                      </Badge>
                    </div>
                  </div>
                </motion.div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedMonth === month.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 py-4 bg-accent/20 border-t border-border/50 space-y-6">
                        {/* Objectives */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Target className="w-5 h-5 text-primary" />
                              <h4 className="font-semibold text-sm uppercase tracking-wider">Objectifs</h4>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => addItem("objective", month.id)}
                              className="gap-1 text-xs"
                            >
                              <Plus className="w-3 h-3" /> Ajouter
                            </Button>
                          </div>
                          <ul className="space-y-2 ml-7">
                            {month.objectives.map((obj, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05 * idx }}
                                className="text-sm text-foreground/80 flex items-start gap-2 group"
                              >
                                <span className="text-primary font-bold mt-0.5 flex-shrink-0">•</span>
                                {editingType === "objective" && editingMonthId === month.id && editingIndex === idx ? (
                                  <div className="flex-1 flex gap-2">
                                    <Textarea
                                      value={editingValue}
                                      onChange={(e) => setEditingValue(e.target.value)}
                                      className="text-sm"
                                    />
                                    <Button size="sm" onClick={saveItem} className="gap-1">
                                      <Save className="w-3 h-3" /> Sauver
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => setEditingType(null)}
                                      className="text-destructive"
                                    >
                                      <X className="w-3 h-3" />
                                    </Button>
                                  </div>
                                ) : (
                                  <div
                                    className="flex-1 cursor-text hover:bg-black/5 p-1 rounded transition-colors"
                                    onClick={() => startEditItem("objective", month.id, idx, obj)}
                                  >
                                    {obj}
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="opacity-0 group-hover:opacity-100 gap-1 text-xs ml-2 inline h-6"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        deleteItem("objective", month.id, idx)
                                      }}
                                    >
                                      <Trash2 className="w-3 h-3 text-destructive" />
                                    </Button>
                                  </div>
                                )}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>

                        {/* Actions */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.15 }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Zap className="w-5 h-5 text-chart-3" />
                              <h4 className="font-semibold text-sm uppercase tracking-wider">Actions concrètes</h4>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => addItem("action", month.id)}
                              className="gap-1 text-xs"
                            >
                              <Plus className="w-3 h-3" /> Ajouter
                            </Button>
                          </div>
                          <ul className="space-y-2 ml-7">
                            {month.actions.map((action, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05 * idx }}
                                className="text-sm text-foreground/80 flex items-start gap-2 group"
                              >
                                <span className="text-chart-3 font-bold mt-0.5 flex-shrink-0">→</span>
                                {editingType === "action" && editingMonthId === month.id && editingIndex === idx ? (
                                  <div className="flex-1 flex gap-2">
                                    <Textarea
                                      value={editingValue}
                                      onChange={(e) => setEditingValue(e.target.value)}
                                      className="text-sm"
                                    />
                                    <Button size="sm" onClick={saveItem} className="gap-1">
                                      <Save className="w-3 h-3" /> Sauver
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => setEditingType(null)}
                                      className="text-destructive"
                                    >
                                      <X className="w-3 h-3" />
                                    </Button>
                                  </div>
                                ) : (
                                  <div
                                    className="flex-1 cursor-text hover:bg-black/5 p-1 rounded transition-colors"
                                    onClick={() => startEditItem("action", month.id, idx, action)}
                                  >
                                    {action}
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="opacity-0 group-hover:opacity-100 gap-1 text-xs ml-2 inline h-6"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        deleteItem("action", month.id, idx)
                                      }}
                                    >
                                      <Trash2 className="w-3 h-3 text-destructive" />
                                    </Button>
                                  </div>
                                )}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>

                        {/* KPIs */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-5 h-5 text-chart-2" />
                              <h4 className="font-semibold text-sm uppercase tracking-wider">KPIs & Métriques</h4>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => addItem("kpi", month.id)}
                              className="gap-1 text-xs"
                            >
                              <Plus className="w-3 h-3" /> Ajouter
                            </Button>
                          </div>
                          <ul className="space-y-2 ml-7">
                            {month.kpis.map((kpi, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05 * idx }}
                                className="text-sm text-foreground/80 flex items-start gap-2 group"
                              >
                                <span className="text-chart-2 font-bold mt-0.5 flex-shrink-0">📊</span>
                                {editingType === "kpi" && editingMonthId === month.id && editingIndex === idx ? (
                                  <div className="flex-1 flex gap-2">
                                    <Textarea
                                      value={editingValue}
                                      onChange={(e) => setEditingValue(e.target.value)}
                                      className="text-sm"
                                    />
                                    <Button size="sm" onClick={saveItem} className="gap-1">
                                      <Save className="w-3 h-3" /> Sauver
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => setEditingType(null)}
                                      className="text-destructive"
                                    >
                                      <X className="w-3 h-3" />
                                    </Button>
                                  </div>
                                ) : (
                                  <div
                                    className="flex-1 cursor-text hover:bg-black/5 p-1 rounded transition-colors"
                                    onClick={() => startEditItem("kpi", month.id, idx, kpi)}
                                  >
                                    {kpi}
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="opacity-0 group-hover:opacity-100 gap-1 text-xs ml-2 inline h-6"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        deleteItem("kpi", month.id, idx)
                                      }}
                                    >
                                      <Trash2 className="w-3 h-3 text-destructive" />
                                    </Button>
                                  </div>
                                )}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>

                        {/* Tasks */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.25 }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-primary" />
                              <h4 className="font-semibold text-sm uppercase tracking-wider">Tâches & Jalons</h4>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => addTask(month.id)}
                              className="gap-1 text-xs"
                            >
                              <Plus className="w-4 h-4" />
                              Ajouter
                            </Button>
                          </div>
                          
                          <div className="space-y-2 ml-7">
                            {month.tasks.map((task, idx) => (
                              <motion.div
                                key={task.id}
                                layout
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ delay: 0.02 * idx }}
                                className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${getStatusColor(task.status)}`}
                              >
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => toggleTaskStatus(month.id, task.id)}
                                  className="flex-shrink-0 hover:opacity-70 transition-opacity"
                                >
                                  {getStatusIcon(task.status)}
                                </motion.button>

                                {editingTask === task.id ? (
                                  <Input
                                    value={editingTitle}
                                    onChange={(e) => setEditingTitle(e.target.value)}
                                    className="flex-1 h-8 text-sm"
                                    onBlur={() => updateTaskTitle(month.id, task.id, editingTitle)}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        updateTaskTitle(month.id, task.id, editingTitle)
                                      } else if (e.key === "Escape") {
                                        setEditingTask(null)
                                      }
                                    }}
                                    autoFocus
                                  />
                                ) : (
                                  <span
                                    className="flex-1 text-sm cursor-text hover:bg-black/5 p-1 rounded transition-colors"
                                    onClick={() => {
                                      setEditingTask(task.id)
                                      setEditingTitle(task.title)
                                    }}
                                  >
                                    {task.title}
                                  </span>
                                )}

                                <div className="flex items-center gap-1 flex-shrink-0">
                                  <Badge variant="outline" className="text-[10px] capitalize">
                                    {task.priority}
                                  </Badge>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => deleteTask(month.id, task.id)}
                                    className="p-1 hover:bg-destructive/10 rounded transition-colors text-destructive/70 hover:text-destructive"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </motion.button>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Points Transversaux */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-chart-2/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Points Transversaux – À Suivre tout au long des 3 mois
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Marketing & Croissance */}
              <motion.div
                whileHover={{ y: -2 }}
                className="p-4 rounded-lg bg-white/50 dark:bg-slate-900/30 border border-primary/20"
              >
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-chart-3" />
                  Marketing & Croissance
                </h4>
                <ul className="text-xs space-y-2 text-foreground/80">
                  <li>✓ Newsletter, emails brandés, contenus engageants → commencer Mois 1, renforcer Mois 2-3</li>
                  <li>✓ Contenus vidéo et podcasts → engagement & authority building</li>
                </ul>
              </motion.div>

              {/* KPI Monitoring */}
              <motion.div
                whileHover={{ y: -2 }}
                className="p-4 rounded-lg bg-white/50 dark:bg-slate-900/30 border border-chart-2/20"
              >
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-chart-2" />
                  KPI Monitoring
                </h4>
                <p className="text-xs text-foreground/80">
                  Dashboard temps réel : bugs, téléchargements, conversions, transactions
                </p>
              </motion.div>

              {/* UX/UI */}
              <motion.div
                whileHover={{ y: -2 }}
                className="p-4 rounded-lg bg-white/50 dark:bg-slate-900/30 border border-primary/20"
              >
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  UX/UI
                </h4>
                <ul className="text-xs space-y-2 text-foreground/80">
                  <li>✓ Corrections progressives et tests utilisateurs</li>
                </ul>
              </motion.div>

              {/* Confiance */}
              <motion.div
                whileHover={{ y: -2 }}
                className="p-4 rounded-lg bg-white/50 dark:bg-slate-900/30 border border-chart-2/20"
              >
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-chart-2" />
                  Confiance
                </h4>
                <ul className="text-xs space-y-2 text-foreground/80">
                  <li>✓ Badge propriétaire vérifié</li>
                  <li>✓ Support client suivi</li>
                </ul>
              </motion.div>
            </div>

            {/* Résumé des Priorités */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6 pt-6 border-t border-primary/10"
            >
              <h4 className="font-semibold text-sm mb-4">📋 Résumé des Grandes Priorités</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800"
                >
                  <p className="text-xs font-semibold text-orange-900 dark:text-orange-100 mb-1">
                    🎯 Mois 1
                  </p>
                  <p className="text-xs text-orange-800 dark:text-orange-200">
                    UX/UI & stabilité, landing page, vidéo explainer
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800"
                >
                  <p className="text-xs font-semibold text-blue-900 dark:text-blue-100 mb-1">
                    🚀 Mois 2
                  </p>
                  <p className="text-xs text-blue-800 dark:text-blue-200">
                    Croissance virale, contenu marketing, Refer & Earn, récompenses utilisateurs, levée de fonds
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800"
                >
                  <p className="text-xs font-semibold text-green-900 dark:text-green-100 mb-1">
                    ⚡ Mois 3
                  </p>
                  <p className="text-xs text-green-800 dark:text-green-200">
                    Scale, confiance, démarcheurs, plan résilience backend, intégration IA, traction investisseurs
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
