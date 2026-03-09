import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import KeyNumbersSection from "@/components/home/KeyNumbersSection";
import AboutSection from "@/components/home/AboutSection";
import TakeTestSection from "@/components/home/TakeTestSection";
import TestExampleSection from "@/components/home/TextExampleSection";
import { fetchBillsServer, fetchPartiesServer } from "@/lib/api/server";

export const metadata: Metadata = {
    title: "Hvad skal jeg stemme? - Partitest baseret på Folketingsafstemninger",
    description:
        "Tag partitesten, baseret på hvordan partierne faktisk har stemt i Folketinget, og find ud af hvilket parti du er mest enig med.",
    openGraph: {
        title: "Hvad skal jeg stemme? - Partitest baseret på Folketingsafstemninger",
        description:
            "Tag partitesten, baseret på hvordan partierne faktisk har stemt i Folketinget, og find ud af hvilket parti du er mest enig med.",
        url: "https://hvadskaljegstemme.dk/",
    },
};

export default async function HomePage() {
    const [bills, parties] = await Promise.all([
        fetchBillsServer(),
        fetchPartiesServer(),
    ]);

    return (
        <div className="bg-white">
            <HeroSection />
            <KeyNumbersSection
                billCount={bills.length}
                partyCount={parties.length}
            />
            <AboutSection />
            <TestExampleSection />
            <TakeTestSection />
        </div>
    );
}
