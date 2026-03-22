import Navbar from "./components/Navbar";
import HeroCanvas from "./components/HeroCanvas";
import StatsBar from "./components/StatsBar";
import Footer from "./components/Footer";

import Services from "./pages/Services";
import About from "./pages/About";
import WhyUs from "./pages/WhyUs";
import CTA from "./pages/CTA";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <div>
      <Navbar />
      <HeroCanvas />
      <StatsBar />
      <Services />
      <About />
      <WhyUs />
      <CTA />
      <Contact />
      <Footer />
    </div>
  );
}
