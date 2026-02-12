import type React from "react";

export default function PageHeading({
    children,
    className,
}: Readonly<{
    children: React.ReactNode;
    className?: string;
}>) {
    return (
        <h1 className={`font-bold text-2xl ${className}`}>
            {children}
        </h1>
    )
}