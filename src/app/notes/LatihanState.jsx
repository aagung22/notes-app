"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const NotesPage = () => {

    const [data, setData] = useState("")
    const [input, setInput] = useState("")

    const handleClick = (data) =>{
        if (!data.trim()) return alert("Input tidak boleh kosong!")
        setData(data)
        setInput("")
    }


    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">
                Notes Page
            </h1>

            <p className="text-xl font-medium text-gray-600 mb-6">
                Isi State : {""}
                <span className="font-semibold text-black">{data || "(belum ada data)"}</span>
            </p>
            <Card className=" border-black mt-10 rounded-lg bg-slate-100">
                <CardHeader>
                    <CardTitle className="text-2xl">Menampilkan State</CardTitle>
                    <CardDescription className="text-lg text-gray-600">Inputkan Data di bawah ini untuk menampilkannya ke dalam State</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Label htmlFor="dataInput" className="text-xl">Masukkan Data yang di input</Label>
                    <Input 
                    id="dataInput"
                    value={input}
                    autoFocus
                    onChange={(e) => setInput(e.target.value) }></Input>
                </CardContent>
                <CardFooter className="flex gap-4">
                <Button onClick={() => handleClick(input)} variant="outline" className="text-base">
                Masukkan Data
            </Button>

            <Button onClick={() => setData("")} variant="outline" className="text-base">
                Clear Data
            </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default NotesPage;