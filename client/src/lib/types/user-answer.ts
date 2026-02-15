import type { VoteWithSkip } from "./vote";

export type UserAnswer = {
    userUuid: string;
    billId: number;
    vote: VoteWithSkip;
    answeredAt: string; // ISO date string
}