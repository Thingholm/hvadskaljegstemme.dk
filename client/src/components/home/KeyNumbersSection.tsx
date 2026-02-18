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
        <Section className="bg-gray-100 grid grid-cols-2 gap-y-8 py-6">
            <KeyNumberBlock label="Har taget testen" value={answersCount}/>
            <KeyNumberBlock label="Spørgsmål" value={billCount}/>
            <KeyNumberBlock label="Partier" value={partyCount}/>
            <KeyNumberBlock label="Transparens" value={"100%"}/>
        </Section>
    )
}   