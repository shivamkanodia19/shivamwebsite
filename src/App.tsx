import { DeckEngine } from "@/components/DeckEngine";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <DeckEngine />
      </main>
    </>
  );
}

export default App;
