import { useAuthContext } from '@/context/auth'
import { UserService } from '@/api/services/user'
import { useMutation, useQuery } from '@tanstack/react-query'

export const getUserBalanceQueryKey = ({ userId, from, to }) => {
  console.log(['balance', userId, from, to])

  //   if (!from || !to) {
  //     return ['balance', userId]
  //   }

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
// ESSE HOOK PEGA O SALDO DO USUARIO!  ( useQuery )

// ESSE HOOK PEGA O SALDO DO USUARIO!  ( useMutation )
export const signupMutationKey = ['signup']

export const useSignup = () => {
  return useMutation({
    mutationKey: signupMutationKey,
    mutationFn: async (variables) => {
      const response = await UserService.signup(variables)
      return response
    },
  })
}

export const loginMutationKey = ['login']

export const useLogin = () => {
  return useMutation({
    mutationKey: loginMutationKey,
    mutationFn: async (variables) => {
      const response = await UserService.login(variables)
      return response
    },
  })
}
