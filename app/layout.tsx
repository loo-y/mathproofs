import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
	title: 'MathProofs AI - Mathematical Problem Solver',
	description: 'Analyze, solve, and prove mathematical problems using AI',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={``}>
				<Providers>
					<div className="flex min-h-screen flex-col">
						<Navbar />
						<main className="flex-1">{children}</main>
						<Footer />
					</div>
				</Providers>
			</body>
		</html>
	);
}
