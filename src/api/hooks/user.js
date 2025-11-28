import { useAuthContext } from '@/context/auth'
import { UserService } from '@/api/services/user'
import { useQuery } from '@tanstack/react-query'

export const getUserBalanceQueryKey = ({ userId, from, to }) => {
  return ['balance', userId, from, to]
}

export const useGetUserBalance = ({ from, to }) => {
  const { user } = useAuthContext()
  return useQuery({
    queryKey: getUserBalanceQueryKey({ userId: user.id, from, to }),
    queryFn: () => {
      return UserService.getBalance({ from, to })
    },
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(from) && Boolean(to) && Boolean(user.id),
  })
}

// ESSE HOOK PEGA O SALDO DO USUARIO!
