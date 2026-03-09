"use client";

import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import type { Bill } from "../../lib/types/bill";
import Section from "../layout/Section";
import TestProgress from "../test/TestProgress";
import TestQuestionDialog from "../test/TestQuestionDialog";
import Button from "../ui/Button";
import TestAnswerButton from "../test/TestAnswerButton";
import { useState } from "react";
import type { Vote } from "../../lib/types/vote";
import SectionTitle from "../ui/SectionTitle";
import Badge from "../ui/Badge";

const exampleBill: Bill = {
    id: 1,
    billTag: "L 13",
    title: "Forslag til lov om konsekvenser ved afskaffelsen af store bededag som helligdag.",
    question: "Det var den rigtige beslutning at afskaffe store bededag",
    description:
        "Lovforslaget gik ud på at afskaffe store bededag som helligdag og gøre dagen til en almindelig arbejdsdag. Lønmodtagere kompenseres økonomisk for den ekstra arbejdsdag. Formålet var at øge arbejdsudbuddet.",
    forExplanation:
        "Det gav flere arbejdstimer og penge til velfærd og forsvar. Danmark har brug for flere hænder på arbejdsmarkedet.",
    againstExplanation:
        "Det fjernede en vigtig fridag for mange danskere. Tradition og fritid blev ofret for økonomi.",
    url: "https://www.ft.dk/samling/20222/lovforslag/L13/index.htm",
    votedAt: "2023-02-28",
    isPassed: true,
    billType: "Lovforslag",
    partyVotes: [],
};

export default function TestExampleSection() {
    const [showDialog, setShowDialog] = useState(false);
    const [userAnswer, setUserAnswer] = useState<Vote | null>(null);

    const handleUserAnswer = (vote: Vote) => {
        setUserAnswer(vote);
    };

    return (
        <Section className="bg-gray-100 grid gap-6 py-6 md:py-8">
            <div className="text-center grid gap-2">
                <SectionTitle>Sådan fungerer det</SectionTitle>
                <p className="text-gray-600 xl:max-w-5xl xl:mx-auto text-pretty">
                    For at læse mere om forslaget og argumenter for og imod, kan
                    du klikke på{" "}
                    <span className="italic">Se mere om forslaget</span>. Hvis
                    forslaget springes over, medregnes det ikke i resultatet og
                    er derfor ikke det samme som{" "}
                    <span className="italic">hverken/eller</span>.
                </p>
            </div>
            <div className="rounded-xl border border-gray-200 md:border-hidden overflow-hidden">
                <div>
                    <div className="px-4 md:px-0 pt-3 2xl:pt-12 pb-4 bg-gray-100 md:bg-auto xl:max-w-5xl xl:mx-auto">
                        <TestProgress currentProgress={12} totalProgress={27} />
                    </div>
                    <div className="flex flex-col gap-4 bg-white p-4 md:p-8 border-t border-gray-200 md:border-none md:rounded-xl md:shadow-md items-center xl:max-w-5xl xl:mx-auto xl:pt-10">
                        <Badge className="capitalize">
                            {exampleBill.billType}
                            {exampleBill.isPassed ? " - Vedtaget" : ""}
                        </Badge>
                        <h2 className="text-xl md:text-2xl text-pretty font-bold text-center">
                            {exampleBill.question}
                        </h2>
                        <Button
                            variant="mobileText"
                            onClick={() => setShowDialog(true)}
                            className="md:w-fit"
                        >
                            <Info size={16} />
                            Se mere om spørgsmålet
                        </Button>
                        <div className="flex flex-col w-full md:w-fit md:flex-row gap-4 lg:gap-6 mt-2">
                            <TestAnswerButton
                                answer="for"
                                onClick={() => handleUserAnswer("for")}
                                isAnswered={userAnswer === "for"}
                            />
                            <TestAnswerButton
                                answer="neither"
                                onClick={() => handleUserAnswer("neither")}
                                isAnswered={userAnswer === "neither"}
                            />
                            <TestAnswerButton
                                answer="against"
                                onClick={() => handleUserAnswer("against")}
                                isAnswered={userAnswer === "against"}
                            />
                        </div>
                        <Button
                            variant="mobileText"
                            className="text-gray-500 w-full md:hidden"
                            onClick={() => null}
                        >
                            Spring forslaget over
                        </Button>
                        <div className="hidden md:grid grid-cols-3 w-[calc(100%-2rem)] justify-between py-4 lg:pt-6 mt-8 border-t border-gray-200 ">
                            <Button
                                variant="secondary"
                                onClick={() => null}
                                className="pr-6"
                            >
                                <ChevronLeft size={20} />
                                Tilbage
                            </Button>
                            <Button
                                variant="mobileText"
                                className="text-gray-500 justify-self-center"
                                onClick={() => null}
                            >
                                Spring forslaget over
                            </Button>
                            <Button
                                onClick={() => null}
                                className="pl-6 justify-self-end"
                            >
                                Næste
                                <ChevronRight size={20} />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between px-4 py-4 border-t border-gray-200 md:hidden">
                    <Button
                        variant="secondary"
                        onClick={() => null}
                        className="pr-6"
                    >
                        <ChevronLeft size={20} />
                        Tilbage
                    </Button>
                    <Button onClick={() => null} className="pl-6">
                        Næste
                        <ChevronRight size={20} />
                    </Button>
                </div>
                {showDialog && (
                    <TestQuestionDialog
                        bill={exampleBill}
                        closeDialog={() => setShowDialog(false)}
                    />
                )}
            </div>
        </Section>
    );
}
