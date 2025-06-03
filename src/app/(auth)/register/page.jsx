"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nm_lengkap: "",
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [particles, setParticles] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const newParticles = Array(20).fill(null).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${3 + Math.random() * 2}s`,
    }));
    setParticles(newParticles);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Registration failed");
      }

      router.push("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background particles */}
      <div className="absolute inset-0">
        {particles.map((style, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={style}
          >
            <div className="w-1 h-1 bg-cyan-400 rounded-full opacity-60"></div>
          </div>
        ))}

        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl animate-spin" style={{ animationDuration: "20s" }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <Card
            className="shadow-2xl rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-cyan-500/25 hover:shadow-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Shimmer */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
              <div
                className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 transition-transform duration-1000 ${
                  isHovered ? "translate-x-full" : "-translate-x-full"
                }`}
              ></div>
            </div>

            <CardHeader>
              <CardTitle className="text-center text-3xl bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent font-bold">
                Register
              </CardTitle>
              <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"></div>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nm_lengkap" className="text-slate-200 font-medium">Nama Lengkap</Label>
                  <Input
                    id="nm_lengkap"
                    name="nm_lengkap"
                    value={form.nm_lengkap}
                    onChange={handleChange}
                    required
                    placeholder="Nama lengkap"
                    className="h-12 bg-white/5 border-white/20 text-white placeholder:text-slate-400 rounded-xl pl-4 transition-all duration-300 focus:bg-white/10 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-400/25 hover:bg-white/8"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-200 font-medium">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="h-12 bg-white/5 border-white/20 text-white placeholder:text-slate-400 rounded-xl pl-4 transition-all duration-300 focus:bg-white/10 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-400/25 hover:bg-white/8"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-slate-200 font-medium">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    required
                    placeholder="Username unik"
                    className="h-12 bg-white/5 border-white/20 text-white placeholder:text-slate-400 rounded-xl pl-4 transition-all duration-300 focus:bg-white/10 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-400/25 hover:bg-white/8"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-200 font-medium">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                    className="h-12 bg-white/5 border-white/20 text-white placeholder:text-slate-400 rounded-xl pl-4 transition-all duration-300 focus:bg-white/10 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-400/25 hover:bg-white/8"
                  />
                </div>
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 animate-pulse">
                    <p className="text-red-400 text-sm text-center">{error}</p>
                  </div>
                )}
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  disabled={loading}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:animate-pulse"></div>
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Registering...</span>
                    </div>
                  ) : (
                    <span className="relative z-10">Register</span>
                  )}
                </Button>
              </form>
              <div className="text-center space-y-2 pt-4 border-t border-white/10">
                <p className="text-slate-400 text-sm">
                  Already have an account?
                  <button onClick={() => router.push("/login")} className="text-cyan-400 hover:text-cyan-300 ml-1 transition-colors">
                    Login
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
