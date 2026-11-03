import { Routes, Route } from "react-router-dom";
import { usePageTracking } from "@/analytics/usePageTracking";
import { AdminPage } from "@/admin/AdminPage";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/Motion";
import { ProfileSections } from "@/components/ProfileSections";
import { ClinicalHoursCasePage, LegendsCasePage, MaticCasePage } from "@/pages/CaseStudyPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { PitchPage } from "@/pages/PitchPage";
import "@/components/work/case.css";

function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="pointer-events-none fixed left-4 top-4 z-[100] -translate-y-16 rounded border border-[#333] bg-[#0D0D0D] px-3 py-2 font-mono text-[11px] text-[#FAFAF8] opacity-0 transition-transform focus:pointer-events-auto focus:translate-y-0 focus:opacity-100"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <ProfileSections />
        <SiteFooter />
      </main>
    </>
  );
}

function App() {
  usePageTracking();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/work/matic" element={<MaticCasePage />} />
      <Route path="/work/legends" element={<LegendsCasePage />} />
      <Route path="/work/clinicalhours" element={<ClinicalHoursCasePage />} />
      <Route path="/pitch" element={<PitchPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
