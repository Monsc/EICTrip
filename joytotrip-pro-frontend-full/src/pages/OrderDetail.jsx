import React from 'react'
import { useParams } from 'react-router-dom'

function OrderDetail() {
  const { id } = useParams()

  return (
    <div className="order-detail-page">
      <h1>Order Details</h1>
      <p>Order ID: {id}</p>
    </div>
  )
}

export default OrderDetail 