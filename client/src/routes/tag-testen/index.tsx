import { createFileRoute, useSearch } from '@tanstack/react-router'
import Test from '../../components/test/Test'
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { VoteWithSkip } from '../../lib/types/vote';
import { useState } from 'react';
import ContinueOrRestartTest from '../../components/test/ContinueOrRestartTest';
import type { UserAnswer } from '../../lib/types/user-answer';

export const Route = createFileRoute('/tag-testen/')({
	component: RouteComponent
})

function RouteComponent() {
	const [userUUID] = useLocalStorage<string>("userUUID", crypto.randomUUID());
	const [userAnswers, setUserAnswers] = useLocalStorage<Record<number, VoteWithSkip>>("userAnswers", []);
	const [submittedAnswers, setSubmittedAnswers] = useLocalStorage<UserAnswer[]>("submittedAnswers", []);
	const [hasAnswered, setHasAnswered] = useState(submittedAnswers.length > 0);
	const [unfinishedTest, setUnfinishedTest] = useState(Object.keys(userAnswers).length > 0);

	const search = useSearch({ from: Route.id });
	const retake: boolean = search.retake;

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
			userUUID={userUUID} 
			userAnswers={userAnswers} 
			setUserAnswers={setUserAnswers} 
			setSubmittedAnswers={setSubmittedAnswers}
		/>
	)
}
