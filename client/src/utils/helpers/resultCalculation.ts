import type { PartyVote } from "../../lib/types/party-vote";
import type { UserAnswer } from "../../lib/types/user-answer";
import type { Vote } from "../../lib/types/vote";

export type PartyMatch = {
    partyId: number;
    score: number;
    maxScore: number;
    percentage: number;
}

export function calculateUserResult(partyVotes: PartyVote[], userAnswers: UserAnswer[]) {
    const userAnswersWithoutSkips = userAnswers.filter(ua => ua.vote !== "skip");

    const partyMatchDictionary: Record<number, PartyMatch> = [];
    partyVotes.forEach(pv => {
        const userVote = userAnswersWithoutSkips.find(ua => ua.bill_id === pv.bill_id)?.vote as Vote;
        if (!userVote) return;

        const partyVote = partyMatchDictionary[pv.party_id] ?? {partyId: pv.party_id, score: 0, maxScore: 0};
        partyVote.score += calculatePartyMatchScore(pv.vote, userVote);
        partyVote.maxScore++;

        partyMatchDictionary[pv.party_id] = partyVote
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