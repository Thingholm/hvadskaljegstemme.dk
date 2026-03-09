"use client";

import type { UserAnswer } from "@/lib/types/user-answer";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { calculateUserResult } from "@/utils/helpers/resultCalculation";
import ResultCard from "@/components/result/ResultCard";
import Button from "@/components/ui/Button";
import CardSection from "@/components/layout/CardSection";
import PageHeading from "@/components/ui/PageHeading";
import PageSubheading from "@/components/ui/PageSubheading";
import PageSkeleton from "@/components/PageSkeleton";
import type { Bill } from "@/lib/types/bill";
import type { Party } from "@/lib/types/party";
import type { PartyVote } from "@/lib/types/party-vote";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchBills } from "@/lib/api/bills";
import { fetchParties } from "@/lib/api/parties";

export default function ResultatPage() {
    const router = useRouter();
    const [submittedAnswers] = useLocalStorage<UserAnswer[]>(
        "submittedAnswers",
        []
    );

    const [bills, setBills] = useState<Bill[] | null>(null);
    const [parties, setParties] = useState<Party[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (submittedAnswers.length < 1) {
            router.push("/tag-testen");
            return;
        }
    }, [submittedAnswers.length, router]);

    useEffect(() => {
        Promise.all([fetchBills(), fetchParties()])
            .then(([billsData, partiesData]) => {
                setBills(billsData);
                setParties(partiesData);
            })
            .catch(() => setError(true))
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return <PageSkeleton />;
    }

    if (
        error ||
        !bills ||
        bills.length < 1 ||
        !parties ||
        parties.length < 1
    ) {
        return (
            <CardSection>
                <PageHeading>Ups, noget gik galt.</PageHeading>
                <PageSubheading>Prøv igen senere.</PageSubheading>
            </CardSection>
        );
    }

    const userResult = calculateUserResult(bills, submittedAnswers, parties)
        .sort((a, b) =>
            a.party.letter
                .toLowerCase()
                .localeCompare(b.party.letter.toLowerCase())
        )
        .sort((a, b) => b.score - a.score);

    const partyVotes = bills.flatMap((bill) =>
        bill.partyVotes.map(
            (partyVote) => ({ ...partyVote, billId: bill.id }) as PartyVote
        )
    );

    return (
        <CardSection className="md:p-6!">
            <div className="md:px-4 grid gap-2 pb-2 md:pb-0">
                <PageHeading>Dit resultat</PageHeading>
                <PageSubheading>
                    Her kan du se dit resultat fra testen, af hvor enig du er med
                    partierne i de {submittedAnswers.length} forslag.
                </PageSubheading>
            </div>
            <div className="grid gap-4 md:gap-0">
                {userResult.map((ur) => (
                    <ResultCard
                        key={ur.party.id}
                        userResult={ur}
                        userAnswers={submittedAnswers}
                        bills={bills}
                        partyVotes={partyVotes.filter(
                            (pv) => pv.partyId === ur.party.id
                        )}
                    />
                ))}
            </div>
            <div>
                <Button
                    to="/tag-testen?retake=true"
                    className="mt-2 md:mt-0 md:mx-4"
                >
                    Tag testen igen
                </Button>
            </div>
        </CardSection>
    );
}
