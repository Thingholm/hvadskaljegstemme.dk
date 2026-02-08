import { createFileRoute } from '@tanstack/react-router'
import TestProgress from '../../components/TestProgress'
import { mockBills } from '../../lib/mockData/bills'
import { useState } from 'react'

export const Route = createFileRoute('/tag-testen/')({
	component: RouteComponent,
})

function RouteComponent() {
	const [questionIndex, setQuestionIndex] = useState(0)

	return (
		<div className="px-2 bg-gray-100">
			<div className="pt-3 pb-4">
				<TestProgress currentProgress={questionIndex} totalProgress={mockBills.length} />
			</div>
			<div className="bg-white mt-4">

			</div>
		</div>
	)
}
