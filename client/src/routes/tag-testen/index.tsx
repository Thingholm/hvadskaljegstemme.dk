import { createFileRoute } from '@tanstack/react-router'
import TestProgress from '../../components/TestProgress'
import { mockBills } from '../../lib/mockData/bills'
import { useState } from 'react'
import Button from '../../components/ui/Button'
import { ChevronLeft, ChevronRight, Info } from 'lucide-react'
import TestAnswerButton from '../../components/TestAnswerButton'
import TestQuestionDialog from '../../components/TestQuestionDialog'

export const Route = createFileRoute('/tag-testen/')({
	component: RouteComponent,
})

function RouteComponent() {
	const [questionIndex, setQuestionIndex] = useState(0);
	const [showDialog, setShowDialog] = useState(false);

	return (
		<div className='flex flex-col min-h-[calc(100dvh-3rem)] md:bg-gray-100 justify-between'>
			<div>
				<div className="mx-4 md:mx-16 lg:mx-32 pt-3 pb-4 bg-gray-100 md:bg-auto xl:max-w-5xl xl:mx-auto">
					<TestProgress currentProgress={questionIndex} totalProgress={mockBills.length} />
				</div>
				<div className="flex flex-col gap-4 bg-white p-4 md:p-8 border-t border-gray-200 md:border-none md:mx-16 lg:mx-32 md:rounded-xl md:shadow-md md:items-center xl:max-w-5xl xl:mx-auto">
					<h2 className="text-3xl md:text-2xl text-pretty font-bold md:text-center">{mockBills[questionIndex].question}</h2>
					<Button
						variant="mobileText"
						onClick={() => setShowDialog(true)}
						className='md:w-fit'
					>
						<Info  size={16}/>
						Se mere om spørgsmålet
					</Button>
					<div className="flex flex-col md:flex-row-reverse gap-4 mt-2">
						<TestAnswerButton answer="for" onClick={() => setQuestionIndex(q => q + 1)}/>
						<TestAnswerButton answer="neither" onClick={() => setQuestionIndex(q => q + 1)}/>
						<TestAnswerButton answer="against" onClick={() => setQuestionIndex(q => q + 1)}/>
					</div>
					<Button variant="mobileText" className='text-gray-500 w-full md:hidden' onClick={() => setQuestionIndex(q => q + 1)}>
						Spring spørgsmålet over
					</Button>
					<div className='hidden md:flex w-[calc(100%-2rem)] justify-between py-4 mt-8 border-t border-gray-200 '>
							<Button variant="secondary" onClick={() => setQuestionIndex(q => q - 1)} className='pr-6'>
								<ChevronLeft />
								Tilbage
							</Button>
						<Button variant="mobileText" className='text-gray-500 ' onClick={() => setQuestionIndex(q => q + 1)}>
							Spring spørgsmålet over
						</Button>
						<Button onClick={() => setQuestionIndex(q => q + 1)} className='pl-6'>
							{questionIndex < mockBills.length - 1 ? "Næste" : "Afslut og se resultat"}
							<ChevronRight />
						</Button>
					</div>
				</div>
			</div>
			<div className='flex justify-between px-4 py-4 border-t border-gray-200 md:hidden'>
				{questionIndex > 0 ? (
					<Button variant="secondary" onClick={() => setQuestionIndex(q => q - 1)} className='pr-6'>
						<ChevronLeft />
						Tilbage
					</Button>
				) : <div />}
				<Button onClick={() => setQuestionIndex(q => q + 1)} className='pl-6'>
					{questionIndex < mockBills.length - 1 ? "Næste" : "Afslut og se resultat"}
					<ChevronRight />
				</Button>
			</div>
			{showDialog && <TestQuestionDialog bill={mockBills[questionIndex]} closeDialog={() => setShowDialog(false)}/>}
		</div>
	)
}
