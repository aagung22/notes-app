"use client";
import { useState } from "react";
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

export function DialogDelete({ note }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    setLoading(true);
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`,{
        method : "DELETE",
        headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_notes: note.id_notes,
        id_user: note.id_user,
      }),
      });

      if(!res.ok) throw new Error("Gagal Menghapus catatan");

      toast({
        className: cn("bg-red-700", "text-white"),
        title: "Catatan berhasil dihapus",
        description: "Catatan berhasil dihapus",
      });

      setOpen(false);
      window.location.reload();
      } catch (error) {
        toast({
          title: "Gagal Menghapus catatan",
          description: "Gagal menghapus catatan",
        });
      }finally {
        setLoading(false);
      }
    };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="w-[40px] h-[40px] bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center">
          <Trash2 size={24} />
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
