"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import Link from "next/link";
import Image from "next/image";

function readHasResults(): boolean {
    try {
        const stored = window.localStorage.getItem("submittedAnswers");
        if (!stored) return false;
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) && parsed.length > 0;
    } catch {
        return false;
    }
}

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [hasResults, setHasResults] = useState(false);

    useEffect(() => {
        setHasResults(readHasResults());

        const handleStorage = () => setHasResults(readHasResults());

        window.addEventListener("storage", handleStorage);
        window.addEventListener("local-storage:submittedAnswers", handleStorage);
        return () => {
            window.removeEventListener("storage", handleStorage);
            window.removeEventListener("local-storage:submittedAnswers", handleStorage);
        };
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const menuItems = [
        { name: "Partiernes stemmer", path: "/partiernes-stemmer" },
        { name: "Om testen", path: "/om-testen" },
    ];

    if (hasResults) {
        menuItems.push({ name: "Se resultat", path: "/resultat" });
    }

    return (
        <header className="fixed w-full z-50">
            <div className="bg-white shadow-sm relative flex justify-between items-center h-12 px-4 md:px-16 lg:px-32 z-20">
                <Link
                    href="/"
                    onClick={closeMenu}
                    className="text-lg font-bold flex items-center gap-1.5"
                >
                    <Image
                        src="/logo.svg?v2"
                        alt="Hvad skal jeg stemme?"
                        width={18}
                        height={18}
                        className="h-4.5 w-4.5"
                    />
                    <span>Hvad skal jeg stemme?</span>
                </Link>

                <div className="flex items-center md:hidden">
                    <button onClick={toggleMenu}>
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>

                <nav className="hidden items-center text-sm md:flex md:gap-3 lg:gap-8">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className="block hover:text-blue-500 duration-300"
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Button to="/tag-testen">Tag testen</Button>
                </nav>
            </div>

            <div
                className={`${isOpen ? "opacity-50 pointer-events-auto" : "opacity-0 pointer-events-none"} md:hidden fixed inset-0 top-12 bg-black duration-150 z-10`}
                onClick={closeMenu}
            />

            <nav
                className={`${isOpen ? "translate-x-0" : "translate-x-full"} absolute md:hidden top-12 right-0 bg-white shadow-lg h-screen duration-300 z-10`}
            >
                <ul className="py-2 text-end flex flex-col items-end gap-4 px-4">
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                href={item.path}
                                className="block"
                                onClick={closeMenu}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Button to="/tag-testen" onClick={closeMenu}>
                            Tag testen
                        </Button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
