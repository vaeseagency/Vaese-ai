import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Process from '@/components/sections/Process'
import WhyVaese from '@/components/sections/WhyVaese'
import Work from '@/components/sections/Work'
import ParticleSection from '@/components/sections/ParticleSection'
import About from '@/components/sections/About'
import CTA from '@/components/sections/CTA'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Services />
        <Process />
        <WhyVaese />
        <Work />
        <ParticleSection />
        <About />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
