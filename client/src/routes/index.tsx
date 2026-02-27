import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "../components/home/HeroSection";
import KeyNumbersSection from "../components/home/KeyNumbersSection";
import AboutSection from "../components/home/AboutSection";
import TakeTestSection from "../components/home/TakeTestSection";
import TestExampleSection from "../components/home/TextExampleSection";

export const Route = createFileRoute("/")( {
    head: () => ({
        meta: [
            { title: 'Hvad skal jeg stemme? - Partitest baseret på Folketingsafstemninger' },
            { name: 'description', content: 'Tag partitesten, baseret på hvordan partierne faktisk har stemt i Folketinget, og find ud af hvilket parti du er mest enig med.' },
            { property: 'og:title', content: 'Hvad skal jeg stemme? - Partitest baseret på Folketingsafstemninger' },
            { property: 'og:description', content: 'Tag partitesten, baseret på hvordan partierne faktisk har stemt i Folketinget, og find ud af hvilket parti du er mest enig med.' },
            { property: 'og:url', content: 'https://hvadskaljegstemme.dk/' },
        ],
        links: [{ rel: 'canonical', href: 'https://hvadskaljegstemme.dk/' }]
    }),
    component: HomePage,
})

function HomePage() {
    return (
        <div className="bg-white">
            <HeroSection />
            <KeyNumbersSection />
            <AboutSection />
            <TestExampleSection />
            <TakeTestSection />
        </div>
    );
}