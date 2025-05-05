'use client';

import { useEffect, useRef } from 'react';
import { Loader2, FileImage, BrainCircuit, FileCode, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { ProcessingState } from '@/lib/types';
import gsap from 'gsap';

interface StageInfo {
	icon: React.ElementType;
	label: string;
	description: string;
}

const stages: Record<Exclude<ProcessingState, 'idle' | 'complete'>, StageInfo> = {
	uploading: {
		icon: FileImage,
		label: 'Uploading',
		description: 'Processing your image and extracting text...',
	},
	analyzing: {
		icon: BrainCircuit,
		label: 'Analyzing',
		description: 'Interpreting mathematical notation and structure...',
	},
	converting: {
		icon: FileCode,
		label: 'Formalizing',
		description: 'Converting to formal mathematical language...',
	},
	proving: {
		icon: CheckCircle,
		label: 'Verifying',
		description: 'Generating proof and checking validity...',
	},
};

interface ProcessingStagesProps {
	currentStage: ProcessingState;
}

export function ProcessingStages({ currentStage }: ProcessingStagesProps) {
	const particlesRef = useRef<HTMLDivElement>(null);

	// Stage completion percentage
	const getStageIndex = (stage: ProcessingState) => {
		if (stage === 'idle') return -1;
		if (stage === 'uploading') return 0;
		if (stage === 'analyzing') return 1;
		if (stage === 'converting') return 2;
		if (stage === 'proving') return 3;
		if (stage === 'complete') return 4;
		return 0;
	};

	const progressPercentage = (getStageIndex(currentStage) / 4) * 100;

	// Particle animation effect
	useEffect(() => {
		if (!particlesRef.current || currentStage === 'idle' || currentStage === 'complete') return;

		const particles = particlesRef.current;
		const particleCount = 20;

		// Clear existing particles
		particles.innerHTML = '';

		for (let i = 0; i < particleCount; i++) {
			const particle = document.createElement('div');
			particle.className = 'absolute h-1 w-1 rounded-full bg-primary/60';
			particles.appendChild(particle);

			gsap.set(particle, {
				x: gsap.utils.random(0, particles.offsetWidth),
				y: gsap.utils.random(0, particles.offsetHeight),
				scale: gsap.utils.random(0.2, 0.8),
				opacity: 0,
			});

			gsap.to(particle, {
				duration: gsap.utils.random(1, 3),
				x: `+=${gsap.utils.random(-100, 100)}`,
				y: `+=${gsap.utils.random(-100, 100)}`,
				opacity: gsap.utils.random(0.1, 0.5),
				scale: 0,
				repeat: -1,
				repeatRefresh: true,
				ease: 'power1.out',
			});
		}

		return () => {
			// Cleanup animation
			gsap.killTweensOf(particles.children);
		};
	}, [currentStage]);

	return (
		<div className="relative py-8">
			{/* Animated particles background */}
			<div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden opacity-60" />

			<div className="mb-8">
				<Progress value={progressPercentage} className="h-2" />
			</div>

			<div className="grid md:grid-cols-4 gap-4">
				{Object.entries(stages).map(([stage, info], index) => {
					const stageEnum = stage as Exclude<ProcessingState, 'idle' | 'complete'>;
					const isActive = currentStage === stageEnum;
					const isComplete = getStageIndex(currentStage) > getStageIndex(stageEnum);

					return (
						<div
							key={stage}
							className={`flex flex-col items-center p-5 border rounded-lg transition ${
								isActive ? 'border-primary/50 bg-primary/5' : isComplete ? 'border-muted bg-muted/50' : 'border-dashed'
							}`}
						>
							<div className="relative mb-3">
								<div
									className={`h-12 w-12 rounded-full flex items-center justify-center ${
										isActive
											? 'bg-primary text-primary-foreground'
											: isComplete
												? 'bg-primary/50 text-primary-foreground'
												: 'bg-muted text-muted-foreground'
									}`}
								>
									{isActive ? <Loader2 className="h-6 w-6 animate-spin" /> : <info.icon className="h-6 w-6" />}
								</div>
							</div>
							<h3 className={`font-medium text-center ${isActive ? 'text-primary' : ''}`}>{info.label}</h3>
							<p className="text-xs text-muted-foreground text-center mt-1">{info.description}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}
