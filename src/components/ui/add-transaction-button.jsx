import {
  PiggyBankIcon,
  PlusIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from 'lucide-react'
import { z } from 'zod'
import { NumericFormat } from 'react-number-format'
import { DatePicker } from './date-picker'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from './input'
import { Button } from './button'

const formSchema = z.object({
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

const AddTransactionButton = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      amount: 50,
      date: new Date(),
      type: 'EARNING',
    },
    shouldUnregister: true,
  })

  const onSubmit = ({ data }) => {
    console.log({ data })
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            Nova transação <PlusIcon />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Transação</DialogTitle>
            <DialogDescription>Insira as informações abaixo</DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block">Nome</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Digite o nome da transação"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block">Valor</FormLabel>
                    <FormControl>
                      <NumericFormat
                        placeholder="Digite o valor da transação"
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="R$"
                        allowNegative={false}
                        customInput={Input}
                        {...field}
                        onChange={() => {}}
                        onValueChange={(values) =>
                          field.onChange(values.floatValue)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block">Data</FormLabel>
                    <FormControl>
                      <DatePicker
                        {...field}
                        placeholder="Selecione a data da transaçao"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block">Tipo</FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-3 gap-4">
                        <Button
                          type="button"
                          variant={
                            field.value === 'EARNING' ? 'secondary' : 'outline'
                          }
                          onClick={() => field.onChange('EARNING')}
                        >
                          <TrendingUpIcon className="text-primary-green" />
                          Ganho
                        </Button>
                        <Button
                          type="button"
                          variant={
                            field.value === 'EXPENSE' ? 'secondary' : 'outline'
                          }
                          onClick={() => field.onChange('EXPENSE')}
                        >
                          <TrendingDownIcon className="text-primary-red" />
                          Gasto
                        </Button>
                        <Button
                          type="button"
                          variant={
                            field.value === 'INVESTMENT'
                              ? 'secondary'
                              : 'outline'
                          }
                          onClick={() => field.onChange('INVESTMENT')}
                        >
                          <PiggyBankIcon className="text-primary-blue" />
                          Investimento
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="sm:space-x-4">
                <DialogClose asChild>
                  <Button type="reset" variant="secondary" className="w-full">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button type="submit" className="w-full">
                  Adicionar
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddTransactionButton
