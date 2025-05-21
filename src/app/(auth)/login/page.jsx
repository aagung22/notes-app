"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Username dan password tidak boleh kosong");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          username,
          password,
        })
      })

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Login gagal, Periksa kembali data anda");
      }

      const dataResponse = await response.json();

      localStorage.setItem("token", dataResponse.token);

      window.location.href = "/";
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md rounded-2xl shadow-xl border border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-semibold text-gray-800">Selamat Datang</CardTitle>
          <p className="text-center text-sm text-gray-500 my-1">
            Silakan login untuk melanjutkan
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-sm text-gray-700">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Masukan Username"
                disabled={loading}
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-sm text-gray-700">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                disabled={loading}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="button" onClick={handleLogin} className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}