import Section from "./Section";

export default function CardSection({
    children,
    className
}: Readonly<{
    children?: React.ReactNode | React.ReactNode[];
    className?: string;
}>) {
    return (
        <Section className='md:bg-gray-100' isSingleSectionPage>
            <div className={`grid gap-2 md:gap-4 md:bg-white md:rounded-lg md:shadow md:p-10 xl:max-w-5xl xl:mx-auto ${className}`}>
                {children}
            </div>
        </Section>
    )
}