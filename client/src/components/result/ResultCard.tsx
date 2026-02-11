import { ChevronDown, Minus, ThumbsDown, ThumbsUp } from "lucide-react";
import type { PartyMatch } from "../../utils/helpers/resultCalculation";
import { useState } from "react";
import type { UserAnswer } from "../../lib/types/user-answer";
import type { Bill } from "../../lib/types/bill";
import PartyLetter from "../PartyLetter";

export default function ResultCard({
    userResult,
    userAnswers,
    bills,
}: Readonly<{
    userResult: PartyMatch;
    userAnswers: UserAnswer[];
    bills: Bill[];
}>) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleIsExpanded = () => setIsExpanded(!isExpanded);

    return (
        <div className="bg-gray-100 md:bg-transparent border md:border-none border-gray-300 rounded-lg p-2 md:p-0 duration-150">
            <div className="grid gap-2 hover:cursor-pointer md:hover:bg-gray-100 md:p-4 md:rounded-lg" onClick={toggleIsExpanded}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <PartyLetter party={userResult.party}/>
                        <h3 className="font-semibold">{userResult.party.name}</h3>
                    </div>
                    <h3
                        className="text-lg font-black"
                        style={{ color: userResult.party.color_hex }}
                    >
                        {userResult.percentage}%
                    </h3>
                </div>
                <div className="block relative h-2.5 w-full bg-gray-200 rounded-full">
                    <div 
                        className="absolute block h-2.5 rounded-full" 
                        style={{ backgroundColor: userResult.party.color_hex, width: `${userResult.percentage}%` }}
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
                        const userAnswer = userAnswers.find(ua => ua.bill_id === bill.id);
                        const partyAnswer = userResult.partyVotes.find(pv => pv.bill_id === bill.id);

                        if (!partyAnswer) return;

                        return (
                            <div key={`${bill.id}-${userResult.party.id}`} className="grid gap-1 pb-2 not-last:border-b border-gray-300">
                                <p className="font-medium">{bill.question}</p>
                                <div className="flex justify-between gap-2">
                                    <div className="w-1/3 grid gap-2">
                                        <p className="flex items-center gap-2">
                                            <ThumbsDown className="text-red-600" size={16}/>
                                            <span className="text-sm text-gray-800">Imod</span>
                                        </p>
                                        <div className="flex gap-1">
                                            {partyAnswer.vote === "against" && <PartyLetter size={6} party={userResult.party}/>}
                                            {userAnswer?.vote === "against" && <PartyLetter size={6}/>}
                                        </div>
                                    </div>                                    
                                    <div className="w-1/3 grid gap-2">
                                        <p className="flex items-center gap-2">
                                            <Minus className="text-gray-600" size={16}/>
                                            <span className="text-sm text-gray-800">Ingen</span>
                                        </p>
                                        <div className="flex gap-1">
                                            {partyAnswer.vote === "neither" && <PartyLetter size={6} party={userResult.party}/>}
                                            {userAnswer?.vote === "neither" && <PartyLetter size={6}/>}
                                        </div>
                                    </div>                                    
                                    <div className="w-1/3 grid gap-2">
                                        <p className="flex items-center gap-2">
                                            <ThumbsUp className="text-green-600" size={16}/>
                                            <span className="text-sm text-gray-800">For</span>
                                        </p>
                                        <div className="flex gap-1">
                                            {partyAnswer.vote === "for" && <PartyLetter size={6} party={userResult.party}/>}
                                            {userAnswer?.vote === "for" && <PartyLetter size={6}/>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}