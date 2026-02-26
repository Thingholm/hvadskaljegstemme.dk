export default function Badge({ 
    children,
    className,
}: { 
    children: React.ReactNode
    className?: string;
}) {
    return (
        <span className={`inline-flex w-fit items-center px-2 py-0.5 rounded text-sm font-medium bg-blue-200 text-gray-800 ${className}`}>
            {children}
        </span>
    );
}