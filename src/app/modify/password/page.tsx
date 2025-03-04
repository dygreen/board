import React from 'react'
import { getServerSession } from '@node_modules/next-auth'
import { authOptions } from '@src/app/api/auth/[...nextauth]/route'
import { redirect } from '@node_modules/next/navigation'
import ModifyPwdForm from '@components/auth/ModifyPwdForm'

export default async function ModifyPassword() {
    const session = await getServerSession(authOptions)

    if (!session) redirect('/')

    return <ModifyPwdForm />
}
