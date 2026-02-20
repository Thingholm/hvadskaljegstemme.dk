export default function AboutCard({
    icon,
    heading,
    text,
}: Readonly<{
    icon: React.ReactNode;
    heading: string;
    text: string;
}>) {
    return (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col gap-2">
            <div className="bg-blue-100 text-blue-800 rounded-md w-fit h-fit p-1.5">{icon}</div>
            <h5 className="font-semibold">{heading}</h5>
            <p className="text-gray-600">{text}</p>
        </div>
    )
}