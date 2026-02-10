import type { Bill } from "./bill";
import type { Party } from "./party";
import type { Vote } from "./vote";

export type PartyVote = {
    id: number;
    vote: Vote;
    party_id: number;
    party?: Party;
    bill_id: number;
    bill?: Bill;
}