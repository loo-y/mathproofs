// a nextjs route handler
import { NextResponse, NextRequest } from 'next/server';
import { solveMathProblem } from '../../fetches/deepseek';
export async function GET(request: NextRequest) {
	const token = request.cookies.get('token');
	return NextResponse.json({ token });
}

export async function POST(request: NextRequest) {
	const body = await request.json();
	const { mathContent } = body || {};

	const result = await solveMathProblem(mathContent);
	console.log(`result`, result);
	return NextResponse.json(
		{
			content: result || '',
		},
		{
			status: 200,
		},
	);
}
