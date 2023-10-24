'use client'

import React from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'

export default function Dashboard() {

  const { status, data: session } = useSession();
  const router = useRouter();

  // ---------------------------------------

  if (status === 'unauthenticated') {
    router.push('/signin', { scroll: false })
  }

  // ---------------------------------------

  if (status === 'authenticated') {

    return (
      <>
        olá senhor, {session?.user?.name}
      </>
    )
  }
}
