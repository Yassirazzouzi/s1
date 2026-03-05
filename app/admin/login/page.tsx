'use client'

import { useActionState } from 'react'
import { loginAction } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

const initialState = {
    error: ''
}

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(loginAction, initialState)

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50/50 p-4">
            <Card className="mx-auto w-full max-w-sm">
                <form action={formAction}>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
                        <CardDescription>
                            Enter your password to access the admin area
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {state?.error && (
                            <div className="text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-md">
                                {state.error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password"
                                required
                                disabled={isPending}
                            />
                        </div>
                        <Button className="w-full" type="submit" disabled={isPending}>
                            {isPending ? 'Authenticating...' : 'Login'}
                        </Button>
                    </CardContent>
                </form>
            </Card>
        </div>
    )
}
