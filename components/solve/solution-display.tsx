'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Download, Copy, Check, Code, DownloadCloud } from 'lucide-react';
import { SolutionData } from '@/lib/types';
import { motion } from 'framer-motion';
import { ProofTree } from '@/components/solve/proof-tree';
import gsap from 'gsap';

interface SolutionDisplayProps {
	solution: SolutionData;
	onReset: () => void;
}

export function SolutionDisplay({ solution, onReset }: SolutionDisplayProps) {
	const [currentTab, setCurrentTab] = useState('steps');
	const [copied, setCopied] = useState(false);
	const stepsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (stepsRef.current && currentTab === 'steps') {
			const steps = stepsRef.current.querySelectorAll('.step-item');

			gsap.fromTo(
				steps,
				{ opacity: 0, y: 20 },
				{
					opacity: 1,
					y: 0,
					stagger: 0.15,
					duration: 0.5,
					ease: 'power3.out',
					delay: 0.2,
				},
			);
		}
	}, [currentTab]);

	const handleCopy = () => {
		const textToCopy = solution.steps.map((step) => `${step.id}. ${step.content}`).join('\n');
		navigator.clipboard.writeText(textToCopy);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
			<div className="flex items-center justify-between">
				<Button variant="ghost" size="sm" onClick={onReset}>
					<ArrowLeft className="mr-2 h-4 w-4" /> Back
				</Button>

				<div className="flex space-x-2">
					<Button variant="outline" size="sm" onClick={handleCopy}>
						{copied ? (
							<>
								<Check className="mr-2 h-4 w-4" /> Copied
							</>
						) : (
							<>
								<Copy className="mr-2 h-4 w-4" /> Copy
							</>
						)}
					</Button>
					<Button variant="outline" size="sm">
						<DownloadCloud className="mr-2 h-4 w-4" /> PDF
					</Button>
					<Button variant="outline" size="sm">
						<Code className="mr-2 h-4 w-4" /> Lean4
					</Button>
				</div>
			</div>

			<Card className="p-4 bg-muted/50">
				<h3 className="font-medium text-sm mb-2">Original Problem</h3>
				<p>{solution.originalText}</p>
			</Card>

			<Card className="p-4 bg-primary/5 border-primary/20">
				<h3 className="font-medium text-sm mb-2">Formalized Statement</h3>
				<code className="text-sm font-mono">{solution.formalizedText}</code>
			</Card>

			<Tabs defaultValue="steps" value={currentTab} onValueChange={setCurrentTab}>
				<TabsList className="grid grid-cols-2 w-[400px] mb-4">
					<TabsTrigger value="steps">Step-by-Step Solution</TabsTrigger>
					<TabsTrigger value="tree">Proof Tree</TabsTrigger>
				</TabsList>

				<TabsContent value="steps">
					<div ref={stepsRef} className="space-y-3">
						{solution.steps.map((step) => (
							<motion.div key={step.id} className="step-item p-4 bg-card border rounded-lg opacity-0">
								<div className="flex">
									<span className="font-mono text-primary font-medium mr-3">{step.id}.</span>
									<div>{step.content}</div>
								</div>
							</motion.div>
						))}
					</div>
				</TabsContent>

				<TabsContent value="tree">
					<Card className="p-6 h-[400px] relative flex items-center justify-center">
						<ProofTree proofTree={solution.proofTree} />
					</Card>
				</TabsContent>
			</Tabs>
		</motion.div>
	);
}
