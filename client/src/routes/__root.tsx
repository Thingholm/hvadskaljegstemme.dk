import { createRootRoute, Outlet } from "@tanstack/react-router";
import Header from "../components/layout/Header";

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}