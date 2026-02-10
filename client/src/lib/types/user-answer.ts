import type { VoteWithSkip } from "./vote";

export type UserAnswer = {
    user_uuid: string;
    bill_id: number;
    vote: VoteWithSkip;
    answered_at: string; // ISO date string
}