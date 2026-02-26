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
            <p className="text-gray-600 text-center xl:max-w-5xl xl:mx-auto text-pretty">Partitesten til folketingsvalget, hvor du svarer på rigtige lov- og beslutningsforslag, politikerne har stemt om i Folketinget i seneste valgperiode. Tag testen og find ud af hvilke partiers handlinger, du er mest enig med.</p>
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