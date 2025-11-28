import { protectedApi, publicApi } from '@/lib/axios'

export const UserService = {
  /**
   * cria um novo usuário
   * @param {object} input - Usuário a ser criado
   * @param {string} input.firstName - Primeiro nome do usuário
   * @param {string} input.lastName - Sobrenome do usuário
   * @param {string} input.email - Email do usuário
   * @param {string} input.password - Senha do usuário
   * @returns {object} Usuário criado
   * @returns {string} response.tokens - Tokens de autenticação
   */

  signup: async (input) => {
    const response = await publicApi.post('/users', {
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      password: input.password,
    })
    return {
      id: response.data.id,
      email: response.data.email,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      tokens: response.data.tokens,
    }
  },

  /**
   * Usuaário faz login
   * @param {object} input - Usuário a ser criado
   * @param {string} input.email - Email do usuário
   * @param {string} input.password - Senha do usuário
   * @returns {object} Usuário autenticado
   * @returns {string} response.tokens - Tokens de autenticação
   */

  login: async (input) => {
    const response = await publicApi.post('/users/login', {
      email: input.email,
      password: input.password,
    })
    return {
      id: response.data.id,
      email: response.data.email,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      tokens: response.data.tokens,
    }
  },

  /**
   * Retorna o usuário autenticado
   * @returns {object} Usuário autenticadoss
   */
  me: async () => {
    const response = await protectedApi.get('/users/me')
    console.log(response.data)
    return {
      id: response.data.id,
      email: response.data.email,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
    }
  },

  /**
   * Retorna o balanço do usuário autenticado.
   * @param {object} input - Usuário a ser criado
   * @param {string} input.from- Data inicial ( YYYY-MM-DD )
   * @param {string} input.to - Data final ( YYYY-MM-DD )s
   */

  getBalance: async (input) => {
    const queryParams = new URLSearchParams()
    queryParams.set('from', input.from)
    queryParams.set('to', input.to)
    const response = await protectedApi.get(
      `/users/me/balance?${queryParams.toString()}`
    )
    return response.data
  },
}
