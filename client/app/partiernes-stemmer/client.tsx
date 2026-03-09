"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { UserAnswer } from "@/lib/types/user-answer";
import type { Bill } from "@/lib/types/bill";
import type { Party } from "@/lib/types/party";
import Question from "@/components/questions/Question";
import { useState } from "react";
import CardSection from "@/components/layout/CardSection";
import PageHeading from "@/components/ui/PageHeading";
import PageSubheading from "@/components/ui/PageSubheading";

export default function PartiernesStemmerClient({
    bills,
    parties,
}: Readonly<{
    bills: Bill[];
    parties: Party[];
}>) {
    const [submittedAnswers] = useLocalStorage<UserAnswer[]>(
        "submittedAnswers",
        []
    );
    const [showUserAnswers, setShowUserAnswers] = useState(true);

    const billsWithVotes = bills.map((bill) => {
        const userAnswer = submittedAnswers.find(
            (sa) => sa.billId === bill.id
        )?.vote;
        return {
            ...bill,
            partyVotes: bill.partyVotes.map((pv) => ({
                ...pv,
                party: parties.find((p) => p.id === pv.partyId),
            })),
            userAnswer: userAnswer === "skip" ? undefined : userAnswer,
        };
    });

    return (
        <CardSection>
            <div className="grid gap-2 pb-2">
                <PageHeading>Partiernes stemmer</PageHeading>
                <PageSubheading>
                    Her kan du se alle forslagene i testen, og hvordan partierne
                    har stemt på dem i Folketinget.
                </PageSubheading>
                {submittedAnswers.length > 0 && (
                    <label
                        className="flex items-center gap-1.5"
                        htmlFor="show-user-answers"
                    >
                        <input
                            type="checkbox"
                            id="show-user-answers"
                            checked={showUserAnswers}
                            onChange={() => setShowUserAnswers((s) => !s)}
                            className="h-3.5 w-3.5 rounded accent-blue-500"
                        />
                        <span className="select-none text-sm">
                            Vis mine svar
                        </span>
                    </label>
                )}
            </div>
            <div className="grid gap-3 md:gap-6">
                {billsWithVotes.map((bill, index) => (
                    <Question
                        key={bill.id}
                        billWithVotes={bill}
                        index={index + 1}
                        showUserAnswers={showUserAnswers}
                    />
                ))}
            </div>
        </CardSection>
    );
}
