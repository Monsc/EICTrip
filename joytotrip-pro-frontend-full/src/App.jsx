import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import RoutesPage from './pages/Routes'
import RouteDetail from './pages/RouteDetail'
import MyOrders from './pages/MyOrders'
import OrderDetail from './pages/OrderDetail'
import RootLayout from './layouts/RootLayout'

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="routes" element={<RoutesPage />} />
            <Route path="routes/:id" element={<RouteDetail />} />
            <Route path="my-orders" element={<MyOrders />} />
            <Route path="orders/:id" element={<OrderDetail />} />
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}

export default App 