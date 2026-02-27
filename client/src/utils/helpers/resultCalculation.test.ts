import { describe, expect, it } from "vitest"
import { calculateUserResult } from "./resultCalculation";
import type { Bill } from "../../lib/types/bill";
import type { UserAnswer } from "../../lib/types/user-answer";

const defaultBill = {
    billTag: "",
    title: "",
    question: "",
    description: "",
    forExplanation: "",
    againstExplanation: "",
    url: "",
    votedAt: "",
    isPassed: true,
    billType: "",
    order: 0,
}

const bills: Bill[] = [
    {
        ...defaultBill,
        id: 1,
        partyVotes: [
            { partyId: 1, vote: "for" },
            { partyId: 2, vote: "neither"}
        ]
    },
    {
        ...defaultBill,
        id: 2,
        partyVotes: [
            { partyId: 1, vote: "against" },
            { partyId: 2, vote: "for" }
        ]
    }
]

const defaultParty = {
    name: "",
    letter: "",
    colorHex: "",
}

const partyA = { ...defaultParty, id: 1 };
const partyB = { ...defaultParty, id: 2 };

describe("calculateUserResult", () => {
    it("Returns 100% match when user votes match party votes exactly", () => {
        const userAnswers: UserAnswer[] = [
            { userId: "", billId: 1, vote: "for" },
            { userId: "", billId: 2, vote: "against" }
        ];

        const result = calculateUserResult(bills, userAnswers, [ partyA ]);
        const matchA = result.find(r => r.party.id === 1);

        expect(matchA?.score).toBe(2);
        expect(matchA?.maxScore).toBe(2);
        expect(matchA?.percentage).toBe(100);
    });

    it("Returns 0% when user votes are all opposite to party", () => {
        const userAnswers: UserAnswer[] = [
            { userId: "", billId: 1, vote: "against" },
            { userId: "", billId: 2, vote: "for" }
        ];

        const result = calculateUserResult(bills, userAnswers, [ partyA ]);
        const matchA = result.find(r => r.party.id === 1);

        expect(matchA?.score).toBe(0);
        expect(matchA?.maxScore).toBe(2);
        expect(matchA?.percentage).toBe(0);
    });

    it("Returns 50% when votes are neither for either party or user", () => {
        const userAnswers: UserAnswer[] = [
            { userId: "", billId: 1, vote: "against" },
            { userId: "", billId: 2, vote: "neither" }
        ];

        const result = calculateUserResult(bills, userAnswers, [ partyB ]);
        const matchB = result.find(r => r.party.id === 2);

        expect(matchB?.score).toBe(1);
        expect(matchB?.maxScore).toBe(2);
        expect(matchB?.percentage).toBe(50);
    });

    it("Excludes skipped answers from scoring", () => {
        const userAnswers: UserAnswer[] = [
            { userId: "", billId: 1, vote: "for" },
            { userId: "", billId: 2, vote: "skip" }
        ];

        const result = calculateUserResult(bills, userAnswers, [ partyA ]);
        const matchA = result.find(r => r.party.id === 1);

        expect(matchA?.score).toBe(1);
        expect(matchA?.maxScore).toBe(1);
        expect(matchA?.percentage).toBe(100);
    });

    it("Scores multiple parties independently", () => {
        const userAnswers: UserAnswer[] = [
            { userId: "", billId: 1, vote: "for" },
            { userId: "", billId: 2, vote: "for" }
        ];

        const result = calculateUserResult(bills, userAnswers, [ partyA, partyB ]);
        const matchA = result.find(r => r.party.id === 1);
        const matchB = result.find(r => r.party.id === 2);

        expect(matchA?.score).toBe(1);
        expect(matchA?.maxScore).toBe(2);
        expect(matchA?.percentage).toBe(50);

        expect(matchB?.score).toBe(1.5);
        expect(matchB?.maxScore).toBe(2);
        expect(matchB?.percentage).toBe(75)  ;
    });

    it("Returns empty array, when all bills are skipped", () => {
        const userAnswers: UserAnswer[] = [
            { userId: "", billId: 1, vote: "skip" },
            { userId: "", billId: 2, vote: "skip" }
        ];

        const result = calculateUserResult(bills, userAnswers, [ partyA, partyB ]);

        expect(result).toHaveLength(0);
    });
});