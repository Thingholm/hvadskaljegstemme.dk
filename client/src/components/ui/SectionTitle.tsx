export default function SectionTitle({
    className,
    children,
}: Readonly<{
    className?: string;
    children: React.ReactNode;
}>) {
    return (
        <h2 className={`text-xl lg:text-2xl font-semibold ${className}`}>{children}</h2>
    )
}