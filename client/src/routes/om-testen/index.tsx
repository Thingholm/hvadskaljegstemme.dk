import { createFileRoute } from '@tanstack/react-router'
import Section from '../../components/layout/Section'
import AboutCard from '../../components/AboutCard'
import { Compass, Scale, ScrollText, Search, ShieldCheck, Vote } from 'lucide-react'
import PageHeading from '../../components/ui/PageHeading'

export const Route = createFileRoute('/om-testen/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
        <Section className="py-6 flex flex-col gap-6 md:py-8 bg-white">
            <div className="grid gap-2">
                <PageHeading>Om testen</PageHeading>
                <p className="text-gray-600 text-sm">Vi har gennemgået samtlige afstemninger i Folketinget i seneste valgperiode for at lave en partitest, der bygger på, hvordan partierne har stemt i Folketingssalen, og ikke hvad de lover under en valgkamp.</p>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
                <AboutCard
                    icon={<Scale size={28}/>}
                    heading="Beregning"
                    text="Enighed med et parti om et forslag udregnes som 1 point for samme svar, 0,5 point for enten brugeren eller partiet har svaret hverken/eller, men ikke den anden, og 0 point ved modsat svar. Ved at springe et spørgsmål over fjernes forslaget helt i udregningen af enighedsprocenten med partierne."
                />
                <AboutCard
                    icon={<ScrollText size={28}/>}
                    heading="Rigtige lov- og beslutningsforslag"
                    text="Alle spørgsmål i testen baserer sig på en afstemning om et lov- eller beslutningsforslag, der har været til afstemning i Folketingssalen, som der linkes til i testen."
                />
                <AboutCard
                    icon={<Vote size={28}/>}
                    heading="Rigtige partstemmer"
                    text="Partiernes stemmer, som resultatet udregnes ud fra, er deres faktisk afgivne stemmer i Folketingssalen. Derfor er partier, som ikke har været repræsenteret i Folketinget hele valgperioden, som Nye Borgerlige og Borgernes Parti, ikke med i testen."
                />
                <AboutCard
                    icon={<Compass size={28}/>}
                    heading="Brug kun vejledende"
                    text="Brug kun testen vejledende og supplerende. Forhold kan have ændret sig siden afstemningerne, partier kan have skiftet mening og enkelte detaljer kan have påvirket partiernes stemmer."
                />
                <AboutCard
                    icon={<Search size={28}/>}
                    heading="Fuld gennemsigtighed"
                    text="Alle afstemninger, partiernes stemmer og metodikken bag testen er offentligt tilgængelige. Du kan selv gå ind og tjekke enhver afstemning direkte på Folketingets hjemmeside via links i testen og derudover er koden for testen offentlig tilgængelig på Github."
                />
                <AboutCard
                    icon={<ShieldCheck size={28}/>}
                    heading="100% anonymt"
                    text="Dine svar er fuldstændig anonyme. Der indsamles INGEN personlige oplysninger. Når du tager testen indsendes svaret med et tilfældigt uidentificerbart nummer til intern statistik, hvor kun antallet af brugere, der har gennemført testen bruges."
                />
            </div>
        </Section>
    )
}
