export type ProcessingState = 'idle' | 'uploading' | 'analyzing' | 'converting' | 'proving' | 'complete';

export interface SolutionStep {
	id: number;
	content: string;
}

export interface ProofTreeNode {
	id: string;
	label: string;
}

export interface ProofTreeEdge {
	from: string;
	to: string;
}

export interface ProofTreeData {
	nodes: ProofTreeNode[];
	edges: ProofTreeEdge[];
}

export interface SolutionData {
	originalText: string;
	formalizedText: string;
	steps: SolutionStep[];
	proofTree: ProofTreeData;
}
