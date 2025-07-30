import React from 'react'
import Hero from '../components/Hero/Hero'
import TopDestinations from '../components/TopDestinations/TopDestinations'
import BestSeller from '../components/BestSeller/BestSeller'
import TrendingTours from '../components/TrendingTours/TrendingTours'
import TourGuides from '../components/TourGuides/TourGuides'

function Home() {
  return (
    <div className="home">
      <Hero />
      <TopDestinations />
      <BestSeller />
      <TrendingTours />
      <TourGuides />
    </div>
  )
}

export default Home 