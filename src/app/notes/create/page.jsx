"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import jwt from "jsonwebtoken"

export default function CreateNotePage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState({});


    const router = useRouter();
    const { toast } = useToast();
    const token = localStorage.getItem("token");

    useEffect(() => {
      if (!token) {
        return router.push("/login")
      }
      const decodepayload = jwt.decode(token);
      setPayload(decodepayload); 
    },[]
  )

    const handleCreate = async () => {
        if(!title.trim() || !content.trim()) {
            toast({
                title: "Gagal menyimpan",
                description: "Judul dan isi catatan tidak boleh kosong",
            });
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  id_user: payload.userId,
                    title,
                    content,
                })
            });

            if (!res.ok) throw new Error("Gagal menambahkan catatan");

            toast({
                className: cn("bg-red-700", "text-white"),
                title: "Catatan berhasil ditambahkan",
                description: "Catatan berhasil disimpan",
            });

            router.push("/notes")
        } catch (err) {
            toast({
                title: "Gagal menyimpan",
                description: "Terjadi kesalahan saat menyimpan catatan",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-[400px] mx-auto p-6 space-y-4">
      <h1 className="text-3xl text-center font-bold">Buat Catatan Baru</h1>

      <div>
        <Label htmlFor="title" className="ml-2 block text-lg font-medium mb-1">
          Judul
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="content" className="block font-medium mb-1">
          Isi
        </label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={() => router.back()}>
          Batal
        </Button>
        <Button onClick={handleCreate} disabled={loading}>
          {loading ? "Menyimpan..." : "Simpan"}
        </Button>
      </div>
    </Card>
  );
}