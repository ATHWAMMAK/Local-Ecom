import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { getOrder } from '../services/api'

export default function OrderDetails() {
    const { id } = useParams()
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-brand-black">
        Order Tracking
      </h1>

      <p className="mt-4 text-gray-600">
        Order details and tracking will appear here.
      </p>
    </section>
  )
}
