import { createFileRoute } from '@tanstack/react-router'
import { mockBills } from '../../lib/mockData/bills'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { mockPartyVotes } from '../../lib/mockData/partyVotes'
import type { UserAnswer } from '../../lib/types/user-answer'
import Question from '../../components/questions/Question'
import { mockParties } from '../../lib/mockData/parties'
import { useMemo, useState } from 'react'

export const Route = createFileRoute('/partiernes-stemmer/')({
    component: RouteComponent,
})

function RouteComponent() {
    const [submittedAnswers] = useLocalStorage<UserAnswer[]>("submittedAnswers", [])
    const [showUserAnswers, setShowUserAnswers] = useState(true);

    const billsWithVotes = useMemo(
        () => mockBills.map(bill => {
            const user_answer = submittedAnswers.find(sa => sa.bill_id === bill.id)?.vote;
            return {
                ...bill,
                party_votes: mockPartyVotes.filter(pv => pv.bill_id === bill.id)!.map(pv => ({
                    ...pv, 
                    party: mockParties.find(p => p.id === pv.party_id)
                })),
                user_answer: user_answer === "skip" ? undefined : user_answer
            }
        }),
        [submittedAnswers]
    );

    return (
        <div className='flex-1 min-h-[calc(100dvh-3rem)] p-4 md:px-16 lg:px-32 md:bg-gray-100'>
            <div className='grid gap-2 md:gap-4 md:bg-white md:rounded-lg md:shadow md:p-6 xl:max-w-5xl xl:mx-auto'>
                <div className='md:px-4 grid gap-2 pb-2 md:pb-0'>
                    <h2 className='font-bold text-xl'>Partiernes stemmer</h2>
                    <p className='text-sm text-gray-500'>Her kan du se alle spørgsmålene i testen, og hvordan partierne har stemt i Folketingssalen.</p>
                    {submittedAnswers.length > 0 && (
                        <label className='flex items-center gap-1.5' htmlFor='show-user-answers'>
                            <input 
                                type='checkbox' 
                                id='show-user-answers' 
                                checked={showUserAnswers}
                                onChange={() => setShowUserAnswers(s => !s)}
                                className='h-4 w-4 rounded accent-blue-500'
                            />
                            <span>Vis mine svar</span>
                        </label>
                    )}
                </div>
                <div className='grid gap-3'>
                    {billsWithVotes.map((bill, index) => (
                        <Question billWithVotes={bill} index={index + 1} showUserAnswers={showUserAnswers}/>
                    ))}
                </div>
            </div>
        </div>
    )
}
