import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Link } from 'react-router'
import PasswordInput from '@/components/ui/password-input'
import { Checkbox } from '@/components/ui/checkbox'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormItem,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'

import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { toast } from 'sonner'

const signupSchema = z.object({
  firstName: z.string().trim().min(1, {
    message: 'O nome é obrigatório.',
  }),
  lastName: z.string().trim().min(1, {
    message: 'O sobrenome é obrigatório.',
  }),
  email: z
    .string()
    .email({
      message: 'O e-mail é inválido',
    })
    .trim()
    .min(1, {
      message: 'O e-mail é obrigatório',
    }),
  password: z.string().trim().min(6, {
    message: 'A senha deve ter no mínimo 6 caracteres.',
  }),
  passwordConfirmation: z.string().trim().min(6, {
    message: 'A confirmação de senha é obrigatória.',
  }),
  terms: z.boolean().refine((value) => value === true, {
    message: 'Você precisa aceitar os termos.',
  }),
})

const SignUp = () => {
  const [user, setUser] = useState(null)

  const signupMutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (variables) => {
      const response = await api.post('/users', {
        first_name: variables.firstName,
        last_name: variables.lastName,
        email: variables.email,
        password: variables.password,
      })
      return response.data
    },
  })

  const methods = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      terms: false,
    },
  })

  const handleSubmit = (data) => {
    signupMutation.mutate(data, {
      onSuccess: (createUser) => {
        const accessToken = createUser.tokens.accessToken
        const refreshToken = createUser.tokens.refreshToken
        setUser(createUser)
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        toast.success('Conta criada com sucesso!')
      },
      onError: () => {
        toast.error(
          'Erro eo criar conta. Por favor tente novamente mais tarde.'
        )
      },
    })
  }

  if (user) {
    return <h1>Olá, {user.first_name}!</h1>
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <Card className="w-[500px]">
            <CardHeader className="text-center">
              <CardTitle>Crie a sua Conta</CardTitle>
              <CardDescription> Insira seus dados abaixo. </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={methods.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sobrenome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu sobrenome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu e-mail" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmaçao de senha</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Digite sua senha novamente"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="items-top flex gap-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="items-top= flex gap-2">
                      <FormLabel
                        htmlFor="terms"
                        className={`text-xs text-muted-foreground opacity-75 ${methods.formState.errors.terms && 'text-red-600'}`}
                      >
                        Ao clicar em “Criar conta”, você aceita{' '}
                        <a
                          href="#"
                          className={`text-primary-foreground underline ${methods.formState.errors.terms && 'text-red-600'}`}
                        >
                          nosso termo de uso e política de privacidade.
                        </a>
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Criar conta</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      <div className="flex items-center">
        <p className="opacity-50">Já possui uma conta?</p>
        <Button variant="link" asChild>
          <Link to="/login"> Faça login </Link>
        </Button>
      </div>
    </div>
  )
}

export default SignUp
