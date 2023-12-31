import { SignOutButton, SignedIn, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const TopBar = () => {
  return (
    <nav className='topbar'>
      <Link href="/" className='flex items-center gap-4'>
        <Image src="/assets/logo.svg" alt='logo' width={28} height={28}/>
        <p className='max-xs:hidden font-lato font-semibold text-2xl text-white'>New Life</p>
      </Link>
      <div className='flex items-center gap-1'>
        <div className="">
          <SignedIn>
           <UserButton afterSignOutUrl='/sign-in'/>
          </SignedIn>
        </div>
      </div>
    </nav>
  )
}

export default TopBar