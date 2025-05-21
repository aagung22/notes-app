"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
// import { DialogEdit } from "./edit-dialog";
import { DialogDelete } from "@/components/my-components/DialogDelete"
import Link from "next/link";
import { SquarePen } from "lucide-react";

const CardNotes = ({ note, isowner }) => {

    return (
        <div className="bg-white min-h-[160px] border-2 border-black flex flex-col gap-4 justify-between rounded-lg shadow-md p-4 max-w-sm w-full">
            <div>
                <h3 className="text-xl font-semibold text-purple-800">{note.title}</h3>
                <p className="text-gray-600 mt-2 line-clamp-3">{note.content}</p>
            </div>

            <div className="text-sm text-gray-400">
                <p>Created at: {new Date(note.created_at).toLocaleString()}</p>
                <p>Updated at: {new Date(note.updated_at).toLocaleString()}</p>
            </div>

            {
                isowner ? (
            <div className="flex gap-1 self-end">
                <TooltipProvider>
                    <Tooltip>
                            <Link href={`/notes/${note.id_notes}/edit`}>
                                <TooltipTrigger className="w-[40px] h-[40px] bg-purple-800 hover:bg-purple-700 rounded-full flex items-center justify-center">
                                <SquarePen className="text-white" size={24} />
                        </TooltipTrigger>
                            </Link>
                        <TooltipContent>
                            <p>View & Edit Notes</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <DialogDelete note={note}/>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Delete Notes</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
                ) : (
                    <div></div>
                )
            }
        </div>
    );
};

export default CardNotes