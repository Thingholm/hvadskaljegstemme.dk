import { createRootRoute, Outlet } from "@tanstack/react-router";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 pt-12 bg-gray-100">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}