"use client"

import { useState } from "react"
import { Sidebar, MobileHeader, MobileSidebar } from "@/components/dashboard/sidebar"
import { DashboardSection } from "@/components/dashboard/sections/dashboard-section"
import { VisionSection } from "@/components/dashboard/sections/vision-section"
import { BizModelSection } from "@/components/dashboard/sections/bizmodel-section"
import { TechSection } from "@/components/dashboard/sections/tech-section"
import { GtmSection } from "@/components/dashboard/sections/gtm-section"
import { PartnersSection } from "@/components/dashboard/sections/partners-section"
import { KpiSection } from "@/components/dashboard/sections/kpi-section"
import { ScreenshotsSection } from "@/components/dashboard/sections/screenshots-section"
import { UxAuditSection } from "@/components/dashboard/sections/ux-audit-section"
import { FundraisingSection } from "@/components/dashboard/sections/fundraising-section"

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
    setMobileMenuOpen(false)
  }

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardSection key={activeSection} onNavigate={handleSectionChange} />
      case "vision":
        return <VisionSection key={activeSection} />
      case "ux-audit":
        return <UxAuditSection key={activeSection} />
      case "bizmodel":
        return <BizModelSection key={activeSection} />
      case "tech":
        return <TechSection key={activeSection} />
      case "gtm":
        return <GtmSection key={activeSection} />
      case "partners":
        return <PartnersSection key={activeSection} />
      case "kpi":
        return <KpiSection key={activeSection} />
      case "fundraising":
        return <FundraisingSection key={activeSection} />
      case "screenshots":
        return <ScreenshotsSection key={activeSection} />
      default:
        return <DashboardSection key={activeSection} onNavigate={handleSectionChange} />
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <Sidebar activeSection={activeSection} onSectionChange={handleSectionChange} />

      {/* Mobile Sidebar */}
      <MobileSidebar 
        activeSection={activeSection} 
        onSectionChange={handleSectionChange}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Header */}
      <MobileHeader 
        onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} 
        isOpen={mobileMenuOpen}
      />

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        <div className="p-4 md:p-8 pt-20 md:pt-8 max-w-7xl mx-auto">
          {renderSection()}
        </div>
      </main>
    </div>
  )
}
