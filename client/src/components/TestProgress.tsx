export default function TestProgress({
    currentProgress = 0,
    totalProgress = 100,
}: Readonly<{
    currentProgress: number;
    totalProgress: number;
}>) {
    const progressPercentage = Math.round((currentProgress) / totalProgress * 100);

    return (
        <div>
            <div className="text-sm text-gray-700 flex justify-between mb-1">
                <p>Spørgsmål {currentProgress + 1} ud af {totalProgress}</p>
                <p>{progressPercentage}%</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                    className="bg-blue-500 h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
        </div>

    );
}