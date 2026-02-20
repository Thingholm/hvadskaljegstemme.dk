export default function Section({
    className,
    children,
}: Readonly<{
    className?: string;
    children?: React.ReactNode | React.ReactNode[];
}>) {
    return (
        <section className={`p-4 md:px-16 lg:px-32 ${className}`}>
            {children}
        </section>
    )
}