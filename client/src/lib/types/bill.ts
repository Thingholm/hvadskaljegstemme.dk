import type { PartyVoteResponseDTO } from "./party-vote";

export type Bill = {
    id: number;
    billTag: string;
    title: string;
    question: string;
    description: string;
    forExplanation: string;
    againstExplanation: string;
    url: string;
    votedAt: string;
    isPassed: boolean;
    billType: string;
    partyVotes: PartyVoteResponseDTO[];
};