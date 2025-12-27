import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Pondok Pesantren Tahfidzul Quran Salafiyah Syafi\'iyah',
    description: 'Pondok Pesantren Tahfidzul Quran Salafiyah Syafi\'iyah - Jl.Ponpes Al-quran Gang 2, Proto Karangasem, Kedungwuni, Pekalongan',
    keywords: 'pondok pesantren, tahfidz quran, salafiyah, syafiiyah, pekalongan, kedungwuni',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="id">
            <body className={inter.className}>
                <Navbar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    )
}
