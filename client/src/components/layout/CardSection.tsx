export default function CardSection({
    children,
    className
}: Readonly<{
    children?: React.ReactNode | React.ReactNode[];
    className?: string;
}>) {
    return (
        <div className='flex-1 min-h-[calc(100dvh-3rem)] p-4 md:px-16 lg:px-32 md:bg-gray-100'>
            <div className={`grid gap-2 md:gap-4 md:bg-white md:rounded-lg md:shadow md:p-10 xl:max-w-5xl xl:mx-auto ${className}`}>
                {children}
            </div>
        </div>
    )
}