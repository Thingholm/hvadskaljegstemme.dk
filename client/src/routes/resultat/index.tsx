import { createFileRoute, useNavigate } from '@tanstack/react-router'
import type { UserAnswer } from '../../lib/types/user-answer';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { calculateUserResult } from '../../utils/helpers/resultCalculation';
import ResultCard from "../../components/result/ResultCard"
import Button from '../../components/ui/Button';
import CardSection from '../../components/layout/CardSection';
import PageHeading from '../../components/ui/PageHeading';
import PageSubheading from '../../components/ui/PageSubheading';
import { useQuery } from '@tanstack/react-query';
import { fetchBills } from '../../lib/api/bills';
import PageSkeleton from '../../components/PageSkeleton';
import { fetchParties } from '../../lib/api/parties';
import type { PartyVote } from '../../lib/types/party-vote';

export const Route = createFileRoute('/resultat/')({
  component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate();

    const [submittedAnswers] = useLocalStorage<UserAnswer[]>("submittedAnswers", []);

    if (submittedAnswers.length < 1) {
        navigate({ to: "/tag-testen" });
    }

    const { data: bills, isLoading: isLoadingBills, error: errorBills } = useQuery({
		queryKey: ["bills"],
		queryFn: fetchBills
	});

    const { data: parties, isLoading: isLoadingParties, error: errorParties } = useQuery({
		queryKey: ["parties"],
		queryFn: fetchParties
	});

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

    const userResult = calculateUserResult(bills, submittedAnswers, parties)
        .sort((a, b) => a.party.letter.toLowerCase().localeCompare(b.party.letter.toLowerCase()))
        .sort((a, b) => b.score - a.score);

    const partyVotes = bills.flatMap(bill => bill.partyVotes.map(partyVote => ({...partyVote, billId: bill.id} as PartyVote)));

    return (
        <CardSection className='md:p-6!'>
            <div className='md:px-4 grid gap-2 pb-2 md:pb-0'>
                <PageHeading>Dit resultat</PageHeading>
                <PageSubheading>Her kan du se dit resultat fra testen, af hvor enig du er med partierne i de {submittedAnswers.length} forslag.</PageSubheading>
            </div>
            <div className='grid gap-4 md:gap-0'>
                {userResult.map(ur => (
                    <ResultCard 
                        key={ur.party.id} 
                        userResult={ur}
                        userAnswers={submittedAnswers}
                        bills={bills}
                        partyVotes={partyVotes.filter(pv => pv.partyId === ur.party.id)}
                    />
                ))}
            </div>
            <div>
                <Button to='/tag-testen?retake=true' className='mt-2 md:mt-0 md:mx-4'>
                    Tag testen igen
                </Button>
            </div>
        </CardSection>    
)
}
