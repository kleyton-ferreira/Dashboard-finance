import React from 'react'
import { useSearchParams } from 'react-router'
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from 'lucide-react'

import BalanceItem from './balance-item'
import { useGetUserBalance } from '@/api/hooks/user'

const Balance = () => {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from') // YYY-MM-DD
  const to = searchParams.get('to') // YYY-MM-DD
  const { data } = useGetUserBalance({ from, to })

  console.log({ data })

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-6">
      <BalanceItem
        label="Saldo"
        icon={<WalletIcon size={16} />}
        amaout={data?.balance}
      />
      <BalanceItem
        label="Ganho"
        icon={<TrendingUpIcon className="text-primary-green" size={16} />}
        amaout={data?.earnings}
      />
      <BalanceItem
        label="Gastos"
        icon={<TrendingDownIcon className="text-primary-red" size={16} />}
        amaout={data?.expenses}
      />
      <BalanceItem
        label="Investimentos"
        icon={<PiggyBankIcon className="text-primary-blue" size={16} />}
        amaout={data?.investments}
      />
    </div>
  )
}

export default Balance
