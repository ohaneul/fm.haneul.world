'use client'

import { useEffect, useState } from 'react'

export function ViewCounter() {
  const [views, setViews] = useState(0)

  useEffect(() => {
    const storedViews = localStorage.getItem('pageViews')
    const currentViews = storedViews ? parseInt(storedViews) + 1 : 1
    localStorage.setItem('pageViews', currentViews.toString())
    setViews(currentViews)
  }, [])

  return (
    <div className="text-white/60 text-sm">
      <span>{views}</span> views
    </div>
  )
}

