'use client';

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { UserButton, useAuth } from "@clerk/nextjs"
import { SignInButton } from "@clerk/nextjs"
import Link from 'next/link'

const Header = () => {
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <div className='px-10 lg:px-32 xl:px-48 2xl:xl-56 p-4 flex justify-between items-center shadow-sm'>
        <Image src="/logo.svg" alt="Logo" width={180} height={100} 
           onClick={() => window.location.href = '/'} className="cursor-pointer" />

        <div>
          {isLoaded && (
            isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton mode="modal">
                <Button>Get started</Button>
              </SignInButton>
            )
          )}
        </div>
    </div>
  )
}

export default Header