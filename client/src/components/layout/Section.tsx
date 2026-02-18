export default function Section({
    className,
    children,
    isSingleSectionPage = false,
}: Readonly<{
    className?: string;
    children?: React.ReactNode | React.ReactNode[];
    isSingleSectionPage?: boolean;
}>) {
    return (
        <section className={`p-4 md:px-16 lg:px-32 ${isSingleSectionPage ? "min-h-[calc(100dvh-3rem)]" : ""} ${className}`}>
            {children}
        </section>
    )
}