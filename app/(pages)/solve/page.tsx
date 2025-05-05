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
import katex from 'katex';

const MathContent = ({ content }: { content: string }) => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (containerRef.current) {
			// 清空容器，避免多次渲染
			containerRef.current.innerHTML = '';

			const lines = content.split('\n');
			lines.forEach((line) => {
				const inlineRegex = /(\\\([^()]*\))|(\([^()]*\))/g;
				let currentLine = line;

				let lastIndex = 0;
				let match;

				// 处理行内公式
				while ((match = inlineRegex.exec(currentLine)) !== null) {
					console.log(`match[1]`, match[1]);
					const latex = match[1].replace(/(\\\()|(\()/g, '(').replace(/(\\\))|(\))/g, ')');
					console.log(`latex`, latex);
					const textBefore = currentLine.substring(lastIndex, match.index);
					if (textBefore) {
						(containerRef.current as HTMLDivElement).appendChild(document.createTextNode(textBefore));
					}
					const span = document.createElement('span');
					try {
						katex.render(latex, span, {
							throwOnError: false,
							displayMode: false,
							output: 'mathml',
						});
					} catch (error) {
						console.error('Error rendering inline LaTeX:', error);
						span.textContent = latex; // 出错时显示原始 LaTeX
					}
					(containerRef.current as HTMLDivElement).appendChild(span);
					lastIndex = inlineRegex.lastIndex;
				}
				const remainingTextAfterInline = currentLine.substring(lastIndex);
				if (remainingTextAfterInline) {
					(containerRef.current as HTMLDivElement).appendChild(document.createTextNode(remainingTextAfterInline));
				}

				// 添加换行
				(containerRef.current as HTMLDivElement).appendChild(document.createElement('br'));
			});
		}

		return () => {
			// 清理函数，在组件卸载时执行，这里通常不需要特别操作
		};
	}, [content]);

	return <div className="" ref={containerRef} />;
};

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
				setKatex(result?.content || '');
				setSolution({
					originalText: 'Prove that if $n$ is an integer, then $n^2 - n + 2$ is even.',
					formalizedText: 'theorem even_square_minus_n_plus_two (n : ℤ) : even (n^2 - n + 2)',
					steps: [
						{ id: 1, content: 'Consider the parity of $n$.' },
						{
							id: 2,
							content: 'Case 1: $n$ is even, so $n = 2k$ for some integer $k$.',
						},
						{
							id: 3,
							content: 'Then $n^2 - n + 2 = 4k^2 - 2k + 2 = 2(2k^2 - k + 1)$, which is even.',
						},
						{
							id: 4,
							content: 'Case 2: $n$ is odd, so $n = 2k + 1$ for some integer $k$.',
						},
						{
							id: 5,
							content:
								'Then $n^2 - n + 2 = (2k+1)^2 - (2k+1) + 2 = 4k^2 + 4k + 1 - 2k - 1 + 2 = 4k^2 + 2k + 2 = 2(2k^2 + k + 1)$, which is even.',
						},
						{
							id: 6,
							content: 'Therefore, in both cases, $n^2 - n + 2$ is even for any integer $n$.',
						},
					],
					proofTree: {
						nodes: [
							{ id: 'n1', label: 'Target: even (n^2 - n + 2)' },
							{ id: 'n2', label: 'Case n even' },
							{ id: 'n3', label: 'Case n odd' },
							{ id: 'n4', label: 'n = 2k' },
							{ id: 'n5', label: 'n = 2k+1' },
							{ id: 'n6', label: 'n^2 - n + 2 = 2(2k^2 - k + 1)' },
							{ id: 'n7', label: 'n^2 - n + 2 = 2(2k^2 + k + 1)' },
						],
						edges: [
							{ from: 'n1', to: 'n2' },
							{ from: 'n1', to: 'n3' },
							{ from: 'n2', to: 'n4' },
							{ from: 'n3', to: 'n5' },
							{ from: 'n4', to: 'n6' },
							{ from: 'n5', to: 'n7' },
						],
					},
				});
			}
		});
	};

	const resetState = () => {
		setProcessingState('idle');
		setSolution(null);
	};

	return (
		<div className="container max-w-6xl py-12">
			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl md:text-3xl">Math Problem Solver</CardTitle>
						<CardDescription>Upload an image of a math problem or select from our examples</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="mx-auto overflow-hidden">
							<MathContent content={mathContent} />
						</div>
						{processingState === 'idle' ? (
							<div className="space-y-8">
								<FileUploader onUploadComplete={handleUploadComplete} />
								<ExampleSelector onSelect={handleUploadComplete} />
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
const fetchGetProofs = async ({
	imageBase64,
	fileType,
}: {
	imageBase64: string;
	fileType: File['type'];
}): Promise<null | Record<string, any>> => {
	let result = null;
	const url = `/api/getproofs`;
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

	const proofs = await fetchGetProofs({
		imageBase64: imageBase64,
		fileType: imageFile.type,
	});
	await sleepSeconds(0.5);
	stateChangeCallback('converting');
	await sleepSeconds(0.5);
	stateChangeCallback('proving');
	await sleepSeconds(0.5);
	stateChangeCallback('complete');

	return proofs;
};

const preprocessLatex = (input: string) => {
	return input
		.replace(/<br\s*\/?>/gi, '\\newline')
		.replace(/<\/?p>/gi, '')
		.replace(/<\/?[^>]+>/gi, '')
		.replace(/\n/g, '\\newline')
		.trim();
};
