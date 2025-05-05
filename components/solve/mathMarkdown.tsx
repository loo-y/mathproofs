// components/MarkdownRenderer.tsx
import 'katex/dist/katex.min.css'; // Import KaTeX CSS
import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// Props 类型定义
interface MarkdownRendererProps {
	content: string;
}

const MathMarkdown: React.FC<MarkdownRendererProps> = ({ content }) => {
	const [displayContent, setDisplayContent] = React.useState<string>();
	useEffect(() => {
		console.log(`content`, content);
		if (content?.length) {
			setDisplayContent(content.replace(/\[/g, '(').replace(/\]/, ')'));
		}
	}, [content]);

	if (!displayContent) {
		return null;
	}
	return (
		<ReactMarkdown
			remarkPlugins={[remarkMath]} // 解析 LaTeX
			rehypePlugins={[[rehypeKatex, { throwOnError: false, strict: 'ignore' }]]} // 渲染 LaTeX 为 KaTeX
		>
			{displayContent}
		</ReactMarkdown>
	);
};

export default MathMarkdown;
