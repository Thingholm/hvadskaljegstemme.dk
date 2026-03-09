import Section from "../layout/Section";

function KeyNumberBlock({
    label,
    value,
    fallbackValue,
}: Readonly<{
    label: string;
    value?: number | string;
    fallbackValue?: string;
}>) {
    return (
        <div className="flex flex-col items-center gap-1">
            <p className="font-bold text-3xl text-blue-600">
                {value ?? fallbackValue}
            </p>
            <p className="uppercase text-gray-500 text-sm font-semibold">
                {label}
            </p>
        </div>
    );
}

export default function KeyNumbersSection({
    billCount,
    partyCount,
}: Readonly<{
    billCount?: number;
    partyCount?: number;
}>) {
    return (
        <Section className="bg-gray-100 py-6 md:py-8">
            <div className="grid grid-cols-3 gap-y-8 md:grid-cols-3 xl:max-w-5xl xl:mx-auto">
                <KeyNumberBlock
                    label="Forslag"
                    value={billCount}
                    fallbackValue="27"
                />
                <KeyNumberBlock
                    label="Partier"
                    value={partyCount}
                    fallbackValue="11"
                />
                <KeyNumberBlock label="Gennemsigtigt" value={"100%"} />
            </div>
        </Section>
    );
}
