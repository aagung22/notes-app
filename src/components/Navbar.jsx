"use client"
import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

const Navbar = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href="/login"
    }

    console.log(token);
    return (
        <div className="bg-purple-700">
            <div className="mx-auto max-w-screen-lg p-4">
                <div className="flex justify-between items-center w-full">
                    <h1 className="text-white font-semibold text-2xl">NotesApp</h1>
                    <nav>
                        <ul className="flex gap-5 items-center">
                            <li className="text-white font-medium text-md">
                                <Link href={"/"}>Home Page</Link>
                            </li>
                            <li className="text-white font-medium text-md">
                                <Link href={"/notes"}>List Notes</Link>
                            </li>
                            <li className="text-white font-medium text-md">
                                <Link href={"notes/create"}>New Notes</Link>
                            </li>

                            {isLoggedIn ? (
                                <li className="text-white font-medium text-md">
                                    <Button onClick={handleLogout} className="bg-black hover:bg-black-600">Log out</Button>
                                </li>
                            ) : (
                                <div className="flex gap-4">
                                    <li className="text-white font-medium text-md">
                                        <Button className="bg-black hover:bg-black-600"><Link href={"/login"}>Login</Link></Button>
                                    </li>
                                    <li className="text-white font-medium text-md">
                                        <Button className="bg-black hover:bg-black-600"><Link href={"/register"}>Register</Link></Button>
                                    </li>
                                </div>
                            )};
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Navbar;