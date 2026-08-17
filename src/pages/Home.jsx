import { useState } from 'react'
import useReveal from '../hooks/useReveal.js'
import useSmoothScroll from '../hooks/useSmoothScroll.js'
import Loader from '../components/shared/Loader.jsx'
import SiteHeader from '../components/shared/SiteHeader.jsx'
import Footer from '../components/shared/Footer.jsx'
import Hero from '../components/home/Hero.jsx'
import About from '../components/home/About.jsx'
import Philosophy from '../components/home/Philosophy.jsx'
import Marquee from '../components/home/Marquee.jsx'
import Services from '../components/home/Services.jsx'
import Featured from '../components/home/Featured.jsx'
import Pricing from '../components/home/Pricing.jsx'
import Work from '../components/home/Work.jsx'
import WhyAura from '../components/home/WhyAura.jsx'
import Testimonials from '../components/home/Testimonials.jsx'
import Founder from '../components/home/Founder.jsx'
import LabsPortal from '../components/home/LabsPortal.jsx'
import Faq from '../components/home/Faq.jsx'
import Contact from '../components/home/Contact.jsx'

// Shared currency state lives here so the Featured price and the Pricing
// tables switch together (EUR / USD), mirroring the original site.
export default function Home() {
  const [cur, setCur] = useState('eur')
  useReveal()
  useSmoothScroll()
  return (
    <>
      <Loader />
      <SiteHeader />
      <main id="top">
        <Hero />
        <About />
        <Philosophy />
        <Marquee />
        <Services />
        <Featured cur={cur} />
        <Pricing cur={cur} setCur={setCur} />
        <Work />
        <WhyAura />
        <Testimonials />
        <Founder />
        <LabsPortal />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
