import { useState } from "react";
import AppExperience from "./components/AppExperience";
import BrandSection from "./components/BrandSection";
import ConsultDialog from "./components/ConsultDialog";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductShowcase from "./components/ProductShowcase";
import ProductSpecs from "./components/ProductSpecs";
import SupportSection from "./components/SupportSection";
import WhyItMatters from "./components/WhyItMatters";

export default function App() {
  const [consultOpen, setConsultOpen] = useState(false);

  return (
    <>
      <a className="skip-link" href="#main">
        跳到主要内容
      </a>
      <Header onConsult={() => setConsultOpen(true)} />
      <main id="main">
        <Hero />
        <WhyItMatters />
        <ProductShowcase />
        <AppExperience />
        <ProductSpecs />
        <BrandSection />
        <SupportSection onConsult={() => setConsultOpen(true)} />
      </main>
      <Footer />
      {consultOpen ? <ConsultDialog onClose={() => setConsultOpen(false)} /> : null}
    </>
  );
}
