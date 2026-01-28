"use client"

import React, { useState, useEffect, useMemo, ReactNode, FormEvent } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend 
} from "recharts"
import { 
  Banknote, Target, Users, Calendar, CheckCircle2, Clock,
  TrendingUp, Briefcase, FileText, Presentation, Building2, Rocket, ArrowRight
} from "lucide-react"
import { 
  Edit3, 
  Trash2, 
  Plus ,
  Star,
   Edit2, 
  Search, 
  Globe, 
  X, 
  Save,
  ChevronRight,
  Filter
} from 'lucide-react'
import { cn } from "@/lib/utils"

// 


// --- Types & Interfaces ---

interface Opportunity {
  id: number;
  name: string;
  type: string;
  funding?: string; // Pour les incubateurs
  equity?: string;  // Pour les fonds
  deadline: string;
  target: string;
}

interface Platform {
  id: number;
  name: string;
  url: string;
}

type ModalType = 'incubator' | 'fund';

interface CardProps {
  children: ReactNode;
  className?: string;
}

interface TableHeaderProps {
  title: string;
  type: ModalType;
  onAdd: (type: ModalType) => void;
}

  
  const initialIncubators: Opportunity[] = [
  { id: 1, name: "African Impact Challenge (AIC) 2026", type: "Incubation & Accélération", funding: "Tracks (Invest/Subventions)", deadline: "2026-01-31", target: "Citoyens africains <39 ans" },
  { id: 2, name: "Activate Fellowship", type: "Accélérateur (2 ans)", funding: "300k$ / 0% equity", deadline: "N/A", target: "Scientifiques/Ingénieurs" },
  { id: 3, name: "Sanabil Startup Unlocked", type: "Bootcamp (5 jours)", funding: "Participation bootcamp", deadline: "2026-03-01", target: "MVP focus Arabie Saoudite" },
  { id: 4, name: "Timbuktoo Incubator Network", type: "Réseau d'incubateurs", funding: "Support technique", deadline: "2026-01-10", target: "Incubateurs africains" },
  { id: 5, name: "Africa Startup Accelerator", type: "Accélérateur", funding: "Accompagnement", deadline: "2026-01-15", target: "MVP / Startups africaines" },
  { id: 6, name: "African Youth Climate Hub", type: "Incubation", funding: "Incubation", deadline: "2026-01-25", target: "Pre-seed / Climat" },
  { id: 7, name: "beVisioneers (Mercedes-Benz)", type: "Programme d'impact / Accélération", funding: "Mentorat / Bourses", deadline: "2026-01-26", target: "Idée / Impact" },
  { id: 8, name: "Social & Inclusive Business", type: "Accélération sectorielle", funding: "Accompagnement", deadline: "2026-01-26", target: "Early-stage / Impact social" },
  { id: 9, name: "Google Accelerator (MENA Tech)", type: "Accélérateur", funding: "Crédits Cloud + Expertise", deadline: "2026-01-30", target: "Seed / Tech MENA" },
  { id: 10, name: "Mastercard x Meltwater EdTech", type: "Accélérateur EdTech", funding: "60 000 $ (Equity-free)", deadline: "2026-01-30", target: "MVP / EdTech" },
  { id: 11, name: "Founders Smith Accelerator", type: "Accélérateur", funding: "Aide à la levée (Success fee)", deadline: "2026-01-30", target: "Traction" },
  { id: 12, name: "SDG Innovation Accelerator", type: "Accélérateur ODD", funding: "Accélération ODD", deadline: "2026-01-31", target: "Early-stage / Impact" },
  { id: 13, name: "Accelerate Africa 2026", type: "Accélérateur", funding: "100 000 $ - 250 000 $", deadline: "2026-01-31", target: "Pre-seed" },
  { id: 14, name: "UN Global Pulse Accelerator", type: "Accélérateur ONU", funding: "Support mise à l’échelle", deadline: "2026-02-11", target: "MVP / Data & IA" },
  { id: 15, name: "BlueInvest Africa 2026", type: "Programme d'accélération / Investisseurs", funding: "Accès investisseurs / Pitch", deadline: "2026-02-13", target: "Seed / Blue Economy" },
  { id: 17, name: "UNICEF StartUp Lab", type: "Startup Lab / Accélération", funding: "Accompagnement technique", deadline: "2026-02-20", target: "MVP / Impact social" },
  { id: 18, name: "Tony Elumelu Foundation", type: "Programme d'accélération", funding: "Financement + Mentorat", deadline: "2026-03-01", target: "Entrepreneurs africains" },
  ];

  const otherOpportunities: Opportunity[] = [
  { id: 101, name: "Earth Journalism Network", type: "Bourse médias", funding: "Bourses de reportage", deadline: "2026-01-06", target: "Post-MVP / Journalisme" },
  { id: 102, name: "AU–EU Youth Action Lab", type: "Programme innovation", funding: "Jusqu'à 50 000 €", deadline: "2026-01-07", target: "Idée / Jeunes" },
  { id: 105, name: "International Climate Initiative (IKI)", type: "Subvention", funding: "60 000 € - 200 000 €", deadline: "2026-01-15", target: "Idée / MVP / Climat" },
  { id: 107, name: "ICN / World Bank Contest", type: "Concours", funding: "Visibilité / Réseau", deadline: "2026-01-24", target: "Early-stage" },
  { id: 108, name: "Women Entrepreneurs (IYBA-WE4A)", type: "Programme femmes", funding: "5 000 $ (Seed)", deadline: "2026-01-25", target: "Seed / Femmes entrepreneures" },
  { id: 109, name: "iF Design Student Award", type: "Concours design", funding: "50 000 € de prix", deadline: "2026-01-28", target: "Idée / Étudiants design" },
  { id: 110, name: "EridanSeed SME Venture Scale", type: "Fonds d'investissement", funding: "25 000 $ (Equity)", deadline: "2026-01-31", target: "PME" },
  { id: 112, name: "Female Founder Award (VivaTech)", type: "Prix / Programme", funding: "Mentorat + Stand", deadline: "2026-02-02", target: "Early-stage / Femmes" },
  { id: 113, name: "UNHCR x Fuzé Challenge", type: "Challenge", funding: "Visibilité", deadline: "2026-02-04", target: "Réfugiés / Inclusion" },
  { id: 114, name: "Fonseca Leadership Program", type: "Programme leadership", funding: "Bourses de formation", deadline: "2026-02-06", target: "Conservation" },
  { id: 116, name: "Qualcomm Make in Africa", type: "Programme hardware", funding: "10 000 $ (Bourse + Brevet)", deadline: "2026-02-15", target: "Hardware / DeepTech" },
];


  const initialFunds: Opportunity[] = [
    { id: 4, name: "Edge City Grants", type: "Grants & Fellowships", equity: "None", deadline: "Juillet / Décembre", target: "Projets D/ACC <25 ans" },
    { id: 5, name: "UNHCR x Fuzé Challenge", type: "Challenge / Support", equity: "Variable", deadline: "2026-02-04", target: "Réfugiés en Afrique" },
  ];

  const initialPlatformsFor: Platform[] = [
    { id: 1, name: "Crunchbase", url: "crunchbase.com" },
    { id: 2, name: "Digital Africa", url: "digital-africa.co" },
    { id: 3, name: "F6S", url: "f6s.com" },
  ];

  // ----- Données ajoutées par l'équipe (JSON) -----
  const acceleratorsPriorityForAfrica = [
    { name: "Antler Nairobi", stage: "Idée / Équipe", typicalInvestment: "100000 USD", equityShare: "10 %" },
    { name: "Baobab Network", stage: "MVP / Traction", typicalInvestment: "100000 USD", equityShare: "12.5 %" },
    { name: "MEST Africa", stage: "Idée / Tech", typicalInvestment: "Jusqu'à 100000 USD", equityShare: "Equity variable" },
    { name: "Startup Wise Guys", stage: "B2B / MVP", typicalInvestment: "65 000 €", equityShare: "Jusqu'à 12 %" },
    { name: "M Studio", stage: "Idée / Mobile", typicalInvestment: "Startup Studio (co-fondation)", equityShare: "Flat" },
    { name: "Flat6Labs Tunis", stage: "Seed", typicalInvestment: "Jusqu'à 200 000 TND", equityShare: "10 - 20 %" },
    { name: "Y Combinator", stage: "Seed", typicalInvestment: "500 000 USD", equityShare: "7 % (Standard)" },
    { name: "500 Global", stage: "Seed", typicalInvestment: "150 000 USD", equityShare: "env. 6 %" }
  ];

  const abidjanSupportStructures = [
    { name: "ZEBOX West Africa", type: "Accélérateur", benefits: "Accès à 100 000 $ de crédits Cloud (AWS/Microsoft)" },
    { name: "Impact Hub Abidjan", type: "Incubateur", benefits: "Subventions USADF jusqu'à 20 000 $ (programmes femmes)" },
    { name: "Orange Fab CI", type: "Accélérateur", benefits: "Mentorat + Financement via Orange Digital Center" },
    { name: "Cofina Startup House", type: "Incubateur", benefits: "Financement spécialisé Fintech" },
    { name: "M Studio", type: "Startup Studio", benefits: "Investissement direct et ressources opérationnelles" },
    { name: "Dream FactoryHub", type: "Public Hub", benefits: "Soutien public via CI PME (Gratuit)" }
  ];

  const investorsActive2026 = [
    { investor: "Savannah Fund", location: "Nairobi/Lagos", typicalTickets: "50 000 $ - 1 000 000 $", stage: "Seed" },
    { investor: "FrontEnd Ventures", location: "Kenya", typicalTickets: "20 000 $ - 100 000 $", stage: "Early Revenue" },
    { investor: "IsimoVest", location: "Afrique du Sud", typicalTickets: "50 000 $ - 1 500 000 $", stage: "Idée / Proto" },
    { investor: "Gambia Angel Investors", location: "Gambie", typicalTickets: "10 000 $ - 200 000 $", stage: "Prototype" },
    { investor: "Microtraction", location: "Nigeria", typicalTickets: "First Cheque rapide", stage: "Pre-seed" },
    { investor: "Partech Africa", location: "Dakar/Lagos", typicalTickets: "Fonds de 300 millions $", stage: "Seed / Série A" }
  ];

  const nonDilutiveFundingPrograms = [
    { program: "Tony Elumelu (TEF)", target: "Entrepreneurs africains", benefit: "5 000 USD (seed capital)" },
    { program: "D-Prize", target: "Impact social", benefit: "Jusqu'à 20 000 USD" },
    { program: "International Climate Initiative", target: "Climat / Biodiversité", benefit: "60 000 € - 200 000 €" },
    { program: "AU–EU Youth Action Lab", target: "Jeunesse / Social", benefit: "Jusqu'à 50 000 €" },
    { program: "AWS Activate Credits", target: "Tech / Cloud", benefit: "Jusqu'à 100 000 USD (crédits)" },
    { program: "Google Cloud Program", target: "Tech / Cloud", benefit: "Jusqu'à 150 000 USD (crédits)" },
    { program: "Microsoft for Startups", target: "Tech / Cloud", benefit: "Jusqu'à 150 000 USD (crédits)" }
  ];

  // ----- Fin des données ajoutées -----
  // --- UI Components ---

  const CardFor: React.FC<CardProps> = ({ children, className = "" }) => (
    <div className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl overflow-hidden ${className}`}>
      {children}
    </div>
  );

  const TableHeader: React.FC<TableHeaderProps> = ({ title, onAdd, type }) => (
    <div className="flex items-center justify-between mb-4 px-2">
      <h4 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
        <div className="w-1 h-6 bg-blue-500 rounded-full" />
        {title}
      </h4>
      <button 
        onClick={() => onAdd(type)}
        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/30"
      >
        <Plus size={16} /> AJOUTER
      </button>
    </div>
  );



// 
const initialFundingRounds = [
  {
    id: 'r1',
    name: "Pre-Seed",
    target: 150000,
    raised: 0,
    status: "active",
    timeline: "Q1 2025",
    description: "Validation produit & MVP"
  },
  {
    id: 'r2',
    name: "Seed",
    target: 500000,
    raised: 0,
    status: "planned",
    timeline: "Q4 2025",
    description: "Scale & Expansion"
  }
]

const initialUseOfFunds = [
  { name: "Tech & Produit", value: 40, color: "#0ea5e9" },
  { name: "Marketing & GTM", value: 25, color: "#10b981" },
  { name: "Operations", value: 20, color: "#f59e0b" },
  { name: "Legal & Admin", value: 10, color: "#8b5cf6" },
  { name: "Reserve", value: 5, color: "#64748b" }
]

const initialMilestones = [
  { id: 'm1',
    title: "MVP Stable", 
    description: "Application fonctionnelle avec features core",
    status: "completed",
    date: "Dec 2024"
  },
  { id: 'm2',
    title: "100 Utilisateurs Beta", 
    description: "Validation du product-market fit initial",
    status: "in-progress",
    date: "Jan 2025"
  },
  { id: 'm3',
    title: "Premier Revenu", 
    description: "Premiere transaction monetisee",
    status: "pending",
    date: "Fev 2025"
  },
]

const initialInvestorPipeline = [
  { id: 'i1', name: 'BA X', type: 'Business Angel', amount: 25000, status: 'En cours' },
  { id: 'i2', name: 'VC Afrique Fund', type: 'VC', amount: 100000, status: 'Postulé' }
]

const initialPitchDeckSections = [
  { id: 'p1', name: "Problem", status: "done" },
  { id: 'p2', name: "Solution", status: "done" },
  { id: 'p3', name: "Market Size", status: "done" },
  { id: 'p4', name: "Business Model", status: "done" },
  { id: 'p5', name: "Traction", status: "in-progress" },
  { id: 'p6', name: "Competition", status: "done" },
  { id: 'p7', name: "Team", status: "done" },
  { id: 'p8', name: "Financials", status: "in-progress" },
  { id: 'p9', name: "Ask & Use of Funds", status: "done" },
]

const initialFinancialProjections = [
  { id: 'f2025', year: "2025", revenue: 50, costs: 0, users: 2 },
  { id: 'f2026', year: "2026", revenue: 250, costs: 150, users: 100 },
  { id: 'f2027', year: "2027", revenue: 800, costs: 200, users: 180 },
]

const initialPlatforms = [
  { id: 'pf1', name: 'Ulule', url: 'https://www.ulule.com' },
  { id: 'pf2', name: 'KissKissBankBank', url: 'https://www.kisskissbankbank.com' },
  { id: 'pf3', name: 'VC Afrique Directory', url: 'https://example.com/africa-vc' }
]

export function FundraisingSection() {
  // Key editable metrics
  const [preSeedTarget, setPreSeedTarget] = useState<number>(150000)
  const [valuation, setValuation] = useState<number>(1200000)
  const [equityOffered, setEquityOffered] = useState<number>(12.5)
  const [runway, setRunway] = useState<number>(18)
  const [editMetrics, setEditMetrics] = useState(false)

  // Stateful datasets
  const [fundingRounds, setFundingRounds] = useState(initialFundingRounds)
  const [useOfFunds, setUseOfFunds] = useState(initialUseOfFunds)
  const [milestones, setMilestones] = useState(initialMilestones)
  const [investorPipeline, setInvestorPipeline] = useState(initialInvestorPipeline)
  const [pitchDeckSections, setPitchDeckSections] = useState(initialPitchDeckSections)
  const [financialProjections, setFinancialProjections] = useState(initialFinancialProjections)
  const [platforms] = useState(initialPlatforms)

  // Modals and form state
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false)
  const [editingMilestone, setEditingMilestone] = useState<any | null>(null)

  const [isRoundModalOpen, setIsRoundModalOpen] = useState(false)
  const [editingRound, setEditingRound] = useState<any | null>(null)

  const [isInvestorModalOpen, setIsInvestorModalOpen] = useState(false)
  const [editingInvestor, setEditingInvestor] = useState<any | null>(null)

  // Form state for modals
  const [milestoneTitle, setMilestoneTitle] = useState('')
  const [milestoneDate, setMilestoneDate] = useState('')
  const [milestoneStatus, setMilestoneStatus] = useState('pending')
  const [milestoneDescription, setMilestoneDescription] = useState('')

  const [roundName, setRoundName] = useState('')
  const [roundTarget, setRoundTarget] = useState<number>(0)
  const [roundRaised, setRoundRaised] = useState<number>(0)
  const [roundStatus, setRoundStatus] = useState('planned')
  const [roundTimeline, setRoundTimeline] = useState('')
  const [roundDescription, setRoundDescription] = useState('')

  const [invName, setInvName] = useState('')
  const [invType, setInvType] = useState('')
  const [invAmount, setInvAmount] = useState<number>(0)
  const [invStatus, setInvStatus] = useState('En cours')

  useEffect(() => {
    if (editingMilestone) {
      setMilestoneTitle(editingMilestone.title || '')
      setMilestoneDate(editingMilestone.date || '')
      setMilestoneStatus(editingMilestone.status || 'pending')
      setMilestoneDescription(editingMilestone.description || '')
    } else {
      setMilestoneTitle('')
      setMilestoneDate('')
      setMilestoneStatus('pending')
      setMilestoneDescription('')
    }
  }, [editingMilestone, isMilestoneModalOpen])

  useEffect(() => {
    if (editingRound) {
      setRoundName(editingRound.name || '')
      setRoundTarget(editingRound.target || 0)
      setRoundRaised(editingRound.raised || 0)
      setRoundStatus(editingRound.status || 'planned')
      setRoundTimeline(editingRound.timeline || '')
      setRoundDescription(editingRound.description || '')
    } else {
      setRoundName('')
      setRoundTarget(0)
      setRoundRaised(0)
      setRoundStatus('planned')
      setRoundTimeline('')
      setRoundDescription('')
    }
  }, [editingRound, isRoundModalOpen])

  useEffect(() => {
    if (editingInvestor) {
      setInvName(editingInvestor.name || '')
      setInvType(editingInvestor.type || '')
      setInvAmount(editingInvestor.amount || 0)
      setInvStatus(editingInvestor.status || 'En cours')
    } else {
      setInvName('')
      setInvType('')
      setInvAmount(0)
      setInvStatus('En cours')
    }
  }, [editingInvestor, isInvestorModalOpen])

  // simple pitch deck viewer
  const [deckFile, setDeckFile] = useState<File | null>(null)
  const [deckUrl, setDeckUrl] = useState<string | null>(null)

  // Derived values
  const preSeedRaised = fundingRounds[0]?.raised ?? 0
  const preSeedProgress = Math.round((preSeedRaised / (preSeedTarget || 1)) * 100)

  const pitchCompletion = useMemo(() => {
    return Math.round((pitchDeckSections.filter(s => s.status === 'done').length / pitchDeckSections.length) * 100)
  }, [pitchDeckSections])

  // Helpers
  const openAddMilestone = () => { setEditingMilestone(null); setIsMilestoneModalOpen(true) }
  const openEditMilestone = (m: any) => { setEditingMilestone(m); setIsMilestoneModalOpen(true) }
  const saveMilestone = (m: any) => {
    if (m.id) setMilestones(prev => prev.map(x => x.id === m.id ? m : x))
    else setMilestones(prev => [{ ...m, id: Date.now().toString() }, ...prev])
    setIsMilestoneModalOpen(false)
  }
  const deleteMilestone = (id: string) => setMilestones(prev => prev.filter(p => p.id !== id))

  const openAddRound = () => { setEditingRound(null); setIsRoundModalOpen(true) }
  const openEditRound = (r: any) => { setEditingRound(r); setIsRoundModalOpen(true) }
  const saveRound = (r: any) => {
    if (r.id) setFundingRounds(prev => prev.map(x => x.id === r.id ? r : x))
    else setFundingRounds(prev => [{ ...r, id: Date.now().toString() }, ...prev])
    setIsRoundModalOpen(false)
  }
  const deleteRound = (id: string) => setFundingRounds(prev => prev.filter(p => p.id !== id))

  const openAddInvestor = () => { setEditingInvestor(null); setIsInvestorModalOpen(true) }
  const openEditInvestor = (inv: any) => { setEditingInvestor(inv); setIsInvestorModalOpen(true) }
  const saveInvestor = (inv: any) => {
    if (inv.id) setInvestorPipeline(prev => prev.map(x => x.id === inv.id ? inv : x))
    else setInvestorPipeline(prev => [{ ...inv, id: Date.now().toString() }, ...prev])
    setIsInvestorModalOpen(false)
  }
  const deleteInvestor = (id: string) => setInvestorPipeline(prev => prev.filter(p => p.id !== id))

  const onUploadDeck = (file: File | null) => {
    setDeckFile(file)
    if (file) {
      const url = URL.createObjectURL(file)
      setDeckUrl(url)
    } else {
      setDeckUrl(null)
    }
  }

  const updateProjection = (id: string, key: 'revenue'|'costs'|'users', value: number) => {
    setFinancialProjections(prev => prev.map(p => p.id === id ? ({...p, [key]: value}) : p))
  }

  // Pitch section toggle
  const togglePitchSection = (id: string) => {
    setPitchDeckSections(prev => prev.map(s => s.id === id ? ({...s, status: s.status === 'done' ? 'in-progress' : 'done'}) : s))
  }

  // Incubateurs & Fonds (hooks must be inside component)
  const [incubators, setIncubators] = useState<Opportunity[]>(initialIncubators);
  const [funds, setFunds] = useState<Opportunity[]>(initialFunds);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // CORRECTION : Initialisation correcte du type pour éviter l'erreur ts(2345)
  const [editingItem, setEditingItem] = useState<Partial<Opportunity> | null>(null);
  const [modalType, setModalType] = useState<ModalType>('incubator');

  const handleDelete = (id: number, type: ModalType): void => {
    if (type === 'incubator') {
      setIncubators(prev => prev.filter(item => item.id !== id));
    } else {
      setFunds(prev => prev.filter(item => item.id !== id));
    }
  };

  const openModal = (type: ModalType, item: Opportunity | null = null): void => {
    setModalType(type);
    setEditingItem(item || { name: '', type: '', funding: '', deadline: '', target: '', equity: '' });
    setIsModalOpen(true);
  };

  const handleSave = (e: FormEvent): void => {
    e.preventDefault();
    if (!editingItem) return;

    const list = modalType === 'incubator' ? incubators : funds;
    const setList = modalType === 'incubator' ? setIncubators : setFunds;

    if (editingItem.id) {
      setList(list.map(i => i.id === editingItem.id ? (editingItem as Opportunity) : i));
    } else {
      setList([...list, { ...editingItem, id: Date.now() } as Opportunity]);
    }
    setIsModalOpen(false);
  };

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
              Pré-Seed actif
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Levée de Fonds</h2>
          <p className="text-white/80 max-w-2xl">
            Stratégie de financement Pré-Seed pour accélérer le développement d'Immo+ V2
            et atteindre le product-market fit sur le marché immobilier africain.
          </p>
        </div>
      </header>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Objectif Pré-Seed</p>
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

      {/* Modals: Milestone / Round / Investor */}
      <Modal open={isMilestoneModalOpen} onClose={() => setIsMilestoneModalOpen(false)} title={editingMilestone ? 'Modifier milestone' : 'Nouveau milestone'}>
        <div className="space-y-3">
          <div>
            <label className="text-sm">Titre</label>
            <Input value={milestoneTitle} onChange={(e)=>setMilestoneTitle(e.target.value)} className="mt-2" />
          </div>
          <div>
            <label className="text-sm">Date</label>
            <Input value={milestoneDate} onChange={(e)=>setMilestoneDate(e.target.value)} className="mt-2" />
          </div>
          <div>
            <label className="text-sm">Statut</label>
            <select value={milestoneStatus} onChange={(e)=>setMilestoneStatus(e.target.value)} className="mt-2 w-full rounded-md border px-2 py-1">
              <option value="completed">Complété</option>
              <option value="in-progress">En cours</option>
              <option value="pending">En attente</option>
            </select>
          </div>
          <div>
            <label className="text-sm">Description</label>
            <Textarea value={milestoneDescription} onChange={(e:any)=>setMilestoneDescription(e.target.value)} className="mt-2" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={()=>setIsMilestoneModalOpen(false)}>Annuler</Button>
            <Button onClick={()=> saveMilestone({ id: editingMilestone?.id, title: milestoneTitle, date: milestoneDate, status: milestoneStatus, description: milestoneDescription })}>Enregistrer</Button>
          </div>
        </div>
      </Modal>

      <Modal open={isRoundModalOpen} onClose={() => setIsRoundModalOpen(false)} title={editingRound ? 'Modifier round' : 'Nouveau round'}>
        <div className="space-y-3">
          <div>
            <label className="text-sm">Nom</label>
            <Input value={roundName} onChange={(e)=>setRoundName(e.target.value)} className="mt-2" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-sm">Target (EUR)</label>
              <Input value={roundTarget.toString()} onChange={(e)=>setRoundTarget(Number(e.target.value || 0))} className="mt-2" />
            </div>
            <div>
              <label className="text-sm">Raised (EUR)</label>
              <Input value={roundRaised.toString()} onChange={(e)=>setRoundRaised(Number(e.target.value || 0))} className="mt-2" />
            </div>
          </div>
          <div>
            <label className="text-sm">Timeline</label>
            <Input value={roundTimeline} onChange={(e)=>setRoundTimeline(e.target.value)} className="mt-2" />
          </div>
          <div>
            <label className="text-sm">Statut</label>
            <select value={roundStatus} onChange={(e)=>setRoundStatus(e.target.value)} className="mt-2 w-full rounded-md border px-2 py-1">
              <option value="active">En cours</option>
              <option value="planned">Planifié</option>
            </select>
          </div>
          <div>
            <label className="text-sm">Description</label>
            <Textarea value={roundDescription} onChange={(e:any)=>setRoundDescription(e.target.value)} className="mt-2" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={()=>setIsRoundModalOpen(false)}>Annuler</Button>
            <Button onClick={()=> saveRound({ id: editingRound?.id, name: roundName, target: roundTarget, raised: roundRaised, status: roundStatus, timeline: roundTimeline, description: roundDescription })}>Enregistrer</Button>
          </div>
        </div>
      </Modal>

      <Modal open={isInvestorModalOpen} onClose={() => setIsInvestorModalOpen(false)} title={editingInvestor ? 'Modifier investisseur' : 'Nouveau investisseur'}>
        <div className="space-y-3">
          <div>
            <label className="text-sm">Nom</label>
            <Input value={invName} onChange={(e)=>setInvName(e.target.value)} className="mt-2" />
          </div>
          <div>
            <label className="text-sm">Type</label>
            <Input value={invType} onChange={(e)=>setInvType(e.target.value)} className="mt-2" />
          </div>
          <div>
            <label className="text-sm">Montant proposé (EUR)</label>
            <Input value={invAmount.toString()} onChange={(e)=>setInvAmount(Number(e.target.value || 0))} className="mt-2" />
          </div>
          <div>
            <label className="text-sm">Statut</label>
            <select value={invStatus} onChange={(e)=>setInvStatus(e.target.value)} className="mt-2 w-full rounded-md border px-2 py-1">
              <option>En cours</option>
              <option>Postulé</option>
              <option>Clos</option>
              <option>Refusé</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={()=>setIsInvestorModalOpen(false)}>Annuler</Button>
            <Button onClick={()=> saveInvestor({ id: editingInvestor?.id, name: invName, type: invType, amount: invAmount, status: invStatus })}>Enregistrer</Button>
          </div>
        </div>
      </Modal>

      {/* Funding Progress & Use of Funds */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Funding Rounds */}
        <Card className="glass border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-primary" />
                  Rounds de Financement
                </CardTitle>
                <CardDescription>Progression et objectifs par phase</CardDescription>
              </div>
              <div>
                <Button size="sm" onClick={openAddRound}><Plus className="w-4 h-4 mr-2" />Ajouter Round</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {fundingRounds.map((round, index) => (
              <div key={round.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-foreground">{round.name}</h4>
                    <Badge 
                      variant={round.status === "active" ? "default" : "secondary"}
                      className={cn(
                        round.status === "active" && "bg-chart-2 text-white"
                      )}
                    >
                      {round.status === "active" ? "En cours" : "Planifié"}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">{round.timeline}</span>
                </div>
                <p className="text-sm text-muted-foreground">{round.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {round.raised.toLocaleString()} EUR levés
                    </span>
                    <span className="font-medium text-foreground">
                      {round.target.toLocaleString()} EUR
                    </span>
                  </div>
                  <Progress 
                    value={(round.raised / round.target) * 100} 
                    className="h-2"
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <Button variant="ghost" size="sm" onClick={() => openEditRound(round)}><Edit3 className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteRound(round.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </div>
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
            <CardDescription>Répartition du budget Pré-Seed</CardDescription>
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
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-chart-4" />
                  Milestones Pre-Seed
                </CardTitle>
                <CardDescription>Objectifs à atteindre pour la levée</CardDescription>
              </div>
              <div>
                <Button size="sm" onClick={openAddMilestone}><Plus className="w-4 h-4 mr-2" />Ajouter</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div 
                  key={milestone.id} 
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
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground shrink-0">{milestone.date}</span>
                        <Button variant="ghost" size="sm" onClick={() => openEditMilestone(milestone)}><Edit3 className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteMilestone(milestone.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pipeline Investisseurs */}
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-chart-1" />
              Pipeline Investisseurs
            </CardTitle>
            <CardDescription>Suivi des relations et montants proposés</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-3 flex justify-end">
              <Button size="sm" onClick={openAddInvestor}><Plus className="w-4 h-4 mr-2" />Ajouter un Investisseur</Button>
            </div>
            <div className="space-y-3">
              {investorPipeline.map((inv) => (
                <div key={inv.id} className="p-3 rounded-xl border flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-foreground">{inv.name}</h4>
                      <Badge variant="outline" className={cn(
                        inv.status === 'En cours' && 'bg-orange-100 text-orange-700 border-orange-200',
                        inv.status === 'Postulé' && 'bg-blue-100 text-blue-700 border-blue-200',
                        inv.status === 'Clos' && 'bg-green-100 text-green-700 border-green-200',
                        inv.status === 'Refusé' && 'bg-red-100 text-red-700 border-red-200',
                        'text-xs'
                      )}>{inv.status}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{inv.type}</span> • {inv.amount.toLocaleString()} EUR
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => openEditInvestor(inv)}><Edit3 className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteInvestor(inv.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
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
              {pitchDeckSections.map((section) => (
                <div 
                  key={section.id}
                  onClick={() => togglePitchSection(section.id)}
                  className="flex items-center justify-between py-2 border-b border-border/50 last:border-0 cursor-pointer"
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
              <div className="flex items-center justify-between text-sm mb-3">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-muted-foreground">Taux de complétion</span>
                    <div className="font-semibold text-foreground">{pitchCompletion}%</div>
                  </div>
                  <div>
                    <input type="file" accept="application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation" onChange={(e)=>{onUploadDeck(e.target.files?.[0] ?? null)}} />
                  </div>
                </div>
                <div>
                  <Button size="sm" variant="outline" onClick={() => { setDeckFile(null); setDeckUrl(null) }}>Retirer</Button>
                </div>
              </div>
              <Progress 
                value={pitchCompletion}
                className="h-2 mt-2"
              />

              {deckUrl && (
                <div className="mt-3 h-48 border rounded overflow-hidden">
                  <object data={deckUrl} type="application/pdf" width="100%" height="100%"> 
                    <iframe src={deckUrl} className="w-full h-full" />
                  </object>
                </div>
              )}
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
            <div className="mt-4 pt-4 border-t border-border">
              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left p-2">Année</th>
                      <th className="text-left p-2">Revenus (K EUR)</th>
                      <th className="text-left p-2">Couts (K EUR)</th>
                      <th className="text-left p-2">Utilisateurs (K)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {financialProjections.map((proj) => (
                      <tr key={proj.id} className="border-t">
                        <td className="p-2">{proj.year}</td>
                        <td className="p-2"><Input value={proj.revenue.toString()} onChange={(e)=>updateProjection(proj.id, 'revenue', Number(e.target.value || 0))} /></td>
                        <td className="p-2"><Input value={proj.costs.toString()} onChange={(e)=>updateProjection(proj.id, 'costs', Number(e.target.value || 0))} /></td>
                        <td className="p-2"><Input value={proj.users.toString()} onChange={(e)=>updateProjection(proj.id, 'users', Number(e.target.value || 0))} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

       <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 space-y-8 font-sans">
      
      {/* SECTION TABLEAUX */}
      <Card className="p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-1">Incubateurs, Accélérateurs & Fonds</h2>
          <p className="text-slate-500 dark:text-slate-400">Gérez vos opportunités et deadlines de financement.</p>
        </div>

        <div className="space-y-12">
          {/* Incubateurs Table */}
          <section>
            <TableHeader title="Incubateurs & Accélérateurs" type="incubator" onAdd={openModal} />
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-100/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 uppercase text-xs">
                  <tr>
                    <th className="p-4 font-semibold">Nom</th>
                    <th className="p-4 font-semibold">Type</th>
                    <th className="p-4 font-semibold">Fonds / Equity</th>
                    <th className="p-4 font-semibold">Deadline</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  <AnimatePresence mode="popLayout">
                    {incubators.map((item) => (
                      <motion.tr 
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="group hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors"
                      >
                        <td className="p-4">
                          <p className="font-bold text-slate-900 dark:text-white">{item.name}</p>
                          <p className="text-xs text-slate-500 mt-1">{item.target}</p>
                        </td>
                        <td className="p-4 text-slate-600 dark:text-slate-300">{item.type}</td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-md text-xs font-medium">
                            {item.funding}
                          </span>
                        </td>
                        <td className="p-4 font-mono text-blue-600 dark:text-blue-400">{item.deadline}</td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => openModal('incubator', item)} className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-blue-500 shadow-sm border border-transparent hover:border-slate-200">
                              <Edit2 size={16} />
                            </button>
                            <button onClick={() => handleDelete(item.id, 'incubator')} className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-red-500 shadow-sm border border-transparent hover:border-slate-200">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </section>

          {/* Fonds d'Investissement Table */}
          <section>
            <TableHeader title="Fonds & Subventions (Grants)" type="fund" onAdd={openModal} />
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-100/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 uppercase text-xs">
                  <tr>
                    <th className="p-4 font-semibold">Nom</th>
                    <th className="p-4 font-semibold">Type</th>
                    <th className="p-4 font-semibold">Equity</th>
                    <th className="p-4 font-semibold">Deadline</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  <AnimatePresence mode="popLayout">
                    {funds.map((item) => (
                      <motion.tr 
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="group hover:bg-purple-50/30 dark:hover:bg-purple-900/10 transition-colors"
                      >
                        <td className="p-4">
                          <p className="font-bold text-slate-900 dark:text-white">{item.name}</p>
                          <p className="text-xs text-slate-500 mt-1">{item.target}</p>
                        </td>
                        <td className="p-4 text-slate-600 dark:text-slate-300">{item.type}</td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-md text-xs font-medium">
                            {item.equity}
                          </span>
                        </td>
                        <td className="p-4 font-mono text-purple-600 dark:text-purple-400">{item.deadline}</td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => openModal('fund', item)} className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-purple-500 shadow-sm border border-transparent hover:border-slate-200">
                              <Edit2 size={16} />
                            </button>
                            <button onClick={() => handleDelete(item.id, 'fund')} className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-red-500 shadow-sm border border-transparent hover:border-slate-200">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </section>
{/* OTHER OPPORTUNITIES */}
          <section className="mt-8">
            <div className="flex items-center gap-3 mb-4">
              <Star className="text-yellow-500" />
              <h3 className="text-xl font-bold dark:text-white">Autres Opportunités</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="p-4 font-semibold">Nom</th>
                    <th className="p-4 font-semibold">Type</th>
                    <th className="p-4 font-semibold">Financement</th>
                    <th className="p-4 font-semibold">Deadline</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {otherOpportunities.map((item) => (
                    <motion.tr 
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="group hover:bg-purple-50/30 dark:hover:bg-purple-900/10 transition-colors"
                    >
                      <td className="p-4">
                        <p className="font-bold text-slate-900 dark:text-white">{item.name}</p>
                        <p className="text-xs text-slate-500 mt-1">{item.target}</p>
                      </td>
                      <td className="p-4 text-slate-600 dark:text-slate-300">{item.type}</td>
                      <td className="p-4 text-slate-600 dark:text-slate-300">{item.funding}</td>
                      <td className="p-4 font-mono text-purple-600 dark:text-purple-400">{item.deadline}</td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => openModal('fund', item)} className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-purple-500 shadow-sm border border-transparent hover:border-slate-200">
                            <Edit2 size={16} />
                          </button>
                          {/* Add delete button if needed */}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                  
                </tbody>
              </table>
            </div>
          </section>



        </div>
      </Card>

      {/* RESSOURCES — mêmes composants que la section Incubateurs */}
      <Card className="p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-1">Ressources & Réseaux</h2>
          <p className="text-slate-500 dark:text-slate-400">Accélérateurs recommandés, structures locales, investisseurs actifs et programmes non-dilutifs.</p>
        </div>

        <section className="space-y-8">
          {/* Accelerators Table (reuse TableHeader and table layout) */}
          <div>
            <TableHeader title="Accélérateurs prioritaires (Afrique)" type="incubator" onAdd={() => {}} />
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-100/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 uppercase text-xs">
                  <tr>
                    <th className="p-4 font-semibold">Nom</th>
                    <th className="p-4 font-semibold">Stage</th>
                    <th className="p-4 font-semibold">Ticket typique</th>
                    <th className="p-4 font-semibold">Equity</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  <AnimatePresence mode="popLayout">
                    {acceleratorsPriorityForAfrica.map((a) => (
                      <motion.tr
                        key={a.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="group hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors"
                      >
                        <td className="p-4">
                          <p className="font-bold text-slate-900 dark:text-white">{a.name}</p>
                        </td>
                        <td className="p-4 text-slate-600">{a.stage}</td>
                        <td className="p-4 font-mono text-slate-700">{a.typicalInvestment}</td>
                        <td className="p-4">{a.equityShare}</td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="sm" onClick={() => {}}><Edit3 className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="sm" onClick={() => {}}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>

          {/* Abidjan Support Structures (table style for consistency) */}
          <div>
            <TableHeader title="Structures d'accompagnement (Abidjan)" type="incubator" onAdd={() => {}} />
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-100/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 uppercase text-xs">
                  <tr>
                    <th className="p-4 font-semibold">Nom</th>
                    <th className="p-4 font-semibold">Type</th>
                    <th className="p-4 font-semibold">Bénéfices</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  <AnimatePresence mode="popLayout">
                    {abidjanSupportStructures.map((s) => (
                      <motion.tr
                        key={s.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="group hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors"
                      >
                        <td className="p-4">
                          <p className="font-bold text-slate-900 dark:text-white">{s.name}</p>
                          <p className="text-xs text-slate-500 mt-1">{s.type}</p>
                        </td>
                        <td className="p-4 text-slate-600">{s.type}</td>
                        <td className="p-4 text-sm text-muted-foreground">{s.benefits}</td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="sm" onClick={() => {}}><Edit3 className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="sm" onClick={() => {}}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>

          {/* Investors Active 2026 */}
          <div>
            <TableHeader title="Investisseurs actifs (2026)" type="fund" onAdd={() => {}} />
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-100/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 uppercase text-xs">
                  <tr>
                    <th className="p-4 font-semibold">Investisseur</th>
                    <th className="p-4 font-semibold">Localisation</th>
                    <th className="p-4 font-semibold">Tickets</th>
                    <th className="p-4 font-semibold">Stage</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  <AnimatePresence mode="popLayout">
                    {investorsActive2026.map((iv) => (
                      <motion.tr
                        key={iv.investor}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="group hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors"
                      >
                        <td className="p-4 font-bold text-foreground">{iv.investor}</td>
                        <td className="p-4 text-slate-600">{iv.location}</td>
                        <td className="p-4 font-mono">{iv.typicalTickets}</td>
                        <td className="p-4">{iv.stage}</td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="sm" onClick={() => {}}><Edit3 className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="sm" onClick={() => {}}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>

          {/* Non-dilutive Programs */}
          <div>
            <TableHeader title="Programmes non-dilutifs" type="fund" onAdd={() => {}} />
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-100/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 uppercase text-xs">
                  <tr>
                    <th className="p-4 font-semibold">Programme</th>
                    <th className="p-4 font-semibold">Cible</th>
                    <th className="p-4 font-semibold">Bénéfice</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  <AnimatePresence mode="popLayout">
                    {nonDilutiveFundingPrograms.map((p) => (
                      <motion.tr
                        key={p.program}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="group hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors"
                      >
                        <td className="p-4 font-bold text-foreground">{p.program}</td>
                        <td className="p-4 text-slate-600">{p.target}</td>
                        <td className="p-4">{p.benefit}</td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="sm" onClick={() => {}}><Edit3 className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="sm" onClick={() => {}}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </Card>

      {/* PLATEFORMES DE FINANCEMENT GRID */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <Globe className="text-blue-500" />
          <h3 className="text-xl font-bold dark:text-white">Plateformes de Financement</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {initialPlatformsFor.map((p) => (
            <motion.a 
              key={p.id}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              href={`https://${p.url}`}
              target="_blank"
              rel="noreferrer"
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 shadow-sm flex items-center justify-between group"
            >
              <div>
                <p className="font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">{p.name}</p>
                <p className="text-sm text-slate-500 font-mono">{p.url}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                <ChevronRight size={20} />
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* PROCHAINES ÉTAPES */}
      <CardFor className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-emerald-500/20 p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 rounded-3xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/40 shrink-0">
            <ArrowRight className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Votre Roadmap Financement</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <CheckCircle2 className="text-emerald-500" />, text: "Finaliser le pitch deck (Finances)" },
                { icon: <Clock className="text-amber-500" />, text: "Contacter 20 Business Angels PropTech" },
                { icon: <Clock className="text-amber-500" />, text: "Préparer la Data Room complète" },
                { icon: <Clock className="text-amber-500" />, text: "Soumettre à Y Combinator / Techstars" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white/50 dark:bg-black/20 rounded-xl border border-white/50 dark:border-white/5 backdrop-blur-sm">
                  {item.icon}
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardFor>

      {/* MODAL AJOUT / MODIF */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {editingItem?.id ? 'Modifier' : 'Ajouter'} {modalType === 'incubator' ? "l'incubateur" : "le fonds"}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Nom de l'entité</label>
                  <input 
                    required
                    value={editingItem?.name || ''}
                    onChange={e => setEditingItem(prev => ({...prev!, name: e.target.value}))}
                    className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                    placeholder="Ex: Y Combinator"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Type</label>
                    <input 
                      value={editingItem?.type || ''}
                      onChange={e => setEditingItem(prev => ({...prev!, type: e.target.value}))}
                      className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Deadline</label>
                    <input 
                      value={editingItem?.deadline || ''}
                      onChange={e => setEditingItem(prev => ({...prev!, deadline: e.target.value}))}
                      className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Financement / Equity</label>
                  <input 
                    value={(modalType === 'incubator' ? editingItem?.funding : editingItem?.equity) || ''}
                    onChange={e => setEditingItem(prev => ({...prev!, [modalType === 'incubator' ? 'funding' : 'equity']: e.target.value}))}
                    className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Cible</label>
                  <textarea 
                    rows={2}
                    value={editingItem?.target || ''}
                    onChange={e => setEditingItem(prev => ({...prev!, target: e.target.value}))}
                    className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 p-3 rounded-xl border border-slate-300 dark:border-slate-700 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300">
                    Annuler
                  </button>
                  <button type="submit" className="flex-1 p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/30 transition-all">
                    Enregistrer
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>           
    </section>
  )
}
