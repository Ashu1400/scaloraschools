import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Problem from '../components/Problem'
import WhyScalora from '../components/WhyScalora'
import InsideClub from '../components/InsideClub'
import ScaloraClub from '../components/ScaloraClub'
import OurPrograms from '../components/OurPrograms'
import OurProjects from '../components/OurProjects'
import Testimonials from '../components/Testimonials'
import OurTeam from '../components/OurTeam'
import About from '../components/About'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <Hero />
        <Problem />
        <WhyScalora />
        <InsideClub />
        <ScaloraClub />
        <OurPrograms />
        <OurProjects />
        <Testimonials />
        <OurTeam />
        <About />
      </main>
      <Footer />
    </>
  )
}

export default Home
