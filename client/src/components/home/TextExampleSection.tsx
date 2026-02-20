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

const exampleBill: Bill = {
    id: 1,
    billTag: "L 42",
    title: "Forslag til lov om ændring af skatteloven",
    question: "Skal der indføres en ny grøn afgift på dieselbiler?",
    description: "Dette lovforslag vedrører indførelse af en progressiv afgift på dieselbiler for at fremme grøn omstilling og reducere CO2-udledning fra transportsektoren.",
    forExplanation: "En grøn afgift vil accelerere overgangen til elbiler, reducere luftforurening i byerne og hjælpe Danmark med at nå klimamålene for 2030.",
    againstExplanation: "Afgiften vil ramme håndværkere og landdistrikter uforholdsmæssigt hårdt, hvor dieselbiler er nødvendige, og vil udgøre en økonomisk byrde for almindelige familier.",
    url: "https://www.ft.dk/forslag/L42",
    voteDate: "2024-03-15",
    isPassed: true,
    partyVotes: []
}

export default function TestExampleSection() {
    const [showDialog, setShowDialog] = useState(false);
    const [userAnswer, setUserAnswer] = useState<Vote | null>(null);

    const handleUserAnswer = (vote: Vote) => {
        setUserAnswer(vote);
    }
    
    return (
        <Section className="bg-gray-100 grid gap-6 py-6 md:py-8">
            <div className="text-center grid gap-2">
                <SectionTitle>Sådan fungerer det</SectionTitle>
                <p className="text-gray-600 xl:max-w-5xl xl:mx-auto text-pretty">For at læse mere om spørgsmålet og argumenter for og imod, kan du klikke på <span className="italic">Se mere om spørgsmålet</span>. Hvis spørgsmålet springes over, medregnes det ikke i resultatet og er derfor ikke det samme som <span  className="italic">hverken eller</span>.</p>
            </div>
            <div className="rounded-xl border border-gray-200 md:border-hidden overflow-hidden">
                <div>
                    <div className="px-4 md:px-0 pt-3 2xl:pt-12 pb-4 bg-gray-100 md:bg-auto xl:max-w-5xl xl:mx-auto">
                        <TestProgress currentProgress={12} totalProgress={28} />
                    </div>
                    <div className="flex flex-col gap-4 bg-white p-4 md:p-8 border-t border-gray-200 md:border-none md:rounded-xl md:shadow-md md:items-center xl:max-w-5xl xl:mx-auto xl:pt-10">
                        <h2 className="text-3xl md:text-2xl text-pretty font-bold md:text-center">{exampleBill.question}</h2>
                        <Button
                            variant="mobileText"
                            onClick={() => setShowDialog(true)}
                            className='md:w-fit'
                        >
                            <Info  size={16}/>
                            Se mere om spørgsmålet
                        </Button>
                        <div className="flex flex-col md:flex-row-reverse gap-4 lg:gap-6 mt-2">
                            <TestAnswerButton answer="for" onClick={() => handleUserAnswer("for")} isAnswered={userAnswer === "for"}/>
                            <TestAnswerButton answer="neither" onClick={() => handleUserAnswer("neither")} isAnswered={userAnswer === "neither"}/>
                            <TestAnswerButton answer="against" onClick={() => handleUserAnswer("against")} isAnswered={userAnswer === "against"}/>
                        </div>
                        <Button 
                            variant="mobileText" 
                            className='text-gray-500 w-full md:hidden' 
                            onClick={() => null}
                        >
                            Spring spørgsmålet over
                        </Button>
                        <div className='hidden md:grid grid-cols-3 w-[calc(100%-2rem)] justify-between py-4 lg:pt-6 mt-8 border-t border-gray-200 '>
                                <Button 
                                    variant="secondary" 
                                    onClick={() => null} 
                                    className='pr-6' 
                                >
                                    <ChevronLeft size={20}/>
                                    Tilbage
                                </Button>
                            <Button 
                                variant="mobileText" 
                                className='text-gray-500 justify-self-center' 
                                onClick={() => null}
                            >
                                Spring spørgsmålet over
                            </Button>
                            <Button onClick={() => null} className='pl-6 justify-self-end'>
                                Næste
                                <ChevronRight size={20} />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='flex justify-between px-4 py-4 border-t border-gray-200 md:hidden'>
                    <Button variant="secondary" onClick={() => null} className='pr-6'>
                        <ChevronLeft size={20}/>
                        Tilbage
                    </Button>
                    <Button onClick={() => null} className='pl-6'>
                        Næste
                        <ChevronRight size={20} />
                    </Button>
                </div>
                {showDialog && <TestQuestionDialog bill={exampleBill} closeDialog={() => setShowDialog(false)}/>}
            </div>
        </Section>
    )
}