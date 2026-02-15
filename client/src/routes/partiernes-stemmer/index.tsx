import { createFileRoute } from '@tanstack/react-router'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import type { UserAnswer } from '../../lib/types/user-answer'
import Question from '../../components/questions/Question'
import { useMemo, useState } from 'react'
import PageSkeleton from '../../components/PageSkeleton'
import CardSection from '../../components/layout/CardSection'
import PageHeading from '../../components/ui/PageHeading'
import PageSubheading from '../../components/ui/PageSubheading'
import { useQuery } from '@tanstack/react-query'
import { fetchBills } from '../../lib/api/bills'
import { fetchParties } from '../../lib/api/parties'

export const Route = createFileRoute('/partiernes-stemmer/')({
    component: RouteComponent,
})

function RouteComponent() {
    const [submittedAnswers] = useLocalStorage<UserAnswer[]>("submittedAnswers", [])
    const [showUserAnswers, setShowUserAnswers] = useState(true);

    const { data: bills, isLoading: isLoadingBills, error: errorBills } = useQuery({
		queryKey: ["bills"],
		queryFn: fetchBills
	});

    const { data: parties, isLoading: isLoadingParties, error: errorParties } = useQuery({
		queryKey: ["parties"],
		queryFn: fetchParties
	});

    const billsWithVotes = useMemo(
        () => {
            if (bills && parties) {
                return bills.map(bill => {
                    const userAnswer = submittedAnswers.find(sa => sa.billId === bill.id)?.vote;
                    return {
                        ...bill,
                        partyVotes: bill.partyVotes.map(pv => ({
                            ...pv, 
                            party: parties.find(p => p.id === pv.partyId)
                        })),
                        userAnswer: userAnswer === "skip" ? undefined : userAnswer
                    }
                })
            }
        },
        [bills, parties, submittedAnswers]
    );

	if (isLoadingBills || isLoadingParties) {
		return (
			<PageSkeleton />
		)
	}

	if (errorBills || !bills || bills.length < 1 || errorParties || !parties || parties.length < 1) {
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

    return (
        <div className='flex-1 min-h-[calc(100dvh-3rem)] p-4 md:px-16 lg:px-32 md:bg-gray-100'>
            <div className='grid gap-2 md:gap-4 md:bg-white md:rounded-lg md:shadow md:p-10 xl:max-w-5xl xl:mx-auto'>
                <div className='grid gap-2 pb-2'>
                    <h2 className='font-bold text-xl'>Partiernes stemmer</h2>
                    <p className='text-sm text-gray-500'>Her kan du se alle spørgsmålene i testen, og hvordan partierne har stemt i Folketingssalen.</p>
                    {submittedAnswers.length > 0 && (
                        <label className='flex items-center gap-1.5' htmlFor='show-user-answers'>
                            <input 
                                type='checkbox' 
                                id='show-user-answers' 
                                checked={showUserAnswers}
                                onChange={() => setShowUserAnswers(s => !s)}
                                className='h-3.5 w-3.5 rounded accent-blue-500'
                            />
                            <span className='select-none text-sm'>Vis mine svar</span>
                        </label>
                    )}
                </div>
                <div className='grid gap-3 md:gap-6'>
                    {billsWithVotes?.map((bill, index) => (
                        <Question billWithVotes={bill} index={index + 1} showUserAnswers={showUserAnswers}/>
                    ))}
                </div>
            </div>
        </div>
    )
}
