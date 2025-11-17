import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Button } from '@/components/ui/button'

import Logo from '@/assets/images/logo.svg'
import { useAuthContext } from '@/context/auth'
import { ChevronDownIcon, LogOutIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const Header = () => {
  const { user, signOut } = useAuthContext()

  return (
    <>
      <Card>
        <CardContent className="flex items-center justify-between px-8 py-4">
          <div>
            <img src={Logo} alt="FinTrack" />
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button onClick={() => setOpen(!open)} variant="outline">
                  <Avatar className="relative -left-1 h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>
                      <p className="text-[12px]">
                        {user.firstName[0]} {user.lastName[0]}
                      </p>
                    </AvatarFallback>
                  </Avatar>
                  <p>
                    {user.firstName} {user.lastName}
                  </p>
                  <ChevronDownIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Meu Perfil</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button
                    variant="ghost"
                    size="small"
                    className="w-full justify-start"
                    onClick={signOut}
                  >
                    <LogOutIcon />
                    Sair
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default Header
