import Card from "@/components/Card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center">
      <div className="flex flex-col items-center gap-4 mt-20">
        <h1 className="text-center text-5xl md:text-6xl font-bold text-purple-600">
          Welcome to NotesApp
        </h1>
        <p className="text-slate-800 text-center text-lg italic">
          A simple and powerful note-taking app for your everyday thoughts.
        </p>
        <Button
          variant="outline"
          size="lg"
          className="border-purple-800 text-purple-800 hover:text-purple-800 hover:bg-blue-50"
        >
          Create New Notes
        </Button>
      </div>
      <div className="mt-16 w-full max-w-7xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            title={"Take Notes"}
            content={
              "Create and organize your notes with ease. Add title and content to each note."
            }
          />
          <Card
            title={"View Notes"}
            content={
              "Browse all your notes and find them easily whenever you need."
            }
          />
          <Card
            title={"Edit Notes"}
            content={
              "Update and modify your notes whenever needed with just a few clicks."
            }
          />
        </div>
      </div>
    </div>
  );
}