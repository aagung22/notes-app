"use client"
import CardNotes from "@/components/my-components/CardNotes";
import React, { useEffect, useState } from "react";
import { Loader } from "lucide-react";

const AllNotesPage = () => {

    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [payload, setPayload] = useState({});

    const token = localStorage.getItem("token");

    const fetchNotes = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`);
            const data = await response.json();
            setNotes(data.data.notes);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
        if(token){
            try{
                const decoded = Jwt.decode(token);
                setPayload(decoded.userId)
            }catch (error) {
                console.log("token tidak valid : ", error);
            }
        }
    }, []);


    return (
        <div>
            <div className="container max-w-screen-lg mx-auto p-4">
                <h1 className="mt-6 text-4xl font-bold text-center text-purple-800 mb-10">All Notes</h1>

                {loading ? (
                    <div className="mt-20 flex flex-col justify-center items-center gap-4 text-center text-2xl text-gray-500">
                        <Loader size={32} className="animate-spin text-purple-800" />
                        <p>Loading List...</p>{" "}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
                        {notes.map((note) => {
                         return   <CardNotes key={note.id_notes} note={note} />
})}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AllNotesPage;