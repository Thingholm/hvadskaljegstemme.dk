import { useNavigate } from '@tanstack/react-router'
import TestProgress from './TestProgress'
import { useState } from 'react'
import Button from '../ui/Button'
import { ChevronLeft, ChevronRight, Info } from 'lucide-react'
import TestAnswerButton from './TestAnswerButton'
import TestQuestionDialog from './TestQuestionDialog'
import type { Bill } from '../../lib/types/bill'
import type { VoteWithSkip } from '../../lib/types/vote'    
import type { UserAnswer } from '../../lib/types/user-answer'

export default function Test({
    userUUID,
    userAnswers,
    setUserAnswers,
    setSubmittedAnswers,
	bills,
}: Readonly<{
    userUUID: string;
    userAnswers: Record<number, VoteWithSkip>;
    setUserAnswers: (answers: Record<number, VoteWithSkip>) => void;
    setSubmittedAnswers: (answers: UserAnswer[]) => void;
	bills: Bill[];
}>) {
	const [questionIndex, setQuestionIndex] = useState(Object.keys(userAnswers).length < bills.length ? bills.findIndex(bill => !(bill.id in userAnswers)) || 0 : 0);
	const [showDialog, setShowDialog] = useState(false);
	
	const navigate = useNavigate();

	const currentBill = bills[questionIndex];

	const handleFinalize = () => {
		if (typeof window === "undefined") return;

		const answersToSubmit = Object.entries(userAnswers).map(([billId, vote]) => ({
			userUuid: userUUID,
			billId: Number(billId),
			vote,
			answeredAt: new Date().toISOString(),
		}));

        setSubmittedAnswers(answersToSubmit);

		navigate({ to: '/resultat/' });
	}

	const handleUserAnswer = (vote: VoteWithSkip | null, bill: Bill) => {
		if (vote) {
			setUserAnswers({...userAnswers, [bill.id]: vote});
		}

		if (questionIndex === bills.length - 1) {
			handleFinalize();
			return
		}

		setQuestionIndex(q => q + 1);
	};

	const handlePreviousClick = () => {
		if (questionIndex === 0) return;
		setQuestionIndex(q => q - 1);
	}

	return (
		<div className='flex flex-col min-h-[calc(100dvh-3rem)] md:bg-gray-100 justify-between'>
			<div>
				<div className="px-4 md:px-0 md:mx-16 lg:mx-32 pt-3 md:pt-6 lg:pt-8 xl:pt-10 2xl:pt-12 pb-4 bg-gray-100 md:bg-auto xl:max-w-5xl xl:mx-auto">
					<TestProgress currentProgress={questionIndex} totalProgress={bills.length} />
				</div>
				<div className="flex flex-col gap-4 bg-white p-4 md:p-8 border-t border-gray-200 md:border-none md:mx-16 lg:mx-32 md:rounded-xl md:shadow-md md:items-center xl:max-w-5xl xl:mx-auto xl:pt-10">
					<h2 className="text-3xl md:text-2xl text-pretty font-bold md:text-center">{currentBill.question}</h2>
					<Button
						variant="mobileText"
						onClick={() => setShowDialog(true)}
						className='md:w-fit'
					>
						<Info  size={16}/>
						Se mere om spørgsmålet
					</Button>
					<div className="flex flex-col md:flex-row-reverse gap-4 lg:gap-6 mt-2">
						<TestAnswerButton answer="for" onClick={() => handleUserAnswer("for", currentBill)} isAnswered={userAnswers[currentBill.id] === "for"}/>
						<TestAnswerButton answer="neither" onClick={() => handleUserAnswer("neither", currentBill)} isAnswered={userAnswers[currentBill.id] === "neither"}/>
						<TestAnswerButton answer="against" onClick={() => handleUserAnswer("against", currentBill)} isAnswered={userAnswers[currentBill.id] === "against"}/>
					</div>
					<Button 
						variant="mobileText" 
						className='text-gray-500 w-full md:hidden' 
						onClick={() => handleUserAnswer("skip", currentBill)}
					>
						Spring spørgsmålet over
					</Button>
					<div className='hidden md:grid grid-cols-3 w-[calc(100%-2rem)] justify-between py-4 lg:pt-6 mt-8 border-t border-gray-200 '>
							<Button 
								variant="secondary" 
								onClick={handlePreviousClick} 
								className='pr-6' 
								disabled={questionIndex === 0}
							>
								<ChevronLeft size={20}/>
								Tilbage
							</Button>
						<Button 
							variant="mobileText" 
							className='text-gray-500 justify-self-center' 
							onClick={() => handleUserAnswer("skip", currentBill)}
						>
							{questionIndex < bills.length - 1 ? "Spring spørgsmålet over" : "Spring spørgsmålet over og afslut"}
						</Button>
						<Button onClick={() => handleUserAnswer(null, currentBill)} className='pl-6 justify-self-end'>
							{questionIndex < bills.length - 1 ? "Næste" : "Afslut"}
							<ChevronRight size={20} />
						</Button>
					</div>
				</div>
			</div>
			<div className='flex justify-between px-4 py-4 border-t border-gray-200 md:hidden'>
				{questionIndex > 0 ? (
					<Button variant="secondary" onClick={handlePreviousClick} className='pr-6'>
						<ChevronLeft size={20}/>
						Tilbage
					</Button>
				) : <div />}
				<Button onClick={() => handleUserAnswer(null, currentBill)} className='pl-6'>
					{questionIndex < bills.length - 1 ? "Næste" : "Afslut"}
					<ChevronRight size={20} />
				</Button>
			</div>
			{showDialog && <TestQuestionDialog bill={currentBill} closeDialog={() => setShowDialog(false)}/>}
		</div>
	)
}