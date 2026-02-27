import { ChevronDown } from "lucide-react";
import type { PartyMatch } from "../../utils/helpers/resultCalculation";
import { useState } from "react";
import type { UserAnswer } from "../../lib/types/user-answer";
import type { Bill } from "../../lib/types/bill";
import PartyLetter from "../PartyLetter";
import VotesContainer from "../questions/VotesContainer";
import type { PartyVote } from "../../lib/types/party-vote";

export default function ResultCard({
    userResult,
    userAnswers,
    bills,
    partyVotes,
}: Readonly<{
    userResult: PartyMatch;
    userAnswers: UserAnswer[];
    bills: Bill[];
    partyVotes: PartyVote[]
}>) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleIsExpanded = () => setIsExpanded(!isExpanded);

    return (
        <div>
            <div className="grid gap-2 hover:cursor-pointer md:hover:bg-gray-100 md:p-4 md:rounded-lg" onClick={toggleIsExpanded}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <PartyLetter party={userResult.party}/>
                        <h3 className="font-semibold">{userResult.party.name}</h3>
                    </div>
                    <h3
                        className="text-lg font-black"
                        style={{ color: userResult.party.colorHex }}
                    >
                        {userResult.percentage}%
                    </h3>
                </div>
                <div className="block relative h-2.5 w-full bg-gray-200 rounded-full">
                    <div 
                        className="absolute block h-2.5 rounded-full" 
                        style={{ backgroundColor: userResult.party.colorHex, width: `${userResult.percentage}%` }}
                    ></div>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">{isExpanded ? "Klik for at skjule svar" : "Klik for at sammenligne svar"}</p>
                    <ChevronDown size={20} className={`text-gray-500 duration-150 ${isExpanded ? "rotate-180" : ""}`}/>
                </div>
            </div>
            {isExpanded && (
                <div className="py-2 md:mx-4 mt-2 border-t border-gray-300 grid gap-2">
                    {bills.map(bill => {
                        const userAnswer = userAnswers.find(ua => ua.billId === bill.id);
                        const partyAnswer = {
                            ...partyVotes.find(pv => pv.billId === bill.id),
                            party: userResult.party
                        } as PartyVote;

                        if (!partyAnswer) return;

                        return (
                            <div key={`${bill.id}-${userResult.party.id}`} className="grid gap-1 pb-3 not-last:border-b border-gray-300">
                                <p className="font-medium">{bill.question}</p>
                                <div className="grid gap-2 grid-cols-3 items-start">
                                    <VotesContainer
                                        vote="for" 
                                        partyVotes={[partyAnswer]} 
                                        userAnswer={userAnswer?.vote}
                                    />
                                    <VotesContainer 
                                        vote="neither" 
                                        partyVotes={[partyAnswer]} 
                                        userAnswer={userAnswer?.vote}
                                        isShortenedOnMobile
                                    />
                                    <VotesContainer 
                                        vote="against" 
                                        partyVotes={[partyAnswer]} 
                                        userAnswer={userAnswer?.vote}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}