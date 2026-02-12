import CardSection from "./layout/CardSection"

export default function PageSkeleton() {
    return (
        <CardSection>
            <div className='grid gap-2 pb-2'>
                <div className="w-5/6 h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="grid gap-1">
                    <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-2/3 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="w-full h-[calc(100dvh-11rem)] md:h-96 bg-gray-200 rounded animate-pulse"></div>
            </div>
        </CardSection>
    )
}