import type { PartyVote } from "../../lib/types/party-vote";
import type { Vote } from "../../lib/types/vote";
import PartyLetter from "../PartyLetter";
import type { Party } from "../../lib/types/party";

const iconColorDictionary: Record<Vote, string> = {
    "for": "bg-green-600",
    "neither": "bg-gray-500",
    "against": "bg-red-600",
}

const labelDictionary: Record<Vote, string> = {
    "for": "For",
    "neither": "Hverken eller",
    "against": "Imod"
}

export default function VotesContainer({
    vote,
    partyVotes,
    userAnswer
}: Readonly<{
    vote: Vote;
    partyVotes: PartyVote[];
    userAnswer?: Vote;
}>) {
    const parties = partyVotes.filter(pv => pv.vote === vote && pv.party)
        .map(pv => pv.party as Party)
        .sort((a, b) => a.letter.localeCompare(b.letter));

    return (
        <div className="grid gap-2">
            <div className="flex items-center gap-2">
                <div className={`block h-2 w-2 rounded-full ${iconColorDictionary[vote]}`}></div>
                <p>{labelDictionary[vote]}</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
                {parties.map(party => (
                    <PartyLetter party={party} size={6}/>
                ))}
                {userAnswer === vote && (
                    <PartyLetter size={6}/>
                )}
            </div>
        </div>
    )
}