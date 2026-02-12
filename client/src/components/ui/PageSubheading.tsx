import type React from "react";

export default function PageSubheading({
    children,
    className,
}: Readonly<{
    children: React.ReactNode;
    className?: string;
}>) {
    return (
        <p className={`className='text-sm text-gray-500' ${className}`}>
            {children}
        </p>
    )
}