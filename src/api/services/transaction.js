import { protectedApi } from '@/lib/axios'

import queryString from 'query-string'

export const TransactionService = {
  /**
   * Cria umma transição para o usuário autenticado.
   * @param {object} input - Usuário a ser criado
   * @param {string} input.name- Nome da transação
   * @param {string} input.date - Data da transação ( YYY-MM-DD )
   * @param {number} input.amout - Valor da transação
   * @param {string} input.type - Tipos da transação ( EARNING/ESPENSE/INVESTIMENT )
   */
  create: async (input) => {
    const response = await protectedApi.post('/transactions/me', input)
    return response.data
  },

  /**
   * Retorna as transição do usuário autenticado.
   * @param {object} input
   * @param {string} input.from - Data inicial ( YYY-MM-DD )
   * @param {string} input.to - Data final ( YYY-MM-DD )
   */
  getAll: async (input) => {
    const query = queryString.stringify({ from: input.from, to: input.to })
    const response = await protectedApi.get(`/transactions/me?${query}`)
    return response.data
  },
}
