'use client'

import { useState } from "react";
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { useRouter } from 'next/navigation';

export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()

    const handleLogin = async () => {
        try {
            const res = await fetch ('http://localhost:5000/api/auth/login', {
                method : 'POST',
                headers : { 'Content-Type' : 'application/json '},
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                alert('Login Failed');
                return;
            }

            const data = await res.json();
            localStorage.setItem('token', data.token);
            router.push('/dashboard');
        } catch {
            console.error(err);
        }
    };

    return (
    <main className="p-8 max-w-md mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">Login to VasVault</h1>
         <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
         <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
         <Button onClick={handleLogin}>Login</Button>
    </main>
  );
}