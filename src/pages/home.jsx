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
    </>
  )
}

export default HomePage
