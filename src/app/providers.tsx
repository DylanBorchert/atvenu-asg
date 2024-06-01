'use client';
import { ItemProvider } from "@/context/ItemProvider"
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
    return (
        <ItemProvider >
            {children}
        </ItemProvider>
    );
}