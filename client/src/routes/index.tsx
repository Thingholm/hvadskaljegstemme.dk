import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "../components/home/HeroSection";
import KeyNumbersSection from "../components/home/KeyNumbersSection";
import AboutSection from "../components/home/AboutSection";
import TakeTestSection from "../components/home/TakeTestSection";
import TestExampleSection from "../components/home/TextExampleSection";

export const Route = createFileRoute("/")( {
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