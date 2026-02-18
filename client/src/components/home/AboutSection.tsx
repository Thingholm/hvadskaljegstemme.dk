import type React from "react";
import Section from "../layout/Section";
import { Compass, ScrollText, Vote } from "lucide-react";
import Button from "../ui/Button";

function AboutCard({
    icon,
    heading,
    text,
}: Readonly<{
    icon: React.ReactNode;
    heading: string;
    text: string;
}>) {
    return (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 grid gap-2">
            <div className="bg-blue-100 text-blue-800 rounded-md w-fit p-1.5">{icon}</div>
            <h5 className="font-semibold">{heading}</h5>
            <p className="text-gray-600">{text}</p>
        </div>
    )
}

export default function AboutSection() {
    return (
        <Section className="py-6 grid gap-6">
            <div className="grid gap-2 text-center">
                <h2 className="text-xl font-semibold">Om testen</h2>
                <p className="text-gray-600">Vi har gennemgået samtlige afstemninger i Folketinget i seneste valgperiode for at lave en partitest, der bygger på, hvordan partierne har stemt i Folketingssalen, og ikke hvad de lover under en valgkamp.</p>
            </div>
            <div className="grid gap-4">
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
            <Button variant="text" to="/om-testen" className="w-full text-gray-600">Læs mere om testen...</Button>
        </Section>
    )
}