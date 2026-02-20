import Section from "../layout/Section";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

export default function HeroSection() {
    return (
        <Section className="flex flex-col gap-6 lg:gap-8 items-center py-8 md:py-16 pb-10">
            <Badge>Folketingsvalg 2026</Badge>
            <h1 className="uppercase text-3xl lg:text-4xl 2xl:text-5xl font-bold text-center font-heading text-pretty">
                Stem efter politikernes <span className="italic font-semibold md:font-bold md:not-italic">handlinger</span><span className="md:hidden">, </span>
                <br className="hidden md:block"/>
                Ikke efter deres <span className="italic font-semibold  md:font-bold md:not-italic">løfter</span>
            </h1>
            <p className="text-gray-600 text-center xl:max-w-5xl xl:mx-auto text-pretty">
                <span className="md:hidden">Svar på de XX spørgsmål, og find ud af hvor enig du er med partiernes handlinger i den seneste valgperiode.</span>
                <span className="hidden md:block">Svar på de XX spørgsmål, baseret på afstemninger om lov- og beslutningsforslag i Folketinget, og find ud af hvor enig du er med partiernes handlinger i den seneste valgperiode.</span>
            </p>
            <div className="flex flex-col gap-3 w-full md:flex-row md:justify-center">
                <Button to="/tag-testen" className="w-full text-base! py-2 md:w-fit md:text-sm! md:py-1.5">
                    Tag testen her
                </Button>
                <Button variant="secondary" to="/partiernes-stemmer" className="w-full text-base! py-2 md:w-fit md:text-sm! md:py-1.5">
                    Sådan har partierne stemt
                </Button>
            </div>
        </Section>
    )
}