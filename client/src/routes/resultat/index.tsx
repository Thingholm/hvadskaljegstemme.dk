import { createFileRoute, useNavigate } from '@tanstack/react-router'
import type { UserAnswer } from '../../lib/types/user-answer';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { mockPartyVotes } from '../../lib/mockData/partyVotes';
import { calculateUserResult } from '../../utils/helpers/resultCalculation';
import { mockParties } from '../../lib/mockData/parties';
import ResultCard from "../../components/result/ResultCard"
import { mockBills } from '../../lib/mockData/bills';
import Button from '../../components/ui/Button';

export const Route = createFileRoute('/resultat/')({
  component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate();

    const [submittedAnswers] = useLocalStorage<UserAnswer[]>("submittedAnswers", []);

    if (submittedAnswers.length < 1) {
        navigate({ to: "/tag-testen" });
    }

    const userResult = calculateUserResult(mockPartyVotes, submittedAnswers, mockParties)
        .sort((a, b) => a.party.letter.toLowerCase().localeCompare(b.party.letter.toLowerCase()))
        .sort((a, b) => b.score - a.score);

    return (
        <div className='flex-1 min-h-[calc(100dvh-3rem)] p-4 md:px-16 lg:px-32 md:bg-gray-100'>
            <div className='grid gap-2 md:gap-4 md:bg-white md:rounded-lg md:shadow md:p-6 xl:max-w-5xl xl:mx-auto'>
                <div className='md:px-4 grid gap-2 pb-2 md:pb-0'>
                    <h2 className='font-bold text-xl'>Dit resultat</h2>
                    <p className='text-sm text-gray-500'>Her kan du se dit resultat fra testen over, hvor enig du er med partierne i de {submittedAnswers.length} spørgsmål.</p>
                </div>
                {userResult.map(ur => (
                    <ResultCard 
                        key={ur.party.id} 
                        userResult={ur}
                        userAnswers={submittedAnswers}
                        bills={mockBills}
                    />
                ))}
                <div>
                    <Button to='/tag-testen?retake=true' className='mt-2 md:mt-0 md:mx-4'>
                        Tag testen igen
                    </Button>
                </div>
            </div>
        </div>
    )
}
