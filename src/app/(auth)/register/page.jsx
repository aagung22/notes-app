"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function RegisterPage() {
    const [nm_lengkap, setNm_Lengkap] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();

    const handleRegister = async () => {
        console.log({
            nm_lengkap,
            email,
            username,
            password,
        });

        try {
            setLoading(true);
            setError("");
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    nm_lengkap,
                    email,
                    username,
                    password,
                })
            })

            if(!response.ok) {
                const data = await response.json();  
                throw new Error(data.message || "Registration failed");
            } 

                router.push("/login")
            console.log(await response.json())
        } catch (e) {
            setError(e.message)
        }finally{
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-full min-h-[calc(100vh-theme(spacing.40))] p-4">
            <Card className="w-full max-w-md shadow-xl rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">Register</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <Label htmlFor="nm_lengkap">Nama Lengkap</Label>
                            <Input
                                id="nm_lengkap"
                                name="nm_lengkap"
                                value={nm_lengkap}
                                onChange={(e) => { setNm_Lengkap(e.target.value) }}
                                required
                                placeholder="Nama lengkap"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                required
                                placeholder="you@example.com"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => { setUsername(e.target.value) }}
                                required
                                placeholder="Username unik"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                required
                                placeholder="••••••••"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <Button type="submit" onClick={handleRegister} className="w-full" disabled={loading}>
                            {loading ? "Registering..." : "Register"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}