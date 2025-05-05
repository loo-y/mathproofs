'use client';

import React, { useRef, useState, useEffect } from 'react';
import { FileUploader } from '@/components/solve/file-uploader';
import { ProcessingStages } from '@/components/solve/processing-stages';
import { SolutionDisplay } from '@/components/solve/solution-display';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProcessingState, SolutionData } from '@/lib/types';
import { ExampleSelector } from '@/components/solve/example-selector';
import { motion } from 'framer-motion';
import { convertImageFileToBase64, sleepSeconds } from '../../shared/utils';
import MathContent from '@/components/solve/mathContent';
import MathMarkdown from '@/components/solve/mathMarkdown';

export default function SolvePage() {
	const [processingState, setProcessingState] = useState<ProcessingState>('idle');
	const [solution, setSolution] = useState<SolutionData | null>(null);
	const [mathContent, setMathContent] = useState<string>('');
	useEffect(() => {
		// const content = `第15讲 圆与扇形\n\n一、圆的周长和面积\n圆周长 \\( C = 2 \\times \\pi \\times r = \\pi \\times d \\)\n圆面积 \\( S = \\pi \\times r^2 \\)\n\n二、扇形的弧长和面积\n扇形弧长 \\( = \\frac{n}{360} \\times 2 \\times \\pi \\times r \\)\n扇形面积 \\( = \\frac{n}{360} \\times \\pi \\times r^2 \\)\n\n注意：扇形的弧长不是它的周长，扇形的周长还必须加上两条半径的长！`
		// setMathContent(content)
	}, []);

	const setKatex = (content: string) => {
		setMathContent(content || '');
	};

	const handleUploadComplete = (imageFile?: File) => {
		// Simulate processing steps with timeouts
		const proofs = getProofs({ imageFile, stateChangeCallback: (state) => setProcessingState(state) }).then((result) => {
			if (result) {
				const { originalMath, solutionSteps } = result;
				// setKatex(result?.content || '');
				setSolution({
					originalText: originalMath,
					// formalizedText: 'theorem even_square_minus_n_plus_two (n : ℤ) : even (n^2 - n + 2)',
					steps: solutionSteps || '',
					// proofTree: {
					// 	nodes: [
					// 		{ id: 'n1', label: 'Target: even (n^2 - n + 2)' },
					// 		{ id: 'n2', label: 'Case n even' },
					// 		{ id: 'n3', label: 'Case n odd' },
					// 		{ id: 'n4', label: 'n = 2k' },
					// 		{ id: 'n5', label: 'n = 2k+1' },
					// 		{ id: 'n6', label: 'n^2 - n + 2 = 2(2k^2 - k + 1)' },
					// 		{ id: 'n7', label: 'n^2 - n + 2 = 2(2k^2 + k + 1)' },
					// 	],
					// 	edges: [
					// 		{ from: 'n1', to: 'n2' },
					// 		{ from: 'n1', to: 'n3' },
					// 		{ from: 'n2', to: 'n4' },
					// 		{ from: 'n3', to: 'n5' },
					// 		{ from: 'n4', to: 'n6' },
					// 		{ from: 'n5', to: 'n7' },
					// 	],
					// },
				});
			}
		});
	};

	const resetState = () => {
		setProcessingState('idle');
		setSolution(null);
	};

	return (
		<div className="container max-w-6xl py-20 px-6">
			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl md:text-3xl">Math Proof AI</CardTitle>
						<CardDescription>遇到难题别着急，拍照上传就能看解析！</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="mx-auto overflow-hidden">{/* <MathContent content={demo} /> */}</div>
						{processingState === 'idle' ? (
							<div className="space-y-8">
								<FileUploader onUploadComplete={handleUploadComplete} />
								{/* <ExampleSelector onSelect={handleUploadComplete} /> */}
							</div>
						) : processingState === 'complete' ? (
							<SolutionDisplay solution={solution!} onReset={resetState} />
						) : (
							<ProcessingStages currentStage={processingState} />
						)}
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
}

// ******************** helper ********************
interface IGetProofs {
	imageFile?: File;
	stateChangeCallback: (state: ProcessingState) => void;
}
const fetchGetProofs = async ({ mathContent }: { mathContent: string }): Promise<null | Record<string, any>> => {
	let result = null;
	const url = `/api/getproofs`;
	try {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				mathContent,
			}),
		});
		result = await res.json();
		console.log(`fetchGetProofs result`, result);
	} catch (e) {}
	return result;
};

const fetchImageRecognize = async ({
	imageBase64,
	fileType,
}: {
	imageBase64: string;
	fileType: File['type'];
}): Promise<null | Record<string, any>> => {
	let result = null;
	const url = `/api/imagerecognize`;
	try {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				image: imageBase64,
				imageType: fileType,
			}),
		});
		result = await res.json();
		console.log(`fetchGetProofs result`, result);
	} catch (e) {}
	return result;
};

const getProofs = async ({ imageFile, stateChangeCallback }: IGetProofs) => {
	// uploading
	stateChangeCallback('uploading');
	if (!imageFile) {
		stateChangeCallback('idle');
		return null;
	}

	const imageBase64 =
		(await convertImageFileToBase64({
			imageFile,
		})) || '';

	stateChangeCallback('analyzing');
	const mathContentResult = await fetchImageRecognize({
		imageBase64: imageBase64,
		fileType: imageFile.type,
	});
	stateChangeCallback('converting');
	stateChangeCallback('proving');
	const solutionSteps = await fetchGetProofs({
		mathContent: mathContentResult?.content || '',
	});
	// await sleepSeconds(0.5);
	stateChangeCallback('complete');

	return {
		originalMath: mathContentResult?.content || '',
		solutionSteps: solutionSteps?.content || '',
	};
};

const preprocessLatex = (input: string) => {
	return input
		.replace(/<br\s*\/?>/gi, '\\newline')
		.replace(/<\/?p>/gi, '')
		.replace(/<\/?[^>]+>/gi, '')
		.replace(/\n/g, '\\newline')
		.trim();
};
