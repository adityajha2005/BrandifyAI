import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
const Header = () => {
  return (
    <div className='px-10 lg:px-32 xl:px-48 2xl:xl-56 p-4 flex justify-between items-center shadow-sm'>
        <Image src="/logo.svg" alt="Logo" width={180} height={100} 
           onClick={() => window.location.href = '/'} className="cursor-pointer" />

        <Button>Get started</Button>
    </div>
  )
}

export default Header