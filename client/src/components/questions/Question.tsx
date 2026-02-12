import type { BillWithVotes } from "../../lib/types/bill"
import VotesContainer from "./VotesContainer";

export default function Question({
    billWithVotes,
    index,
    showUserAnswers,
}: Readonly<{
    billWithVotes: BillWithVotes;
    index: number;
    showUserAnswers: boolean
}>) {
    return (
        <div className="not-last:border-b border-gray-300 pb-3">
            <p className="text-gray-500 text-sm">Spørgsmål {index}</p>
            <h3 className="font-bold text-lg text-pretty">{billWithVotes.question}</h3>
            <div className="grid gap-2">
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
        </div>
    )
}