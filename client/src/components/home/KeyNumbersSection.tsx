import Section from "../layout/Section";

function KeyNumberBlock({
    label,
    value
}: Readonly<{
    label: string;
    value: number | string;
}>) {
    return (
        <div className="flex flex-col items-center gap-1">
            <p className="font-bold text-3xl text-blue-600">{value}</p>
            <p className="uppercase text-gray-500 text-sm font-semibold">{label}</p>
        </div>
    )
}

export default function KeyNumbersSection({
    answersCount,
    billCount,
    partyCount
}: Readonly<{
    answersCount: number;
    billCount: number;
    partyCount: number;
}>) {
    return (
        <Section className="bg-gray-100 py-6 md:py-8">
            <div className="grid grid-cols-2 gap-y-8 md:grid-cols-4 xl:max-w-5xl xl:mx-auto">
                <KeyNumberBlock label="Har taget testen" value={answersCount}/>
                <KeyNumberBlock label="Spørgsmål" value={billCount}/>
                <KeyNumberBlock label="Partier" value={partyCount}/>
                <KeyNumberBlock label="Transparens" value={"100%"}/>
            </div>
        </Section>
    )
}   