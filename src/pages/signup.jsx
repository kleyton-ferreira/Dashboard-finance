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
import { EyeIcon, EyeOffIcon } from 'lucide-react'

const SignUp = () => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false)

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
          <div className="relative">
            <Input
              type={passwordIsVisible ? 'text' : 'password'}
              placeholder="Digite seu senha"
            />
            <Button
              variant="ghost"
              className="absolute right-0 top-0 my-1 mr-1 h-8 w-8 text-muted-foreground"
              onClick={() => setPasswordIsVisible((prev) => !prev)}
            >
              {passwordIsVisible ? <EyeOffIcon /> : <EyeIcon />}
            </Button>
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
