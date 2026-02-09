import { Link } from "@tanstack/react-router";

const baseStyle = "text-sm px-3 py-1.5 rounded flex items-center justify-center w-fit gap-1 hover:cursor-pointer transition-colors duration-300 select-none";

const buttonVariants = {
    primary: "bg-blue-500 text-white rounded hover:bg-blue-600",
    secondary: "bg-gray-200 rounded hover:bg-gray-300",
    text: "text-blue-500 underline rounded hover:text-blue-600 hover:bg-gray-100",
    mobileText: "text-blue-500 rounded px-0! hover:underline",
}

export default function Button({ 
    children, 
    variant = "primary",
    to,
    onClick,
    className = "",
    target,
    disabled = false,
}: Readonly<{
    children: React.ReactNode; 
    variant?: keyof typeof buttonVariants;
    className?: string;
    to?: string;
    onClick?: () => void;
    target?: "_blank" | "_self" | "_parent" | "_top";
    disabled?: boolean;
}>) {
    if (to) {
        return (
            <Link 
                to={to} 
                target={target}
                onClick={onClick}
                className={`${baseStyle} ${buttonVariants[variant]} ${className} ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
            >
                {children}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={`${baseStyle} ${buttonVariants[variant]} ${className} ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`} disabled={disabled}>
            {children}
        </button>
    );
}