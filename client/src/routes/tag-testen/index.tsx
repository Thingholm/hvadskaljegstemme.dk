import { createFileRoute } from '@tanstack/react-router'
import Test from '../../components/Test'
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { Vote } from '../../lib/types/vote';
import { useState } from 'react';
import ContinueOrRestartTest from '../../components/ContinueOrRestartTest';

export const Route = createFileRoute('/tag-testen/')({
	component: RouteComponent,
})

function RouteComponent() {
	const [userUUID] = useLocalStorage<string>("userUUID", crypto.randomUUID());
	const [userAnswers, setUserAnswers] = useLocalStorage<Record<number, Vote>>("userAnswers", []);
	const [hasAnswered, setHasAnswered] = useState(false);
	const [unfinishedTest, setUnfinishedTest] = useState(Object.keys(userAnswers).length > 0);

	if (hasAnswered || unfinishedTest) {
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
		/>
	)
}
