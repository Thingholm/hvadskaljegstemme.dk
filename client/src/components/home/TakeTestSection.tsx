import Section from "../layout/Section";
import Button from "../ui/Button";
import SectionTitle from "../ui/SectionTitle";

export default function TakeTestSection() {
    return (
        <Section className="py-6 md:py-8">
            <div className="bg-blue-500 rounded-xl text-white flex flex-col items-center gap-4 md:gap-6 p-6 md:p-10 text-center text-pretty">
                <SectionTitle>Find ud af, hvem du er mest enig med</SectionTitle>
                <p className="xl:max-w-5xl xl:mx-auto text-pretty">Tag testen og find ud af, hvilket partis handlinger i valgperioden 2022-2026, du er mest enig med.</p>
                <Button variant="white" to="/tag-testen" className="w-full md:w-fit md:px-10">Tag testen her</Button>
            </div>
        </Section>
    )
}