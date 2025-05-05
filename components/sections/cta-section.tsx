'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function CTASection() {
	return (
		<section className="py-20">
			<div className="container max-w-6xl">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.7 }}
					className="bg-gradient-to-br from-primary/90 to-primary rounded-2xl p-8 md:p-12 text-center md:text-left shadow-xl overflow-hidden relative"
				>
					{/* Background decoration */}
					<div className="absolute inset-0 overflow-hidden opacity-20">
						<div className="absolute top-0 left-8 h-[300px] w-[300px] rounded-full bg-white/20 blur-3xl" />
						<div className="absolute bottom-0 right-8 h-[400px] w-[400px] rounded-full bg-white/10 blur-3xl" />
					</div>

					<div className="relative z-10 md:flex md:items-center md:justify-between">
						<div className="mb-8 md:mb-0 md:max-w-xl">
							<h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to transform how you solve mathematical problems?</h2>
							<p className="text-white/90 md:text-lg">
								Start using our AI-powered platform today and experience formal proofs, step-by-step solutions, and visualization of complex
								mathematical concepts.
							</p>
						</div>
						<div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
							<Button size="lg" variant="secondary" className="font-medium" asChild>
								<Link href="/solve">Try It Now</Link>
							</Button>
							<Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 hover:text-white">
								Learn More
							</Button>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
