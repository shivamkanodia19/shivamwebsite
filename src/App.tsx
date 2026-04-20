import { PresentationModal } from "@/components/PresentationModal";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { PresentationProvider } from "@/context/PresentationContext";

function App() {
  return (
    <PresentationProvider>
      <a
        href="#main"
        className="pointer-events-none fixed left-4 top-4 z-[100] -translate-y-16 rounded border border-[#333] bg-[#0D0D0D] px-3 py-2 font-mono text-[11px] text-[#FAFAF8] opacity-0 transition-transform focus:pointer-events-auto focus:translate-y-0 focus:opacity-100"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <SiteFooter />
      </main>
      <PresentationModal />
    </PresentationProvider>
  );
}

export default App;
