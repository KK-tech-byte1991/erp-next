import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import CampusProvider from "./campus-provider"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Campus',
    description: 'Campus Page',
}

export default function CampusLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <CampusProvider>{children}</CampusProvider>
        </div>
    )
}