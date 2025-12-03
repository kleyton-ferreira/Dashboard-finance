import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { TransactionService } from '../services/transaction'
import { useAuthContext } from '@/context/auth'
import { getUserBalanceQueryKey } from './user'

export const createTransactionMutationKey = ['createTransaction']

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()
  const { user } = useAuthContext()
  return useMutation({
    mutationKey: createTransactionMutationKey,
    mutationFn: (input) => TransactionService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserBalanceQueryKey({ userId: user.id }),
        exact: false,
      })
    },
  })
}

export const getTransactionsBalanceQueryKey = ({ userId, from, to }) => {
  if (!from || !to) {
    return ['getTransactions', userId]
  }

  return ['getTransactions', userId, from, to]
}

export const useGeTansactions = ({ from, to }) => {
  const { user } = useAuthContext()
  return useQuery({
    queryKey: getTransactionsBalanceQueryKey({ useId: user.id, from, to }),
    queryFn: () => TransactionService.getAll({ from, to }),
  })
}
