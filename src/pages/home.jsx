import { useAuthContext } from '@/context/auth'
import { Navigate } from 'react-router'
import React from 'react'

import Header from '@/components/ui/header'
import DateSelection from '@/components/ui/data-selection'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'

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
      <div className="p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <div className="flex items-center gap-3">
            <DateSelection />
            <Button>
              Nova transação <PlusIcon />
            </Button>
          </div>
        </div>

        {/*  GRAFICOS ETC  */}
      </div>
    </>
  )
}

export default HomePage
