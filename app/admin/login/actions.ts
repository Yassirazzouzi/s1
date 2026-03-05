'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function loginAction(prevState: any, formData: FormData) {
    const password = formData.get('password')

    const expectedPassword = process.env.ADMIN_PASSWORD || 'admin'

    if (password === expectedPassword) {
        // Await necessary for cookies API in Next 15+
        const cookieStore = await cookies()
        cookieStore.set('admin_auth', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        })

        redirect('/admin')
    }

    return { error: 'Incorrect password' }
}

export async function logoutAction() {
    const cookieStore = await cookies()
    cookieStore.delete('admin_auth')
    redirect('/admin/login')
}
