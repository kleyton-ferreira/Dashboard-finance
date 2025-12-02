import React from 'react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import PasswordInput from '@/components/ui/password-input'
import { Button } from '@/components/ui/button'
import { Link, Navigate } from 'react-router'
import { useAuthContext } from '@/context/auth'
import { useLoginForm } from '@/forms/hooks/user'
import { Loader2Icon } from 'lucide-react'

const LoginPage = () => {
  const { user, login, isInicialized } = useAuthContext()

  const { form } = useLoginForm()

  const handleSubmit = (data) => login(data)

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
              <CardTitle>Faça Login</CardTitle>
              <CardDescription>
                Entre com sua conta inserindo seus dados abaixo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <Loader2Icon className="animate-spin" />
                )}
                Fazer Login
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <div className="flex items-center">
        <p className="opacity-50">Ainda não possui uma conta?</p>
        <Button variant="link" asChild>
          <Link to="/signup"> Crie agora </Link>
        </Button>
      </div>
    </div>
  )
}

export default LoginPage
