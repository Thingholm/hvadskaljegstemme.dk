import { createFileRoute } from '@tanstack/react-router'
import Section from '../../components/layout/Section'
import SectionTitle from '../../components/ui/SectionTitle'
import AboutCard from '../../components/AboutCard'
import { Compass, ScrollText, Vote } from 'lucide-react'

export const Route = createFileRoute('/om-testen/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
        <Section className="py-6 flex flex-col gap-6 md:py-8 bg-white">
            <div className="grid gap-2">
                <SectionTitle>Om testen</SectionTitle>
                <p className="text-gray-600 text-sm">Vi har gennemgået samtlige afstemninger i Folketinget i seneste valgperiode for at lave en partitest, der bygger på, hvordan partierne har stemt i Folketingssalen, og ikke hvad de lover under en valgkamp.</p>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
                <AboutCard
                    icon={<ScrollText size={28}/>}
                    heading="Rigtige lovforslag"
                    text="Alle spørgsmål i testen baserer sig på en afstemning om et lovforslag, der har været til afstemning i Folketingssalen, som der tilmed linkes til under spørgsmålet."
                />
                <AboutCard
                    icon={<Vote size={28}/>}
                    heading="Rigtige partstemmer"
                    text="Partiernes stemmer, som resultatet udregnes ud fra, er deres faktisk afgivne stemmer i Folketingssalen. Derfor er partier, som ikke har siddet i Folketinget hele valgperioden ikke med i testen."
                />
                <AboutCard
                    icon={<Compass size={28}/>}
                    heading="Brug kun vejledende"
                    text="Brug kun testen vejledende. Forhold kan have ændret sig siden afstemningerne, partier kan have skiftet mening og små detaljer, der ikke umiddelbart fremgår i spørgsmålet eller beskrivelsen, kan have påvirket partiernes stemmer."
                />
                <AboutCard
                    icon={<ScrollText size={28}/>}
                    heading="Rigtige lovforslag"
                    text="Alle spørgsmål i testen baserer sig på en afstemning om et lovforslag, der har været til afstemning i Folketingssalen, som der tilmed linkes til under spørgsmålet."
                />
                <AboutCard
                    icon={<Vote size={28}/>}
                    heading="Rigtige partstemmer"
                    text="Partiernes stemmer, som resultatet udregnes ud fra, er deres faktisk afgivne stemmer i Folketingssalen. Derfor er partier, som ikke har siddet i Folketinget hele valgperioden ikke med i testen."
                />
                <AboutCard
                    icon={<Compass size={28}/>}
                    heading="Brug kun vejledende"
                    text="Brug kun testen vejledende. Forhold kan have ændret sig siden afstemningerne, partier kan have skiftet mening og små detaljer, der ikke umiddelbart fremgår i spørgsmålet eller beskrivelsen, kan have påvirket partiernes stemmer."
                />
            </div>
        </Section>
    )
}
