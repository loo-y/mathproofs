import Link from 'next/link';
import { BrainCircuit, Github, Twitter } from 'lucide-react';

export function Footer() {
	return (
		<footer className="border-t py-12 mt-16">
			<div className="container max-w-6xl mx-auto px-6">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div className="space-y-4">
						<div className="flex items-center space-x-2">
							<BrainCircuit className="h-6 w-6 text-primary" />
							<span className="font-bold text-lg">MathProofs AI</span>
						</div>
						<p className="text-sm text-muted-foreground">Analyze and solve mathematical problems with advanced AI technology</p>
						<div className="flex space-x-4">
							<Link href="https://github.com/loo-y/mathproofs" className="text-muted-foreground hover:text-foreground transition-colors">
								<Github className="h-5 w-5" />
								<span className="sr-only">GitHub</span>
							</Link>
							{/* <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
								<Twitter className="h-5 w-5" />
								<span className="sr-only">Twitter</span>
							</Link> */}
						</div>
					</div>

					{/* <div>
						<h3 className="font-medium text-sm mb-3">Product</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
									Features
								</Link>
							</li>
							<li>
								<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
									Pricing
								</Link>
							</li>
							<li>
								<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
									API
								</Link>
							</li>
							<li>
								<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
									Integrations
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="font-medium text-sm mb-3">Resources</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
									Documentation
								</Link>
							</li>
							<li>
								<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
									Tutorials
								</Link>
							</li>
							<li>
								<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
									Example Problems
								</Link>
							</li>
							<li>
								<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
									Blog
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="font-medium text-sm mb-3">Company</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
									About
								</Link>
							</li>
							<li>
								<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
									Contact
								</Link>
							</li>
							<li>
								<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
									Terms of Service
								</Link>
							</li>
						</ul>
					</div> */}
				</div>

				<div className="mt-6 pt-6 border-t text-center text-sm text-muted-foreground">
					<p>&copy; {new Date().getFullYear()} MathProofs AI. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}
