import { useState } from "react";
import type { BillWithVotes } from "../../lib/types/bill"
import Button from "../ui/Button";
import VotesContainer from "./VotesContainer";
import TestQuestionDialog from "../test/TestQuestionDialog";

export default function Question({
    billWithVotes,
    index,
    showUserAnswers,
}: Readonly<{
    billWithVotes: BillWithVotes;
    index: number;
    showUserAnswers: boolean
}>) {
    const [showDialog, setShowDialog] = useState(false);

    return (
        <div className="not-last:border-b border-gray-300 pb-3 md:pb-6">
            <p className="text-gray-500 text-sm">Spørgsmål {index}</p>
            <h3 className="font-bold text-lg text-pretty">{billWithVotes.question}</h3>
            <Button variant="mobileText" onClick={() => setShowDialog(true)}>
                Læs mere om forslaget
            </Button>
            <div className="grid gap-2 md:grid-cols-3">
                <VotesContainer 
                    vote="for" 
                    partyVotes={billWithVotes.party_votes} 
                    userAnswer={showUserAnswers ? billWithVotes.user_answer : undefined}
                />
                <VotesContainer 
                    vote="neither" 
                    partyVotes={billWithVotes.party_votes} 
                    userAnswer={showUserAnswers ? billWithVotes.user_answer : undefined}
                />
                <VotesContainer 
                    vote="against" 
                    partyVotes={billWithVotes.party_votes} 
                    userAnswer={showUserAnswers ? billWithVotes.user_answer : undefined}
                />
            </div>
            {showDialog && (
                <TestQuestionDialog bill={billWithVotes} closeDialog={() => setShowDialog(false)}/>
            )}
        </div>
    )
}