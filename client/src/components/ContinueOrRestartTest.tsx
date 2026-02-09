import { useNavigate } from "@tanstack/react-router";
import type { Vote } from "../lib/types/vote";
import Button from "./ui/Button";

const restartContent = {
    hasAnswered: {
        title: "Vil du se dine resultater eller starte forfra?",
        description: "Du har allerede taget testen. Vil du tage testen igen eller se dine resultater?",
    },
    unfinished: {
        title: "Vil du fortsætte, hvor du slap eller starte forfra?",
        description: "Du har ikke besvaret alle spørgsmål i testen. Vil du fortsætte hvor du slap, eller starte forfra?",
    }
}
export default function ContinueOrRestartTest({
    hasAnswered,
    setHasAnswered,
    unfinishedTest,
    setUnfinishedTest,
    setUserAnswers,
}: Readonly<{
    hasAnswered: boolean;
    setHasAnswered: (hasAnswered: boolean) => void;
    unfinishedTest: boolean;
    setUnfinishedTest: (unfinishedTest: boolean) => void;
    setUserAnswers: (answers: Record<number, Vote>) => void;
}>) {
    const navigate = useNavigate();

    const state = hasAnswered ? "hasAnswered" : "unfinished";

    const handleSeeResultsClick = () => {
        navigate({ to: '/resultat/' });
    }

    const handleRestartClick = () => {
        setUserAnswers([]);
        setHasAnswered(false);
        setUnfinishedTest(false);
    }

    const handleContinueClick = () => {
        setHasAnswered(false);
        setUnfinishedTest(false);
    }

    return (
        <div className="min-h-[calc(100dvh-3rem)] md:bg-gray-100 md:pt-8">
            <div className="p-4 grid gap-4 md:bg-white md:shadow md:p-8 md:mx-16 lg:mx-32 md:rounded-xl md:items-center xl:max-w-5xl xl:mx-auto">
                <h2 className="text-2xl font-bold">{restartContent[state].title}</h2>
                <p className="text-gray-600">{restartContent[state].description}</p>
                <div className="flex flex-col gap-2 md:flex-row-reverse">
                    {hasAnswered && (
                        <Button onClick={handleSeeResultsClick} variant="primary" className="w-full">
                            Se mit resultat
                        </Button>
                    )}
                    {unfinishedTest && (
                        <Button onClick={handleContinueClick} variant={hasAnswered ?"secondary" : "primary"} className="w-full">
                            Fortsæt hvor jeg slap
                        </Button>
                    )}
                    <Button onClick={handleRestartClick} variant="secondary" className="w-full">
                        Start forfra
                    </Button>

                </div>
            </div>
        </div>
    )
}