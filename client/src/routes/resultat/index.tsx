import { createFileRoute, useNavigate } from '@tanstack/react-router'
import type { UserAnswer } from '../../lib/types/user-answer';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { mockPartyVotes } from '../../lib/mockData/partyVotes';
import { calculateUserResult } from '../../utils/helpers/resultCalculation';
import { mockParties } from '../../lib/mockData/parties';
import ResultCard from "../../components/result/ResultCard"

export const Route = createFileRoute('/resultat/')({
  component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate();

    const [submittedAnswers, setSubmittedAnswers] = useLocalStorage<UserAnswer[]>("submittedAnswers", []);

    if (submittedAnswers.length < 1) {
        navigate({ to: "/tag-testen" });
    }

    const userResult = calculateUserResult(mockPartyVotes, submittedAnswers, mockParties)
        .sort((a, b) => a.party.letter.toLowerCase().localeCompare(b.party.letter.toLowerCase()))
        .sort((a, b) => b.score - a.score);
    console.log(userResult)

    return (
        <div className='p-4 grid gap-2'>
            {userResult.map(ur => (
                <ResultCard key={ur.party.id} userResult={ur}/>
            ))}
        </div>
    )
}
