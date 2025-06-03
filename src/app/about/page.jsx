"use client";

import React from "react";
import { Download, Github, Instagram, Linkedin } from "lucide-react";
import { 
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaGithub,
} from "react-icons/fa";
import { SiAdobephotoshop } from "react-icons/si";

const Skills = [
  { name: "HTML", icon: <FaHtml5 /> },
  { name: "CSS", icon: <FaCss3Alt /> },
  { name: "JavaScript", icon: <FaJsSquare /> },
  { name: "React", icon: <FaReact /> },
  { name: "GitHub", icon: <FaGithub /> },
  { name: "Photoshop", icon: <SiAdobephotoshop /> },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#1e1e2f] text-white font-sans">
      {/* Hero Section */}
      <section className="text-center py-16 px-6 md:px-20 bg-[#2c2c3e] animate-fadeIn">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Hello,<br />I Am <span className="text-yellow-400">Agung Sedayu</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          Informatics Students | UI UX Designer | Web Developer<br />
          1 Year Experience
        </p>

        <div className="mt-6">
          <img
            src="/images/profile.png"
            alt="Profile Agung Sedayu"
            className="mx-auto w-40 h-40 rounded-full border-4 border-yellow-500 shadow-md"
          />
        </div>

        <div className="mt-6 flex justify-center items-center gap-6 text-gray-300">
          <a href="#" className="hover:text-white" title="LinkedIn"><Linkedin /></a>
          <a href="#" className="hover:text-white" title="Instagram"><Instagram /></a>
          <a href="#" className="hover:text-white" title="GitHub"><Github /></a>
        </div>

        <div className="mt-4">
          <a
            href="/cv.pdf"
            className="inline-flex items-center gap-2 text-sm text-white border px-4 py-2 rounded-full hover:bg-white hover:text-black transition"
          >
            <Download className="w-4 h-4" />
            Download Curriculum Vitae
          </a>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-16 px-6 md:px-20 bg-[#343450] text-white">
        <h2 className="text-3xl font-bold text-center mb-6">About Me</h2>
        <blockquote className="text-center italic text-yellow-300 mb-4">
          "Teknologi hanyalah alat, positif atau negatif tergantung siapa yang menggunakannya"
        </blockquote>
        <p className="max-w-4xl mx-auto text-gray-300 leading-relaxed">
          Saya Mahasiswa teknik informatika, mampu bekerja secara individu maupun berkolaborasi dalam tim. Memiliki semangat tinggi, dan siap terhadap perkembangan teknologi serta tantangan industri yang terus berkembang. Telah mengikuti program Bangkit Academy 2024, dan memiliki minat besar dalam pengembangan front-end dan UI UX. Saya juga memiliki pengalaman sebagai Visual Officer di Gaya Pratama. Saya terbiasa menggunakan tools seperti Figma, Adobe, dan dibekali skill coding sederhana seperti HTML, CSS, JS, UI/UX, responsive web design, hingga penggunaan GitHub, dan tentunya aktif coding menggunakan tools seperti VS Code dan After Effect. Cek detailnya di bawah!
        </p>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-6 md:px-20 bg-[#1e1e2f] text-white">
        <h2 className="text-3xl font-bold text-center mb-12">Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center">
          {Skills.map((skill) => (
            <div
              key={skill.name}
              className="bg-[#2c2c3e] p-4 rounded-lg shadow-md hover:bg-yellow-500 hover:text-black transition-all flex flex-col items-center gap-2"
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
