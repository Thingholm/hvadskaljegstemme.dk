export default function Footer() {
    return (
        <footer className="p-4 md:px-16 lg:px-32 bg-gray-50 border-t border-gray-200 grid gap-4">
            <h2 className="font-semibold text-center text-gray-500">Hvad skal jeg stemme</h2>
            <p className="text-gray-500 text-center text-pretty text-xs">Hjemmesiden er designet, udviklet og vedligeholdt af Mikkel Thingholm og Rasmus Thingholm.</p>
            <a href="https://github.com/Thingholm/hvadskaljegstemme.dk" className="text-gray-500 text-center text-pretty text-xs underline">Github repository</a>
        </footer>
    )
}