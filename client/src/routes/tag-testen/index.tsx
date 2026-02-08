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
		<div className='flex flex-col min-h-[calc(100dvh-3rem)] justify-between'>
			<div>
				<div className="px-4 pt-3 pb-4 bg-gray-100">
					<TestProgress currentProgress={questionIndex} totalProgress={mockBills.length} />
				</div>
				<div className="grid gap-4 bg-white py-4 px-4 border-t border-gray-200">
					<h2 className="text-3xl text-pretty font-bold">{mockBills[questionIndex].question}</h2>
					<Button
						variant="mobileText"
						onClick={() => setShowDialog(true)}
					>
						<Info  size={16}/>
						Se mere om spørgsmålet
					</Button>
					<div className="grid gap-4 mt-2">
						<TestAnswerButton answer="for" onClick={() => setQuestionIndex(q => q + 1)}/>
						<TestAnswerButton answer="neither" onClick={() => setQuestionIndex(q => q + 1)}/>
						<TestAnswerButton answer="against" onClick={() => setQuestionIndex(q => q + 1)}/>
					</div>
					<Button variant="mobileText" className='text-gray-500 w-full' onClick={() => setQuestionIndex(q => q + 1)}>
						Spring spørgsmålet over
					</Button>
				</div>
			</div>
			<div className='flex justify-between px-4 py-4 border-t border-gray-200'>
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
