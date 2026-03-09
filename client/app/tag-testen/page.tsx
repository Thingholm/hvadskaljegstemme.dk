"use client";

import Test from "@/components/test/Test";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { VoteWithSkip } from "@/lib/types/vote";
import { Suspense, useEffect, useRef, useState } from "react";
import ContinueOrRestartTest from "@/components/test/ContinueOrRestartTest";
import type { UserAnswer } from "@/lib/types/user-answer";
import PageSkeleton from "@/components/PageSkeleton";
import CardSection from "@/components/layout/CardSection";
import PageHeading from "@/components/ui/PageHeading";
import PageSubheading from "@/components/ui/PageSubheading";
import { useSearchParams } from "next/navigation";
import type { Bill } from "@/lib/types/bill";
import { fetchBills } from "@/lib/api/bills";

function TagTestenContent() {
    const [userId] = useLocalStorage<string>("userId", crypto.randomUUID());
    const [userAnswers, setUserAnswers] = useLocalStorage<
        Record<number, VoteWithSkip>
    >("userAnswers", []);
    const [submittedAnswers, setSubmittedAnswers] = useLocalStorage<
        UserAnswer[]
    >("submittedAnswers", []);
    const [hasAnswered, setHasAnswered] = useState(
        submittedAnswers.length > 0
    );
    const [unfinishedTest, setUnfinishedTest] = useState(
        Object.keys(userAnswers).length > 0
    );

    const searchParams = useSearchParams();
    const retake = searchParams.get("retake") === "true";

    const [bills, setBills] = useState<Bill[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchBills()
            .then((data) => setBills(data))
            .catch(() => setError(true))
            .finally(() => setIsLoading(false));
    }, []);

    const setUserAnswersRef = useRef(setUserAnswers);
    setUserAnswersRef.current = setUserAnswers;

    useEffect(() => {
        if (retake) {
            setUserAnswersRef.current([]);
        }
    }, [retake]);

    if (isLoading) {
        return <PageSkeleton />;
    }

    if (error || !bills || bills.length < 1) {
        return (
            <CardSection>
                <PageHeading>Ups, noget gik galt.</PageHeading>
                <PageSubheading>Prøv igen senere.</PageSubheading>
            </CardSection>
        );
    }

    if ((hasAnswered || unfinishedTest) && !retake) {
        return (
            <ContinueOrRestartTest
                hasAnswered={hasAnswered}
                setHasAnswered={setHasAnswered}
                unfinishedTest={unfinishedTest}
                setUnfinishedTest={setUnfinishedTest}
                setUserAnswers={setUserAnswers}
            />
        );
    }

    return (
        <Test
            userId={userId}
            userAnswers={userAnswers}
            setUserAnswers={setUserAnswers}
            setSubmittedAnswers={setSubmittedAnswers}
            bills={bills}
        />
    );
}

export default function TagTestenPage() {
    return (
        <Suspense fallback={<PageSkeleton />}>
            <TagTestenContent />
        </Suspense>
    );
}
