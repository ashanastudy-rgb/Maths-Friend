import type { Metadata } from 'next';
import { Mukta } from 'next/font/google';
import './globals.css';

const mukta = Mukta({
    subsets: ['devanagari', 'latin'],
    weight: ['400', '600', '700', '800'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'गणित मित्र (Math Friend)',
    description: 'प्राथमिक शाळेतील मुलांसाठी गणित शिकण्याचे मजेदार ॲप',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="mr">
            <body className={mukta.className}>
                <main className="min-h-screen bg-[#fdfbf7] pb-10">
                    <header className="bg-indigo-600 text-white py-6 px-4 shadow-md text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight">🎒 गणित मित्र</h1>
                        <p className="text-indigo-100 mt-2 text-lg">हसत-खेळत गणित शिकूया!</p>
                    </header>
                    <div className="max-w-4xl mx-auto mt-6 px-4">
                        {children}
                    </div>
                </main>
            </body>
        </html>
    );
}
