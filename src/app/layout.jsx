import Footer from "@/components/footer";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "NotesApp - Agung",
  description: "Aplikasi Notes Sedeherna",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={"antialiased flex flex-col min-h-screen bg-gray-50 text-gray-800"}>
        <Navbar />
        <main className="flex-grow p-4 py-6">{children}</main>
        <Footer />
        <Toaster/>
      </body>
    </html>
  );
}
