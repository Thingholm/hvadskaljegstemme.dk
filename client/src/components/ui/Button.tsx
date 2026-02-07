import { Link } from "@tanstack/react-router";

const buttonVariants = {
    primary: "bg-blue-500 text-white text-sm px-3 py-1.5 rounded hover:bg-blue-600",
    secondary: "bg-gray-500 text-white text-sm px-3 py-1.5 rounded hover:bg-gray-600",
    text: "text-blue-500 underline text-sm px-3 py-1.5 rounded hover:text-blue-600 hover:bg-gray-100",
}

type ButtonBaseProps = {
    children: React.ReactNode; 
    variant?: keyof typeof buttonVariants;
    className?: string;
}

type ButtonAsLink = ButtonBaseProps & {
    to: string;
    onClick?: never;
}

type ButtonAsButton = ButtonBaseProps & {
    onClick: () => void;
    to?: never;
}

type ButtonProps = ButtonAsLink | ButtonAsButton;

export default function Button({ 
    children, 
    variant = "primary",
    to,
    onClick,
    className = "",
}: Readonly<ButtonProps>) {
    if (to) {
        return (
            <Link to={to} className={`${buttonVariants[variant]} ${className}`}>
                {children}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={`${buttonVariants[variant]} ${className}`}>
            {children}
        </button>
    );
}