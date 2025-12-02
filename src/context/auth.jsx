import {
  LOCAL_STORAGE_ACESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from '@/constants/local-storage'

import { UserService } from '@/api/services/user'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useLogin, useSignup } from '@/api/hooks/user'

export const AuthContext = createContext({
  user: null,
  isInicialized: true,
  login: () => {},
  signup: () => {},
  signOut: () => {},
})

export const useAuthContext = () => useContext(AuthContext)

const setTokens = (tokens) => {
  // AQUI FOI COLOCADO O IMPORTE DA CHAVE DO ARQUIVO DE CONSTANTES => ( local-storage.js )
  localStorage.setItem(LOCAL_STORAGE_ACESS_TOKEN_KEY, tokens.accessToken)
  localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, tokens.refreshToken)
}

const removeTokens = () => {
  // AQUI FOI COLOCADO O IMPORTE DA CHAVE DO ARQUIVO DE CONSTANTES => ( local-storage.js )
  localStorage.removeItem(LOCAL_STORAGE_ACESS_TOKEN_KEY)
  localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY)
}

export const AuthContextProvider = ({ children }) => {
  const [isInicialized, setIsInicialized] = useState(true)
  const [user, setUser] = useState()

  // SIGNUP
  const signupMutation = useSignup()

  console.log({ user })

  useEffect(() => {
    const init = async () => {
      try {
        setIsInicialized(true)
        const accessToken = localStorage.getItem(LOCAL_STORAGE_ACESS_TOKEN_KEY)
        const refreshToken = localStorage.getItem(
          LOCAL_STORAGE_REFRESH_TOKEN_KEY
        )
        if (!accessToken && !refreshToken) return
        const response = await UserService.me()
        setUser(response)
      } catch (error) {
        setUser(null)
        console.error(error)
      } finally {
        setIsInicialized(false)
      }
    }
    init()
  }, [])

  const signup = async (data) => {
    try {
      const createUser = await signupMutation.mutateAsync(data)
      setUser(createUser)
      setTokens(createUser.tokens)
      toast.success('Conta criada com sucesso!')
    } catch (error) {
      console.error(error)
      toast.error(
        'Erro ao criar a conta. Por favor, tente novamente mais tarde.'
      )
    }
  }

  // LOGIN
  const loginMutation = useLogin()

  const login = async (data) => {
    try {
      const loggedUser = await loginMutation.mutateAsync(data)
      setUser(loggedUser)
      setTokens(loggedUser.tokens)
      toast.success('Login realizado com sucesso!')
    } catch (error) {
      toast.error(
        'Erro ao realizart o login. Por favor, verifique suas credenciais.'
      )
      console.error(error)
    }
  }

  const signOut = () => {
    setUser(null)
    removeTokens()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        isInicialized,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
