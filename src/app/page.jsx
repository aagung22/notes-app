"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import {
  PencilSquareIcon,
  EyeIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
    } else {
      try {
        const decodedToken = jwt.decode(token);
        setIsLoggedIn(!!decodedToken?.userId);
      } catch {
        setIsLoggedIn(false);
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

  const features = [
    {
      title: "Take Notes",
      description: "Create and organize your notes with ease.",
      icon: <PencilSquareIcon className="w-10 h-10 text-gradient mb-3" />,
    },
    {
      title: "View Notes",
      description: "Browse and find your notes easily.",
      icon: <EyeIcon className="w-10 h-10 text-gradient mb-3" />,
    },
    {
      title: "Edit Notes",
      description: "Update your notes whenever needed.",
      icon: <DocumentTextIcon className="w-10 h-10 text-gradient mb-3" />,
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col justify-center items-center p-6">

      {/* Animated background: Particles */}
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
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl animate-spin" style={{ animationDuration: "20s" }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center p-8 max-w-4xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-md transition-all duration-500 hover:shadow-xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 mb-6 animate-fadeIn">
          Welcome to NotesApp
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-xl mx-auto text-white/80 animate-fadeIn">
          A simple and powerful note-taking app for your everyday thoughts.
        </p>
        <Link href={isLoggedIn ? "/notes/create" : "/login"}>
          <p className="inline-block px-8 py-3 mb-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 shadow transition duration-300 animate-fadeIn">
            Create a New Note
          </p>
        </Link>
      </div>

      {/* Features */}
      <div className="relative z-10 mt-20 max-w-7xl w-full px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-white animate-fadeIn">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(({ title, description, icon }, i) => (
            <div
              key={title}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 text-white animate-fadeIn"
              style={{ animationDelay: `${1 + i * 0.2}s` }}
            >
              {icon}
              <h3 className="text-xl font-semibold text-cyan-300 mb-2">
                {title}
              </h3>
              <p className="text-slate-300">{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Animations & Styles */}
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

        .text-gradient {
          background: linear-gradient(to right, #8b5cf6, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
}
