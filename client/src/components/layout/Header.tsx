import { Menu, X } from "lucide-react";
import { useState } from "react";
import Button from "../ui/Button";
import { Link } from "@tanstack/react-router";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const menuItems = [
        { name: "Partiernes svar", path: "/partiernes-svar" },
        { name: "Mit resultat", path: "/resultat" },
        { name: "Om testen", path: "/om-testen" },
    ]

    return (
        <header className="fixed w-full z-50">
            <div className="bg-white shadow-sm relative flex justify-between items-center h-12 px-4 md:px-16 lg:px-32 z-20">
                <Link
                    to="/" 
                    onClick={closeMenu}
                    className="text-lg font-bold"
                >
                    Hvad skal jeg stemme
                </Link>

                <div className="flex items-center md:hidden">
                    <button onClick={toggleMenu}>
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>

                <nav className="hidden items-center md:flex md:gap-4 lg:gap-8">
                    {menuItems.map((item) => (
                        <Link key={item.path} to={item.path} className="block hover:text-blue-500 duration-300">
                            {item.name}
                        </Link>
                    ))}
                    <Button to="/tag-testen">
                        Tag testen
                    </Button>
                </nav>
            </div>

            <div className={`${isOpen ? "opacity-50 pointer-events-auto" : "opacity-0 pointer-events-none"} md:hidden fixed inset-0 top-12 bg-black duration-150 z-10`} onClick={closeMenu} />

            <nav className={`${isOpen ? "translate-x-0" : "translate-x-full"} absolute md:hidden top-12 right-0 bg-white shadow-lg h-screen duration-300 z-10`}>
                <ul className="py-2 text-end flex flex-col gap-4 px-4">
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path} 
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
    )
}