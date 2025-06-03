"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function DialogDelete({ note }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleDelete = async () => {
    if (!token) {
      toast({
        variant: "destructive",
        title: "Token tidak tersedia",
        description: "Anda belum login atau token tidak ditemukan.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id_notes: note.id_notes }),
      });

      if (!res.ok) throw new Error("Gagal menghapus catatan");

      toast({
        className: cn("bg-red-500", "text-white"),
        title: "Catatan dihapus",
        description: "Catatan berhasil dihapus",
      });

      setOpen(false);
      window.location.reload(); // refresh tampilan setelah delete
    } catch (err) {
      toast({
        title: "Gagal menghapus catatan",
        description: "Terjadi kesalahan saat menghapus",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="w-9 h-9 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:brightness-110 transition"
        >
          <Trash2 size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-slate-50">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-red-600">
            Hapus Catatan?
          </DialogTitle>
          <DialogDescription>
            Tindakan ini tidak dapat dibatalkan. Apakah Anda yakin ingin
            menghapus catatan ini?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setOpen(false)}
          >
            Batal
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Menghapus..." : "Hapus"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
