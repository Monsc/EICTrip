import React from 'react'
import { useParams } from 'react-router-dom'

function RouteDetail() {
  const { id } = useParams()

  return (
    <div className="route-detail-page">
      <h1>Route Details</h1>
      <p>Route ID: {id}</p>
    </div>
  )
}

export default RouteDetail 