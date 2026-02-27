import type { PartyVoteResponseDTO } from "../../lib/types/party-vote";
import type { Vote, VoteWithSkip } from "../../lib/types/vote";
import PartyLetter from "../PartyLetter";
import type { Party } from "../../lib/types/party";

const iconColorDictionary: Record<Vote, string> = {
    "for": "bg-green-600",
    "neither": "bg-gray-500",
    "against": "bg-red-600",
}

const labelDictionary: Record<Vote, string> = {
    "for": "Enig",
    "neither": "Hverken/eller",
    "against": "Uenig"
}

const shortenedLabelDictionary: Record<Vote, string> = {
    "for": "Enig",
    "neither": "Neutral",
    "against": "Uenig"
}

export default function VotesContainer({
    vote,
    partyVotes,
    userAnswer,
    isShortenedOnMobile = false
}: Readonly<{
    vote: Vote;
    partyVotes: (PartyVoteResponseDTO & {
        party?: Party
    })[];
    userAnswer?: VoteWithSkip;
    isShortenedOnMobile?: boolean
}>) {
    const parties = partyVotes.filter(pv => pv.vote === vote && pv.party)
        .map(pv => pv.party as Party)
        .sort((a, b) => a.letter.localeCompare(b.letter));

    return (
        <div className="grid gap-2">
            <div className="flex items-center gap-2">
                <div className={`block h-2 w-2 rounded-full ${iconColorDictionary[vote]}`}></div>
                <p>
                    {isShortenedOnMobile 
                        ? (
                            <>
                                <span className="md:hidden">{shortenedLabelDictionary[vote]}</span>
                                <span className="hidden md:inline">{labelDictionary[vote]}</span>
                            </>
                        ): labelDictionary[vote]
                    }
                </p>
            </div>
            <div className="flex flex-wrap gap-1.5 items-start">
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