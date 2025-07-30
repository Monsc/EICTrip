import React from 'react'
import Hero from '../components/Hero/Hero'
import TopDestinations from '../components/TopDestinations/TopDestinations'
import BestSeller from '../components/BestSeller/BestSeller'
import TrendingTours from '../components/TrendingTours/TrendingTours'
import TourGuides from '../components/TourGuides/TourGuides'

function Home() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section id="hero">
        <Hero />
      </section>

      {/* Top Destinations Section */}
      <section id="top-destinations">
        <TopDestinations />
      </section>

      {/* Best Seller Section */}
      <section id="best-seller">
        <BestSeller />
      </section>

      {/* Trending Tours Section */}
      <section id="trending-tours">
        <TrendingTours />
      </section>

      {/* Tour Guides Section */}
      <section id="tour-guides">
        <TourGuides />
      </section>
    </main>
  )
}

export default Home 