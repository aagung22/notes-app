"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import jwt from "jsonwebtoken";
import { Loader } from "lucide-react";

export default function CreateNotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(false);
  const [particles, setParticles] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) {
      router.push("/");
    } else {
      try {
        const decodedToken = jwt.decode(savedToken);
        setUser(decodedToken.userId);
        setToken(savedToken);
      } catch (error) {
        console.error("Error decoding token", error);
        router.push("/");
      }
    }

    const timeout = setTimeout(() => setInitialLoading(false), 600);
    return () => clearTimeout(timeout);
  }, [router]);

  useEffect(() => {
    document.getElementById("title")?.focus();
  }, []);

  useEffect(() => {
    const newParticles = Array(20).fill(null).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${3 + Math.random() * 2}s`,
    }));
    setParticles(newParticles);
  }, []);

  const handleCreate = async () => {
    if (!title.trim() || !content.trim()) {
      setError(true);
      toast({
        variant: "destructive",
        title: "Gagal menyimpan",
        description: "Judul dan isi tidak boleh kosong.",
      });
      return;
    }

    if (!token || !user) {
      toast({
        variant: "destructive",
        title: "Gagal menyimpan",
        description: "Token atau data pengguna tidak valid.",
      });
      return;
    }

    setLoading(true);
    setError(false);

    const requestBody = { id_user: user, title, content };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Gagal menambahkan catatan");
      }

      toast({
        className: cn("bg-green-500", "text-white"),
        title: "Catatan dibuat",
        description: "Catatan berhasil ditambahkan.",
      });

      router.push("/notes");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal menyimpan",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center text-white">
      {/* Background Particles */}
      <div className="absolute inset-0">
        {Array(20).fill(null).map((_, i) => {
          const left = `${Math.random() * 100}%`;
          const top = `${Math.random() * 100}%`;
          const delay = `${Math.random() * 2}s`;
          const duration = `${3 + Math.random() * 2}s`;
          return (
            <div key={i} className="absolute animate-pulse" style={{ left, top, animationDelay: delay, animationDuration: duration }}>
              <div className="w-1 h-1 bg-cyan-400 rounded-full opacity-60" />
            </div>
          );
        })}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Loading Indicator */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <Loader size={48} className="animate-spin text-cyan-400" />
        <p className="text-lg font-semibold text-slate-100">Loading ...</p>
      </div>
    </div>
  );
}


  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Particles */}
      <div className="absolute inset-0">
        {particles.map((style, i) => (
          <div key={i} className="absolute animate-pulse" style={style}>
            <div className="w-1 h-1 bg-cyan-400 rounded-full opacity-60" />
          </div>
        ))}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl animate-spin" style={{ animationDuration: "20s" }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-20">
        <div className="w-full max-w-xl">
          <Card
            className="relative p-6 space-y-6 shadow-2xl rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-cyan-500/25 hover:shadow-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Shimmer */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 transition-transform duration-1000 ${isHovered ? "translate-x-full" : "-translate-x-full"}`} />
            </div>

            <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              Buat Catatan Baru
            </h1>

            <div>
              <Label htmlFor="title" className="text-slate-200 font-medium">Judul</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={cn(
                  "bg-white/5 border-white/20 text-white placeholder:text-slate-400 rounded-xl h-12 transition-all focus:bg-white/10 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-400/25 hover:bg-white/8",
                  error && !title.trim() && "border-red-500 focus-visible:ring-red-500"
                )}
              />
            </div>

            <div>
              <Label htmlFor="content" className="text-slate-200 font-medium">Isi</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className={cn(
                  "bg-white/5 border-white/20 text-white placeholder:text-slate-400 rounded-xl transition-all focus:bg-white/10 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-400/25 hover:bg-white/8",
                  error && !content.trim() && "border-red-500 focus-visible:ring-red-500"
                )}
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="secondary"
                onClick={() => router.back()}
                className="transition-all duration-200 hover:opacity-80"
              >
                Batal
              </Button>
              <Button
                onClick={handleCreate}
                disabled={loading}
                className={cn(
                  "relative overflow-hidden group bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25",
                  loading && "opacity-50 cursor-not-allowed"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:animate-pulse" />
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? (
                    <>
                      <Loader className="animate-spin w-4 h-4" />
                      Menyimpan...
                    </>
                  ) : (
                    "Simpan"
                  )}
                </span>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
