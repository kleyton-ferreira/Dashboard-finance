import {
  LOCAL_STORAGE_ACESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from '@/constants/local-storage'
import { protectedApi, publicApi } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

export const AuthContext = createContext({
  user: null,
  isInicialized: true,
  login: () => {},
  signup: () => {},
  signOut: () => {},
})

export const useAuthContext = () => useContext(AuthContext)

const setTokens = (tokens) => {
  localStorage.setItem(LOCAL_STORAGE_ACESS_TOKEN_KEY, tokens.accessToken)
  localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, tokens.refreshToken)
}

const removeTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACESS_TOKEN_KEY)
  localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY)
}

export const AuthContextProvider = ({ children }) => {
  const [isInicialized, setIsInicialized] = useState(true)
  const [user, setUser] = useState()

  // SIGNUP
  const signupMutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (variables) => {
      const response = await publicApi.post('/users', {
        first_name: variables.firstName,
        last_name: variables.lastName,
        email: variables.email,
        password: variables.password,
      })
      return response.data
    },
  })

  useEffect(() => {
    const init = async () => {
      try {
        setIsInicialized(true)
        const accessToken = localStorage.getItem(LOCAL_STORAGE_ACESS_TOKEN_KEY)
        const refreshToken = localStorage.getItem(
          LOCAL_STORAGE_REFRESH_TOKEN_KEY
        )
        if (!accessToken && !refreshToken) return
        const response = await protectedApi.get('/users/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        setUser(response.data)
      } catch (error) {
        setUser(null)
        removeTokens()
        console.error(error)
      } finally {
        setIsInicialized(false)
      }
    }
    init()
  }, [])

  const signup = (data) => {
    signupMutation.mutate(data, {
      onSuccess: (createUser) => {
        setUser(createUser)
        setTokens(createUser.tokens)
        toast.success('Conta criada com sucesso!')
      },
      onError: () => {
        toast.error(
          'Erro eo criar conta. Por favor tente novamente mais tarde.'
        )
      },
    })
  }

  // LOGIN
  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async (variables) => {
      const response = await publicApi.post('/users/login', {
        email: variables.email,
        password: variables.password,
      })
      return response.data
    },
  })

  const login = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (loggedUser) => {
        setUser(loggedUser)
        setTokens(loggedUser.tokens)
        toast.success('Login realizado com sucesso!')
      },
      onError: (error) => {
        console.error(error)
      },
    })
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
