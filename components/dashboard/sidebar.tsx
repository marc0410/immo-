"use client"

import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Eye, 
  Wallet, 
  Settings2, 
  Rocket, 
  Users, 
  TrendingUp, 
  ImageIcon,
  AlertCircle,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  Banknote,
  Calendar
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}
import Image from "next/image"
const navItems = [
  { id: "dashboard", label: "Vue d'ensemble", icon: LayoutDashboard },
  { id: "vision", label: "Vision & Produit", icon: Eye },
  { id: "roadmap", label: "Stratégie 90J & Roadmap", icon: Calendar, badge: "Growth" },
  { id: "ux-audit", label: "Audit UX/UI", icon: AlertCircle, badge: "Nouveau" },
  { id: "bizmodel", label: "Business Model", icon: Wallet },
  { id: "tech", label: "Tech & Audit", icon: Settings2 },
  // { id: "gtm", label: "Lancement & Store", icon: Rocket },
  { id: "partners", label: "Partenariats", icon: Users },
  { id: "kpi", label: "KPIs & Finance", icon: TrendingUp, badge: "Non optimal" },
  { id: "fundraising", label: "Levee de Fonds", icon: Banknote, badge: "Pre-Seed" },
  { id: "screenshots", label: "Captures & Feedback", icon: ImageIcon },
]

const decisions = [
  { label: "Modèle Gestionnaire", priority: "high" },
  { label: "Stratégie Stores V2", priority: "medium" },
  { label: "Budget Démarcheurs", priority: "low" },
]

const priorityStyles = {
  high: "bg-destructive/10 text-destructive border-destructive/20",
  medium: "bg-warning/10 text-warning-foreground border-warning/20",
  low: "bg-chart-4/10 text-chart-4 border-chart-4/20"
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <aside className="w-72 bg-sidebar flex-col z-10 hidden md:flex shrink-0 h-screen sticky top-0">
      {/* Logo Section */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-glow-sm">
            <Image className="rounded-xl" src="/logo.png" alt="Logo Immo+" width={40} height={40} />
            
          </div>
          <div>
            <h1 className="text-xl font-bold text-sidebar-foreground tracking-tight">
              Immo<span className="text-primary">+</span> V2
            </h1>
            <p className="text-xs text-sidebar-foreground/60">Stratégie & GTM</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-smooth group relative",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow-sm"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <Icon className={cn(
                  "w-5 h-5 transition-smooth",
                  isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground/50 group-hover:text-sidebar-foreground"
                )} />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-chart-2 text-chart-2-foreground">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <ChevronRight className="w-4 h-4 text-sidebar-primary-foreground/70" />
                )}
              </button>
            )
          })}
        </div>
      </nav>
      
      {/* Decisions Panel */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="glass-strong rounded-xl p-4 bg-sidebar-accent/50">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-warning" />
            <span className="text-xs font-semibold text-sidebar-foreground uppercase tracking-wider">
              Décisions Requises
            </span>
          </div>
          <ul className="space-y-2">
            {decisions.map((decision, index) => (
              <li 
                key={index} 
                className={cn(
                  "text-xs px-3 py-2 rounded-lg border transition-smooth hover:scale-[1.02] cursor-pointer",
                  priorityStyles[decision.priority as keyof typeof priorityStyles]
                )}
              >
                {decision.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  )
}

export function MobileHeader({ 
  onMenuToggle, 
  isOpen 
}: { 
  onMenuToggle: () => void
  isOpen: boolean 
}) {
  return (
    <div className="md:hidden fixed top-0 w-full glass-strong z-30 px-4 py-3 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="font-bold text-foreground">Immo+ Stratégie</span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onMenuToggle}
        className="text-foreground"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>
    </div>
  )
}

export function MobileSidebar({ 
  activeSection, 
  onSectionChange,
  isOpen,
  onClose
}: SidebarProps & { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 md:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-72 bg-sidebar z-50 md:hidden animate-in slide-in-from-left duration-300">
        <div className="p-6 border-b border-sidebar-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-sidebar-foreground">
                Immo<span className="text-primary">+</span> V2
              </h1>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-sidebar-foreground">
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSectionChange(item.id)
                    onClose()
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-smooth",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-chart-2 text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </nav>
      </aside>
    </>
  )
}
