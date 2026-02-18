import Section from "../layout/Section";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

export default function HeroSection() {
    return (
        <Section className="flex flex-col gap-6 items-center py-8 pb-10">
            <Badge>Folketingsvalg 2026</Badge>
            <h1 className="uppercase text-3xl font-bold text-center font-heading text-pretty">
                <span>Stem efter politikernes <span className="italic font-semibold">handlinger</span><span>, </span></span>
                <br className="hidden"/>
                <span>Ikke efter deres <span className="italic font-semibold">løfter</span></span>
            </h1>
            <p className="text-gray-600 text-center text-pretty">Svar på de XX spørgsmål, og find ud af hvor enig du er med partiernes handlinger i den seneste valgperiode.</p>
            <div className="grid gap-3 w-full">
                <Button to="/tag-testen" className="w-full text-base! py-2">
                    Tag testen her
                </Button>
                <Button variant="secondary" to="om-testen" className="w-full text-base! py-2">
                    Læs mere om testen
                </Button>
            </div>
        </Section>
    )
}