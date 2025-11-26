import React from 'react'
import { useAuthContext } from '@/context/auth'
import { Navigate } from 'react-router'

import Header from '@/components/ui/header'
import DateSelection from '@/components/ui/data-selection'
import AddTransactionButton from '@/components/ui/add-transaction-button'

import Balance from '@/components/ui/balance'

const HomePage = () => {
  const { user, isInicialized } = useAuthContext()
  if (isInicialized) return null

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <Header />

      {/* PARTE DO TOPO */}
      <div className="space-y-6 p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <div className="flex items-center gap-3">
            <DateSelection />
            <AddTransactionButton />
          </div>
        </div>

        <div className="grid grid-cols-[2fr,1fr]">
          <Balance />
        </div>
        {/*  GRAFICOS ETC  */}
      </div>
    </>
  )
}

export default HomePage
