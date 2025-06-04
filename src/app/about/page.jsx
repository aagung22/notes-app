"use client";

import React from "react";
import { Download, Github, Instagram, Linkedin } from "lucide-react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";
import { 
  SiNextdotjs,
  SiTailwindcss,
  SiVercel,
} from "react-icons/si";

const Skills = [
  { name: "HTML", icon: <FaHtml5 /> },
  { name: "CSS", icon: <FaCss3Alt /> },
  { name: "JavaScript", icon: <FaJsSquare /> },
  { name: "React", icon: <FaReact /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss /> },
  { name: "GitHub", icon: <FaGithub /> },
  { name: "Vercel", icon: <SiVercel /> },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#1e1e2f] text-white font-sans">
      {/* Hero Section */}
      <section className="text-center py-16 px-6 md:px-20 bg-[#2c2c3e] animate-fadeIn">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Hello,<br />Saya <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent font-bold">Agung Sedayu</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          Informatics Student <br />
          1 Year Experience
        </p>

        <div className="mt-6">
          <img
            src="images/IMG2.jpeg"
            alt="Profile Agung Sedayu"
            loading="lazy"
            className="mx-auto w-40 h-40 rounded-full border-4 border-yellow-500 shadow-md transition-transform hover:scale-105"
          />
        </div>

        <div className="mt-6 flex justify-center items-center gap-6 text-gray-300">
          <a href="https://wa.me/62881036815824" className="hover:text-white text-2xl" title="WhatsApp" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <FaWhatsapp />
          </a>
          <a href="https://instagram.com/a.agung_" title="Instagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram />
          </a>
          <a href="https://github.com/aagung22" title="GitHub" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github />
          </a>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-16 px-6 md:px-20 bg-[#343450] text-white">
        <h2 className="text-3xl font-bold text-center mb-6">About Me</h2>
        <blockquote className="text-center italic bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent font-bold mb-4">
          "Teknologi hanyalah alat, positif atau negatif tergantung siapa yang menggunakannya"
        </blockquote>
        <div className="max-w-4xl mx-auto text-gray-300 leading-relaxed space-y-4">
          <p>Saya adalah mahasiswa Teknik Informatika semester 2 yang berkuliah di Universitas Dr. Soetomo, Saya sebelumnya menempuh pendidikan di SMK NEGERI 2 SURABAYA dan di jurusan SIJA (Sistem Informatika Jaringan Dan Aplikasi). </p>
          <p>Saat ini saya sedang mengikuti program <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent font-bold">AWS Academy 2025</span>, yang memperluas wawasan saya di bidang cloud computing dan teknologi berbasis web.</p>
          <p>Selain itu, saya aktif menggunakan <strong>VS Code</strong> dan <strong>After Effects</strong> untuk menunjang produktivitas, serta menguasai dasar pengembangan web seperti <strong>HTML</strong>, <strong>CSS</strong>, <strong>JavaScript</strong>, dan <strong>GitHub</strong>.</p>
        </div>
      </section>


      {/* Skills Section */}
      <section className="py-16 px-6 md:px-20 bg-[#1e1e2f] text-white">
        <h2 className="text-3xl font-bold text-center mb-12">Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center">
          {Skills.map((skill) => (
            <div
              key={skill.name}
              className="bg-[#2c2c3e] p-4 rounded-lg shadow-md hover:bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 hover:text-black transition-all flex flex-col items-center gap-2"
            >
              {skill.icon && React.cloneElement(skill.icon, { className: "w-10 h-10 mx-auto" })}
              <p>{skill.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
