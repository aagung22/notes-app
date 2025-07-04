"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DialogDelete } from "@/components/my-components/DialogDelete";
import Link from "next/link";

const CardNotes = ({ note, isOwner }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md text-white shadow-lg rounded-2xl p-6 flex flex-col gap-4 w-full max-w-sm border border-white/20 transition-all hover:shadow-2xl hover:scale-[1.01] duration-200 break-words">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <span className="bg-white/20 px-3 py-1 rounded-full text-xs text-white/80 font-medium truncate max-w-[60%]">
          {note.nm_lengkap}
        </span>
        {isOwner && (
          <div className="flex gap-2 shrink-0">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={`/notes/${note.id_notes}/edit`}
                    className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:brightness-110 transition"
                  >
                    <SquarePen size={18} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Edit Note</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <DialogDelete note={note} />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Delete Note</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>

      {/* Title & Content */}
      <div className="overflow-hidden">
        <h3 className="text-xl font-bold text-white break-words truncate">
          {note.title}
        </h3>
        <p className="mt-2 text-white/80 line-clamp-4 text-sm leading-relaxed break-words">
          {note.content}
        </p>
      </div>

      <div className="text-xs text-white/60 mt-auto flex flex-col gap-0.5 break-words">
        <p>
          <span className="font-medium">Created:</span>{" "}
          {new Date(note.created_at).toLocaleString()}
        </p>
        <p>
          <span className="font-medium">Updated:</span>{" "}
          {new Date(note.updated_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default CardNotes;
