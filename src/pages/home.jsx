import { useAuthContext } from '@/context/auth'
import { Navigate } from 'react-router'
import React from 'react'

import Header from '@/components/ui/header'

const HomePage = () => {
  const { user, isInicialized } = useAuthContext()
  if (isInicialized) return null

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <Header />
      <div className="flex items-center justify-between">
        <h2>Dashboard</h2>
        <div></div>
      </div>
    </>
  )
}

export default HomePage
