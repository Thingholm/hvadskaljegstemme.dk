import type { Party } from "./party";
import type { Vote } from "./vote";

export type PartyVoteResponseDTO = {
    partyId: number;
    vote: Vote;
}

export type PartyVote = {
    vote: Vote;
    partyId: number;
    party?: Party;
    billId: number
}