'use client';
import React, { useRef, useEffect } from 'react';
import katex from 'katex';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter, PrismLight as SyntaxHighlighterLight } from 'react-syntax-highlighter';
import { vscDarkPlus, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactDOMServer from 'react-dom/server';
import _ from 'lodash';

const MathContent = ({ content }: { content: string }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [contentList, setContentList] = React.useState<string[]>([]);

	useEffect(() => {
		if (containerRef.current) {
			// 清空容器，避免多次渲染
			containerRef.current.innerHTML = '';

			const lines = content.split('\n');
			lines.forEach((line) => {
				const inlineRegex = /(\\\([^\(\)]*\))|(\([^\(\)]*\))|(\\\[[^\[\]]*\])|(\[[^\[\]]*\])/g;
				let currentLine = line.replace(/\[/g, '(').replace(/\]/, ')');

				let lastIndex = 0;
				let match;

				// 处理行内公式
				while ((match = inlineRegex.exec(currentLine)) !== null) {
					if (!match[1]) {
						continue;
					}
					const latex = match[1]
						?.replace(/(\\\[)|(\[)/g, '')
						.replace(/(\\\])|(\])/g, '')
						.replace(/(\\\()|(\()/g, '(')
						.replace(/(\\\))|(\))/g, ')');
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
							output: 'html',
						});
						setContentList((contentList) => {
							const newContent = katex.renderToString(latex, {
								throwOnError: false,
								displayMode: false,
								output: 'html',
							});
							console.log(`newContent`, newContent);
							return [...contentList, newContent];
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
					const newContent = ReactDOMServer.renderToString(<ReactMarkdownText textContent={currentLine} />);

					setContentList((contentList) => {
						return [...contentList, newContent];
					});
				}

				// 添加换行
				(containerRef.current as HTMLDivElement).appendChild(document.createElement('br'));
			});
		}

		return () => {
			// 清理函数，在组件卸载时执行，这里通常不需要特别操作
		};
	}, [content]);

	console.log(`contentList`, contentList);
	return (
		<>
			<div className="" ref={containerRef} />
		</>
	);
};

export default MathContent;

const ReactMarkdownText = ({ textContent }: { textContent: string }) => {
	if (!textContent) {
		return null; // 或者返回一个默认的占位符
	}

	return (
		<div>
			<ReactMarkdown
				components={{
					code(props) {
						const { children, className, node, ...rest } = props;
						const match = /language-(\w+)/.exec(className || '');
						const codeName = match?.[1] || '';
						return match ? (
							<div className="text-sm leading-4 my-3 overflow-hidden overflow-x-scroll break-all break-words flex gap-0 flex-col">
								<div className="flex items-center relative bg-gray-950 text-gray-300 text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md">
									<span>{codeName}</span>
									<div className="flex items-center"></div>
								</div>
								{/* @ts-ignore */}
								<SyntaxHighlighter
									{...rest}
									PreTag="pre"
									language={codeName}
									wrapLines={true}
									wrapLongLines={true}
									style={vscDarkPlus}
									className={`rounded-b-md !mt-0`}
								>
									{String(children)?.replace(/\n$/, '')}
								</SyntaxHighlighter>
							</div>
						) : (
							children
						);
					},
				}}
			>
				{textContent}
			</ReactMarkdown>
		</div>
	);
};
