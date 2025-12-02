import { z } from 'zod'

export const createTransactionFormSchema = z.object({
  name: z.string().trim().min(1, {
    message: 'O nome é obrigatórito.',
  }),
  amount: z.number({
    required_error: 'o valor é obrigatório.',
  }),
  date: z.date({
    required_error: 'A data é obrigatório.',
  }),
  type: z.enum(['EARNING', 'EXPENSE', 'INVESTMENT']),
})
