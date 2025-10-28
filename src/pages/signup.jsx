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

const SignUp = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Crie a sua Conta</CardTitle>
          <CardDescription> Insira seus dados abaixo. </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Digite seu nome" />
          <Input placeholder="Digite seu sobrenome" />
          <Input placeholder="Digite seu e-mail" />
          <PasswordInput />
          <PasswordInput placeholder="Digite sua senha novamente" />

          <div className="items-top flex gap-2">
            <Checkbox id="terms" defaultChecked />
            <div className="grid gap-2">
              <label
                htmlFor="terms"
                className="text-xs text-muted-foreground opacity-75"
              >
                Ao clicar em “Criar conta”, você aceita{' '}
                <a href="#" className="text-primary-foreground underline">
                  nosso termo de uso e política de privacidade.
                </a>
              </label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Criar conta</Button>
        </CardFooter>
      </Card>
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
