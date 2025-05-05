// components/MarkdownRenderer.tsx
import 'katex/dist/katex.min.css'; // Import KaTeX CSS
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// Props 类型定义
interface MarkdownRendererProps {
	content: string;
}

const MathMarkdown: React.FC<MarkdownRendererProps> = ({ content }) => {
	return (
		<ReactMarkdown
			remarkPlugins={[remarkMath]} // 解析 LaTeX
			rehypePlugins={[[rehypeKatex, { throwOnError: false, strict: 'ignore' }]]} // 渲染 LaTeX 为 KaTeX
		>
			{content.replace(/\[/g, '(').replace(/\]/, ')')}
		</ReactMarkdown>
	);
};

export default MathMarkdown;
