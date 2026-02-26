import type { Bill } from "../../lib/types/bill";
import type { Party } from "../../lib/types/party";
import type { UserAnswer } from "../../lib/types/user-answer";
import type { Vote } from "../../lib/types/vote";

export type PartyMatch = {
    party: Party;
    score: number;
    maxScore: number;
    percentage: number;
}

export function calculateUserResult(bills: Bill[], userAnswers: UserAnswer[], parties: Party[]): PartyMatch[] {
    const userAnswersWithoutSkips = userAnswers.filter(ua => ua.vote !== "skip");

    const flattenedPartyVotes = bills.flatMap(bill => {
        return bill.partyVotes.map(pv => ({
            ...pv,
            billId: bill.id
        }));
    })

    const partyMatchDictionary: Record<number, PartyMatch> = [];
    flattenedPartyVotes.forEach(pv => {
        const userVote = userAnswersWithoutSkips.find(ua => ua.billId === pv.billId)?.vote as Vote;
        if (!userVote) return;

        const partyVote = partyMatchDictionary[pv.partyId] ?? {
            party: parties.find(p => p.id === pv.partyId), 
            score: 0, 
            maxScore: 0,
        };
        if (!partyVote.party) return;

        partyVote.score += calculatePartyMatchScore(pv.vote, userVote);
        partyVote.maxScore++;

        partyMatchDictionary[pv.partyId] = partyVote
    });

    const partyMatchesWithPercentage = Object.values(partyMatchDictionary).map(pm => ({
        ...pm,
        percentage: Math.round(pm.score / pm.maxScore * 100)
    }))

    return partyMatchesWithPercentage;
}

function calculatePartyMatchScore(partyVote: Vote, userVote: Vote) {
    if (partyVote === userVote) return 1;

    if (partyVote === "neither" || userVote === "neither") return 0.5;

    return 0;
}