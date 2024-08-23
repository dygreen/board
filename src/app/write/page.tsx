import FormArea from '@components/board/FormArea'
import { getServerSession } from 'next-auth'
import { authOptions } from '@src/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function Write() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/api/auth/signin')
    }

    return <FormArea isModify={false} />
}
