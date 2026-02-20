import Section from "../layout/Section";
import Button from "../ui/Button";

export default function TakeTestSection() {
    return (
        <Section className="py-6">
            <div className="bg-blue-500 rounded-xl text-white flex flex-col items-center gap-4 p-6 text-center text-pretty">
                <h2 className="text-xl font-semibold">Find ud af, hvem du er mest enig med</h2>
                <p>Tag testen og find ud af, hvilket partis handlinger i valgperioden 2022-2026, du er mest enig med.</p>
                <Button variant="white" to="/tag-testen" className="w-full">Tag testen her</Button>
            </div>
        </Section>
    )
}