import React from 'react'
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
import { Link, Navigate } from 'react-router'
import PasswordInput from '@/components/ui/password-input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormItem,
} from '@/components/ui/form'

import { useAuthContext } from '@/context/auth'
import { useSignupForm } from '@/forms/hooks/user'
import { Loader2Icon } from 'lucide-react'

const SignUp = () => {
  const { user, signup, isInicialized } = useAuthContext()

  const { form } = useSignupForm()

  const handleSubmit = (data) => signup(data)

  if (isInicialized) return null

  if (user) {
    return <Navigate to="/" />
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Card className="w-[500px]">
            <CardHeader className="text-center">
              <CardTitle>Crie a sua Conta</CardTitle>
              <CardDescription> Insira seus dados abaixo. </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
                        className={`text-xs text-muted-foreground opacity-75 ${form.formState.errors.terms && 'text-red-600'}`}
                      >
                        Ao clicar em “Criar conta”, você aceita{' '}
                        <a
                          href="#"
                          className={`text-primary-foreground underline ${form.formState.errors.terms && 'text-red-600'}`}
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
              <Button className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <Loader2Icon className="animate-spin" />
                )}
                Criar conta
              </Button>
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
