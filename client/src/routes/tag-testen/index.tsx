import { createFileRoute, useSearch } from '@tanstack/react-router'
import Test from '../../components/test/Test'
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { VoteWithSkip } from '../../lib/types/vote';
import { useEffect, useState } from 'react';
import ContinueOrRestartTest from '../../components/test/ContinueOrRestartTest';
import type { UserAnswer } from '../../lib/types/user-answer';
import { useQuery } from '@tanstack/react-query';
import { fetchBills } from '../../lib/api/bills';
import PageSkeleton from '../../components/PageSkeleton';
import CardSection from '../../components/layout/CardSection';
import PageHeading from '../../components/ui/PageHeading';
import PageSubheading from '../../components/ui/PageSubheading';

export const Route = createFileRoute('/tag-testen/')({
	component: RouteComponent
})

function RouteComponent() {
	const [userId] = useLocalStorage<string>("userId", crypto.randomUUID());
	const [userAnswers, setUserAnswers] = useLocalStorage<Record<number, VoteWithSkip>>("userAnswers", []);
	const [submittedAnswers, setSubmittedAnswers] = useLocalStorage<UserAnswer[]>("submittedAnswers", []);
	const [hasAnswered, setHasAnswered] = useState(submittedAnswers.length > 0);
	const [unfinishedTest, setUnfinishedTest] = useState(Object.keys(userAnswers).length > 0);

	const search = useSearch({ from: Route.id });
	const retake: boolean = search.retake;

	useEffect(() => {
		if (retake) {
			setUserAnswers([]);
		}
	}, [retake]);

	const { data: bills, isLoading, error } = useQuery({
		queryKey: ["bills"],
		queryFn: fetchBills
	})

	if (isLoading) {
		return (
			<PageSkeleton />
		)
	}

	if (error || !bills || bills.length < 1) {
		return (
			<CardSection>
				<PageHeading>
					Ups, noget gik galt.
				</PageHeading>
				<PageSubheading>
					Prøv igen senere.
				</PageSubheading>
			</CardSection>
		)
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
		)
	}
	
	return (
		<Test 
			userId={userId} 
			userAnswers={userAnswers} 
			setUserAnswers={setUserAnswers} 
			setSubmittedAnswers={setSubmittedAnswers}
			bills={bills}
		/>
	)
}
