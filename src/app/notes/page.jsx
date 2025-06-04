"use client";

import CardNotes from "@/components/my-components/CardNotes";
import React, { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import jwt from "jsonwebtoken";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const AllNotesPage = () => {
  const [myNotes, setMyNotes] = useState([]);
  const [otherNotes, setOtherNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payload, setPayload] = useState(null);
  const [particles, setParticles] = useState([]);

  const fetchNotes = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`);
      const data = await response.json();
      const allNotes = data.data.notes;

      const mine = allNotes.filter((note) => note.id_user === payload?.userId);
      const others = allNotes.filter((note) => note.id_user !== payload?.userId);

      setMyNotes(mine);
      setOtherNotes(others);
    } catch (err) {
      console.error("Gagal fetch catatan:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = jwt.decode(storedToken);
        if (decoded) {
          setPayload(decoded);
        }
      } catch (error) {
        console.error("Token tidak valid:", error);
      }
    }

    // Generate particles
    const newParticles = Array(20).fill(null).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${3 + Math.random() * 2}s`,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    if (payload) {
      fetchNotes();
    }
  }, [payload]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Particles & Orbs */}
      <div className="absolute inset-0 z-0">
        {particles.map((style, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={style}
          >
            <div className="w-1 h-1 bg-cyan-400 rounded-full opacity-60"></div>
          </div>
        ))}
        {/* Orbs */}
        <div className="absolute top-24 left-24 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl animate-spin" style={{ animationDuration: "20s" }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container max-w-screen-lg mx-auto p-4">
        <div
          className="mt-6 mb-10 flex items-center justify-center gap-4 opacity-0 translate-y-6 animate-fadeIn"
          style={{ animationDelay: "0.5s" }}
        >
          <ClipboardDocumentIcon className="w-10 h-10 text-white" />
          <h1 className="text-center text-3xl bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent font-bold">My All Notes Collection</h1>
        </div>

        {loading ? (
          <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-white">
            <Loader size={48} className="animate-spin" />
            <p className="text-lg font-semibold">Loading ...</p>
          </div>
        ) : (
          <Tabs defaultValue="my" className="text-white">
            <TabsList className="flex justify-center bg-white/10 rounded-xl mb-6 bg-transparent">
              <TabsTrigger value="my" className="text-white data-[state=active]:bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 px-6 py-2 rounded-xl">Catatan Saya</TabsTrigger>
              <TabsTrigger value="others" className="text-white data-[state=active]:bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 px-6 py-2 rounded-xl">Catatan Orang Lain</TabsTrigger>
            </TabsList>

            <TabsContent value="my">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {myNotes.length > 0 ? (
                  myNotes.map((note) => (
                    <CardNotes key={note.id_notes} note={note} isOwner={true} />
                  ))
                ) : (
                  <p className="text-white">Belum ada catatan buatan Anda.</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="others">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {otherNotes.length > 0 ? (
                  otherNotes.map((note) => (
                    <CardNotes key={note.id_notes} note={note} isOwner={false} />
                  ))
                ) : (
                  <p className="text-white">Tidak ada catatan dari pengguna lain.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>

      {/* Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation-name: fadeIn;
          animation-duration: 0.6s;
          animation-fill-mode: forwards;
          animation-timing-function: ease-out;
        }
      `}</style>
    </div>
  );
};

export default AllNotesPage;
