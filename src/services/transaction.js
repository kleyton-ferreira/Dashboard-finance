import { protectedApi } from '@/lib/axios'

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
}
